import mongoose from 'mongoose'

const Schema = mongoose.Schema

const options = {
    toJSON: {
        virtuals: true
    }
}
const applicationSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "must have first name"]
    },
    lastName: {
        type: String,
        required: [true, "must have lsat name"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "must have date of birth"]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "must have gender"]
    },
    currentSchoolGrade: {
        type: Number,
        required: [true, "must have CSG"]
    },
    gradeApplyingFor: {
        type: Number,
        required: [true, "must have GAF"]
    },
    Resident: {
        type: String,
        enum: ["yes", "no"],
        required: [true, "must answer"]
    },
    Status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Withdrawn", "Waitinglist", "Submitted"],
        required: [true, "choose"]
    },
    date: {
        type: Date,
        required: [true, "must have date"]
    },
    AY: {
        type: Number,
        required: [true, "must have Application Year"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, 'userId can not be null, please provide a value']
    }
}, options)

applicationSchema.virtual('appId').get(function () {
    return this._id
})

export default mongoose.model('Application', applicationSchema)