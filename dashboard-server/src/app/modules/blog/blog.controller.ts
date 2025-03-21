import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.services";

// Controller to create a new bike (blog)
const createBlog = catchAsync(async (req, res) => {

    const result = await BlogServices.createBikeIntoDB(req.body);
    
    sendResponse(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: StatusCodes.CREATED, // Use CREATED (201) for successful resource creation
        data: { result },
    });
});

// Controller to get all bikes (blogs)
const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await BlogServices.getAllBikes(req.query);

    sendResponse(res, {
        success: true,
        message: "Blog fetched successfully",
        statusCode: StatusCodes.OK,
        meta:blogs.meta,
        data: blogs.result,
    });
});
// Controller to get single bikes (blogs)
const getSingleBlogs = catchAsync(async (req, res) => {
    
    const { id } = req.params; 
    const bike = await BlogServices.getSingleBike(id); 
    sendResponse(res, {
        success: true,
        message: "Blog fetched successfully",
        statusCode: StatusCodes.OK,
        data: bike,
    });
});

// Controller to update a bike (blog)
const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.updateBike(id, req.body); // Update to use `updateBike` service

    sendResponse(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

// New Controller to delete a bike (blog)
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.deleteBike(id);

    sendResponse(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

export const BlogController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog,
    getSingleBlogs
};
