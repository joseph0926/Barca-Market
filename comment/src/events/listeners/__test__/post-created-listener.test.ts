import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { PostCreatedEvent } from "@joseph0926-barcelona/common";
import { PostCreatedListener } from "../post-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Post } from "../../../models/post";
import { DateTime } from "luxon";

const setup = async () => {
  const listener = new PostCreatedListener(natsWrapper.client);

  const data: PostCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    content: "test01",
    images: "testURL",
    isPrivate: false,
    likes: 0,
    reposts: 0,
    views: 0,
    totalComments: 0,
    createdAt: DateTime.now(),
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a post", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const post = await Post.findById(data.id);

  expect(post).toBeDefined();
  expect(post!.content).toEqual(data.content);
  expect(post!.images).toEqual(data.images);
  expect(post!.isPrivate).toEqual(data.isPrivate);
  expect(post!.likes).toEqual(data.likes);
  expect(post!.views).toEqual(data.views);
});

it("acks the message", async () => {
  const { data, listener, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
