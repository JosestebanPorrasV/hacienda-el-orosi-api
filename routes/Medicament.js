const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middlewares/Validate-fields');

const md_auth = require('../middlewares/Authenticated');
const router = Router();

const {
  save,
  getMedicaments,
  getMedicament,
  remove,
} = require("../controllers/Medicament.js");


router.post(
  '/guardar-medicamento',
  [
    check('name', 'Nombre del medicamento requerido').not().isEmpty(),
    check('quantity', 'Cantidad total del medicamento requerido').not().isEmpty(),
    check('milliliters', 'Mililitros del medicamento requerido').not().isEmpty(),
    check('unit_price', 'Precio unitario del medicamento requerido').not().isEmpty(),

    validate_fields
  ],
  md_auth.authenticated,
  save
);

router.get("/listar-medicamentos", md_auth.authenticated, getMedicaments);
router.get("/ver-medicamento/:active_num", md_auth.authenticated, getMedicament);

router.delete("/remover-medicamento/:id", md_auth.authenticated, remove);

module.exports = router;
