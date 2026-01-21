import { Request, Response } from "express"
import { postService } from "./post.service"

const createPost = async(req:Request,res:Response) => {
    try{
        const result = await postService.createPost(req.body)

        res.status(201).json({
            result
        })
        
    }catch(e){
        res.status(400).json({
            error : "post created Failed",
            datails : e
        })

    }


}

export const postController = {
    createPost
}