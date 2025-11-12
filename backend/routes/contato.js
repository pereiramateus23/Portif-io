const express = require("express");
const router = express.Router();
const Mensagem = require("../models/mensagem");

// Rota para receber mensagens do formulário
router.post("/", async (req, res) => {
    try {
        const novaMensagem = new Mensagem(req.body);
        await novaMensagem.save();
        res.status(201).send("Mensagem enviada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao enviar a mensagem.");
    }
});

// Rota para listar mensagens (acesso apenas para você)
router.get("/", async (req, res) => {
    const mensagens = await Mensagem.find();
    res.json(mensagens);
});

// Rota para listar mensagens ordenadas por data (mais recente primeiro)
    /*
router.get("/listar", async (req, res) => {
    try {
        const mensagens = await Mensagem.find().sort({ data: -1 });
        res.json(mensagens);
    } catch (error) {
        res.status(500).send("Erro ao listar mensagens.");
    }
});
    */

module.exports = router;
