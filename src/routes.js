const { Router } = require('express');

const SupplierController = require('./app/controllers/SupplierController');
const CategoryController = require('./app/controllers/CategoryController');
const DepartamentController = require('./app/controllers/DepartamentController');

const router = Router();

router.get('/suppliers', SupplierController.index);
router.get('/suppliers/:id', SupplierController.show);
router.post('/suppliers', SupplierController.store);
router.put('/suppliers/:id', SupplierController.update);
router.delete('/suppliers/:id', SupplierController.delete);

router.get('/categorys', CategoryController.index);
router.get('/categorys/:id', CategoryController.show);
router.post('/categorys', CategoryController.store);
router.put('/categorys/:id', CategoryController.update);
router.delete('/categorys/:id', CategoryController.delete);

router.get('/departaments', DepartamentController.index);
router.get('/departaments/:id', DepartamentController.show);
router.post('/departaments', DepartamentController.store);
router.put('/departaments/:id', DepartamentController.update);
router.delete('/departaments/:id', DepartamentController.delete);

module.exports = router;
