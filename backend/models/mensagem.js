const mongoose = require("mongoose");

// Definindo o esquema para a coleção de mensagens
const MensagemSchema = new mongoose.Schema({
  nome: String,
  email: String,
  celular: String,
  mensagem: String,
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mensagem", MensagemSchema);
