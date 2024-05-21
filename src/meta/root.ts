
import { Metadata } from "next";
import metadataBuilder from "./builder";

const rootMetadata: Metadata = metadataBuilder("BarberCut",process.env.NEXT_PUBLIC_API_URL as string,"BerberCut for getting in call with barbers online");

export default rootMetadata;