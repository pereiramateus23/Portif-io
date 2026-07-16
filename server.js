require("dotenv").config(); // carrega as variáveis do arquivo .env para dentro do process.env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const contatoRoutes = require("./backend/routes/contato");

// Inicializa o app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Aceita tanto "MONGODB_URI" quanto "MONGO_URI" — isso elimina o risco de erro
// causado por um nome de variável diferente do esperado (foi exatamente o que
// aconteceu: a variável configurada no Render se chamava MONGO_URI, sem o "DB").
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Verificação de segurança: se nenhuma das duas variáveis foi configurada,
// o servidor avisa claramente em vez de tentar conectar com "undefined"
if (!MONGO_URI) {
  console.error("❌ Nenhuma variável de conexão encontrada (procurei por MONGODB_URI e MONGO_URI). Verifique seu arquivo .env (ou as variáveis de ambiente no Render).");

  // Diagnóstico extra: lista só os NOMES das variáveis de ambiente que o processo
  // está enxergando (nunca os valores). Isso ajuda a descobrir se a variável existe
  // com um nome ligeiramente diferente (espaço, letra maiúscula/minúscula trocada, etc.)
  const nomesDisponiveis = Object.keys(process.env).sort();
  console.error("🔎 Nomes de variáveis de ambiente disponíveis para este processo:", nomesDisponiveis);
  console.error("🔎 Total de variáveis encontradas:", nomesDisponiveis.length);

  process.exit(1);
}

// Diagnóstico: mostra no log qual URI está sendo usada, mas com a senha oculta.
// Isso ajuda a identificar problemas de formatação (usuário errado, aspas ou espaços
// coladas por engano, etc.) sem nunca expor a senha real no log.
function mascararSenha(uri) {
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/, "$1***$3");
}
console.log("🔎 URI que o servidor está usando (senha oculta):", mascararSenha(MONGO_URI));
console.log("🔎 Tamanho da URI (em caracteres):", MONGO_URI.length);

// Configura MongoDB (a senha agora vem do .env, nunca aparece aqui no código)
mongoose.connect(MONGO_URI)
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