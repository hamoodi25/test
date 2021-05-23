import Account from '../model/account.js'
import fs from 'fs-extra';

class AccountRepo {

    accountsCount(){
        return Account.countDocuments({});
    }

    async initDb() {
        let init = false
        try {
            const accCount = await this.accountsCount();
            if (accCount == 0)
            {

                const accs = await fs.readJson('data/accounts.json');
                for (const acc of accs)
                    await this.addAccount(acc)
                init = true ;
            }
        }
        catch (err) {
            console.log(err);
        }
        return init ;
    }

    async addAccount(account) {
        return Account.create(account)
    }

     async  isAuthorized(username, password) {
        const account = await this.getAccount(username)
         console.log(account)
        if (account) {
            return account['password'] == password;
        } else {
            return false;
        }
    }

    async getAccount(username) {
        return Account.findOne({username: username})
    }

    async getAllAccounts(){
        return Account.find({})
    }

    async  deleteAccount(username) {
        return Account.deleteOne({username: username})
    }

    async getAdmin(){
        return Account.findOne({type:"admin"})
    }

    async updateAdmin(admin) {
        return Account.updateOne({type:"admin"},admin)
    }

    async updateAccount(account) {
        return Account.updateOne({_id: account.userId},account)
    }

    async getAppUsername(userId){
        const user = Account.findOne({_id:userId} ,{username : 1})
        return user
    }

    async getAppUserID(username){
        const id = Account.findOne({username:username} )
        return id
    }

    async uniqueUsername(username){
        return Account.find({username : username })
    }

}

export default new AccountRepo()