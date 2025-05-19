import { useState, useRef } from "react";
import { usePosts } from "../hooks/usePosts";

export default function PostForm({ username }) {
  const { createPost } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    createPost.mutate(
      { username, title, content },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        },
      }
    );
  };

  return (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        <h3 className="post-form-title">What's on your mind?</h3>
        <label className="post-form-label">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello world"
          />
        </label>
        <label className="post-form-label">
          Content
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Content here..."
          />
        </label>
        <div className="button-actions">
          <button
            className="post-form-button"
            type="submit"
            disabled={!title || !content || createPost.isPending}>
            {createPost.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
