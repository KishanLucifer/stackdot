export default function Profile({ user, onLogout }) {
  if (!user) return null;

  return (
    <div>
      <h2>Profile</h2>
      <div style={{ marginBottom: "15px" }}>
        <p>
          <strong>Name:</strong> {user.fullname || "User"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
}
