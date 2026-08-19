
//1. Importando ferramentas
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//importando Supabase para o node
const { createClient } = require('@supabase/supabase-js');

//Usando dados de .env nos conectamos com o banco de dados
const supabase =  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/teste', (req,res)=> {
    //req é o request http e res e resposta q se recebe
    res.json({mensagem:"Servidor está de pé"});
});

//recebendo dados de login com post
app.post('/login', async (req, res) =>{
    //oq o usuario enviar esta contido nos campos abaixo, é a requisição http lá dentro de req.body
    const idDigitado = req.body.id;
    const senhaDigitada = req.body.senha;

    //esterelizando aquilo que chegou antes de manipularmos, se está fazio vai retornar um erro
    if(!idDigitado||!senhaDigitada){
        return res.status(400).json({erro:"ID e Senha são obrigatórios!"});
    }
    const emailFormatado = idDigitado + "@sgfs.com.br";

    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailFormatado,
        password: senhaDigitada,
    });

    if(error){
        //erro 401 de não autorizado, senha ou id errados
        console.log("ERRO REAL DO SUPABASE:", error);
        return res.status(401).json({erro:"Credenciais inválidas!"});
    }

    //caso login seja realizado

    res.json({
        mensagem: "Acesso liberado",
        token: data.session.access_token
    });
});
const PORTA = process.env.PORTA_SERVIDOR || 3000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});