import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { PostUpdatedEvent } from "@joseph0926-barcelona/common";
import { PostUpdatedListener } from "../post-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Post } from "../../../models/post";
import { DateTime } from "luxon";

const setup = async () => {
  const listener = new PostUpdatedListener(natsWrapper.client);

  const post = Post.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    content: "test01",
    userId: new mongoose.Types.ObjectId().toHexString(),
    isPrivate: false,
  });
  await post.save();

  const data: PostUpdatedEvent["data"] = {
    version: post.version + 1,
    id: post.id,
    content: "update test01",
    images: "testURL",
    isPrivate: false,
    totalComments: 0,
    createdAt: DateTime.now(),
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, post };
};

it("creates and saves a post", async () => {
  const { listener, data, msg, post } = await setup();

  await listener.onMessage(data, msg);

  const updatedPost = await Post.findById(post.id);

  expect(updatedPost).toBeDefined();
  expect(updatedPost!.content).toEqual(data.content);
  expect(updatedPost!.images).toEqual(data.images);
  expect(updatedPost!.isPrivate).toEqual(data.isPrivate);
});

it("acks the message", async () => {
  const { data, listener, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  const { msg, data, listener } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
