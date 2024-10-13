import { Router } from 'express';
import VagaCtrl from '../Controle/vagaCtrl.js';

const rotaVaga = new Router();
const vagaCtrl = new VagaCtrl();

rotaVaga.post('/', vagaCtrl.gravar)
    .put('/', vagaCtrl.atualizar)
    .delete('/', vagaCtrl.excluir)
    .get('/', vagaCtrl.consultar)
    .get('/id/:id', vagaCtrl.consultarPorId)
    .get('/:termo', vagaCtrl.consultar);

export default rotaVaga;
