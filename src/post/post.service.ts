import { prisma } from "../lib/prisma";
import { PostStatus } from "../../generated/prisma/enums";
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

type GetAllPostParams = {
    search: string | undefined,
    tags: string[],
    isFeatured: boolean | undefined,
    status: PostStatus | undefined,
    authorId: string | undefined
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
  authorId
} : GetAllPostParams) => {

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
    where : {
      AND : andConditions

    }
  });

  return allPost

}





export const postService = {
  createPost,
  getAllPost
};
