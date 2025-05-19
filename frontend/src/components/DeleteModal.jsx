import { usePosts } from "../hooks/usePosts";

export default function DeleteModal({ postId, onClose }) {
  const { deletePost } = usePosts();

  return (
    <div className="modal-bg">
      <div className="modal">
        <p className="modal-delete-title">
          Are you sure you want to delete this item?
        </p>
        <div className="button-actions" style={{ gap: "8px" }}>
          <button
            className="cancel-btn"
            type="button"
            onClick={onClose}
            disabled={deletePost.isPending}>
            Cancel
          </button>
          <button
            type="button"
            style={{ background: "red", color: "white" }}
            disabled={deletePost.isPending}
            onClick={() => deletePost.mutate(postId, { onSuccess: onClose })}>
            {deletePost.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
