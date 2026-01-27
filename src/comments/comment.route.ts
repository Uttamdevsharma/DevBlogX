import express from 'express'

import auth, { UserRole } from '../middleware/auth';
import { commentController } from './comment.controller';

const commentRouter = express.Router();


//create comment
commentRouter.post(
    "/",
    auth(UserRole.USER,UserRole.ADMIN),
    commentController.createComment
)

// get comment
commentRouter.get("/:commentId",)

export default commentRouter; 