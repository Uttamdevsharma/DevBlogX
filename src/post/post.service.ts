import { prisma } from "../lib/prisma";
import { PostStatus } from "../../generated/prisma/enums";


// Define create input manually (better than using Post)
interface CreatePostInput {
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured?: boolean;
  status?: PostStatus;
  tags: string[];
}

const createPost = async (data: CreatePostInput, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId
    }
  });

  return result;
};

export const postService = {
  createPost
};
