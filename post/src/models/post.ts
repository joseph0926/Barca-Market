import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import type { DateTime } from "luxon";

interface PostAttrs {
  id: string;
  content: string;
  images?: string;
  hashtags?: string[];
  isPrivate: boolean;
  userId?: string;
  comments?: string[];
}

interface PostDoc extends mongoose.Document {
  id: string;
  content: string;
  likes: number;
  reposts: number;
  views: number;
  images: string;
  hashtags?: string[];
  totalComments: number;
  isPrivate: boolean;
  userId: string;
  version: number;
  mostViews: string[];
  mostLiked: string[];
  comments?: string[];
  createdAt: DateTime;
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
    images: { type: String },
    hashtags: [{ type: String }],
    likes: { type: Number, default: 0 },
    reports: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isPrivate: { type: Boolean, default: false },
    mostViews: { type: [String], default: [] },
    mostLiked: { type: [String], default: [] },
    userId: {
      type: String,
      required: true,
    },
    comments: {
      type: [String],
      ref: "Comment",
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
postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};
const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
