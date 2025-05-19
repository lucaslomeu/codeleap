import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import PostForm from "./PostForm";
import PostList from "./PostList";

const MainScreen = ({ username }) => {
  const { logout } = useFirebaseAuth();

  return (
    <div>
      <header className="header">
        CodeLeap Network
        <div>
          <span className="username">{username && `Hi, ${username}`}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main className="main-container">
        <PostForm username={username} />
        <PostList username={username} />
      </main>
    </div>
  );
};

export default MainScreen;
