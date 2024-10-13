import { Router } from 'express';
import InscricaoCtrl from '../Controle/inscricaoCtrl.js';

const rotaInscricao = new Router();
const inscricaoCtrl = new InscricaoCtrl();

rotaInscricao.post('/', inscricaoCtrl.gravar)
    .delete('/', inscricaoCtrl.excluir)
    .get('/', inscricaoCtrl.consultar)
    .get('/id/:id', inscricaoCtrl.consultarPorId)
    .get('/:termo', inscricaoCtrl.consultar);

export default rotaInscricao;
