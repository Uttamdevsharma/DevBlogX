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
        },
        include:{
            post : {
                select:{
                    id:true,
                    title:true,
                    views : true
                }
            }
        }
    })

    return result

}

//get comment by author
const getCommentByAuthor = async(authorId : string) => {
    return await prisma.comment.findMany({
        where:{
            authorId
        },
        orderBy :{createdAt:"desc"},
        include : {
            post : {
                select : {
                    id:true,
                    title:true
                }
            }
        }
    })
    
}


export const commentService = {
    createComment,
    getCommentById,
    getCommentByAuthor
}