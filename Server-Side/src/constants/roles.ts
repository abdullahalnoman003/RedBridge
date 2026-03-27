export const USER_ROLES = ['admin', 'donor', 'user'] as const;
export type TUserRole = (typeof USER_ROLES)[number];

export const DEFAULT_USER_ROLE: TUserRole = 'user';
