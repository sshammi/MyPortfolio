import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./project.services";
import AppError from "../../errors/AppError";

// Controller to create a new order
const createOrder = catchAsync(async (req, res) => {
    const result = await OrderServices.createOrder(req.body);
    sendResponse(res, {
        success: true,
        message: "Project created successfully",
        statusCode: StatusCodes.CREATED,
        data: { result },
    });
});

// Controller to get all orders
const getAllOrders = catchAsync(async (req, res) => {
    const orders = await OrderServices.getAllOrders();

    sendResponse(res, {
        success: true,
        message: "Project fetched successfully",
        statusCode: StatusCodes.OK,
        data: orders,
    });
});

// Controller to get a single order
const getSingleOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const order = await OrderServices.getOrderById(id);

    sendResponse(res, {
        success: true,
        message: "Project fetched successfully",
        statusCode: StatusCodes.OK,
        data: order,
    });
});

// Controller to update an order
const updateOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OrderServices.updateOrder(id, req.body);

    sendResponse(res, {
        success: true,
        message: "Project updated successfully",
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

// Controller to delete an order
const deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OrderServices.deleteOrder(id);

    sendResponse(res, {
        success: true,
        message: "Project deleted successfully",
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

const getOrdersByEmail = catchAsync(async (req, res) => {

    const userEmail = req.user?.email;
  
    if (!userEmail) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "User email not found in authentication payload");
    }
  
    const orders = await OrderServices.getOrdersByEmail(userEmail);
  
    sendResponse(res, {
        success: true,
        message: "Orders fetched successfully",
        statusCode: StatusCodes.OK,
        data: orders,
    });
  });
export const ProjectController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getOrdersByEmail,
};
