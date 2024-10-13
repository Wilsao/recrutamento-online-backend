export default class Vaga {
    #id;
    #titulo;
    #descricao;
    #salario;
    #localizacao;
    #empresa;

    constructor(
        id = 0,
        titulo = '',
        descricao = '',
        salario = 0.0,
        localizacao = '',
        empresa = ''
    ) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#salario = salario;
        this.#localizacao = localizacao;
        this.#empresa = empresa;
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(novoTitulo) {
        this.#titulo = novoTitulo;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    get salario() {
        return this.#salario;
    }
    set salario(novoSalario) {
        this.#salario = novoSalario;
    }

    get localizacao() {
        return this.#localizacao;
    }
    set localizacao(novaLocalizacao) {
        this.#localizacao = novaLocalizacao;
    }

    get empresa() {
        return this.#empresa;
    }
    set empresa(novaEmpresa) {
        this.#empresa = novaEmpresa;
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            salario: this.#salario,
            localizacao: this.#localizacao,
            empresa: this.#empresa
        };
    }

    async gravar() {
        const VagaDAO = await import('../Persistencia/vagaDAO.js').then(mod => mod.default);
        const vagaDAO = new VagaDAO();
        await vagaDAO.gravar(this);
    }

    async atualizar() {
        const VagaDAO = await import('../Persistencia/vagaDAO.js').then(mod => mod.default);
        const vagaDAO = new VagaDAO();
        await vagaDAO.atualizar(this);
    }

    async excluir() {
        const VagaDAO = await import('../Persistencia/vagaDAO.js').then(mod => mod.default);
        const vagaDAO = new VagaDAO();
        await vagaDAO.excluir(this);
    }

    async consultar(termo) {
        const VagaDAO = await import('../Persistencia/vagaDAO.js').then(mod => mod.default);
        const vagaDAO = new VagaDAO();
        return await vagaDAO.consultar(termo);
    }

    async consultarPorId(id) {
        const VagaDAO = await import('../Persistencia/vagaDAO.js').then(mod => mod.default);
        const vagaDAO = new VagaDAO();
        return await vagaDAO.consultarPorId(id);
    }
}
