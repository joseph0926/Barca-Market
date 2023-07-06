import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface CommentAttrs {
  id: string;
  content: string;
  parentId?: string;
  userId?: string;
}

export interface CommentDoc extends mongoose.Document {
  content: string;
  parentId: string;
  replys: string[];
  likes: string[];
  reports: string[];
  totalLikes: number;
  totalReports: number;
  userId: string;
  version: number;
  postId?: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<CommentDoc | null>;
}

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    replys: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    reports: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalReports: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: { type: String },
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

commentSchema.set("versionKey", "version");
commentSchema.plugin(updateIfCurrentPlugin);

commentSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Comment.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment({
    _id: attrs.id,
    content: attrs.content,
    parentId: attrs.parentId,
    userId: attrs.userId,
  });
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  commentSchema
);

export { Comment };
