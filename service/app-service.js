import accountRepo from '../repository/account-repo.js'
import applicationRepo from '../repository/application-repo.js'
import formidable from "formidable";
import {fileURLToPath} from "url";


class AppService {

    async isAuthorized(req, res) {
        if(req.query.unique)
        {
            let flag = await accountRepo.uniqueUsername(req.query.unique)
            // console.log(! flag.length)
            res.status(200).json(! flag.length)
            return ;
        }

        const account = await accountRepo.isAuthorized(req.query.username, req.query.password)
        res.status(200).json(account)
    }

    async addAccount(req, res) {
        const account = await accountRepo.addAccount(req.body)
        res.status(200).json(account)
    }

    async updateAccount(req, res) {
        const account = await accountRepo.updateAccount(req.body)
        res.status(200).json(account)
    }


    async getAllApplications(req, res) { // for user
        if (req.query.username){
            const apps = await applicationRepo.getAllApplications((await accountRepo.getAppUserID(req.query.username))._id)
            console.log((await accountRepo.getAppUserID(req.query.username))._id)
            res.status(200).json(apps)
            return ;
        }
        else if (Object.keys(req.query).length > 0) {
            const app = await applicationRepo.getApplication(req.query._id)
            res.status(200).json(app)
            return ;
        } else {
            const apps = await applicationRepo.getAllApplications(req.params.userId)
            res.status(200).json(apps)
        }
    }


    async addApplication(req, res) {
        const app = await applicationRepo.addApplication(req.body)
        res.status(200).json(app)
    }

    async updateApplication(req, res) {
        const app = await applicationRepo.updateApplication(req.body)
        res.status(200).json(app)
    }

    //Admin
    async getAccount(req, res) {
        try {
            if(req.query.username) {
                const user = await accountRepo.getAccount(req.query.username)
                res.status(200).json(user)
            }
            else if (req.params.userId) {
                let temp = (await accountRepo.getAppUsername(req.params.userId))
                if(! temp) {
                    res.status(200).send("User ID is invalid")
                    return
                }
                temp =temp.username
                const user = await accountRepo.getAccount( temp )
                res.status(200).json(user)
            }
        }
        catch (err) {
            console.log(err)
            res.status(200).send()
        }
    }

    // query
    async adminApplications(req, res) {
        let apps
        if (req.query.Status && req.query.Status!= "all"){
            apps = await applicationRepo.filterByStatus(req.query.Status)
        }else if (req.query.year1 && req.query.year2){
            console.log(req.query.year1 , req.query.year2)
            apps = await applicationRepo.filterByYear(req.query.year1 , req.query.year2)
        }else{
            apps = await applicationRepo.getAllApps()
        }
        let test = JSON.stringify(apps)
        let data = JSON.parse(test)
        for (const app of data)
            app.username = (await accountRepo.getAppUsername(app.userId)).username
        res.status(200).json(data)
    }

    async deleteAccount(req,res){
        try{
        const user = req.query.username ;
        if(user) {
            await accountRepo.deleteAccount(user)
            res.status(200).send("DELETED successfully ")
            return ;
        }else
            res.status(200).send("Send a username")
        }
        catch (err){
            res.status(200).send("Error")
        }
    }

    async getAdmin(req,res){
        res.status(200).json(await accountRepo.getAdmin())
    }

    async updateAdmin(req,res){
        res.status(200).json(await accountRepo.updateAdmin(req.body))
    }

    // ATTACHMENTS
    async getAttachment(req,res){
        // console.log(await applicationRepo.getAttachment(req.params.applicationId))
        // res.status(200).sendFile((await applicationRepo.getAttachment(req.params.applicationId))[0]['path']) ;

        const att1 = (await applicationRepo.getAttachment(req.params.applicationId)) ;
        // console.log(att1)
        res.status(200).json(att1)
        // res.status(200).json(null) ;

    }

    async addAttachment(req,res){
        const formData = formidable({ multiples: true });

        formData.parse(req, async (err, fields, files) => {
            if (err) {
                return res.send("Something went wrong.");
            }
            const uploadedFiles = await applicationRepo.saveFiles(files,req.params.applicationId);
            await applicationRepo.saveUserDetails(req.params.applicationId,uploadedFiles, req.params.username);

            fields.attachmentInput = uploadedFiles;
            // res.redirect('../public/attachment.html');
            // res.status(200).send("OK")
            res.redirect(req.get('referer'));
        });

    }

    async deleteAttachment(req,res){

        await applicationRepo.deleteAttachment(req.query.attId)
        res.redirect(req.get('referer'));
        // res.send("OK")
    }


}

export default new AppService()