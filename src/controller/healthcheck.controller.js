import { ApiResponse } from "../utils/apiresponse.js";
import asyncHandler from "../utils/asynchandler.js";
const healthchecker = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "ok", "Service is healthy"));
});

export { healthchecker };
