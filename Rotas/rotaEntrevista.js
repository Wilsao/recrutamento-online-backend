import { Router } from 'express';
import EntrevistaCtrl from '../Controle/entrevistaCtrl.js';

const rotaEntrevista = new Router();
const entrevistaCtrl = new EntrevistaCtrl();

rotaEntrevista.post('/', entrevistaCtrl.gravar)
    .put('/', entrevistaCtrl.atualizar)
    .delete('/', entrevistaCtrl.excluir)
    .get('/', entrevistaCtrl.consultar)
    .get('/id/:id', entrevistaCtrl.consultarPorId)
    .get('/:termo', entrevistaCtrl.consultar);

export default rotaEntrevista;
