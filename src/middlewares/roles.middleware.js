import asyncHandler from "../utils/asynchandler.js";

import { ApiError } from "../utils/apierror.js";

export const requiredROLE = (role) => asyncHandler(async (req , res ) => {
    if (!req.user) {
        throw new ApiError(400 , "something went wrong")
    }

    if (req.user.role !== role) {
        throw new ApiError(400 , "access denied user need to have seller role")
        
    }

    next()
})