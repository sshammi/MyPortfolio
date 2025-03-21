import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SkillValidation } from './skill.validation';
import { SkillController } from './skill.controller';

const router=express.Router();

router.post('',validateRequest(SkillValidation.SkillCreateValidationSchema),SkillController.createSkill)
router.patch('/update/:id',validateRequest(SkillValidation.SKillUpdateValidationSchema),SkillController.updateSkill)
router.delete('/:id',SkillController.deleteSkill)
router.get('',SkillController.getAllSkills)
router.get('/:id',SkillController.getSingleSkill)

export const SkillRoutes=router;