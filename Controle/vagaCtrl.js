import Vaga from "../Modelo/vaga.js";

export default class VagaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const titulo = dados.titulo;
            if (titulo) {
                const vaga = new Vaga(
                    0,
                    titulo,
                    dados.descricao || '',
                    dados.salario || 0.0,
                    dados.localizacao || '',
                    dados.empresa || ''
                );
                vaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": vaga.id,
                        "mensagem": "Vaga incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a vaga: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o título da vaga!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma vaga!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const titulo = dados.titulo;
            if (id && titulo) {
                const vaga = new Vaga(
                    id,
                    titulo,
                    dados.descricao,
                    dados.salario,
                    dados.localizacao,
                    dados.empresa
                );
                vaga.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a vaga: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID e o título da vaga!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma vaga!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const vaga = new Vaga(id);
                vaga.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Vaga excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a vaga: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da vaga!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma vaga!"
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
            const vaga = new Vaga();
            vaga.consultar(termo).then((listaVagas) => {
                resposta.json({
                    status: true,
                    listaVagas
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter as vagas: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar vagas!"
            });
        }
    }

    consultarPorId(requisicao, resposta) {
        resposta.type('application/json');
        const id = requisicao.params.id;
        if (requisicao.method === "GET") {
            if (id) {
                const vaga = new Vaga();
                vaga.consultarPorId(id).then((vagaEncontrada) => {
                    if (vagaEncontrada) {
                        resposta.json({
                            status: true,
                            vaga: vagaEncontrada.toJSON()
                        });
                    } else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Vaga não encontrada!"
                        });
                    }
                })
                    .catch((erro) => {
                        resposta.json({
                            status: false,
                            mensagem: "Erro ao consultar a vaga: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID da vaga!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma vaga!"
            });
        }
    }
}
