/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            // added redirect due to nextauth redirect is not working
            // config auth.config.ts in pages section
            {
                source: '/api/auth/login',
                destination: '/login',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
