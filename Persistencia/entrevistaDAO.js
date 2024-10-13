import Entrevista from '../Modelo/entrevista.js';
import Inscricao from '../Modelo/inscricao.js';
import Candidato from '../Modelo/candidato.js';
import Vaga from '../Modelo/vaga.js';
import conectar from './conexao.js';

export default class EntrevistaDAO {

    async gravar(entrevista) {
        if (entrevista instanceof Entrevista) {
            const sql = `INSERT INTO entrevistas (id_inscricao, data_entrevista, status)
                         VALUES (?, ?, ?)`;
            const parametros = [
                entrevista.inscricao.id,
                entrevista.dataEntrevista,
                entrevista.status
            ];
            const conexao = await conectar();
            const [result] = await conexao.execute(sql, parametros);
            entrevista.id = result.insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(entrevista) {
        if (entrevista instanceof Entrevista) {
            const sql = `UPDATE entrevistas SET data_entrevista = ?, status = ? WHERE id = ?`;
            const parametros = [
                entrevista.dataEntrevista,
                entrevista.status,
                entrevista.id
            ];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(entrevista) {
        if (entrevista instanceof Entrevista) {
            const sql = 'DELETE FROM entrevistas WHERE id = ?';
            const parametros = [entrevista.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = `
            SELECT e.id AS entrevista_id, e.data_entrevista, e.status,
                   i.id AS inscricao_id, i.data_inscricao,
                   c.*, v.*
            FROM entrevistas e
            INNER JOIN inscricoes i ON e.id_inscricao = i.id
            INNER JOIN candidatos c ON i.id_candidato = c.id
            INNER JOIN vagas v ON i.id_vaga = v.id
        `;
        let parametros = [];
        if (termo) {
            sql += ' WHERE c.nome LIKE ? OR v.titulo LIKE ?';
            parametros = [`%${termo}%`, `%${termo}%`];
        }
        const [rows] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        const listaEntrevistas = rows.map((registro) => {
            const candidato = new Candidato(
                registro.id_candidato,
                registro.nome,
                registro.ctpsNumero,
                registro.ctpsSerie,
                registro.dataNascimento,
                registro.cpf,
                registro.rg,
                registro.orgaoEmissor,
                registro.endereco,
                registro.numero,
                registro.bairro,
                registro.municipio,
                registro.uf,
                registro.cep,
                registro.naturalidade,
                registro.telefone,
                registro.celular,
                registro.email,
                registro.ensinoFundamentalCompleto,
                registro.ensinoMedioCompleto,
                registro.ensinoSuperiorCompleto,
                registro.curso,
                registro.tituloEleitorNumero,
                registro.zonaEleitoral,
                registro.pis,
                registro.cnhNumero,
                registro.estadoCivil,
                registro.nomePai,
                registro.nomeMae,
                registro.nomeConjuge,
                registro.residenciaPropria,
                registro.certidaoMilitarNumero,
                registro.certidaoMilitarSerie,
                registro.certidaoMilitarCategoria,
                registro.possuiFilhos
            );

            const vaga = new Vaga(
                registro.id_vaga,
                registro.titulo,
                registro.descricao,
                registro.salario,
                registro.localizacao,
                registro.empresa
            );

            const inscricao = new Inscricao(
                registro.inscricao_id,
                candidato,
                vaga,
                registro.data_inscricao
            );

            return new Entrevista(
                registro.entrevista_id,
                inscricao,
                registro.data_entrevista,
                registro.status
            );
        });

        return listaEntrevistas;
    }

    async consultarPorId(id) {
        const conexao = await conectar();
        const sql = `
            SELECT e.id AS entrevista_id, e.data_entrevista, e.status,
                   i.id AS inscricao_id, i.data_inscricao,
                   c.*, v.*
            FROM entrevistas e
            INNER JOIN inscricoes i ON e.id_inscricao = i.id
            INNER JOIN candidatos c ON i.id_candidato = c.id
            INNER JOIN vagas v ON i.id_vaga = v.id
            WHERE e.id = ?
        `;
        const parametros = [id];
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        if (registros.length > 0) {
            const registro = registros[0];

            const candidato = new Candidato(
                registro.id_candidato,
                registro.nome,
                registro.ctpsNumero,
                registro.ctpsSerie,
                registro.dataNascimento,
                registro.cpf,
                registro.rg,
                registro.orgaoEmissor,
                registro.endereco,
                registro.numero,
                registro.bairro,
                registro.municipio,
                registro.uf,
                registro.cep,
                registro.naturalidade,
                registro.telefone,
                registro.celular,
                registro.email,
                registro.ensinoFundamentalCompleto,
                registro.ensinoMedioCompleto,
                registro.ensinoSuperiorCompleto,
                registro.curso,
                registro.tituloEleitorNumero,
                registro.zonaEleitoral,
                registro.pis,
                registro.cnhNumero,
                registro.estadoCivil,
                registro.nomePai,
                registro.nomeMae,
                registro.nomeConjuge,
                registro.residenciaPropria,
                registro.certidaoMilitarNumero,
                registro.certidaoMilitarSerie,
                registro.certidaoMilitarCategoria,
                registro.possuiFilhos
            );

            const vaga = new Vaga(
                registro.id_vaga,
                registro.titulo,
                registro.descricao,
                registro.salario,
                registro.localizacao,
                registro.empresa
            );

            const inscricao = new Inscricao(
                registro.inscricao_id,
                candidato,
                vaga,
                registro.data_inscricao
            );

            return new Entrevista(
                registro.entrevista_id,
                inscricao,
                registro.data_entrevista,
                registro.status
            );
        } else {
            return null;
        }
    }
}
