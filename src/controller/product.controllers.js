import Product from "../models/product.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import jwt from "jsonwebtoken";

const productREGISTER = asyncHandler(async (req, res) => {
  const { name, description, price, stockQuantity, category } = req.body;
  if (
    name || typeof name !== "string" || name.trim() === "" ||  
    description || typeof description !== "string" || description.trim() === "" || 
    price === undefined || price === null ||
    stockQuantity === undefined || price === null ||
    category || typeof description !== "string" || description.trim() === "" 
    // trim error ayega fix kr liyo theek hai
  ) {
    throw new ApiError(400, "something went wrong ");
  }

  const existedPRODUCT = await Product.findOne({ name });
  if (existedPRODUCT) {
    throw new ApiError(400, "product is already register");
  }

  const product = await Product.create({
    name,
    description,
    price,
    stockQuantity,
    category,
  });
  const createPRODUCT = await Product.findById(product._id)
  if (!createPRODUCT) {
    throw new ApiError(400, "something went wrong");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createPRODUCT, "product is created successfully")
    );
});

const getPRODUCT = asyncHandler(async (req, res) => {
  const product = await Product.find({}).select(
    "-id -createdAt -updatedAt -__v"
  );
  return res
    .status(201)
    .json(new ApiResponse(200, product, "data fetch successfully"));
});

export { productREGISTER, getPRODUCT };
