import mongoose,{Schema} from "mongoose";


const productSchema = new Schema({
    name:{
        type: String,
        required:true
     },
     description:{
        type:String,
        required:true,
     },
     price:{
        type:Number,
        required:true
     },
     stockQuantity:{
        type:Number,
        required:true
     },
     category:{
        type:String,
     },
     images:[{
        type:String,

     }]
    
},
{
    timestamps:true
}
)

export default Product = mongoose.model("Product", productSchema);