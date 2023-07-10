import mongoose from "mongoose";
import { Comment } from "./comment";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PostAttrs {
  id: string;
  content: string;
  images?: string;
  hashtags?: string[];
  isPrivate?: boolean;
  userId?: string;
  comments?: string[];
}

interface PostDoc extends mongoose.Document {
  id: string;
  content: string;
  likes: number;
  reposts: number;
  images: string;
  hashtags?: string[];
  totalComments: number;
  views: number;
  isPrivate: boolean;
  mostViews: string[];
  userId: string;
  version: number;
  comments?: string[];
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
postSchema.statics.build = (attr: PostAttrs) => {
  return new Post({
    _id: attr.id,
    content: attr.content,
    hashtags: attr.hashtags,
    images: attr.images,
    isPrivate: attr.isPrivate,
    userId: attr.userId,
  });
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
