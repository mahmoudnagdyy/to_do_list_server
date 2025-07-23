import { Router } from "express";
import * as uc from './controller/user.js'
import {auth} from '../../middleware/authntication.js'
import * as us from './validation.js'
import {validation} from '../../middleware/validation.js'
import { multerCloud } from "../../utils/multerCloud.js";
import { multerExtensions } from "../../utils/multerCloud.js";

const router = Router()


router.get('/', uc.getUsers)

router.get('/profile', auth, uc.getProfile)

router.put('/profile', validation(us.updateProfile), auth, uc.updateProfile)

router.patch('/forgetPassword/:email', uc.forgetPassword)

router.patch('/resetPassword/:token', validation(us.forgetPassword), uc.resetPassword)

router.post('/profilePicture', multerCloud(multerExtensions.image).single('profile'), auth, uc.profilePicture)

router.delete('/', auth, uc.deleteUser)


export default router