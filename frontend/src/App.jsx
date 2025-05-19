import "./styles/main.css";
import MainScreen from "./components/MainScreen";
import LoginModal from "./components/LoginModal";
import { useFirebaseAuth } from "./hooks/useFirebaseAuth";

function App() {
  const { user, loading } = useFirebaseAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <LoginModal />;
  }

  return (
    <div>
      <MainScreen username={user.displayName || user.email} />
    </div>
  );
}

export default App;
