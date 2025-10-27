import express from 'express';
import connectDB from './config/db.js';
import routes from './routes/routes.config.js';
import cors from 'cors';

const app = express();

app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for form-data
app.use(cors('*'));

app.get('/health', (req, res) => {
    res.send('service working...');
});

app.use("/api", routes);

connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
