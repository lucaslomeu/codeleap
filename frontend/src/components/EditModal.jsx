import { useState, useRef, useEffect } from "react";
import { usePosts } from "../hooks/usePosts";

export default function EditModal({ post, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const textareaRef = useRef(null);
  const { updatePost } = usePosts();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSave = () => {
    updatePost.mutate({ id: post.id, title, content }, { onSuccess: onClose });
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2 className="modal-title">Edit item</h2>
        <label className="modal-label">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="modal-label">
          Content
          <textarea
            className="modal-textarea"
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
          />
        </label>
        <div className="button-actions" style={{ gap: "8px" }}>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!title || !content}
            style={{ background: "green", color: "white" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
