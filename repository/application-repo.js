import Application from '../model/application.js'
import Attachment from "../model/attachment.js";
import fs from "fs-extra";
import { readFile, writeFile } from 'fs/promises'
import {fileURLToPath} from "url";
import accountRepo from "./account-repo.js" ;

class ApplicationRepo {


    async initDb() {
        try {

            const apps = await fs.readJson('data/applications.json');
            for (const app of apps)
                await this.addApplication(app)
        }
        catch (err) {
            console.log(err);
        }
    }

    async addApplication(app){
        return Application.create(app)
    }

     async getAllApplications(userId) {
         return Application.find({userId: userId})
    }

    async updateApplication(app){
        return Application.updateOne({_id: app._id},app)
    }

    async getApplication(id){
        return Application.findOne({_id: id})
    }

    // admin
    async getAllApps(){
        return Application.find() ;
    }
    async filterByStatus(status){
       return Application.find({Status:status})
    }
    async filterByYear(y1,y2){
        return Application.find({
            'AY': { '$gte': y1, '$lte': y2}
        })
    }

    // --------------------------------------------------------
    async getAttachment(appId) {
        // GET path
        const attachments = await Attachment.find({appId: appId});
        return attachments;
    }

    async addAttachment(appId){
        const currentUrl = new URL('./', import.meta.url);
        const currentPath = fileURLToPath(currentUrl);
    }

    async saveFiles(files,appId) {
        //const fileList = Object.keys(files);
        const uploadedFiles = [];
        if (Array.isArray(files.attachmentInput)) {
            for (let file of files.attachmentInput) {
                file['name'] = appId +"__" + file['name']
                console.log(file['name'])
                await this.saveFile(file);
                uploadedFiles.push(`/uploads/${file.name}`);
            }
        } else {
            // console.log(files.attachmentInput['name'])
            files.attachmentInput['name'] = appId +"__" + files.attachmentInput['name']
            await this.saveFile(files.attachmentInput);
            uploadedFiles.push(`/uploads/${files.attachmentInput.name}`);
        }

        return uploadedFiles;
    };

    async saveFile (file) {
        const fileName = file.name;
        const fileContent = await readFile(file.path);
        await writeFile(`./uploads/${fileName}`, fileContent);
        return "file saved successfully.";
    };

    async saveUserDetails (appId,path,username)  {
        const acc = await accountRepo.getAccount(username)
        const temp ={
            appId : appId  ,
            path: path.toString() ,
            writtenBy: acc['type']
        }
        await Attachment.create(temp) ;
    };

    async deleteAttachment(id){
        try {
            const path = await  Attachment.findOne({_id: id})
            const attachments = await Attachment.deleteOne({_id: id});
            console.log(path['path'])
             await fs.remove("."+path['path'])
            return attachments
        }
        catch (err){
            console.log(err)
        }

    }

}

export default new ApplicationRepo()