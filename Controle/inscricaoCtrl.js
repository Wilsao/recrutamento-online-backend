import Inscricao from "../Modelo/inscricao.js";
import Candidato from "../Modelo/candidato.js";
import Vaga from "../Modelo/vaga.js";

export default class InscricaoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const candidatoId = dados.candidatoId;
            const vagaId = dados.vagaId;
            if (candidatoId && vagaId) {
                const candidato = new Candidato(candidatoId);
                const vaga = new Vaga(vagaId);
                const inscricao = new Inscricao(0, candidato, vaga);
                inscricao.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": inscricao.id,
                        "mensagem": "Inscrição realizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a inscrição: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID do candidato e o ID da vaga!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para registrar uma inscrição!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const inscricao = new Inscricao(id);
                inscricao.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a inscrição: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da inscrição!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma inscrição!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const inscricao = new Inscricao();
            inscricao.consultar(termo).then((listaInscricoes) => {
                const listaInscricoesJSON = listaInscricoes.map(insc => insc.toJSON());
                resposta.json({
                    status: true,
                    listaInscricoes: listaInscricoesJSON
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter as inscrições: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar inscrições!"
            });
        }
    }

    consultarPorId(requisicao, resposta) {
        resposta.type('application/json');
        const id = requisicao.params.id;
        if (requisicao.method === "GET") {
            if (id) {
                const inscricao = new Inscricao();
                inscricao.consultarPorId(id).then((inscricaoEncontrada) => {
                    if (inscricaoEncontrada) {
                        resposta.json({
                            status: true,
                            inscricao: inscricaoEncontrada.toJSON()
                        });
                    } else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Inscrição não encontrada!"
                        });
                    }
                })
                    .catch((erro) => {
                        resposta.json({
                            status: false,
                            mensagem: "Erro ao consultar a inscrição: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da inscrição!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma inscrição!"
            });
        }
    }
}
