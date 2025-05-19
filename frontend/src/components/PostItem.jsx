import { useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function PostItem({ post, isOwn }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="post-item">
      <div className="post-item-header">
        <h4 className="post-item-title">{post.title}</h4>
        {isOwn && (
          <div className="post-item-actions">
            <button
              className="icon-btn"
              title="Delete"
              onClick={() => setDeleting(true)}>
              Delete
            </button>
            <button
              className="icon-btn"
              title="Edit"
              onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="post-item-body">
        <div className="post-item-meta">
          <span className="post-user">@{post.username}</span>
          <span className="post-date">
            {formatPostDate(post.created_datetime)}
          </span>
        </div>
        <div className="post-content">{post.content}</div>
      </div>
      {editing && <EditModal post={post} onClose={() => setEditing(false)} />}
      {deleting && (
        <DeleteModal postId={post.id} onClose={() => setDeleting(false)} />
      )}
    </div>
  );
}

function formatPostDate(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1) return "now";
  if (diff < 60) return `${diff} minutes ago`;
  const hours = Math.floor(diff / 60);
  return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
}
