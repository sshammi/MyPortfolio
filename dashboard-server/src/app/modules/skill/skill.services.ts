/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TSkill } from "./skill.interface";
import Skill from "./skill.model";

// Create a new order

const createskill = async (payload : TSkill) => {
  const bike = await Skill.create(payload);
  const populatedBike = await Skill.findById(bike._id);
  return populatedBike;
};

// Get all orders with filtering, sorting, and pagination
const getAllSkills = async () => {
    const orders = await Skill.find();
    return orders;
};

// Get a single order by ID
const getSkillById = async (orderId: string) => {
  const order = await Skill.findById(orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return order;
};

// Update an order by ID
const updateSkill = async (orderId: string, updateData: Partial<TSkill>) => {
  const updatedOrder = await Skill.findByIdAndUpdate(orderId, updateData, { new: true });
  if (!updatedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return updatedOrder;
};

// Delete an order by ID
const deleteSkill = async (orderId: string) => {
  const deletedOrder = await Skill.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return deletedOrder;
};


// Export services
export const SkillServices = {
  createskill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
