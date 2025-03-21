import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillServices } from "./skill.services";

// Controller to create a new order
const createSkill = catchAsync(async (req, res) => {
    const result = await SkillServices.createskill(req.body);
    sendResponse(res, {
        success: true,
        message: "Skill created successfully",
        statusCode: StatusCodes.CREATED,
        data: { result },
    });
});

// Controller to get all orders
const getAllSkills = catchAsync(async (req, res) => {
    const orders = await SkillServices.getAllSkills();

    sendResponse(res, {
        success: true,
        message: "Skill fetched successfully",
        statusCode: StatusCodes.OK,
        data: orders,
    });
});

// Controller to get a single order
const getSingleSkill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const order = await SkillServices.getSkillById(id);

    sendResponse(res, {
        success: true,
        message: "SKill fetched successfully",
        statusCode: StatusCodes.OK,
        data: order,
    });
});

// Controller to update an order
const updateSkill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillServices.updateSkill(id, req.body);

    sendResponse(res, {
        success: true,
        message: "Skill updated successfully",
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

// Controller to delete an order
const deleteSkill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillServices.deleteSkill(id);

    sendResponse(res, {
        success: true,
        message: "Skill deleted successfully",
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

export const SkillController = {
    createSkill,
    getAllSkills,
    getSingleSkill,
    updateSkill,
    deleteSkill,
};
