import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import {client, urlFor} from "./lib/sanity"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate=300;

async function getData(){
  const query= `
  *[_type == 'blog'] | order(_createdAt desc){
  title , 
    smallDescription,
    "currentSlug": slug.current,
    titleImage
}`;
 const data= await client.fetch(query);

 return data;
}
export default async function Home() {

  const data:simpleBlogCard[] = await getData();
  console.log(data);
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
      {data.map((post, idx) => (
  <Card key={idx} className="border-yellow-200 border-2">
    <Image
      src={urlFor(post.titleImage).url()}
      alt='this is a title image'
      width={700} // You should specify the width
      height={300} // And the height of the image
      className="rounded-t-lg h-[200px] object-cover"
    />
    <CardContent className="mt-5 mx-2 ">
      <h3 className="text-lg font-semibold dark:text-primary">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
        {post.smallDescription}
      </p>
      <Button asChild className="w-full mt-7">
        <Link href={`/blog/${post.currentSlug}`}>
          Read More.
        </Link>
      </Button>
    </CardContent>
  </Card>
))}

    </div>
  );
}
