import userModel from '../../../../DB/model/User.model.js'
import { asyncHandler } from '../../../utils/errorHandler.js'
import bcrypt from 'bcryptjs'
import {sendEmail} from '../../../utils/sendEmail.js'
import jwt from 'jsonwebtoken'
import { cloudinary } from '../../../utils/multerCloud.js'


export const getUsers = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.find({})
        return res.send({message: 'Done', user})
    }
)


export const getProfile = asyncHandler(
    (req, res, next) => {
        return res.send({message: 'Done', user: req.user}) 
    }
)


export const updateProfile = asyncHandler(
    async (req, res, next) => {
        const {_id} = req.user
        const {name, username, email, password} = req.body
        const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND)
        const user = await userModel.findByIdAndUpdate({_id}, {name, username, email, password: hashPassword}, {new: true})
        return res.send({message: 'Done', user})
    }
)


export const forgetPassword = asyncHandler(
    async (req, res, next) => {
        const {email} = req.params
        const checkUser = await userModel.findOne({email})
        if(!checkUser){
            return next(new Error('User Not Found'))
        }

        const token = jwt.sign({id: checkUser._id}, process.env.FORGET_PASSWORD_SIGNATURE, {expiresIn: '1d'})

        const html = `

            <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
            
                <style type="text/css">
                
                @media only screen and (min-width: 620px) {
                    .u-row {
                    width: 600px !important;
                    }

                    .u-row .u-col {
                    vertical-align: top;
                    }

                    
                        .u-row .u-col-100 {
                        width: 600px !important;
                        }
                    
                }

                @media only screen and (max-width: 620px) {
                    .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                    }

                    .u-row {
                    width: 100% !important;
                    }

                    .u-row .u-col {
                    display: block !important;
                    width: 100% !important;
                    min-width: 320px !important;
                    max-width: 100% !important;
                    }

                    .u-row .u-col > div {
                    margin: 0 auto;
                    }


                    .u-row .u-col img {
                    max-width: 100% !important;
                    }

            }
                
            body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}


            table, td { color: #000000; } #u_body a { color: #161a39; text-decoration: underline; }
                </style>
            
            

            <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

            </head>

            <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table role="presentation" id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
                
            
            
            <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
                
            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div style="height: 100%;width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
                    
            <table role="presentation" aria-label="divider" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <span>&#160;</span>
                    </td>
                </tr>
                </tbody>
            </table>

                </td>
                </tr>
            </tbody>
            </table>

            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
            </div>
            </div>
            


            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                
            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div style="height: 100%;width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;" align="left">
                    
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                
                <img align="center" border="0" src="https://cdn-icons-png.flaticon.com/512/2490/2490402.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 13%;max-width: 75.4px;" width="75.4"/>
                
                </td>
            </tr>
            </table>

                </td>
                </tr>
            </tbody>
            </table>

            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
            </div>
            </div>
            


            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->
                
            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div style="height: 100%;width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;" align="left">
                    
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                
                <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1593141680866-reset.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 10%;max-width: 58px;" width="58"/>
                
                </td>
            </tr>
            </table>

                </td>
                </tr>
            </tbody>
            </table>

            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;" align="left">
                    
            <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; text-align: center; margin: 0px;"><span style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Please reset your password </span></p>
            </div>

                </td>
                </tr>
            </tbody>
            </table>

            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
            </div>
            </div>
            


            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                
            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div style="height: 100%;width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
                    
            <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,</span></p>
            <p style="font-size: 14px; line-height: 140%; margin: 0px;">&nbsp;</p>
            <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">We have sent you this email in response to your request to reset your password on TO DO LIST.</span></p>
            <p style="font-size: 14px; line-height: 140%; margin: 0px;">&nbsp;</p>
            <p style="font-size: 14px; line-height: 140%; margin: 0px;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">To reset your password, please follow the link below: </span></p>
            </div>

                </td>
                </tr>
            </tbody>
            </table>

            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left">
                    
            <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
            <div align="left">
            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:5000/user/changePassword/" style="height:52px; v-text-anchor:middle; width:205px;" arcsize="19%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                <a href="http://localhost:3000/resetPassword" target="_blank" class="v-button" style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(255, 255, 255); background: rgb(24, 22, 58); border-radius: 10px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; font-size: 14px; line-height: inherit;"><span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Reset Password</span></span></a>
                <!--[if mso]></center></v:roundrect><![endif]-->
            </div>

                </td>
                </tr>
            </tbody>
            </table>

            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
            </div>
            </div>
            


            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
                
            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
            </div>
            </div>
            


                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
            </body>

            </html>


        `

        sendEmail({to: email, subject: 'Reset Your Password', html})
        return res.send({message: 'Check Your Email To Reset Your Password', token})
    }
)

export const resetPassword = asyncHandler(

    async (req, res, next) => {

        const {token} = req.params
        const {password} = req.body

        const decoded = jwt.verify(token, process.env.FORGET_PASSWORD_SIGNATURE)

        if(!decoded){
            return next(new Error('Invalid Token'))
        }

        const checkUser = await userModel.findById(decoded.id)

        if(!checkUser){
            return res.send(`<h1>Ops, Your account does not exist, <a href="http://localhost:3000/signup">Signup</a></h1>`)
        }

        const checkPassword = bcrypt.compareSync(password, checkUser.password)

        if(checkPassword){
            return next(new Error('Old Password and New Password are same'))
        }

        const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND)

        const user = await userModel.updateOne({_id: decoded.id}, {password: hashPassword})

        sendEmail({to: checkUser.email, subject: 'Reset Your Password', html: `<h1>Password Changed Successfully</h1>`})

        return res.send({message: 'Password Changed Successfully'})
    }

)
 
export const profilePicture = asyncHandler(

    async(req, res, next) => {

        const user = req.user
        
        const {public_id, secure_url} = await cloudinary.uploader.upload(req.file.path, {
            folder: `TO_DO_LIST/users/profile/${user._id}`,
            public_id: user._id
        })

        const newUser = await userModel.updateOne({_id: user._id}, {profilePicture: {public_id, secure_url}})
        return res.send({message: 'Picture Uploaded Successfully'})
    }

)


export const deleteUser = asyncHandler(
    async (req, res, next) => {
        const checkUser = await userModel.findById(req.user._id)
        if(!checkUser){
            return next(new Error('User Not Found'))
        }
        if(checkUser.profilePicture.public_id){
            await cloudinary.uploader.destroy(checkUser.profilePicture.public_id)
            await cloudinary.api.delete_folder(`TO_DO_LIST/users/profile/${checkUser._id}`)
        }
        await userModel.deleteOne({_id: req.user._id})
        return res.send({message: 'User Deleted Successfully'})
    }
)