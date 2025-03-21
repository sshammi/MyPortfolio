/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TProject } from "./project.interface";
import Project from "./project.model";

// Create a new order

const createOrder = async (payload : TProject) => {
  const bike = await Project.create(payload);
  const populatedBike = await Project.findById(bike._id);
  return populatedBike;
};

// Get all orders with filtering, sorting, and pagination
const getAllOrders = async () => {
    const orders = await Project.find();
    return orders;
};

// Get a single order by ID
const getOrderById = async (orderId: string) => {
  const order = await Project.findById(orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return order;
};

// Update an order by ID
const updateOrder = async (orderId: string, updateData: Partial<TProject>) => {
  const updatedOrder = await Project.findByIdAndUpdate(orderId, updateData, { new: true });
  if (!updatedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return updatedOrder;
};

// Delete an order by ID
const deleteOrder = async (orderId: string) => {
  const deletedOrder = await Project.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return deletedOrder;
};


const getOrdersByEmail = async (email: string) => {
  const orders = await Project.find({ customerEmail: email });
  if (!orders.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "No orders found for this email");
  }
  return orders;
};

// Export services
export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByEmail,
};
