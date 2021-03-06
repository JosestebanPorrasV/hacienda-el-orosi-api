const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middlewares/Validate-fields');

var md_auth = require('../middlewares/Authenticated');

const router = Router();

const {
  register,
  removeAdmin,
  login,
  getUser,
  set_recovery_key,
  verify_recovery_key,
  change_password,
  list_admins,
  changeStatus,
  updateAdmin
} = require('../controllers/User');

router.put(
  '/actualizar-administrador/:id',
  [
    check('document_id', 'Cedula no recibida').not().isEmpty(),
    check('email', 'Email no recibido').not().isEmpty(),
    check('name', 'Nombre no recibido').not().isEmpty(),
    check('surname', 'Nombre no recibido').not().isEmpty()
  ],
  md_auth.authenticated,
  updateAdmin
);

router.put(
  '/administrador/cambiar-cargo/:id',
  [check('role', 'El cargo para este colaborador es necesario').not().isEmpty(), validate_fields],
  md_auth.authenticated,
  changeStatus
);

router.post(
  '/registrar-administrador',
  [
    check('document_id', 'Cedula no recibida').not().isEmpty(),
    check('password', 'Contraseña no recibida').not().isEmpty(),
    check('email', 'Email no recibido').not().isEmpty(),
    check('name', 'Nombre no recibido').not().isEmpty(),
    check('surname', 'Nombre no recibido').not().isEmpty(),
    check('role', 'Cargo no recibido').not().isEmpty(),
    validate_fields
  ],
  md_auth.authenticated,
  register
);

router.post(
  '/ingresar',
  [
    check('document_id', 'Cedula no recibida').not().isEmpty(),
    check('password', 'Contraseña  no recibida').not().isEmpty(),
    validate_fields
  ],
  login
);

router.put(
  '/editar/cuenta/:email',
  [check('password', 'Contraseña  no recibida').not().isEmpty(), validate_fields],
  change_password
);

router.delete('/remover-administrador/:id', md_auth.authenticated, removeAdmin);

router.get('/informacion-administrador', md_auth.authenticated, getUser);

router.get('/administradores', md_auth.authenticated, list_admins);

router.get('/recuperar/cuenta/:email', set_recovery_key);

router.get('/verificar/codigo/:email/:codigo', verify_recovery_key);

module.exports = router;
