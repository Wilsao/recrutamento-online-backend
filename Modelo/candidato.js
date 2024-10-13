import CandidatoDAO from '../Persistencia/candidatoDAO.js';

export default class Candidato {
    #id;
    #nome;
    #ctpsNumero;
    #ctpsSerie;
    #dataNascimento;
    #cpf;
    #rg;
    #orgaoEmissor;
    #endereco;
    #numero;
    #bairro;
    #municipio;
    #uf;
    #cep;
    #naturalidade;
    #telefone;
    #celular;
    #email;
    #ensinoFundamentalCompleto;
    #ensinoMedioCompleto;
    #ensinoSuperiorCompleto;
    #curso;
    #tituloEleitorNumero;
    #zonaEleitoral;
    #pis;
    #cnhNumero;
    #estadoCivil;
    #nomePai;
    #nomeMae;
    #nomeConjuge;
    #residenciaPropria;
    #certidaoMilitarNumero;
    #certidaoMilitarSerie;
    #certidaoMilitarCategoria;
    #possuiFilhos;

    constructor(
        id = 0,
        nome = '',
        ctpsNumero = '',
        ctpsSerie = '',
        dataNascimento = '',
        cpf = '',
        rg = '',
        orgaoEmissor = '',
        endereco = '',
        numero = '',
        bairro = '',
        municipio = '',
        uf = '',
        cep = '',
        naturalidade = '',
        telefone = '',
        celular = '',
        email = '',
        ensinoFundamentalCompleto = false,
        ensinoMedioCompleto = false,
        ensinoSuperiorCompleto = false,
        curso = '',
        tituloEleitorNumero = '',
        zonaEleitoral = '',
        pis = '',
        cnhNumero = '',
        estadoCivil = '',
        nomePai = '',
        nomeMae = '',
        nomeConjuge = '',
        residenciaPropria = false,
        certidaoMilitarNumero = '',
        certidaoMilitarSerie = '',
        certidaoMilitarCategoria = '',
        possuiFilhos = false
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#ctpsNumero = ctpsNumero;
        this.#ctpsSerie = ctpsSerie;
        this.#dataNascimento = dataNascimento;
        this.#cpf = cpf;
        this.#rg = rg;
        this.#orgaoEmissor = orgaoEmissor;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#municipio = municipio;
        this.#uf = uf;
        this.#cep = cep;
        this.#naturalidade = naturalidade;
        this.#telefone = telefone;
        this.#celular = celular;
        this.#email = email;
        this.#ensinoFundamentalCompleto = ensinoFundamentalCompleto;
        this.#ensinoMedioCompleto = ensinoMedioCompleto;
        this.#ensinoSuperiorCompleto = ensinoSuperiorCompleto;
        this.#curso = curso;
        this.#tituloEleitorNumero = tituloEleitorNumero;
        this.#zonaEleitoral = zonaEleitoral;
        this.#pis = pis;
        this.#cnhNumero = cnhNumero;
        this.#estadoCivil = estadoCivil;
        this.#nomePai = nomePai;
        this.#nomeMae = nomeMae;
        this.#nomeConjuge = nomeConjuge;
        this.#residenciaPropria = residenciaPropria;
        this.#certidaoMilitarNumero = certidaoMilitarNumero;
        this.#certidaoMilitarSerie = certidaoMilitarSerie;
        this.#certidaoMilitarCategoria = certidaoMilitarCategoria;
        this.#possuiFilhos = possuiFilhos;
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get ctpsNumero() {
        return this.#ctpsNumero;
    }
    set ctpsNumero(novoCtpsNumero) {
        this.#ctpsNumero = novoCtpsNumero;
    }

    get ctpsSerie() {
        return this.#ctpsSerie;
    }
    set ctpsSerie(novoCtpsSerie) {
        this.#ctpsSerie = novoCtpsSerie;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }
    set dataNascimento(novaDataNascimento) {
        this.#dataNascimento = novaDataNascimento;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get rg() {
        return this.#rg;
    }
    set rg(novoRg) {
        this.#rg = novoRg;
    }

    get orgaoEmissor() {
        return this.#orgaoEmissor;
    }
    set orgaoEmissor(novoOrgaoEmissor) {
        this.#orgaoEmissor = novoOrgaoEmissor;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get numero() {
        return this.#numero;
    }
    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get bairro() {
        return this.#bairro;
    }
    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get municipio() {
        return this.#municipio;
    }
    set municipio(novoMunicipio) {
        this.#municipio = novoMunicipio;
    }

    get uf() {
        return this.#uf;
    }
    set uf(novoUf) {
        this.#uf = novoUf;
    }

    get cep() {
        return this.#cep;
    }
    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get naturalidade() {
        return this.#naturalidade;
    }
    set naturalidade(novaNaturalidade) {
        this.#naturalidade = novaNaturalidade;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get celular() {
        return this.#celular;
    }
    set celular(novoCelular) {
        this.#celular = novoCelular;
    }

    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get ensinoFundamentalCompleto() {
        return this.#ensinoFundamentalCompleto;
    }
    set ensinoFundamentalCompleto(valor) {
        this.#ensinoFundamentalCompleto = valor;
    }

    get ensinoMedioCompleto() {
        return this.#ensinoMedioCompleto;
    }
    set ensinoMedioCompleto(valor) {
        this.#ensinoMedioCompleto = valor;
    }

    get ensinoSuperiorCompleto() {
        return this.#ensinoSuperiorCompleto;
    }
    set ensinoSuperiorCompleto(valor) {
        this.#ensinoSuperiorCompleto = valor;
    }

    get curso() {
        return this.#curso;
    }
    set curso(novoCurso) {
        this.#curso = novoCurso;
    }

    get tituloEleitorNumero() {
        return this.#tituloEleitorNumero;
    }
    set tituloEleitorNumero(novoTituloEleitorNumero) {
        this.#tituloEleitorNumero = novoTituloEleitorNumero;
    }

    get zonaEleitoral() {
        return this.#zonaEleitoral;
    }
    set zonaEleitoral(novaZonaEleitoral) {
        this.#zonaEleitoral = novaZonaEleitoral;
    }

    get pis() {
        return this.#pis;
    }
    set pis(novoPis) {
        this.#pis = novoPis;
    }

    get cnhNumero() {
        return this.#cnhNumero;
    }
    set cnhNumero(novoCnhNumero) {
        this.#cnhNumero = novoCnhNumero;
    }

    get estadoCivil() {
        return this.#estadoCivil;
    }
    set estadoCivil(novoEstadoCivil) {
        this.#estadoCivil = novoEstadoCivil;
    }

    get nomePai() {
        return this.#nomePai;
    }
    set nomePai(novoNomePai) {
        this.#nomePai = novoNomePai;
    }

    get nomeMae() {
        return this.#nomeMae;
    }
    set nomeMae(novoNomeMae) {
        this.#nomeMae = novoNomeMae;
    }

    get nomeConjuge() {
        return this.#nomeConjuge;
    }
    set nomeConjuge(novoNomeConjuge) {
        this.#nomeConjuge = novoNomeConjuge;
    }

    get residenciaPropria() {
        return this.#residenciaPropria;
    }
    set residenciaPropria(valor) {
        this.#residenciaPropria = valor;
    }

    get certidaoMilitarNumero() {
        return this.#certidaoMilitarNumero;
    }
    set certidaoMilitarNumero(novoCertidaoMilitarNumero) {
        this.#certidaoMilitarNumero = novoCertidaoMilitarNumero;
    }

    get certidaoMilitarSerie() {
        return this.#certidaoMilitarSerie;
    }
    set certidaoMilitarSerie(novoCertidaoMilitarSerie) {
        this.#certidaoMilitarSerie = novoCertidaoMilitarSerie;
    }

    get certidaoMilitarCategoria() {
        return this.#certidaoMilitarCategoria;
    }
    set certidaoMilitarCategoria(novoCertidaoMilitarCategoria) {
        this.#certidaoMilitarCategoria = novoCertidaoMilitarCategoria;
    }

    get possuiFilhos() {
        return this.#possuiFilhos;
    }
    set possuiFilhos(valor) {
        this.#possuiFilhos = valor;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            ctpsNumero: this.#ctpsNumero,
            ctpsSerie: this.#ctpsSerie,
            dataNascimento: this.#dataNascimento,
            cpf: this.#cpf,
            rg: this.#rg,
            orgaoEmissor: this.#orgaoEmissor,
            endereco: this.#endereco,
            numero: this.#numero,
            bairro: this.#bairro,
            municipio: this.#municipio,
            uf: this.#uf,
            cep: this.#cep,
            naturalidade: this.#naturalidade,
            telefone: this.#telefone,
            celular: this.#celular,
            email: this.#email,
            ensinoFundamentalCompleto: this.#ensinoFundamentalCompleto,
            ensinoMedioCompleto: this.#ensinoMedioCompleto,
            ensinoSuperiorCompleto: this.#ensinoSuperiorCompleto,
            curso: this.#curso,
            tituloEleitorNumero: this.#tituloEleitorNumero,
            zonaEleitoral: this.#zonaEleitoral,
            pis: this.#pis,
            cnhNumero: this.#cnhNumero,
            estadoCivil: this.#estadoCivil,
            nomePai: this.#nomePai,
            nomeMae: this.#nomeMae,
            nomeConjuge: this.#nomeConjuge,
            residenciaPropria: this.#residenciaPropria,
            certidaoMilitarNumero: this.#certidaoMilitarNumero,
            certidaoMilitarSerie: this.#certidaoMilitarSerie,
            certidaoMilitarCategoria: this.#certidaoMilitarCategoria,
            possuiFilhos: this.#possuiFilhos
        };
    }

    async gravar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.gravar(this);
    }

    async atualizar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.atualizar(this);
    }

    async excluir() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.excluir(this);
    }

    async consultar(termo) {
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.consultar(termo);
    }

    async consultarPorId(id) {
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.consultarPorId(id);
    }
}
