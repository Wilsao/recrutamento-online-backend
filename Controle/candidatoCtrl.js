import Candidato from "../Modelo/candidato.js";

export default class CandidatoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            if (nome) {
                const candidato = new Candidato(
                    0,
                    nome,
                    dados.ctpsNumero,
                    dados.ctpsSerie,
                    dados.dataNascimento,
                    dados.cpf,
                    dados.rg,
                    dados.orgaoEmissor,
                    dados.endereco,
                    dados.numero,
                    dados.bairro,
                    dados.municipio,
                    dados.uf,
                    dados.cep,
                    dados.naturalidade,
                    dados.telefone,
                    dados.celular,
                    dados.email,
                    dados.ensinoFundamentalCompleto,
                    dados.ensinoMedioCompleto,
                    dados.ensinoSuperiorCompleto,
                    dados.curso,
                    dados.tituloEleitorNumero,
                    dados.zonaEleitoral,
                    dados.pis,
                    dados.cnhNumero,
                    dados.estadoCivil,
                    dados.nomePai,
                    dados.nomeMae,
                    dados.nomeConjuge,
                    dados.residenciaPropria,
                    dados.certidaoMilitarNumero,
                    dados.certidaoMilitarSerie,
                    dados.certidaoMilitarCategoria,
                    dados.possuiFilhos
                );
                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": candidato.id,
                        "mensagem": "Candidato incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o candidato: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome do candidato!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um candidato!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const nome = dados.nome;
            if (id && nome) {
                const candidato = new Candidato(
                    id,
                    nome,
                    dados.ctpsNumero,
                    dados.ctpsSerie,
                    dados.dataNascimento,
                    dados.cpf,
                    dados.rg,
                    dados.orgaoEmissor,
                    dados.endereco,
                    dados.numero,
                    dados.bairro,
                    dados.municipio,
                    dados.uf,
                    dados.cep,
                    dados.naturalidade,
                    dados.telefone,
                    dados.celular,
                    dados.email,
                    dados.ensinoFundamentalCompleto,
                    dados.ensinoMedioCompleto,
                    dados.ensinoSuperiorCompleto,
                    dados.curso,
                    dados.tituloEleitorNumero,
                    dados.zonaEleitoral,
                    dados.pis,
                    dados.cnhNumero,
                    dados.estadoCivil,
                    dados.nomePai,
                    dados.nomeMae,
                    dados.nomeConjuge,
                    dados.residenciaPropria,
                    dados.certidaoMilitarNumero,
                    dados.certidaoMilitarSerie,
                    dados.certidaoMilitarCategoria,
                    dados.possuiFilhos
                );
                candidato.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o candidato: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID e o nome do candidato!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um candidato!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const candidato = new Candidato(id);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Candidato excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o candidato: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID do candidato!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um candidato!"
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
            const candidato = new Candidato();
            candidato.consultar(termo).then((listaCandidatos) => {
                resposta.json({
                    status: true,
                    listaCandidatos
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter os candidatos: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar candidatos!"
            });
        }
    }

    consultarPorId(requisicao, resposta) {
        resposta.type('application/json');
        const id = requisicao.params.id;
        if (requisicao.method === "GET") {
            if (id) {
                const candidato = new Candidato();
                candidato.consultarPorId(id).then((candidatoEncontrado) => {
                    if (candidatoEncontrado) {
                        resposta.json({
                            status: true,
                            candidato: candidatoEncontrado.toJSON()
                        });
                    } else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Candidato não encontrado!"
                        });
                    }
                })
                    .catch((erro) => {
                        resposta.json({
                            status: false,
                            mensagem: "Erro ao consultar o candidato: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o ID do candidato!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar um candidato!"
            });
        }
    }
}
