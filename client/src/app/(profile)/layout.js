export const metadata = {
  title: 'Profile',
  description: 'User profile page',
};

export default function ProfileLayout({ children }) {
  return (
    <div className="profile-layout">
      <header className="profile-header">
        <h1>Profile</h1>
      </header>
      <main className="profile-content">
        {children}
      </main>
      <footer className="profile-footer">
        <p>&copy; 2024 Profile View</p>
      </footer>
    </div>
  );
}
