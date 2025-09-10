import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },
    productId:{
        type: mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    }
},
{
    timestamps:true,
})
export default Cart = mongoose.model("Cart", cartSchema)