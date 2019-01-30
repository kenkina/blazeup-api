import express from 'express';

import { userController } from './user.controller';


const router = express.Router();
router.post('/authenticate', userController.authenticate);
router.post('/', userController.register);
router.get('/', userController.getAll);
router.get('/current', userController.getCurrent);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


export const userRouter = router;