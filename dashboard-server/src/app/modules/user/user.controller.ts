import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email,
        },
    });
});

const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params; 
    const user = await userServices.getSingleUserFromDB(id);

    sendResponse(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: user,
    });
});

const updateUserProfile = catchAsync(async (req, res) => {
    const { id } = req.params; // Assuming user ID is passed in params
    const updateData = req.body; // Assuming updated user data is sent in the body

    const updatedUser = await userServices.updateUserProfile(id, updateData);

    sendResponse(res, {
        success: true,
        message: "User profile updated successfully",
        statusCode: 200,
        data: updatedUser,
    });
});

export const userController = {
    createUser,
    getSingleUser,
    updateUserProfile,
};

