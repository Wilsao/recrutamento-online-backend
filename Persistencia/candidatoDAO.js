import Candidato from '../Modelo/candidato.js';
import conectar from './conexao.js';

export default class CandidatoDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
        CREATE TABLE IF NOT EXISTS candidatos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          ctps_numero VARCHAR(50),
          ctps_serie VARCHAR(50),
          data_nascimento DATE,
          cpf VARCHAR(14),
          rg VARCHAR(20),
          orgao_emissor VARCHAR(50),
          endereco VARCHAR(255),
          numero VARCHAR(10),
          bairro VARCHAR(100),
          municipio VARCHAR(100),
          uf VARCHAR(2),
          cep VARCHAR(10),
          naturalidade VARCHAR(100),
          telefone VARCHAR(20),
          celular VARCHAR(20),
          email VARCHAR(100),
          ensino_fundamental_completo BOOLEAN DEFAULT FALSE,
          ensino_medio_completo BOOLEAN DEFAULT FALSE,
          ensino_superior_completo BOOLEAN DEFAULT FALSE,
          curso VARCHAR(255),
          titulo_eleitor_numero VARCHAR(20),
          zona_eleitoral VARCHAR(10),
          pis VARCHAR(20),
          cnh_numero VARCHAR(20),
          estado_civil ENUM('casado', 'solteiro', 'divorciado', 'separado', 'amigado'),
          nome_pai VARCHAR(255),
          nome_mae VARCHAR(255),
          nome_conjuge VARCHAR(255),
          residencia_propria BOOLEAN DEFAULT FALSE,
          certidao_militar_numero VARCHAR(20),
          certidao_militar_serie VARCHAR(20),
          certidao_militar_categoria VARCHAR(20),
          possui_filhos BOOLEAN DEFAULT FALSE
        )
      `;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        } catch (e) {
            console.log('Não foi possível iniciar o banco de dados: ' + e.message);
        }
    }

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
