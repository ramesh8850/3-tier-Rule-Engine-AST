# Rule Engine

## Overview
The Rule Engine project provides a framework for defining, combining, and evaluating rules using Abstract Syntax Trees (AST). It allows users to create rules, combine them with logical operators, and evaluate them against data. This project is aimed at providing a robust solution for scenarios where decision-making rules are required.

## Features
- **Create Rules**: Define new rules using a rule string and a unique name.
- **Combine Rules**: Combine multiple rules using logical operators (AND, OR).
- **Evaluate Rules**: Evaluate rules against input data and obtain results.
- **Visual Representation**: Display the AST of rules for better understanding.

## Technologies Used
- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Bootstrap (for UI)
- JavaScript (ES6)

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- PostgreSQL database set up and running.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rule-engine.git
   cd rule-engine

## Installation Requirements

To run the Rule Engine Application, you need to install the following dependencies:

1. **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **PostgreSQL**: Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).

3. **Project Dependencies**: After cloning the repository, navigate to the project directory and run the following command to install the required npm packages:
   ```bash
   npm install express body-parser cors ejs pg dotenv

### Set up your PostgreSQL database and update the database configuration in
- `Config/Rule.js

### Start the server
- nodemon server.js

### Open your browser
- http://localhost:3000

## API Endpoints

- **POST /api/rules/create_rule**: Create a new rule.
  - **Request body**:
    ```json
    {
      "ruleName": "your_rule_name",
      "ruleString": "your_rule_string"
    }
    ```

- **POST /api/rules/combine_rules**: Combine multiple rules.
  - **Request body**:
    ```json
    {
      "rules": ["rule1", "rule2"],
      "op": "AND" // or "OR"
    }
    ```

- **POST /api/rules/evaluate_rule**: Evaluate a rule against data.
  - **Request body**:
    ```json
    {
      "ast": "rule_name",
      "data": { "key": "value" }
    }
    ```

## Usage
- To create a rule, enter the rule name and rule string in the form provided in the UI.
- Combine rules by selecting existing rules and the desired operator.
- Evaluate a rule by providing the rule name and data in JSON format.

## Contributing
Contributions are welcome! If you have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
