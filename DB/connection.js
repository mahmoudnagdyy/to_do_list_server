import mongoose from "mongoose"


export const connectDB = async () => {
    return await mongoose.connect(process.env.DB_ATLAS_URL).then(() => {
        console.log('DB Connected');
    }).catch((err) => {
        console.log(err);
    })
}    