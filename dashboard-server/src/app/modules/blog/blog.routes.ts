import express from 'express'
import { BlogController } from '../blog/blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router=express.Router();

router.post('',validateRequest(BlogValidation.BlogCreateValidationSchema),BlogController.createBlog)
router.patch('/update/:id',validateRequest(BlogValidation.BlogUpdateValidationSchema),BlogController.updateBlog)
router.delete('/:id',BlogController.deleteBlog)
router.get('',BlogController.getAllBlogs)
router.get('/:id',BlogController.getSingleBlogs)

export const BlogRoutes=router;