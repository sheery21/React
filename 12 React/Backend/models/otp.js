import mongoose from "mongoose";

const OTPSchema = mongoose.Schema({
    otp : {
        type : String ,
        requied : true
    },
    email : {
        type : String ,
        requied : true
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