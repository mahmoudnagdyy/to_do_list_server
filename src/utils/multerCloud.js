import multer from "multer"
import {v2 as cloudinary} from 'cloudinary'

export const multerExtensions = {
    image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg'],
    video: ['video/mp4', 'video/webm'],
    audio: ['audio/mp3', 'audio/wav'],
    files: ['application/pdf']
}

cloudinary.config({
    cloud_name: 'ddbxrwwmz',
    api_key: '797827295144815',
    api_secret: 'AatKcubDyFThFk_I_lIixiIF81s',
})

export const multerCloud = (allowedExtensions) => {
    const storage = multer.diskStorage({})
    const fileFilter = (req, file, cb) => {
        if(allowedExtensions.includes(file.mimetype)){
            return cb(null, true)
        }
        cb(new Error('Invalid File Type'), false)
    }

    const upload = multer({storage, fileFilter})
    return upload
}

export {cloudinary}