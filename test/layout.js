import ProfileShell from '@/components/profile-shell';

export const metadata = {
  title: 'Profile',
  description: 'User profile page',
};

export default function ProfileLayout({ children }) {
  return <ProfileShell>{children}</ProfileShell>;
}
