import { useState } from "react";
import { useAppSelect, useAppDispatch } from "@/src/hooks/useReduxHook";

import { FaLock, FaUnlock } from "react-icons/fa";
import { PostFormWrapper } from "./PostFormStyle";
import { validateHash, validatePost } from "@/src/utils/validation";
import { useCreatePostMutation } from "@/src/store/store";
import { setPost } from "@/src/features/post/postSlice";

const PostForm = (): JSX.Element => {
  const [createPost, result] = useCreatePostMutation();
  const dispatch = useAppDispatch();
  const { mode } = useAppSelect((state) => state.ui);
  const { user } = useAppSelect((state) => state.user);
  const [isPrivate, setIsPrivate] = useState(false);
  const [formState, setFormState] = useState({
    post: "",
    hash: "",
  });
  const [touched, setTouched] = useState({
    post: false,
    hash: false,
  });
  const [isValid, setIsValid] = useState({
    post: true,
    hash: true,
  });

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputBlurHandler = (e) => {
    const { name, value } = e.target;
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
    if (name === "post") {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: validatePost(value),
      }));
    }
    if (name === "hash") {
      setIsValid((prevState) => ({
        ...prevState,
        [name]: validateHash(value),
      }));
    }
  };

  const toggleIsPrivate = () => {
    setIsPrivate((prevState) => (prevState === false ? true : false));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    createPost({
      content: formState.post,
      hashtags: formState.hash,
      isPrivate,
    });

    dispatch(setPost(result.data));

    formState.post = "";
    formState.hash = "";
  };

  const postClasses = touched.post && !isValid.post ? "invalid" : "";
  const hashClasses = touched.hash && !isValid.hash ? "invalid" : "";

  return (
    <PostFormWrapper mode={mode} onSubmit={submitHandler}>
      <div className="input">
        <textarea
          id="post"
          name="post"
          rows={4}
          cols={50}
          value={formState.post}
          onChange={inputValueHandler}
          onBlur={inputBlurHandler}
          className={postClasses}
        />
        <button type="submit">작성</button>
      </div>
      <div className="sub">
        <div className="private">
          {isPrivate ? (
            <span>
              비공개:{" "}
              <FaLock
                color={mode === "dark" ? "#fff" : "#000"}
                onClick={toggleIsPrivate}
              />
            </span>
          ) : (
            <span>
              공개:{" "}
              <FaUnlock
                color={mode === "dark" ? "#fff" : "#000"}
                onClick={toggleIsPrivate}
              />
            </span>
          )}
          <span>
            #HashTags:{" "}
            <input
              type="text"
              name="hash"
              id="hash"
              value={formState.hash}
              onChange={inputValueHandler}
              onBlur={inputBlurHandler}
              className={hashClasses}
            />
          </span>
        </div>
        <div className="hash-list">#dummy</div>
      </div>
    </PostFormWrapper>
  );
};

export default PostForm;
