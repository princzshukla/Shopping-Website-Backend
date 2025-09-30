import asyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import Order from "../models/order.models.js"



export const createOrder = asyncHandler(async (req, res) => {
  const { productIds, totalAmount } = req.body;
  const userId = req.user._id; // assuming you have auth middleware

  if (!productIds || productIds.length === 0) {
    throw new ApiError(400, "No products provided in the order");
  }

  const order = await Order.create({
    userId,
    productIds,
    totalAmount,
  });

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});

// 2. Get all orders (admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("productIds", "name price");

  res.status(200).json(new ApiResponse(200, orders, "All orders fetched"));
});

// 3. Get orders for a specific user
export const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ userId }).populate(
    "productIds",
    "name price"
  );

  res.status(200).json(new ApiResponse(200, orders, "User orders fetched"));
});

// 4. Get single order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("userId", "name email")
    .populate("productIds", "name price");

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order details fetched"));
});

// 5. Update order status (Admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["processing", "shipped", "delivered"].includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order status updated"));
});

// 6. Delete order (optional)
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new ApiError(404, "Order not found");

  res
    .status(200)
    .json(new ApiResponse(200, null, "Order deleted successfully"));
});
