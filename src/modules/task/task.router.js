import { Router } from "express";
import * as tc from './controller/task.js'
import {auth} from '../../middleware/authntication.js'
import * as ts from './validation.js'
import {validation} from '../../middleware/validation.js'

const router = Router()

router.get('/', auth, tc.getTasks)

router.post('/', auth, validation(ts.addTask), tc.addTask)

router.put('/:taskID', auth, validation(ts.addTask), tc.updateTask)

router.patch('/:taskID', auth, tc.completeTask)

router.delete('/:taskID', auth, tc.deleteTask)



export default router