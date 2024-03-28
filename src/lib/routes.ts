/**
 * @description List of routes that are accessible only by non authenticated users
 */
export const authRoute = [
    '/login',
    '/registration',
    '/verify',
    '/forgot-password',
    '/reset-password',
];

/**
 * @description List of routes that are accessible by all users
 */
export const publicRoute = ['/about', '/'];

/**
 * @description List of routes that are accessible only by authenticated users
 */
export const authApiRoute = '/api/auth';
