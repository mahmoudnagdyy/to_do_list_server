import {scheduleJob} from 'node-schedule'
import userModel from '../../DB/model/User.model.js'
import { sendEmail } from './sendEmail.js'
import taskModel from '../../DB/model/Task.model.js'


export const removeUnverifiedUser = () => {
    scheduleJob('0 0 19 * * 3', async () => {
        const users = await userModel.find({confirmEmail: false})
        if(users.length){
            let emails = []
            for (const user of users) {
                emails.push(user.email)
            }
            const html = `
                <h1>Your account is deleted because you are not verified</h1>
                <h1>Signup for new account and verify your account not to be deleted</h1>
            `
            sendEmail({to: emails, subject: 'Unverified Users', html})
            await userModel.deleteMany({confirmEmail: false})
        }
    })
}


export const unCompletedTasks = () => {
    scheduleJob('0 0 23 * * *', async(req, res) => {
        const users = await userModel.find({}).populate('tasks')

        for (const user of users) {
            if(user.tasks.length){
                for (const task of user.tasks) {
                        if(task.status == 'pending'){
                            const html = `
                                <h1>Task: ${task.title.charAt(0).toUpperCase() + task.title.slice(1)} is not completed</h1>
                            `
                            sendEmail({to: user.email, subject: 'Uncompleted Task', html})
                        }
                    }
                }
        }
    })
}



export const deleteTasks = () => {
    scheduleJob('20 49 20 * * *', async(req, res) => {
        const tasks = await taskModel.find({})
        for(const task of tasks){
            const user = await userModel.findById(task.userID)
            if(!user){
                await taskModel.deleteMany({userID: task.userID})
            }
        }
    })
}