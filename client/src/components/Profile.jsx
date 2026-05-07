export default function Profile({ user, onLogout }) {
  if (!user) return null;

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>
          <strong>Name:</strong> {user.fullname || "User"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>ID:</strong> {user._id}
        </p>
      </div>

      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
}
