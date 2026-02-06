import { Request, Response } from "express";
import { commentService } from "./comment.service";

//create comment
const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentService.createComment(req.body);

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Comment creation FAILED",
      details: error,
    });
  }
};

//get comment by id
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.getCommentById(commentId as string);
    res.status(200).json({
      comment,
    });
  } catch (error) {
    res.status(400).json({
      error: "comment not get",
      details: error,
    });
  }
};

//get comment by author
const getCommentByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentByAuthor(authorId as string);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: "get comment failed",
      details: error,
    });
  }
};

//delete comment
const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const user = req.user;

  const result = await commentService.deleteComment(
    commentId as string,
    user?.id as string,
  );
  return res.status(200).json({
    result,
  });
};

//update comment
const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const user = req.user;
    const result = await commentService.updateComment(
      req.body,
      commentId as string,
      user?.id as string,
    );

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(200).json({
      error: "update failed",
      details: error,
    });
  }
};

//update status
const updateStatus = async (req: Request, res: Response) => {
  try {

    const {commentId} = req.params

    const result = await commentService.updateStatus(commentId as string, req.body)
    res.status(200).json(result)


  } catch (err) {
    const errMessage = (err instanceof Error) ? err.message : "status update failed";
    res.status(400).json({
      error: errMessage,
      details: err,
    });
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthor,
  deleteComment,
  updateComment,
  updateStatus,
};
