import express from "express";
import routes from "./routes/index.js";

const app = express();

// middleware
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.send('API OK'));

export default app;