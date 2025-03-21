import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MessageService } from "./msg.services";

// Controller to create a new message
const createMessage = catchAsync(async (req, res) => {
    const result = await MessageService.createMessage(req.body);

    sendResponse(res, {
        success: true,
        message: "Message created successfully",
        statusCode: StatusCodes.CREATED,
        data: { result },
    });
});

// Controller to get all messages
const getMessages = catchAsync(async (req, res) => {
    const messages = await MessageService.getAllMessages();

    sendResponse(res, {
        success: true,
        message: "Messages fetched successfully",
        statusCode: StatusCodes.OK,
        data: messages,
    });
});


const deleteMessage = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MessageService.deleteMessage(id);

    sendResponse(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

export const MessageController = {
    createMessage,
    getMessages,
    deleteMessage,
};
