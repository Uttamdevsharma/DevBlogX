import express from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";
const postRouter = express.Router();


//create post
postRouter.post("/", auth(UserRole.USER,UserRole.ADMIN), postController.createPost);

//get post
postRouter.get("/", postController.getAllPost);


//get stats
postRouter.get("/stats", auth(UserRole.USER,UserRole.ADMIN),
postController.getStats

)

//get my post
postRouter.get("/my-posts",auth(UserRole.USER,UserRole.ADMIN),
postController.getMyPosts
);

//get single post
postRouter.get("/:id", postController.getPostById);


//update post by role based
postRouter.patch("/:postId", auth(UserRole.USER,UserRole.ADMIN),
postController.updatePost
)

//delete post
postRouter.delete("/:postId",auth(UserRole.USER,UserRole.ADMIN),
postController.deletePost

)



export default postRouter;
