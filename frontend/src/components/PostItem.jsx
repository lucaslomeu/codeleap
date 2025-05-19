import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

export default function PostItem({ post, isOwn }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const { user } = useFirebaseAuth();

  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && post.liked_uids) {
      setLiked(post.liked_uids.includes(user.uid));
    } else {
      setLiked(false);
    }
  }, [user, post.liked_uids]);

  const handleLike = async () => {
    try {
      if (!user) {
        alert("You must be logged in to like.");
        return;
      }

      const token = await user.getIdToken();
      const endpoint = liked ? "unlike" : "like";
      const res = await axios.post(
        `${API_URL}${post.id}/${endpoint}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikes(res.data.likes);
      setLiked(!liked);
    } catch (err) {
      alert("Error while liking the post.");
    }
  };

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
        <div className="action-content">
          <button className="like-btn" onClick={handleLike}>
            {liked ? "♥" : "♡"} {likes}
          </button>
        </div>
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
