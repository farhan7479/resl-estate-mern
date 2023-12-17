import express from 'express';
import { google,signin, signup,signOut, phoneSignup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut);
router.post( "/phone-signup", phoneSignup);

export default router;