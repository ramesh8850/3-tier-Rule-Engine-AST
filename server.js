import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './Connector/ruleRoutes.js'
import { initializeDatabase } from './Config/Rule.js';

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

// Initialize the database and table
initializeDatabase()
    .then(() => {
        console.log('Database initialized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error initializing database:', error);
    });
