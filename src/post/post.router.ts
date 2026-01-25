import express from 'express'
import { postController } from './post.controller'
import auth, { UserRole } from '../middleware/auth'
const postRouter = express.Router()

//create post
postRouter.post('/',auth(UserRole.USER),postController.createPost)

//get post
postRouter.get('/',postController.getAllPost)

//get single post
postRouter.get('/:id',getPostById)

export default postRouter