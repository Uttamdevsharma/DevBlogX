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

// get comment by id
commentRouter.get("/:commentId",commentController.getCommentById)

//get comment by author
commentRouter.get('/author/:authorId',commentController.getCommentByAuthor)

export default commentRouter; 