//route for authentication
import express from 'express'
import {createUserHandler, loginUserHandler} from '../controllers/user.js'

const router = express.Router();

router.post('/', createUserHandler);
router.post('/login', loginUserHandler);

export default router;