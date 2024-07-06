
### About

BarberCut is a barber reservation website built using Next.js.
## Live demo
[Demo](https://cut-app.vercel.app/)


![Barber][Barber] ![Barber1][Barber1]  


### Built With
* [![Next][Next.js]][Next-url]  [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCss]][TailwindCss-url]  [![Framer][Framer]][Framer-url]
* [![NodeJS][NodeJS]][NodeJS-url]  [![MongoDB][MongoDB]][MongoDB-url]
* [![Prisma][Prisma]][Prisma-url]
 
###  Features
- Simple design
- Responsive.
- Real-time
- User Account System
- and more
  

  
### Start the website
1. Clone the repo
   ```sh
   gh repo clone ilyassKrem-dev/cut-app
   ```
2. Add a DATABASE_URL from [Prisma](https://www.prisma.io/data-platform/accelerate) Acclerate to the `.env.local` file
   ```sh
     DATABASE_URL=
     ```
3. Add from [Auth](https://authjs.dev/) to the `.env.local` file
   ```sh
     AUTH_SECRET=
   ```
4. Add from [Uploadthing](https://uploadthing.com/) to the `.env.local` file
    ```sh
     UPLOADTHING_APP_ID=
     UPLOADTHING_SECRET=
   ```
5. Add from [Google-recaptcha](https://www.google.com/recaptcha) to the `.env.local` file
   
    ```sh
     RECAPTCHA_SECRET_KEY=
     NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
   ```
6. Add from [Google-console](https://console.cloud.google.com/) to the `.env.local` file and add (Your url)/api/auth/callback/google to google console (Authorized redirect URIs)
   
    ```sh
     AUTH_GOOGLE_ID=
     AUTH_GOOGLE_SECRET=
   ```
7. Add a NEXT_PUBLIC_BASE_URL= (Full Url of the site) for the share button to the `.env.local` file
8. Add from [Google](https://www.google.com/intl/en-GB/account) to the `.env.local`  to make email verification work
   ```sh
     GMAIL_EMAIL=""
     GMAIL_APP_PASS=""
    ```
9. Add from [Pusher](https://pusher.com/) to the `.env.local` file
     ```sh
     PUSHER_APP_ID=""
     NEXT_PUBLIC_PUSHER_KEY=""
     PUSHER_SECRET=""
     NEXT_PUBLIC_PUSHER_CLUSTER=""
    ```
10. Run
     ```sh
     npm install
     npm run dev
     ```




<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Framer]:https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue
[Framer-url]:https://www.framer.com/motion/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCss]:https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCss-url]:https://tailwindcss.com/
[NodeJS]:https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]:https://nodejs.org/
[MongoDB]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]:https://www.mongodb.com/
[Prisma]:https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]:https://www.prisma.io/
[Barber]:https://www.dropbox.com/scl/fi/lorxw5zj1asb7rjfwwfmj/CaptureBar1.jpg?rlkey=82qt9yz9f12yqpgmulcg97nl0&st=4lnt8uka&raw=1
[Barber1]:https://www.dropbox.com/scl/fi/1vuijcrah0haww2stt820/CaptureBar2.jpg?rlkey=cvwg7rcp113adnfwgwprffcoj&st=7s0pwulx&raw=1

