import { useState } from "react";

export default function SignUp({ onSignUp, onToggle }) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fullname, email, password } = Object.fromEntries(
      new FormData(e.target),
    );
    console.log("Sending Signup Data:", { fullname, email, password });

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
      }

      onSignUp(data.access_token);
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name: </label>
          <input type="text" name="fullname" required />
        </div>
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
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <div>
        <button type="button" onClick={onToggle}>
          Go to Sign In
        </button>
      </div>
    </div>
  );
}
