import mongoose from "mongoose" ;

const assetSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'User' ,
            required: true ,
            
        },

        name:{
            type:String ,
            required:true ,
            trim: true ,
        },

        category: {
            type: String ,
            enum: ['Electronics' ,'Furniture' , 'Bike' , 'Car' , 'Phone' , 'Laptop' ,'stationery' , 'Other'],
            required: true ,

        },

        quantity: {
            type: Number ,
            required: true,
            min: 0,
        },

        price: {
            type: Number ,
            required: true,
            min: 0,
        },

        supplier: {
            type:String ,
            required: true,
        },

        purchaseDate: {
            type: Date,
            default:Date.now ,

        },
        lowStockThreshold: {
            type: Number,
            required: true,
            min: 0,
            default: 5,
         },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'User',
            required : true,

        },



    },
    {timestamps:true},
)


export default mongoose.model('Asset' , assetSchema);