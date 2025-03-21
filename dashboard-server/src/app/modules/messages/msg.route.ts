import express from 'express'
import { MessageController } from './msg.controller';

const router=express.Router();

router.post('',MessageController.createMessage);

router.get('',MessageController.getMessages)

router.delete('/:id',MessageController.deleteMessage);

export const MsgRoutes=router;