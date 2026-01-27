import { Request, Response } from "express";
import { commentService } from "./comment.service";

//create comment
const createComment = async(req:Request,res:Response) => {
    try{

        const user = req.user;
        req.body.authorId = user?.id
        const result = await commentService.createComment(req.body)

        res.status(201).json({
            result
        })   

    }catch(error){
        res.status(400).json({
            error :"Comment creation FAILED",
            details : error

        })
    }
}


//get comment by id
const getCommentById = async(req:Request,res:Response)=>{

    try{
        const {commentId} = req.params
        const user = await commentService.getCommentById(commentId as string)
        res.status(200).json({
            user
        })

    }catch(error){
        res.status(400).json({
            error : "comment not get",
            details : error
        })

    }

}

export const commentController = {
    createComment,
    getCommentById
}