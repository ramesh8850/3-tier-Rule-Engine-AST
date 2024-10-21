function parseRuleString(ruleString) {
  const tokens = ruleString.match(/(\(|\)|AND|OR|<=|>=|!=|<|>|=|[^()\s]+)/g);
  console.log(tokens)
  const stack = [];
  const operators = [];

  function popOperator() {
      const operator = operators.pop();
      const right = stack.pop();
      const left = stack.pop();
      stack.push({ type: 'operator', operator, left, right });
  }

  for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (token === '') continue; // Skip empty tokens (spaces)

      if (token === 'AND' || token === 'OR') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              popOperator();
          }
          operators.push(token);
      } else if (token === '(') {
          operators.push(token);
      } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              popOperator();
          }
          operators.pop();
      } else {
          // Correct operand parsing logic
          let key = token;
          let operator = tokens[++i];  // Move to the operator
          let value = tokens[++i];  // Move to the value
          
          stack.push({ type: 'operand', key, operator, value });
      }
  }

  while (operators.length) {
      popOperator();
  }

  return stack[0];  // Return root of AST
}


function printTree(node,prefix = '', isLeft = true) {
    if (!node) return;
    console.log(prefix + (isLeft ? "├── " : "└── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`));
    if (node.left) printTree(node.left, prefix + (isLeft ? "│   " : "    "), true);
    if (node.right) printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
}

function combineNodes(rules,op) {
    if (rules.length === 1) return rules[0];

    let combined = rules[0];
    for (let i = 1; i < rules.length; i++) {
        combined = { type: 'operator', operator: op, left: combined, right: rules[i] };
    }

    return combined;
}

function evaluate(node, data) {
  if (node.type === 'operand') {
      let { key, operator, value } = node;
      
      // Trim and sanitize key
      key = key.trim();
      
      // console.log("Data input:", data);
      // console.log(`Evaluating operand: key = ${key}, operator = ${operator}, value = ${value}`);

      // Check if key, operator, and value are defined
      if (!key || !operator || !value) {
          console.error("Invalid operand node:", node);
          return false; // Return false or handle as needed
      }

      // Access dataValue, log if key is missing
      const dataValue = data[key];
      if (dataValue === undefined) {
          console.error(`Key "${key}" not found in data`);
          return false;
      }
      
      // Strip quotes from value (for string values like "'Sales'")
      if (typeof value === 'string') {
          value = value.replace(/'/g, '').trim();
      }

      // console.log(`Evaluating operand: key = ${key}, operator = ${operator}, value = ${value}, dataValue = ${dataValue}`);

      switch (operator) {
          case '>':
              return dataValue > parseFloat(value); 
          case '<':
              return dataValue < parseFloat(value); 
          case '=':
              return dataValue === value; 
          default:
              console.error("Unknown operator:", operator);
              return false;
      }
  }

  // console.log("Evaluating node:", JSON.stringify(node, null, 2));

  if (node.type === 'operator') {
      const leftEval = evaluate(node.left, data);
      const rightEval = evaluate(node.right, data);

      switch (node.operator) {
          case 'AND':
              return leftEval && rightEval;
          case 'OR':
              return leftEval || rightEval;
          default:
              console.error("Unknown operator:", node.operator);
              return false;
      }
  }

  console.error("Unrecognized node type:", node.type);
  return false;
}


  
export { parseRuleString, combineNodes, evaluate, printTree };    
