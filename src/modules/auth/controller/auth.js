import userModel from '../../../../DB/model/User.model.js'
import {asyncHandler} from '../../../utils/errorHandler.js'
import { sendEmail } from '../../../utils/sendEmail.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signup = asyncHandler(
    async(req, res, next) => {

        const {name, username, email, password} = req.body

        const checkUser = await userModel.findOne({
            $or: [
                {email},
                {username}
            ]
        })

        if(checkUser){
            return next(new Error('username or email already exist'))
        }

        const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND)

        const user = await userModel.create({name, username, email, password: hashPassword})

        const token = jwt.sign({id: user._id}, process.env.CONFIRM_SIGNATURE, {expiresIn: '1d'})

        const reconfirmToken = jwt.sign({id: user._id}, process.env.CONFIRM_SIGNATURE, {expiresIn: '3d'})

        const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body {
        min-width: 100%;
        Margin: 0px;
        padding: 0px;
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t36,.t41{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t37{padding:40px!important;border-radius:0!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&amp;family=Roboto:wght@700&amp;family=Open+Sans:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t44" style="min-width:100%;Margin:0px;padding:0px;background-color:#FFFFFF;"><div class="t43" style="background-color:#FFFFFF;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t42" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#FFFFFF;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#FFFFFF"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t36" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t40" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="600" class="t39" style="width:600px;">
        <table class="t38" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t37" style="border:1px solid #EBEBEB;overflow:hidden;background-color:#FFFFFF;padding:44px 42px 32px 42px;border-radius:3px 3px 3px 3px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="42" class="t3" style="width:42px;">
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t1"><div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="42" height="42" alt="" src="https://cdn-icons-png.flaticon.com/512/2490/2490402.png"/></div></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:42px;line-height:42px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="514" class="t9" style="width:600px;">
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t7" style="border-bottom:1px solid #EFF1F4;padding:0 0 18px 0;"><h1 class="t6" style="margin:0;Margin:0;font-family:Montserrat,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1px;direction:ltr;color:#141414;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Confirm Your Account</h1></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t11" style="mso-line-height-rule:exactly;mso-line-height-alt:18px;line-height:18px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="514" class="t15" style="width:600px;">
        <table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t13"><p class="t12" style="margin:0;Margin:0;font-family:Open Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:25px;font-weight:400;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.1px;direction:ltr;color:#141414;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Please click the button below to confirm your email address and finish setting up your account. This link is valid for 1day.</p></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t18" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t22" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="514" class="t21" style="width:600px;">
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t19" style="overflow:hidden;background-color:#FFC9C9;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:10px 10px 10px 10px;border-radius:20px 20px 20px 20px;"><a class="t17" href="http://localhost:5000/auth/confirmEmail/${token}" style="display:block;margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;" target="_blank">Confirm</a></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t24" style="mso-line-height-rule:exactly;mso-line-height-alt:21px;line-height:21px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="457" class="t27" style="width:457px;">
        <table class="t26" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t25"><p class="t23" style="margin:0;Margin:0;font-family:Open Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:25px;font-weight:400;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.1px;direction:ltr;color:#141414;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">To ask for another email to confirm your account, click on this link:&nbsp;</p></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t31" style="mso-line-height-rule:exactly;mso-line-height-alt:19px;line-height:19px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t35" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="94" class="t34" style="width:94px;">
        <table class="t33" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t32" style="background-color:#FFFFFF;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;"><a class="t30" href="${req.protocol}://${req.headers.host}/auth/reConfirmEmail/${reconfirmToken}" style="display:block;margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;" target="_blank"><span class="t29" style="margin:0;Margin:0;text-decoration:underline;mso-line-height-rule:exactly;">ReConfirm</span></a></td></tr></table>
        </td></tr></table>
        </td></tr></table></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t41" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>
    `
        sendEmail({to: email, subject: 'Verify Your Email', html})
        return res.send({message: 'Done', user})
    }
)



export const confirmEmail = asyncHandler(

    async (req, res, next) => {

        const {token} = req.params

        let decodedData

        jwt.verify(token, process.env.CONFIRM_SIGNATURE, (err, decoded) => {

            if(err){
                return res.send(`<h1>Ops, This link is not valid, you will find another link to confirm your account in the same email</h1> `)
            }

            decodedData = decoded
        })

        const checkUser = await userModel.findById(decodedData.id)
        
        if(!checkUser){
            return res.send(`<h1>Ops, Your account does not exist, <a href="http://localhost:3000/signup">Signup</a></h1> `)
        }

        const user = await userModel.updateOne({_id: checkUser._id}, {confirmEmail: true})

        return res.redirect('http://localhost:3000/login')
    }

)


export const reConfirmEmail = asyncHandler(

    async (req, res, next) => {

        const {token} = req.params

        const decoded= jwt.verify(token, process.env.CONFIRM_SIGNATURE)

        const checkUser = await userModel.findById(decoded.id)

        if(checkUser.confirmEmail){
            return res.redirect('http://localhost:3000/login')
        }

        const reConfirmToken = jwt.sign({id: checkUser._id}, process.env.CONFIRM_SIGNATURE, {expiresIn: '1d'})

        const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
        <title></title>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta name="x-apple-disable-message-reformatting" content="" />
        <meta content="target-densitydpi=device-dpi" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width=device-width" name="viewport" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <style type="text/css">
        table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt
        }
        table td {
        border-collapse: collapse
        }
        .ExternalClass {
        width: 100%
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height: 100%
        }
        body, a, li, p, h1, h2, h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        }
        html {
        -webkit-text-size-adjust: none !important
        }
        body {
        min-width: 100%;
        Margin: 0px;
        padding: 0px;
        }
        body, #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
        }
        #innerTable img+div {
        display: none;
        display: none !important
        }
        img {
        Margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic
        }
        h1, h2, h3, p, a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word
        }
        a {
        text-decoration: none
        }
        h1, h2, h3, p {
        min-width: 100%!important;
        width: 100%!important;
        max-width: 100%!important;
        display: inline-block!important;
        border: 0;
        padding: 0;
        margin: 0
        }
        a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important
        }
        u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
        color: inherit;
        text-decoration: none
        }
        </style>
        <style type="text/css">
        @media (min-width: 481px) {
        .hd { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .hm { display: none!important }
        }
        </style>
        <style type="text/css">
        @media (max-width: 480px) {
        .t36,.t41{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t37{padding:40px!important;border-radius:0!important}
        }
        </style>
        <!--[if !mso]>-->
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&amp;family=Roboto:wght@700&amp;family=Open+Sans:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        </head>
        <body id="body" class="t44" style="min-width:100%;Margin:0px;padding:0px;background-color:#FFFFFF;"><div class="t43" style="background-color:#FFFFFF;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t42" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#FFFFFF;" valign="top" align="center">
        <!--[if mso]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
        <v:fill color="#FFFFFF"/>
        </v:background>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t36" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t40" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="600" class="t39" style="width:600px;">
        <table class="t38" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t37" style="border:1px solid #EBEBEB;overflow:hidden;background-color:#FFFFFF;padding:44px 42px 32px 42px;border-radius:3px 3px 3px 3px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
        <table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="42" class="t3" style="width:42px;">
        <table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t1"><div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="42" height="42" alt="" src="https://cdn-icons-png.flaticon.com/512/2490/2490402.png"/></div></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t5" style="mso-line-height-rule:exactly;mso-line-height-alt:42px;line-height:42px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t10" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="514" class="t9" style="width:600px;">
        <table class="t8" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t7" style="border-bottom:1px solid #EFF1F4;padding:0 0 18px 0;"><h1 class="t6" style="margin:0;Margin:0;font-family:Montserrat,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1px;direction:ltr;color:#141414;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Confirm Your Account</h1></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t11" style="mso-line-height-rule:exactly;mso-line-height-alt:18px;line-height:18px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t16" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="514" class="t15" style="width:600px;">
        <table class="t14" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t13"><p class="t12" style="margin:0;Margin:0;font-family:Open Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:25px;font-weight:400;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.1px;direction:ltr;color:#141414;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Please click the button below to confirm your email address and finish setting up your account. This link is valid for 1day.</p></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t18" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t22" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="514" class="t21" style="width:600px;">
        <table class="t20" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t19" style="overflow:hidden;background-color:#FFC9C9;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:10px 10px 10px 10px;border-radius:20px 20px 20px 20px;"><a class="t17" href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${reConfirmToken}" style="display:block;margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;" target="_blank">Confirm</a></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t24" style="mso-line-height-rule:exactly;mso-line-height-alt:21px;line-height:21px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t28" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="457" class="t27" style="width:457px;">
        </td></tr></table>
        </td></tr><tr><td><div class="t31" style="mso-line-height-rule:exactly;mso-line-height-alt:19px;line-height:19px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
        <table class="t35" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="94" class="t34" style="width:94px;">
        </td></tr></table>
        </td></tr></table></td></tr></table>
        </td></tr></table>
        </td></tr><tr><td><div class="t41" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
        </html>
    `

        sendEmail({to: checkUser.email, subject: 'Verify Your Email', html})
        return res.send(`<h1>Check Your Email</h1>`)
    }

) 


export const login = asyncHandler(

    async (req, res, next) => {

        const {email, password} = req.body

        const checkUser = await userModel.findOne({email})

        if(!checkUser){
            return next(new Error('User Not Found'))
        }

        if(!checkUser.confirmEmail){
            return next(new Error('Please Verify Your Email'))
        }

        const checkPassword = bcrypt.compareSync(password, checkUser.password)
        if(!checkPassword){
            return next(new Error('Invalid Email or Password'))
        }
        
        const token = jwt.sign({id: checkUser._id}, process.env.LOGIN_SIGNATURE, {expiresIn: '1h'})

        const user = await userModel.updateOne({_id: checkUser._id}, {token})

        return res.send({message: 'Done', token})
    }

)