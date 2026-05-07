import { useState } from "react";

export default function SignIn({ onSignIn, onToggle }) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const HOST = import.meta.env.VITE_SERVER_DOMAIN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = Object.fromEntries(new FormData(e.target));

    try {
      const response = await fetch(`${HOST}/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      onSignIn(data.access_token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <div>{error}</div>}

        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>

      <div>
        <button type="button" onClick={onToggle}>
          Go to Sign Up
        </button>
      </div>
    </div>
  );
}
