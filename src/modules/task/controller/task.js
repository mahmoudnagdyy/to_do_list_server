import {asyncHandler} from '../../../utils/errorHandler.js'
import taskModel from '../../../../DB/model/Task.model.js'
import userModel from '../../../../DB/model/User.model.js'
 
export const getTasks = asyncHandler(
    async (req, res, next) => {
        const tasks = await taskModel.find({userID: req.user._id}).populate('userID')
        return res.send({message: 'Done', tasks})
    }
)


export const addTask = asyncHandler(
    async (req, res, next) => {
        const {title, description} = req.body

        const checkTask = await taskModel.findOne({title: title.toLowerCase(), userID: req.user._id})
        
        if(checkTask){
            return next(new Error('Task Already Exists'))
        }

        const task = await taskModel.create({title, description, userID: req.user._id})
        return res.send({message: 'Done', task})    
    }
)


export const updateTask = asyncHandler(
    async (req, res, next) => {
        const {taskID} = req.params
        const {title, description} = req.body

        const checkTask = await taskModel.findById(taskID)
        if(!checkTask){
            return next(new Error('Task Not Found'))
        }

        const task = await taskModel.findByIdAndUpdate(taskID, {title, description}, {new: true}).populate('userID')
        return res.send({message: 'Done', task})
    }
)


export const completeTask = asyncHandler(
    async (req, res, next) => {
        const {taskID} = req.params
        const checkTask = await taskModel.findById(taskID)
        if(!checkTask){
            return next(new Error('Task Not Found'))
        }

        if(checkTask.status == 'completed'){
            return next(new Error('Task Already Completed'))
        }

        const task = await taskModel.findByIdAndUpdate(taskID, {status: 'completed'}, {new: true}).populate('userID')
        return res.send({message: 'Done', task})
    }
)


export const deleteTask = asyncHandler(
    async (req, res, next) => {
        const {taskID} = req.params

        const checkTask = await taskModel.findById(taskID)
        if(!checkTask){
            return next(new Error('Task Not Found'))
        }

        const task = await taskModel.findByIdAndDelete(taskID)
        return res.send({message: 'Done', task})
    }
)