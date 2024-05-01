import { createUploadthing, type FileRouter } from "uploadthing/next";




const f = createUploadthing();
 

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  media: f({ 
    image: { maxFileSize: "1GB", maxFileCount: 5 },
    audio: { maxFileSize: "32MB", maxFileCount: 5 },
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload completed");
 
      console.log("file url", file.url);
      
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { success:true};
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;