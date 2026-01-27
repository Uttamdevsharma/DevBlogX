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
commentRouter.get("/:commentId",
    auth(UserRole.USER,UserRole.ADMIN),
    commentController.getCommentById)

//get comment by author
commentRouter.get('/author/:authorId',
    auth(UserRole.USER,UserRole.ADMIN),
    commentController.getCommentByAuthor)

//delete comment
commentRouter.delete('/:commentId',
    auth(UserRole.USER,UserRole.ADMIN),
    
)

export default commentRouter; 