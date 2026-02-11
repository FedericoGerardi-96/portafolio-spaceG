import { createClient } from "contentful";
import type { Experiencia, IContentfull } from "@/interface/contentfull.interface";

export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// Función centralizada para traer la experiencia
export async function getContentfulData(): Promise<IContentfull> {
  const entries = await contentfulClient.getEntries({
    content_type: 'spageGPortafolio', // El ID que le diste a tu Content Type
  }) as unknown as IContentfull;

  return entries;
}