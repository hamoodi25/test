import mongoose from 'mongoose'
const Schema = mongoose.Schema

const attachmentSchema = new Schema({
    appId:{
        type : Schema.Types.ObjectId,
        ref : 'Application',
        required : [true, 'appId can not be null, please provide a value']
    },
    path:{
        type:String,
        required : [true, 'path can not be null, please provide a value']
    },
    writtenBy:{
        type:String,
        enum:["admin" , "user"],
        required : [true, 'path can not be null, please provide a value']
    }

} )

export default mongoose.model('Attachment', attachmentSchema)