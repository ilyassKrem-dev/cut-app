import { Metadata } from "next";


function metadataBuilder(
  title: string,
  url:string,
  description:string
): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url,
      title,
      siteName: title,  
    }
  };
}

export default metadataBuilder;