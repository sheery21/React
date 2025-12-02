import mongoose from "mongoose";

const OTPSchema = mongoose.Schema({
    otp : {
        type : String ,
        required  : true
    },
    email : {
        type : String ,
        required  : true
    },
    isUsed : {
        type : Boolean ,
        default :false
    },
    
},
{timestamps : true}
)

const OTPModel = mongoose.model("OTP" ,OTPSchema)

export default OTPModel;