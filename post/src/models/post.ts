import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PostAttrs {
  content: string;
  images?: string[];
  hashtags?: string[];
  isPrivate: boolean;
  userId?: string;
}

interface PostDoc extends mongoose.Document {
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
  commnetId?: string;
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
    commentId: { type: String },
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

postSchema.statics.build = (attr: PostAttrs) => {
  return new Post(attr);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
