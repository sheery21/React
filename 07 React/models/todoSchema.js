import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    task : {
        type : String
    }
})

const todoModels = mongoose.model('Todo' , todoSchema)

export default todoModels