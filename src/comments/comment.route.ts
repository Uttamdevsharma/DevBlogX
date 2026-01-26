import express from 'express'

import auth, { UserRole } from '../middleware/auth';
import { commentController } from './comment.controller';

const commentRouter = express.Router();

commentRouter.post(
    "/",
    auth(UserRole.USER,UserRole.ADMIN),
    commentController.createComment
)

export default commentRouter; 