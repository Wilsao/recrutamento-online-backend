import Candidato from '../Modelo/candidato.js';
import conectar from './conexao.js';

export default class CandidatoDAO {

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const sql = `INSERT INTO candidatos (
        nome, ctps_numero, ctps_serie, data_nascimento, cpf, rg, orgao_emissor,
        endereco, numero, bairro, municipio, uf, cep, naturalidade, telefone, celular,
        email, ensino_fundamental_completo, ensino_medio_completo, ensino_superior_completo,
        curso, titulo_eleitor_numero, zona_eleitoral, pis, cnh_numero, estado_civil,
        nome_pai, nome_mae, nome_conjuge, residencia_propria, certidao_militar_numero,
        certidao_militar_serie, certidao_militar_categoria, possui_filhos
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`;
            const parametros = [
                candidato.nome,
                candidato.ctpsNumero,
                candidato.ctpsSerie,
                candidato.dataNascimento,
                candidato.cpf,
                candidato.rg,
                candidato.orgaoEmissor,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.municipio,
                candidato.uf,
                candidato.cep,
                candidato.naturalidade,
                candidato.telefone,
                candidato.celular,
                candidato.email,
                candidato.ensinoFundamentalCompleto,
                candidato.ensinoMedioCompleto,
                candidato.ensinoSuperiorCompleto,
                candidato.curso,
                candidato.tituloEleitorNumero,
                candidato.zonaEleitoral,
                candidato.pis,
                candidato.cnhNumero,
                candidato.estadoCivil,
                candidato.nomePai,
                candidato.nomeMae,
                candidato.nomeConjuge,
                candidato.residenciaPropria,
                candidato.certidaoMilitarNumero,
                candidato.certidaoMilitarSerie,
                candidato.certidaoMilitarCategoria,
                candidato.possuiFilhos
            ];
            const conexao = await conectar();
            const [result] = await conexao.execute(sql, parametros);
            candidato.id = result.insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(candidato) {
        if (candidato instanceof Candidato) {
            const sql = `UPDATE candidatos SET
        nome = ?, ctps_numero = ?, ctps_serie = ?, data_nascimento = ?, cpf = ?, rg = ?, orgao_emissor = ?,
        endereco = ?, numero = ?, bairro = ?, municipio = ?, uf = ?, cep = ?, naturalidade = ?,
        telefone = ?, celular = ?, email = ?, ensino_fundamental_completo = ?, ensino_medio_completo = ?,
        ensino_superior_completo = ?, curso = ?, titulo_eleitor_numero = ?, zona_eleitoral = ?, pis = ?,
        cnh_numero = ?, estado_civil = ?, nome_pai = ?, nome_mae = ?, nome_conjuge = ?, residencia_propria = ?,
        certidao_militar_numero = ?, certidao_militar_serie = ?, certidao_militar_categoria = ?, possui_filhos = ?
        WHERE id = ?`;
            const parametros = [
                candidato.nome,
                candidato.ctpsNumero,
                candidato.ctpsSerie,
                candidato.dataNascimento,
                candidato.cpf,
                candidato.rg,
                candidato.orgaoEmissor,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.municipio,
                candidato.uf,
                candidato.cep,
                candidato.naturalidade,
                candidato.telefone,
                candidato.celular,
                candidato.email,
                candidato.ensinoFundamentalCompleto,
                candidato.ensinoMedioCompleto,
                candidato.ensinoSuperiorCompleto,
                candidato.curso,
                candidato.tituloEleitorNumero,
                candidato.zonaEleitoral,
                candidato.pis,
                candidato.cnhNumero,
                candidato.estadoCivil,
                candidato.nomePai,
                candidato.nomeMae,
                candidato.nomeConjuge,
                candidato.residenciaPropria,
                candidato.certidaoMilitarNumero,
                candidato.certidaoMilitarSerie,
                candidato.certidaoMilitarCategoria,
                candidato.possuiFilhos,
                candidato.id
            ];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const sql = 'DELETE FROM candidatos WHERE id = ?';
            const parametros = [candidato.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        const conexao = await conectar();
        let sql = 'SELECT * FROM candidatos';
        let parametros = [];
        if (termoBusca) {
            sql += ' WHERE nome LIKE ? OR cpf LIKE ?';
            parametros = [`%${termoBusca}%`, `%${termoBusca}%`];
        }
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        const listaCandidatos = registros.map((registro) => {
            return new Candidato(
                registro.id,
                registro.nome,
                registro.ctps_numero,
                registro.ctps_serie,
                registro.data_nascimento,
                registro.cpf,
                registro.rg,
                registro.orgao_emissor,
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
                registro.ensino_fundamental_completo,
                registro.ensino_medio_completo,
                registro.ensino_superior_completo,
                registro.curso,
                registro.titulo_eleitor_numero,
                registro.zona_eleitoral,
                registro.pis,
                registro.cnh_numero,
                registro.estado_civil,
                registro.nome_pai,
                registro.nome_mae,
                registro.nome_conjuge,
                registro.residencia_propria,
                registro.certidao_militar_numero,
                registro.certidao_militar_serie,
                registro.certidao_militar_categoria,
                registro.possui_filhos
            );
        });

        return listaCandidatos;
    }

    async consultarPorId(id) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM candidatos WHERE id = ?';
        const parametros = [id];
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        if (registros.length > 0) {
            const registro = registros[0];
            return new Candidato(
                registro.id,
                registro.nome,
                registro.ctps_numero,
                registro.ctps_serie,
                registro.data_nascimento,
                registro.cpf,
                registro.rg,
                registro.orgao_emissor,
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
                registro.ensino_fundamental_completo,
                registro.ensino_medio_completo,
                registro.ensino_superior_completo,
                registro.curso,
                registro.titulo_eleitor_numero,
                registro.zona_eleitoral,
                registro.pis,
                registro.cnh_numero,
                registro.estado_civil,
                registro.nome_pai,
                registro.nome_mae,
                registro.nome_conjuge,
                registro.residencia_propria,
                registro.certidao_militar_numero,
                registro.certidao_militar_serie,
                registro.certidao_militar_categoria,
                registro.possui_filhos
            );
        } else {
            return null;
        }
    }
}
