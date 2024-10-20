// controllers/ruleController.js
import Rule from '../Config/Rule.js';
import { parseRuleString, combineNodes, evaluate, printTree } from '../AST_tree/ast.js';
import { Op } from 'sequelize'; // Import Op for querying

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

export const createRule = async (req, res) => {
    try {
        const { ruleName, ruleString } = req.body;
        if (!ruleName || !ruleString) {
            return res.status(400).json({ error: 'ruleName and ruleString are required' });
        }
        const rootNode = parseRuleString(ruleString);
        const rule = new Rule({ ruleName, ruleAST: rootNode }); // Corrected here
        await rule.save(); // Save the instance
        printTree(rootNode);
        res.status(201).json(rule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const combineRules = async (req, res) => {
    try {
        const { rules, op } = req.body;
        const ruleDocs = await Rule.findAll({
            where: {
                ruleName: {
                    [Op.in]: rules, // Using Sequelize Op for querying
                },
            },
        });
        if (ruleDocs.length === 0) {
            return res.status(404).json({ error: 'No matching rules found' });
        }
        const ruleASTs = ruleDocs.map(rule => rule.ruleAST);
        const combinedRootNode = combineNodes(ruleASTs, op);
        const randomString = generateRandomLetterString(4);
        const combinedRule = new Rule({ ruleName: `combined${randomString}`, ruleAST: combinedRootNode });
        await combinedRule.save();
        printTree(combinedRootNode);
        res.status(201).json(combinedRule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const evaluateRule = async (req, res) => {
    try {
        const { ast } = req.body; // Assuming `ast` is the ruleName
        const rule = await Rule.findOne({ where: { ruleName: ast } }); // Corrected here

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }
        const result = evaluate(rule.ruleAST, req.body.data); // Assuming `data` is passed in the body
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
