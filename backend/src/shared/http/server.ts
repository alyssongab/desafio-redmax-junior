import app from "./app.js";

const port = process.env.PORT_BACKEND ?? 3001;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});