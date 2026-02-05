import express from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";
const postRouter = express.Router();

//create post
postRouter.post("/", auth(UserRole.USER,UserRole.ADMIN), postController.createPost);

//get post
postRouter.get("/", postController.getAllPost);

//get my post
postRouter.get("/my-posts",auth(UserRole.USER,UserRole.ADMIN),
postController.getMyPosts
);

//get single post
postRouter.get("/:id", postController.getPostById);



export default postRouter;
