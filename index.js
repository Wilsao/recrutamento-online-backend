import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVaga from './Rotas/rotaVaga.js';
import rotaInscricao from './Rotas/rotaInscricao.js';
import rotaEntrevista from './Rotas/rotaEntrevista.js';
import rotaUsuario from './Rotas/rotaUsuario.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';

dotenv.config();

const host = 'localhost';
const porta = process.env.PORT || 4000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 15
    }
}));

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.0.101:3000"],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/candidato', rotaCandidato);
app.use('/inscricao', rotaInscricao);
app.use('/entrevista', rotaEntrevista);
app.use('/vaga', rotaVaga);

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}.`);
}); 
