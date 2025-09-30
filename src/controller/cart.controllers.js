import asyncHandler from "../utils/asynchandler";
import { Cart } from "../models/cart.models.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js"

const addProductToCart = asyncHandler(async(req,res)=>{
    const UserId = req.user._id;
    const {productId,quantity} = req.body;
    if (!productId || !quantity || quantity<1) {
        throw new ApiError(400, "ProductId and quantity are required");
        
    }
    const cart = await Cart.findOne({UserId})
    if(!cart){
        Cart = new cart({UserId , products:[]})
    }

    const existingProductIndex = cart.products.findIndex(
        (items)=> items.productId.toString() === productId
    );
    if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
        
    }
    else{
        cart.products.push({productId,quantity})
    }

    await cart.save();
    
    return res.status(200).json(
        new ApiResponse(200, cart, "Product added to cart successfully")
    )
});

const deleteProductFromCart = asyncHandler(async(req,res)=>{
    const UserId = req.user._id;
    const {productId} = req.body;
    if (!productId) {
        throw new ApiError(400, "ProductId is required");
        
    }
    const cart = await cart.findOne({UserId});
    if (!cart) {
        new ApiError(404, "Cart not found");
    }
    cart.products = cart.products.filter(
        (items)=> items.productId.toString() !== productId
    )
    await cart.save();
      return res
        .status(200)
        .json(new apiresponse(200, cart, "item remove successfully !"));

})

const listTheCart = asyncHandler(async(req,res)=>{
    const UserId = req.user._id;
    const cart = await cart.findOne({UserId}).select("-__v -createdAt -updatedAt")
    return res 
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"))
});

export { addProductToCart, deleteProductFromCart, listTheCart }