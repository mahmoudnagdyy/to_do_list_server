import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            lowercase: true
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'completed']
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }      
    },
    {
        timestamps: true
    }
)



const taskModel = model('Task', taskSchema)

export default taskModel