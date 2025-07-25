import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { bootstrap } from './src/index.router.js'
import { deleteTasks, removeUnverifiedUser, unCompletedTasks } from './src/utils/cronjob.js'
import cors from 'cors'
const app = express()
app.use(cors())

app.get('/', (req, res, next) => {
    return res.send('Hello World')
})

bootstrap(app, express)
 
removeUnverifiedUser()
unCompletedTasks()
deleteTasks()



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ...... ${process.env.PORT}`);
})