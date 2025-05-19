import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostItem from "./PostItem";

export default function PostList({ username }) {
  const [page, setPage] = useState(1);
  const { postsQuery } = usePosts(page);

  if (postsQuery.isLoading) return <p>Loading...</p>;
  if (!postsQuery.data?.results?.length) return <p>No posts yet.</p>;

  const { results: posts, count } = postsQuery.data;

  const pageSize = posts.length || 5;
  const totalPages = Math.ceil(count / pageSize);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          isOwn={post.username === username}
        />
      ))}
      <div className="pagination-controls">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={page === p ? "pagination-btn active" : "pagination-btn"}
            onClick={() => page !== p && setPage(p)}
            tabIndex={page === p ? -1 : 0}>
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
