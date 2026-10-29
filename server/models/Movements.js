import mongoose from "mongoose";


const movementSchema = new  mongoose.Schema(
    {
        ownerId:{
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'User' ,
            required: true ,
        },

        assetId:{
            type : mongoose.Schema.Types.ObjectId ,
            ref: 'Asset' ,
            required: true ,

        },

        type: {
            type: String ,
            enum: ['created' , 'restocked' , 'issued'],
            required: true ,
        },

        quantity:{
            type: Number ,
            required: true ,
            min: 0,
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'User' ,
            required: true ,
        },

          recipient: {
            type: String,
            default: '-',
        },
        destination: {
            type: String,
            default: '-',
        },
       paymentStatus: { 
            type: String,
            enum: ['paid', 'unpaid', 'n/a'],
            default: 'n/a',
        },
    },
    {timestamps:true},
)

export default mongoose.model('Movement' , movementSchema);