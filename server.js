const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const contatoRoutes = require("./backend/routes/contato");

// Inicializa o app Express
const app = express();
const PORT = 3000;

// Configura MongoDB
mongoose.connect("mongodb+srv://mtspereira23_db_user:p6Bx7C3JArE6pqQY@cluster0.r9pyrdx.mongodb.net/portfolioDB") 
  .then(() => console.log("✅ Conectado ao MongoDB")) 
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));


app.use(cors());  // Habilita CORS para todas as rotas
app.use(bodyParser.json()); // Parse application/json

// Rotas
app.use("/api/contato", contatoRoutes); 

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
