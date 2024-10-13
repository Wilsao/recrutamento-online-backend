import Entrevista from "../Modelo/entrevista.js";
import Inscricao from "../Modelo/inscricao.js";

export default class EntrevistaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const inscricaoId = dados.inscricaoId;
            const dataEntrevista = dados.dataEntrevista;
            const status = dados.status;
            if (inscricaoId && dataEntrevista) {
                const inscricao = new Inscricao(inscricaoId);
                const entrevista = new Entrevista(0, inscricao, dataEntrevista, status);
                entrevista.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": entrevista.id,
                        "mensagem": "Entrevista agendada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao agendar a entrevista: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da inscrição e a data da entrevista!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para agendar uma entrevista!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const inscricaoId = dados.inscricaoId;
            const dataEntrevista = dados.dataEntrevista;
            const status = dados.status;
            if (id && inscricaoId && dataEntrevista) {
                const inscricao = new Inscricao(inscricaoId);
                const entrevista = new Entrevista(id, inscricao, dataEntrevista, status);
                entrevista.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Entrevista atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a entrevista: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da entrevista, o ID da inscrição e a data da entrevista!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma entrevista!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const entrevista = new Entrevista(id);
                entrevista.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Entrevista cancelada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cancelar a entrevista: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da entrevista!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para cancelar uma entrevista!"
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
            const entrevista = new Entrevista();
            entrevista.consultar(termo).then((listaEntrevistas) => {
                const listaEntrevistasJSON = listaEntrevistas.map(e => e.toJSON());
                resposta.json({
                    status: true,
                    listaEntrevistas: listaEntrevistasJSON
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter as entrevistas: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar entrevistas!"
            });
        }
    }

    consultarPorId(requisicao, resposta) {
        resposta.type('application/json');
        const id = requisicao.params.id;
        if (requisicao.method === "GET") {
            if (id) {
                const entrevista = new Entrevista();
                entrevista.consultarPorId(id).then((entrevistaEncontrada) => {
                    if (entrevistaEncontrada) {
                        resposta.json({
                            status: true,
                            entrevista: entrevistaEncontrada.toJSON()
                        });
                    } else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Entrevista não encontrada!"
                        });
                    }
                })
                    .catch((erro) => {
                        resposta.json({
                            status: false,
                            mensagem: "Erro ao consultar a entrevista: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da entrevista!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma entrevista!"
            });
        }
    }
}
