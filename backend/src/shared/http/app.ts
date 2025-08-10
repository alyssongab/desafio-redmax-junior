import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());

app.use(cors({
    origin: process.env.URL_FRONTEND
}));

app.use('/api', routes);

app.get('/', (req, res) => res.send('API OK'));

export default app;