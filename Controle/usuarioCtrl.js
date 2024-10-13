import Usuario from "../Modelo/usuario.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class UsuarioCtrl {

    registrar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const email = dados.email;
            const senha = dados.senha;
            const tipo = dados.tipo || 'candidato';
            if (nome && email && senha) {
                const usuario = new Usuario(0, nome, email, senha, tipo);
                usuario.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": usuario.id,
                        "mensagem": "Usuário registrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome, email e senha do usuário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para registrar um usuário!"
            });
        }
    }

    login(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const email = dados.email;
            const senha = dados.senha;
            if (email && senha) {
                const usuario = new Usuario();
                usuario.autenticar(email, senha).then((usuarioAutenticado) => {
                    if (usuarioAutenticado) {
                        const token = jwt.sign(
                            { id: usuarioAutenticado.id, tipo: usuarioAutenticado.tipo },
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Login realizado com sucesso!",
                            "token": token
                        });
                    } else {
                        resposta.status(401).json({
                            "status": false,
                            "mensagem": "Email ou senha incorretos!"
                        });
                    }
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao realizar login: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o email e a senha!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para realizar login!"
            });
        }
    }
}
