import mongoose from "mongoose";
import { Comment } from "./comment";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PostAttrs {
  id: string;
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
  version: number;
}

interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
  findByEvent(event: { id: string; version: number }): Promise<PostDoc | null>;
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
      },
    },
    timestamps: true,
  }
);

postSchema.set("versionKey", "version");
postSchema.plugin(updateIfCurrentPlugin);

postSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Post.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
postSchema.statics.build = (attr: PostAttrs) => {
  return new Post(attr);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
