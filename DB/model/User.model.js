import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        confirmEmail: {
            type: Boolean,
            default: false
        },
        profilePicture: {
            public_id: String,
            secure_url: String
        },
        token: String
    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true},
    }
)

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userID'
})

const userModel = model('User', userSchema)

export default userModel