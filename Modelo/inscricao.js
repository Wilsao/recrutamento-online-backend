import InscricaoDAO from '../Persistencia/inscricaoDAO.js';
import Candidato from './candidato.js';
import Vaga from './vaga.js';

export default class Inscricao {
    #id;
    #candidato;
    #vaga;
    #dataInscricao;

    constructor(
        id = 0,
        candidato = null,
        vaga = null,
        dataInscricao = new Date()
    ) {
        this.#id = id;
        this.#candidato = candidato;
        this.#vaga = vaga;
        this.#dataInscricao = dataInscricao;
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get candidato() {
        return this.#candidato;
    }
    set candidato(novoCandidato) {
        if (novoCandidato instanceof Candidato) {
            this.#candidato = novoCandidato;
        }
    }

    get vaga() {
        return this.#vaga;
    }
    set vaga(novaVaga) {
        if (novaVaga instanceof Vaga) {
            this.#vaga = novaVaga;
        }
    }

    get dataInscricao() {
        return this.#dataInscricao;
    }
    set dataInscricao(novaData) {
        this.#dataInscricao = novaData;
    }

    toJSON() {
        return {
            id: this.#id,
            candidato: this.#candidato ? this.#candidato.toJSON() : null,
            vaga: this.#vaga ? this.#vaga.toJSON() : null,
            dataInscricao: this.#dataInscricao
        };
    }

    async gravar() {
        const inscricaoDAO = new InscricaoDAO();
        await inscricaoDAO.gravar(this);
    }

    async excluir() {
        const inscricaoDAO = new InscricaoDAO();
        await inscricaoDAO.excluir(this);
    }

    async consultar(termo) {
        const inscricaoDAO = new InscricaoDAO();
        return await inscricaoDAO.consultar(termo);
    }

    async consultarPorId(id) {
        const inscricaoDAO = new InscricaoDAO();
        return await inscricaoDAO.consultarPorId(id);
    }
}
