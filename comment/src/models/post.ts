import mongoose from "mongoose";
import { Comment } from "./comment";

interface PostAttrs {
  content: string;
  images?: string[];
  hashtags?: string[];
  isPrivate?: boolean;
  userId?: string;
}

export interface PostDoc extends mongoose.Document {
  content: string;
  likes: string[];
  reposts: string[];
  images: string[];
  hashtags: string[];
  totalComments: number;
  totalLikes: number;
  isPrivate: boolean;
  userId: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: [300, "글자수는 최대 300자입니다."],
    },
    likes: [{ type: String }],
    reposts: [{ type: String }],
    images: [{ type: String }],
    hashtags: [{ type: String }],
    totalComments: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    isPrivate: { type: Boolean, default: false },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

postSchema.statics.build = (attr: PostAttrs) => {
  return new Post(attr);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
