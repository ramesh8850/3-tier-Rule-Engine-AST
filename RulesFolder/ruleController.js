import { pool } from '../Config/Rule.js'; // Corrected path to the renamed Config
import { parseRuleString, combineNodes, evaluate, printTree } from '../AST_tree/ast.js';

// Utility function for generating random strings
function generateRandomLetterString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}
var ruleNumber=1;

export const createRule = async (req, res) => {
    try {
        const { ruleName, ruleString } = req.body;
        if (!ruleName || !ruleString) {
            return res.status(400).json({ error: 'ruleName and ruleString are required' });
        }
        
        // Check if rule already exists using raw query
        const checkQuery = 'SELECT * FROM Engine WHERE ruleName = $1';
        const result = await pool.query(checkQuery, [ruleName]);
        console.log(result);
        if (result.rows.length > 0) {
            return res.status(409).json({ error: 'Rule already exists' });
        }
        
        // Parse the rule and save it to the database
        const rootNode = parseRuleString(ruleString);
        console.log("generated ast:",rootNode);
        const insertQuery = 'INSERT INTO Engine (ruleName, ruleAST) VALUES ($1, $2) RETURNING *';
        const newRule = await pool.query(insertQuery, [ruleName, rootNode]);

        
        
        printTree(rootNode);
        res.status(201).json({ message: "Rule created successfully", rule: newRule.rows[0] });
        ruleNumber+=1;
        console.log("Rule Number",ruleNumber);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const combineRules = async (req, res) => {
    try {
        const { rules, op } = req.body;

        console.log(rules,op);

        // Fetch the rules using raw SQL
        const selectQuery = 'SELECT ruleAST FROM Engine WHERE ruleName = ANY($1::text[])';
        const result = await pool.query(selectQuery, [rules]);

        // Log the result for debugging
        const rule=JSON.stringify(result, null, 2); // Better readability

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No matching rules found' });
        }
        console.log(rule);
        // Get the ASTs from the fetched rules
        const ruleASTs = result.rows.map(rule => rule.ruleast);
        console.log("Rule AST:",ruleASTs);
        const combinedRootNode = combineNodes(ruleASTs, op);

        // Ensure the combinedRootNode is valid
        if (!combinedRootNode) {
            return res.status(400).json({ error: 'Failed to combine rules' });
        }

        const randomString = generateRandomLetterString(2);

        const combinedRuleName = `Rule ${randomString}`;

        console.log("Rule Number",ruleNumber);
        
        // Convert combinedRootNode to a JSON string for insertion
        const combinedRootNodeJSON = JSON.stringify(combinedRootNode);
        
        // Insert the combined rule into the database
        const insertQuery = 'INSERT INTO Engine (ruleName, ruleAST) VALUES ($1, $2) RETURNING *';
        const combinedRule = await pool.query(insertQuery, [combinedRuleName, combinedRootNodeJSON]);

        printTree(combinedRootNode);
        console.log(combinedRule.rows[0]);
        res.status(201).json({ message: 'Rules combined successfully', combinedRule: combinedRule.rows[0] });
    } catch (error) {
        console.error('Error in combineRules:', error); // Log the error for debugging
        res.status(500).json({ error: error.message, details: error }); // Include full error details
    }
};

export const evaluateRule = async (req, res) => {
    try {
        const { ast } = req.body; // Assuming `ast` is the ruleName

        // Find the rule by ruleName
        const selectQuery = 'SELECT * FROM Engine WHERE ruleName = $1';
        const result = await pool.query(selectQuery, [ast]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        // Evaluate the rule AST
        const ruleAST = result.rows[0].ruleast;

        // const rule_ast=JSON.stringify(ruleAST);
        console.log(result.rows[0].ruleast);
        const evalResult = evaluate(ruleAST, JSON.parse(req.body.data)); // Assuming `data` is passed in the body
        
        res.status(200).json({ message: 'Rule evaluated successfully', result: evalResult });
    } catch (error) {
        res.status(500).json({ error: error.message, details: error }); // Include full error details
    }
};
