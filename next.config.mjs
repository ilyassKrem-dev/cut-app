/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors:false
    },
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: false,
      },
      images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname:"utfs.io"
            },
            {
                protocol:"https",
                hostname:"uploadthing.com"
            },
            {
                protocol:"https",
                hostname:"lh3.googleusercontent.com"
            }
        ]
      },
    modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
        transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
        transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
    },

      
          
};

export default nextConfig;
