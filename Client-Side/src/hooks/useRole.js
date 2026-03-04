import useAuth from './useAuth';

export default function useRole() {
  const { dbUser } = useAuth();
  return dbUser?.role || null;
}
