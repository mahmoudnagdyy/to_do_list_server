import userRouter from './modules/user/user.router.js'
import taskRouter from './modules/task/task.router.js'
import authRouter from './modules/auth/auth.router.js'
import { connectDB } from '../DB/connection.js'
import { globalErrorHandler } from './utils/errorHandler.js'



export const bootstrap = (app, express) => {
    
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/task', taskRouter)
    app.use(globalErrorHandler)
    
    app.use('*root',(req, res, next) => {
        return res.send('404 Page Not Found')
    })
    connectDB()

}