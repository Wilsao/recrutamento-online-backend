import UsuarioDAO from '../Persistencia/usuarioDAO.js';

export default class Usuario {
    #id;
    #nome;
    #email;
    #senha;
    #tipo;

    constructor(
        id = 0,
        nome = '',
        email = '',
        senha = '',
        tipo = 'candidato'
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#tipo = tipo;
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

    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get senha() {
        return this.#senha;
    }
    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    get tipo() {
        return this.#tipo;
    }
    set tipo(novoTipo) {
        this.#tipo = novoTipo;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            tipo: this.#tipo
        };
    }

    async gravar() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.gravar(this);
    }

    async atualizar() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.atualizar(this);
    }

    async excluir() {
        const usuarioDAO = new UsuarioDAO();
        await usuarioDAO.excluir(this);
    }

    async consultar(termo) {
        const usuarioDAO = new UsuarioDAO();
        return await usuarioDAO.consultar(termo);
    }

    async autenticar() {
        const usuarioDAO = new UsuarioDAO();
        return await usuarioDAO.autenticar(this.email, this.senha);
    }
}
