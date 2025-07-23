import { Router } from "express";
import * as ac from './controller/auth.js' 
import { validation } from "../../middleware/validation.js";
import * as as from './validation.js'


const router = Router()


router.post('/signup', validation(as.signup), ac.signup)

router.get('/confirmEmail/:token', ac.confirmEmail)

router.get('/reConfirmEmail/:token', ac.reConfirmEmail)

router.post('/login', validation(as.login),ac.login) 




export default router