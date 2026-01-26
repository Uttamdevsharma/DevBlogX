import { prisma } from "../lib/prisma";
import { CommentStatus, PostStatus } from "../../generated/prisma/enums";
import { PostWhereInput } from "../../generated/prisma/models";


// Define create input manually (better than using Post)
interface CreatePostInput {
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured?: boolean;
  status?: PostStatus;
  tags: string[];
}


//create a post
const createPost = async (data: CreatePostInput, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId
    }
  });

  return result;
};

//get all post with query
const getAllPost = async({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
} : {
  search: string | undefined,
    tags: string[] | [],
    isFeatured: boolean | undefined,
    status: PostStatus | undefined,
    authorId: string | undefined,
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}) => {

  const andConditions : PostWhereInput[] = []

  if(search){
    andConditions.push({
      OR : [
        {title : {contains :search,mode:"insensitive"}},
        {content : {contains :search,mode:"insensitive"}},
        {tags : {has:search}}
      ]
    })
  }

  if(tags.length > 0){
    andConditions.push({
      tags : {hasEvery : tags}
    })
  }

  if(typeof isFeatured === 'boolean'){
    andConditions.push({
      isFeatured
    })
  }

  if(status){
    andConditions.push({
      status
    })
  }

  if(authorId){
    andConditions.push({
      authorId
    })
  }

  const allPost = await prisma.post.findMany({
    take:limit,
    skip,
    where : {

      AND : andConditions

    },
    orderBy : {
       [sortBy] : sortOrder
    },
    include:{
      _count : {
        select:{comments:true}
      }
    }
  }); // this is the pure almost future moment




  return allPost

}

//get single post
const getPostById = async(id :string) => {

  return await prisma.$transaction(async(tx) => {
    await tx.post.update({
      where : {
        id
      },
      data : {
        views : {
          increment : 1
        }
      }
    })


    const postData = await tx.post.findUnique({
      where: {
        id
      },
      include : {
        comments : {
          where:{
            parentId : null,
            status : CommentStatus.APPROVED
          },
          orderBy : {createdAt : 'desc'},
          include:{
            replies:{
              where: {
                status:CommentStatus.APPROVED
              },
              orderBy:{createdAt:"asc"},
              include : {
                replies:{
                  where:{
                    status:CommentStatus.APPROVED
                  },
                  orderBy:{createdAt:"asc"}
                }
              }
            }
          }
        },
        _count: {
          select:{comments:true}
        }
      }
     
    })

    return postData
  })

}





export const postService = {
  createPost,
  getAllPost,
  getPostById
};
