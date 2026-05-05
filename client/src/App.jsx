import { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleMode = () => setIsSignIn(!isSignIn);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch("/api/getuserdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
      handleLogout();
    }
  };

  const handleAuthSuccess = (accessToken) => {
    localStorage.setItem("access_token", accessToken);
    fetchUserData(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <div>
          {isSignIn ? (
            <SignIn onSignIn={handleAuthSuccess} onToggle={toggleMode} />
          ) : (
            <SignUp onSignUp={handleAuthSuccess} onToggle={toggleMode} />
          )}
        </div>
      ) : (
        <div>
          <Profile user={user} onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
}

export default App;
