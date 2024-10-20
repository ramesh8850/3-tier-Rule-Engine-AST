function generateTreeHTML(node, prefix = '', isLeft = true) {
    if (!node) return '';

    let treeHTML = '';
    treeHTML += prefix + (isLeft ? "├── " : "└── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`) + '<br>';

    if (node.left) treeHTML += generateTreeHTML(node.left, prefix + (isLeft ? "│   " : "    "), true);
    if (node.right) treeHTML += generateTreeHTML(node.right, prefix + (isLeft ? "│   " : "    "), false);

    return treeHTML;
}

function displayTree(tree, targetId) {
    const treeHTML = generateTreeHTML(tree);
    document.getElementById(targetId).innerHTML = treeHTML; // Display in the specified target
}

// Handle Create Rule form submission
document.getElementById('create-rule-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const ruleName = document.getElementById('ruleName').value;
    const ruleString = document.getElementById('ruleString').value;

    const response = await fetch('/api/rules/create_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleName, ruleString }),
    });

    if (response.ok) {
        const result = await response.json();
        const rule = result.rule;
        console.log(rule.ruleast);

        // Display the AST and rule name
        displayTree(rule.ruleast, 'combined-rules-tree');
        document.getElementById('rule-name-display').innerText = `Created Rule: ${ruleName}`;
    } else {
        const error = await response.text();
        if (error.includes('already exists')) {
            document.getElementById('create-rule-result').innerHTML = `Error: Rule "${ruleName}" already exists!`;
        } else {
            document.getElementById('create-rule-result').innerHTML = `Error: ${error}`;
        }
    }
});

// Handle Combine Rules form submission
document.getElementById('combine-rules-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const op = document.getElementById('operator1').value;
    const rules = Array.from(document.querySelectorAll('input[id^="combine-rule"]')).map(input => input.value);
    
    const response = await fetch('/api/rules/combine_rules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rules, op }),
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result.combinedRule);
        
        // Display the combined rule tree and rule name
        displayTree(result.combinedRule.ruleast, 'combined-rules-tree');
        document.getElementById('rule-name-display').innerText = `Combined Rule: ${result.combinedRule.rulename}`;
    } else {
        const error = await response.text();
        document.getElementById('combine-rules-result').innerHTML = `Error: ${error}`;
    }
});

// Add functionality to dynamically add more rule inputs
document.getElementById('add-rule').addEventListener('click', function() {
    const ruleInputContainer = document.createElement('div');
    ruleInputContainer.classList.add('rule-container');
    const ruleCount = document.querySelectorAll('input[id^="combine-rule"]').length + 1;
    ruleInputContainer.innerHTML = `
        <label for="combine-rule${ruleCount}">Rule ${ruleCount}:</label>
        <input type="text" class="form-control" id="combine-rule${ruleCount}" name="rule${ruleCount}" required>
        <label for="operator${ruleCount}">Operator:</label>
        <select class="form-control" id="operator${ruleCount}" name="operator${ruleCount}">
            <option value="AND">AND</option>
            <option value="OR">OR</option>
        </select>
    `;
    document.getElementById('rules-inputs').appendChild(ruleInputContainer);
});

// Handle Evaluate Rule form submission
document.getElementById('evaluate-rule-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const ast = document.getElementById('evaluate-ast').value;
    const data = document.getElementById('evaluate-data').value;
    
    const response = await fetch('/api/rules/evaluate_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ast, data }),
    });

    if (response.ok) {
        const result = await response.json();
        document.getElementById('evaluate-rule-result').innerHTML = JSON.stringify(result, null, 2);
    } else {
        const error = await response.text();
        console.error("Error response:", error);
        document.getElementById('evaluate-rule-result').innerHTML = `Error: ${error}`;
    }
});
