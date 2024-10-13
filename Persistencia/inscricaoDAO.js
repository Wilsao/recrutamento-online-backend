import Inscricao from '../Modelo/inscricao.js';
import Candidato from '../Modelo/candidato.js';
import Vaga from '../Modelo/vaga.js';
import conectar from './conexao.js';

export default class InscricaoDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
        CREATE TABLE IF NOT EXISTS inscricoes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          id_candidato INT NOT NULL,
          id_vaga INT NOT NULL,
          data_inscricao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE (id_candidato, id_vaga),
          FOREIGN KEY (id_candidato) REFERENCES candidatos(id) ON DELETE CASCADE,
          FOREIGN KEY (id_vaga) REFERENCES vagas(id) ON DELETE CASCADE
        )
      `;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        } catch (e) {
            console.log('Não foi possível iniciar o banco de dados: ' + e.message);
        }
    }

    async gravar(inscricao) {
        if (inscricao instanceof Inscricao) {
            const sql = `INSERT INTO inscricoes (id_candidato, id_vaga)
                   VALUES (?, ?)`;
            const parametros = [
                inscricao.candidato.id,
                inscricao.vaga.id
            ];
            const conexao = await conectar();
            try {
                await conexao.beginTransaction();
                const [result] = await conexao.execute(sql, parametros);
                inscricao.id = result.insertId;
                await conexao.commit();
            } catch (error) {
                await conexao.rollback();
                throw error;
            } finally {
                global.poolConexoes.releaseConnection(conexao);
            }
        }
    }

    async excluir(inscricao) {
        if (inscricao instanceof Inscricao) {
            const sql = 'DELETE FROM inscricoes WHERE id = ?';
            const parametros = [inscricao.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        const conexao = await conectar();
        let sql = `
      SELECT i.id AS inscricao_id, i.data_inscricao,
             c.*,
             v.*
      FROM inscricoes i
      INNER JOIN candidatos c ON i.id_candidato = c.id
      INNER JOIN vagas v ON i.id_vaga = v.id
    `;
        let parametros = [];
        if (termoBusca) {
            sql += ' WHERE c.nome LIKE ? OR v.titulo LIKE ?';
            parametros = [`%${termoBusca}%`, `%${termoBusca}%`];
        }
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        const listaInscricoes = registros.map((registro) => {
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

            return new Inscricao(
                registro.inscricao_id,
                candidato,
                vaga,
                registro.data_inscricao
            );
        });

        return listaInscricoes;
    }

    async consultarPorId(id) {
        const conexao = await conectar();
        const sql = `
      SELECT i.id AS inscricao_id, i.data_inscricao,
             c.*,
             v.*
      FROM inscricoes i
      INNER JOIN candidatos c ON i.id_candidato = c.id
      INNER JOIN vagas v ON i.id_vaga = v.id
      WHERE i.id = ?
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

            return new Inscricao(
                registro.inscricao_id,
                candidato,
                vaga,
                registro.data_inscricao
            );
        } else {
            return null;
        }
    }
}
