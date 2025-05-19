import { usePosts } from "../hooks/usePosts";
import PostItem from "./PostItem";

export default function PostList({ username }) {
  const { postsQuery } = usePosts();

  const { data: posts, isLoading } = postsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (!posts?.length) return <p>No posts yet.</p>;

  return (
    <div className="post-list">
      {posts
        .sort(
          (a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)
        )
        .map((post) => (
          <PostItem
            key={post.id}
            post={post}
            isOwn={post.username === username}
          />
        ))}
    </div>
  );
}
