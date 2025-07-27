import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";



export const auth = asyncHandler(

    async (req, res, next) => {

        const {authorization} = req.headers

        if(!authorization){
            return next(new Error('Please Login First and send token'))
        }

        if(!authorization.startsWith('Football__')){
            return next(new Error('Invalid Token'))
        }

        const token = authorization.split('Football__')[1]

        let decodedData
        let flag = false

        jwt.verify(token, process.env.LOGIN_SIGNATURE, async(err, decoded) => {
            if(err){
                flag = true
            }
            
            if(!flag){
                decodedData = decoded
            }
        })

        if(flag){
            const checkUser = await userModel.findOne({token})
            if(!checkUser){
                return next(new Error('User Not Found'))
            }
            const newToken = jwt.sign({id: checkUser._id}, process.env.LOGIN_SIGNATURE, {expiresIn: '1h'})
            const user = await userModel.findByIdAndUpdate({_id: checkUser._id}, {token: newToken}, {new: true})
            return res.send({message: 'Token Expired', token: newToken})
        }
        
        const user = await userModel.findById(decodedData.id)
        
        if(!user){
            return next(new Error('User Not Found'))
        }

        req.user = user
        next()
    }

)