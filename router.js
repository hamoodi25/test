import express from 'express'
import appService from "./service/app-service.js";
const router = express.Router()

// login
router.route('/login')
    .get(appService.isAuthorized) // OK! (?username=XXX&password=XXXX) or (unique=XXXX)
    .post(appService.addAccount) // OK!

// update account
router.route("/account/:userId")
    .get(appService.getAccount) //OK(by ID)(?username= ) BUT why we need the rest of getAccount function ?
    .put(appService.updateAccount) // OK!
    .delete(appService.deleteAccount)

// user page
router.route("/account/:userId/applications")
    .get(appService.getAllApplications)  // OK!
    .post(appService.addApplication) // OK !
    .put(appService.updateApplication) // OK!


router.route("/account/:username/:applicationId/attachments")
    .get(appService.getAttachment)
    .post(appService.addAttachment)
    .delete(appService.deleteAttachment)


//admin
router.route("/admin/applications")
    .get(appService.adminApplications) //OK!

router.route("/admin")
    .get(appService.getAdmin) //OK!
    .put(appService.updateAdmin)

export default router