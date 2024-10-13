import { Router } from 'express';
import UsuarioCtrl from '../Controle/usuarioCtrl.js';

const rotaUsuario = new Router();
const usuarioCtrl = new UsuarioCtrl();

rotaUsuario.post('/registrar', usuarioCtrl.registrar)
    .post('/login', usuarioCtrl.login);

export default rotaUsuario;
