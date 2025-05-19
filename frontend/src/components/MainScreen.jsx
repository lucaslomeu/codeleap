import PostForm from "./PostForm";
import PostList from "./PostList";

const MainScreen = ({ username }) => (
  <div>
    <header className="header">CodeLeap Network</header>
    <main className="main-container">
      <PostForm username={username} />
      <PostList username={username} />
    </main>
  </div>
);

export default MainScreen;
