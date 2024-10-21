# 3-Tier Rule Engine

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
- ![image](https://github.com/user-attachments/assets/70ac3267-587d-4af8-a4e2-09925425b988)
- Displays at bottom right page
- ![image](https://github.com/user-attachments/assets/2579230d-eecd-4dd3-9beb-fcf131419b34)
- Combine rules by selecting existing rules and the desired operator.
- ![image](https://github.com/user-attachments/assets/fa0744d1-5575-4cce-926a-fe6d5e5cadfe)
- ![image](https://github.com/user-attachments/assets/93d430cd-b2a1-4c77-b364-ff2f36b0c994)
- ![image](https://github.com/user-attachments/assets/bccfad47-6638-40c8-912e-ae0f59f3cd04)
- Evaluate a rule by providing the rule name and data in JSON format.
- ![image](https://github.com/user-attachments/assets/e92d5565-4fbe-46b4-9263-e926b948bb7b)
- Creation of table in Postgress sql
- CREATE TABLE IF NOT EXISTS Engine (
                id SERIAL PRIMARY KEY,
                ruleName VARCHAR(255) UNIQUE NOT NULL,
                ruleAST JSON NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
## Note
- Please input correct input rules or json data like  dont provide "{ key: value{ object}}}" avoid double quotes for the input of json data and same for create rule data.
- Use operands is caps 'AND' or 'OR' dont provide in lower case letters.
- Feel free to provide feedbacks.Feedback helps me to improve the code.
## Contributing
Contributions are welcome! If you have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
