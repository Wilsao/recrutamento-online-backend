import Vaga from '../Modelo/vaga.js';
import conectar from './conexao.js';

export default class VagaDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
        CREATE TABLE IF NOT EXISTS vagas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(255) NOT NULL,
          descricao TEXT,
          salario DECIMAL(10,2),
          localizacao VARCHAR(255),
          empresa VARCHAR(255)
        )
      `;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        } catch (e) {
            console.log('Não foi possível iniciar o banco de dados: ' + e.message);
        }
    }

    async gravar(vaga) {
        if (vaga instanceof Vaga) {
            const sql = `INSERT INTO vagas (titulo, descricao, salario, localizacao, empresa)
                   VALUES (?, ?, ?, ?, ?)`;
            const parametros = [
                vaga.titulo,
                vaga.descricao,
                vaga.salario,
                vaga.localizacao,
                vaga.empresa
            ];
            const conexao = await conectar();
            const [result] = await conexao.execute(sql, parametros);
            vaga.id = result.insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(vaga) {
        if (vaga instanceof Vaga) {
            const sql = `UPDATE vagas SET titulo = ?, descricao = ?, salario = ?, localizacao = ?, empresa = ?
                   WHERE id = ?`;
            const parametros = [
                vaga.titulo,
                vaga.descricao,
                vaga.salario,
                vaga.localizacao,
                vaga.empresa,
                vaga.id
            ];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(vaga) {
        if (vaga instanceof Vaga) {
            const sql = 'DELETE FROM vagas WHERE id = ?';
            const parametros = [vaga.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        const conexao = await conectar();
        let sql = 'SELECT * FROM vagas';
        let parametros = [];
        if (termoBusca) {
            sql += ' WHERE titulo LIKE ? OR empresa LIKE ?';
            parametros = [`%${termoBusca}%`, `%${termoBusca}%`];
        }
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        const listaVagas = registros.map((registro) => {
            return new Vaga(
                registro.id,
                registro.titulo,
                registro.descricao,
                registro.salario,
                registro.localizacao,
                registro.empresa
            );
        });

        return listaVagas;
    }

    async consultarPorId(id) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM vagas WHERE id = ?';
        const parametros = [id];
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        if (registros.length > 0) {
            const registro = registros[0];
            return new Vaga(
                registro.id,
                registro.titulo,
                registro.descricao,
                registro.salario,
                registro.localizacao,
                registro.empresa
            );
        } else {
            return null;
        }
    }
}
