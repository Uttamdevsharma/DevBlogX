import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSorting from "../../helpers/paginationSorting";
import { UserRole } from "../../middleware/auth";

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
      details: e,
    });
  }
};

//get all post with query
const getAllPost = async (req: Request, res: Response) => {
  const { search } = req.query;
  const searchString = typeof search === "string" ? search : undefined;

  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

  const isFeatured = req.query.isFeatured
    ? req.query.isFeatured === "true"
      ? true
      : req.query.isFeatured === "false"
        ? false
        : undefined
    : undefined;

  const status = req.query.status as PostStatus | undefined;

  const authorId = req.query.authorId as string | undefined;

  const { page, limit, skip, sortBy, sortOrder } = paginationSorting(req.query);

  const result = await postService.getAllPost({
    search: searchString,
    tags,
    isFeatured,
    status,
    authorId,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  });
  res.status(200).json(result);
};

//get single post
const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("post id required");
    }

    const result = await postService.getPostById(id as string);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Post get Failed",
      details: error,
    });
  }
};

//get my posts
const getMyPosts = async(req:Request,res:Response) => {

  try{
    const user =req.user
    if (!user) {
      throw new Error("You are unauthorized!")
  }
    const result = await postService.getMyPosts(user.id)
    res.status(200).json(result)

  }catch(err){
    res.status(400).json({
      error:"Post Fetched failed",
      details : err
    })

  }
}

//update post role based
const updatePost = async(req:Request,res:Response) => {
  try{

    const user = req.user
  if(!user){
    throw new Error("You are unauthorized")
  }

  const {postId} = req.params

  const isAdmin =user.role === UserRole.ADMIN

  const result = await postService.updatePost(postId as string,req.body,user.id,isAdmin)
  res.status(200).json(result)

  }catch(err){
    const errMessage = (err instanceof Error) ? err.message : "Post update failed"
    res.status(400).json({
      error : errMessage,
      details : err
      
    })

  }

}

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  updatePost
};
