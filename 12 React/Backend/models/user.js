import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String ,
        requied : true
    },
    mobileNUmber : {
        type : String,
        requied : true
    },
    email : {
        type : String ,
        requied : true
    },
    password : {
        type : String ,
        requied : true
    },
    isVerifisd : {
        type : Boolean,
        default : false
    }
},
{timestamps : true}
)

const UserModel = mongoose.model("user" ,userSchema)

export default UserModel;