import { prisma } from "../lib/prisma"

//create comment
const createComment = async(payload : {
    content :string,
    authorId:string,
    postId :string,
    parentId?: string
}) => {

    await prisma.post.findUniqueOrThrow({
        where:{
            id: payload.postId
        }
    })

    if(payload.parentId){
        await prisma.comment.findUniqueOrThrow({
            where:{
                id :payload.parentId
            }
        })

    }

    return await prisma.comment.create({
        data:payload
    })
}

//get comment by id
const getCommentById = async(commentId:string) => {

    const result = await prisma.comment.findUnique({
        where:{
            id : commentId
        }
    })

    return result

}


export const commentService = {
    createComment,
    getCommentById
}