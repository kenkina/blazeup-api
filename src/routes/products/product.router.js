import express from 'express';

import { productController } from './product.controller';


const router = express.Router();
router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/current', productController.getCurrent);
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);


export const productRouter = router;