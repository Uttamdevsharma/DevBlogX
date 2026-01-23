import express from 'express'
import { postController } from './post.controller'
import auth, { UserRole } from '../middleware/auth'
const postRouter = express.Router()

postRouter.post('/',auth(UserRole.USER),postController.createPost)


export default postRouter