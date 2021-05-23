import express from 'express'
import router from './router.js'
import mongoose from "mongoose";
import morgan from 'morgan'
import accountRepo from './repository/account-repo.js'
import applicationRepo from './repository/application-repo.js'
import {fileURLToPath} from "url";


//port number
const port = 9000
const app = express()

const uri = 'mongodb://127.0.0.1:27017/SMS'
const option = {useNewUrlParser : true , useUnifiedTopology : true}

mongoose.connect(uri , option , async function(err) {
    if (err) {
        console.log("Failed to connect to monogoDb " + err);
        return;
    }
    else {
        let init = await accountRepo.initDb() ;
        // OR MAKE BOTH IN ONE FUNCTION !
        if(init)
            await applicationRepo.initDb()

        app.listen(port, () => {
            console.log(`Service running on http://localhost:${port}`);
        });
    }
})

//two types [dynamic , static]
app.use(express.static('public'))
//a middleware

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', router)

const currentUrl = new URL('./', import.meta.url);
const currentPath = fileURLToPath(currentUrl);
app.use( express.static(currentPath) );

