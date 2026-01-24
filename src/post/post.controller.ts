import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

//create post
const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await postService.createPost(req.body, user.id);

    res.status(201).json({ result });
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e
    });
  }
};


//get all post with query
const getAllPost = async (req:Request,res:Response) =>{

  const {search} = req.query
  const searchString = typeof search === "string" ? search : undefined


  const tags = req.query.tags ? (req.query.tags as string).split(",") : []

  
  const isFeatured = req.query.isFeatured 
           ? req.query.isFeatured === "true"
              ? true
               : req.query.isFeatured === "false"
                ? false
                : undefined
            :undefined
            
            
  const status = req.query.status as PostStatus | undefined
  
  const authorId = req.query.authorId  as string | undefined

  const result = await postService.getAllPost({search:searchString,tags,isFeatured,status,authorId})
  res.status(200).json(result)

}

export const postController = {
  createPost,
  getAllPost
};
