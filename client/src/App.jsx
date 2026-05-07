import { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);

  const HOST = import.meta.env.VITE_SERVER_DOMAIN;

  const toggleMode = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) return;

      try {
        const response = await fetch(`${HOST}/api/getuserdata`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();

        setUser(userData);
      } catch (error) {
        console.error("User fetch error:", error);
        handleLogout();
      }
    };

    loadUser();
  }, [HOST]);

  const handleAuthSuccess = async (accessToken) => {
    try {
      localStorage.setItem("access_token", accessToken);

      const response = await fetch(`${HOST}/api/getuserdata`, {
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
      console.error("Authentication error:", error);
      handleLogout();
    }
  };

  return (
    <div>
      {!user ? (
        isSignIn ? (
          <SignIn onSignIn={handleAuthSuccess} onToggle={toggleMode} />
        ) : (
          <SignUp onSignUp={handleAuthSuccess} onToggle={toggleMode} />
        )
      ) : (
        <Profile user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
