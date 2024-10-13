import EntrevistaDAO from '../Persistencia/entrevistaDAO.js';
import Inscricao from './inscricao.js';

export default class Entrevista {
    #id;
    #inscricao;
    #dataEntrevista;
    #status;

    constructor(
        id = 0,
        inscricao = null,
        dataEntrevista = new Date(),
        status = ''
    ) {
        this.#id = id;
        this.#inscricao = inscricao;
        this.#dataEntrevista = dataEntrevista;
        this.#status = status;
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get inscricao() {
        return this.#inscricao;
    }
    set inscricao(novaInscricao) {
        if (novaInscricao instanceof Inscricao) {
            this.#inscricao = novaInscricao;
        }
    }

    get dataEntrevista() {
        return this.#dataEntrevista;
    }
    set dataEntrevista(novaData) {
        this.#dataEntrevista = novaData;
    }

    get status() {
        return this.#status;
    }
    set status(novoStatus) {
        this.#status = novoStatus;
    }

    toJSON() {
        return {
            id: this.#id,
            inscricao: this.#inscricao ? this.#inscricao.toJSON() : null,
            dataEntrevista: this.#dataEntrevista,
            status: this.#status
        };
    }

    async gravar() {
        const entrevistaDAO = new EntrevistaDAO();
        await entrevistaDAO.gravar(this);
    }

    async atualizar() {
        const entrevistaDAO = new EntrevistaDAO();
        await entrevistaDAO.atualizar(this);
    }

    async excluir() {
        const entrevistaDAO = new EntrevistaDAO();
        await entrevistaDAO.excluir(this);
    }

    async consultar(termo) {
        const entrevistaDAO = new EntrevistaDAO();
        return await entrevistaDAO.consultar(termo);
    }

    async consultarPorId(id) {
        const entrevistaDAO = new EntrevistaDAO();
        return await entrevistaDAO.consultarPorId(id);
    }
}
