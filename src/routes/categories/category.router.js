import express from 'express';

import { categoryController } from './category.controller';


const router = express.Router();
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/current', categoryController.getCurrent);
router.get('/:id', categoryController.getById);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);


export const categoryRouter = router;