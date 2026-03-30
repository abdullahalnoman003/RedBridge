const normalizeEmail = (email) => (email || '').trim().toLowerCase();

const getConfiguredAdminEmails = () => {
  const configured = import.meta.env.VITE_ADMIN_EMAILS || '';
  return configured
    .split(',')
    .map((email) => normalizeEmail(email))
    .filter(Boolean);
};

const isConfiguredAdminEmail = (email) => {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return getConfiguredAdminEmails().includes(normalized);
};

const getStoredRole = () => {
  const stored = (localStorage.getItem('userRole') || '').toLowerCase();
  if (stored === 'admin' || stored === 'donor' || stored === 'user') {
    return stored;
  }
  return null;
};

export const storeUserRole = (role) => {
  if (!role) return;
  localStorage.setItem('userRole', role.toLowerCase());
};

export const resolveFallbackRole = (email) => {
  if (isConfiguredAdminEmail(email)) {
    return 'admin';
  }

  return getStoredRole() || 'user';
};

export const extractRoleFromApiResponse = (responseData) => {
  const role = responseData?.data?.role;
  if (role === 'admin' || role === 'donor' || role === 'user') {
    return role;
  }

  throw new Error('Role payload is missing or invalid');
};
