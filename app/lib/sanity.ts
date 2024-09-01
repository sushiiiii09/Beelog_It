import { create } from "domain";
import { createClient } from "next-sanity";
import imageURLBuilder from "@sanity/image-url";
export const client = createClient({
  apiVersion: "2024-09-01",
  dataset: "production",
  projectId: "yunbdg90",
  useCdn: false,
});

const builder = imageURLBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
