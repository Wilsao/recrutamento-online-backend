import Usuario from '../Modelo/usuario.js';
import conectar from './conexao.js';
import bcrypt from 'bcrypt';

export default class UsuarioDAO {

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const sql = `INSERT INTO usuarios (nome, email, senha, tipo)
                   VALUES (?, ?, ?, ?)`;
            const hashSenha = await bcrypt.hash(usuario.senha, 10);
            const parametros = [
                usuario.nome,
                usuario.email,
                hashSenha,
                usuario.tipo
            ];
            const conexao = await conectar();
            const [result] = await conexao.execute(sql, parametros);
            usuario.id = result.insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(usuario) {
        if (usuario instanceof Usuario) {
            const sql = `UPDATE usuarios SET nome = ?, email = ?, tipo = ? WHERE id = ?`;
            const parametros = [
                usuario.nome,
                usuario.email,
                usuario.tipo,
                usuario.id
            ];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const sql = 'DELETE FROM usuarios WHERE id = ?';
            const parametros = [usuario.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        const conexao = await conectar();
        let sql = 'SELECT id, nome, email, tipo FROM usuarios';
        let parametros = [];
        if (termoBusca) {
            sql += ' WHERE nome LIKE ? OR email LIKE ?';
            parametros = [`%${termoBusca}%`, `%${termoBusca}%`];
        }
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        const listaUsuarios = registros.map((registro) => {
            return new Usuario(
                registro.id,
                registro.nome,
                registro.email,
                null,
                registro.tipo
            );
        });

        return listaUsuarios;
    }

    async autenticar(email, senha) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const parametros = [email];
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        if (registros.length > 0) {
            const registro = registros[0];
            const senhaValida = await bcrypt.compare(senha, registro.senha);
            if (senhaValida) {
                return new Usuario(
                    registro.id,
                    registro.nome,
                    registro.email,
                    null,
                    registro.tipo
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
