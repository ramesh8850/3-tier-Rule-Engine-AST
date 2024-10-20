import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import router from './Connector/ruleRoutes.js'

// Import the Rule model to ensure database connection and sync
import './Config/Rule.js' // Ensure to require your model for database sync

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('views'));

// Serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Route for serving the index.html
app.get('/', (req, res) => {
    res.render('index.html');
});

// Use rule routes
app.use('/api/rules', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
