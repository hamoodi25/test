import mongoose from 'mongoose'
const Schema = mongoose.Schema

const options = {
    toJSON :{
        virtuals : true
    }
}

const accountSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required:[true,"must have username"]
    },
    password:{
        type:String,
        required:[true,"must have username"]
    },
    fatherEmail:{
        type:String,
        required:[true,"must have username"]
    },
    fatherFirstName:{
        type:String,
        required:[true,"must have username"]
    },
    fatherHomePhone:{
        type:Number,
        required:[true,"must have username"]
    },
    fatherLastName:{
        type:String,
        required:[true,"must have username"]
    },
    fatherMobile:{
        type:Number,
        required:[true,"must have username"]
    },
    fatherNameofEmployer:{
        type:String,
        required:[true,"must have username"]
    },
    fatherNationalID:{
        type:String,
        required:[true,"must have username"]
    },
    fatherOccupation:{
        type:String,
        required:[true,"must have username"]
    },
    motherEmail: {
        type: String,
        required: [true, "must have username"]
    },
    motherFirstName: {
        type: String,
        required: [true, "must have username"]
    },
    motherHomePhone:{
        type: Number,
        required: [true, "must have username"]
    },
    motherLastName:{
        type: String,
        required: [true, "must have username"]
    },
    motherMobile:{
        type: Number,
        required: [true, "must have username"]
    },
    motherNameofEmployer:{
        type: String,
        required: [true, "must have username"]
    },
    motherNationalID:{
        type: String,
        required: [true, "must have username"]
    },
    motherOccupation:{
        type: String,
        required: [true, "must have username"]
    },
    type:{
        type: String,
        enum: ['admin','user'],
        required: [true, "must have username"]
    },
    AY:{
        type: Number,
    }
} , options)

accountSchema.virtual('userId').get(function (){
    return this._id
})

export default mongoose.model('Account', accountSchema)