import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';
import { ProjectController } from './project.controller';

const router=express.Router();

router.post('',validateRequest(ProjectValidation.ProjectCreateValidationSchema),ProjectController.createOrder)

// router.get('/myOrders',auth('customer'),OrderController.getOrdersByEmail)

// router.get('/verify', auth('customer'), OrderController.verifyPayment);

router.patch('/update/:id',ProjectController.updateOrder)

router.get('/:id',ProjectController.getSingleOrder)

router.delete('/:id',ProjectController.deleteOrder)


router.get('',ProjectController.getAllOrders)



export const ProjectRoutes=router;