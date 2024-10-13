import { Router } from 'express';
import CandidatoCtrl from '../Controle/candidatoCtrl.js';

const rotaCandidato = new Router();
const candidatoCtrl = new CandidatoCtrl();

rotaCandidato.post('/', candidatoCtrl.gravar)
    .put('/', candidatoCtrl.atualizar)
    .delete('/', candidatoCtrl.excluir)
    .get('/', candidatoCtrl.consultar)
    .get('/:termo', candidatoCtrl.consultar)
    .get('/id/:id', candidatoCtrl.consultarPorId);

export default rotaCandidato;
