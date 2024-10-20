// models/rule.js
import { Sequelize, DataTypes } from 'sequelize';

// Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize('Rules', 'postgres', 'vnrvjiet', {
    host: 'localhost',
    dialect: 'postgres',
});

// Define the Rule model
const Rule = sequelize.define('Rule', {
    ruleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ruleAST: {
        type: DataTypes.JSON, // Use JSON type for rule AST
        allowNull: false,
    },
});

// Export only the Rule model
// // Define the Rule structure
// const Rule = {
//     ruleName: {
//         type: 'VARCHAR(255)',  // Type for ruleName
//         allowNull: false,      // Not nullable
//         unique: true           // Must be unique
//     },
//     ruleAST: {
//         type: 'JSON',          // Type for ruleAST
//         allowNull: false       // Not nullable
//     }
// };

// Export the defined Rule structure
export default Rule

// import pool from '../config/database.js'; // Import the database connection

// Rule class for database operations
// class Rule {
//   // Method to create a new rule
//   static async create(ruleName, ruleAST) {
//     const query = 'INSERT INTO rules (rule_name, rule_ast) VALUES ($1, $2) RETURNING *';
//     const values = [ruleName, ruleAST];
//     const { rows } = await pool.query(query, values);
//     return rows[0]; // Return the created rule
//   }

//   // Method to find a rule by name
//   static async findByName(ruleName) {
//     const query = 'SELECT * FROM rules WHERE rule_name = $1';
//     const { rows } = await pool.query(query, [ruleName]);
//     return rows[0]; // Return the found rule
//   }

//   // Method to find multiple rules by their names
//   static async findByNames(ruleNames) {
//     const query = 'SELECT * FROM rules WHERE rule_name = ANY($1)';
//     const { rows } = await pool.query(query, [ruleNames]);
//     return rows; // Return all matching rules
//   }
// }

// export default Rule;
