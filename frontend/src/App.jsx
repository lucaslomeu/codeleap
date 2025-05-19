import { useState } from "react";
import "./styles/main.css";
import SignupModal from "./components/SignupModal";
import MainScreen from "./components/MainScreen";

function App() {
  const [username, setUsername] = useState(null);

  if (!username) {
    return <SignupModal onSubmit={setUsername} />;
  }

  return <MainScreen username={username} />;
}

export default App;
