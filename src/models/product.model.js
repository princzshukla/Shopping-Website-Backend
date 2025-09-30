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
   
},
{
    timestamps:true
}
)

const Product = mongoose.model("Product", productSchema);
export default Product;
