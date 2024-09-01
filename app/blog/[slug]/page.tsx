import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

// Function to fetch data for a single blog post
async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'][0]{
      "currentSlug": slug.current,
      title,
      content,
      titleImage
    }`;
  const data = await client.fetch(query);
  return data;
}

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  const query = `
    *[_type == 'blog']{
      "slug": slug.current
    }`;
  const blogs = await client.fetch(query);

  return blogs.map((blog: { slug: string }) => ({
    slug: blog.slug,
  }));
}

// Blog article component
export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const data: fullBlog = await getData(params.slug);

  if (!data) {
    // Handle the case where the blog is not found
    return <div>Blog not found</div>;
  }

  return (
    <div className="mt-5">
      <h1>
        <span className="block text-base text-xl text-center text-primary font-semibold tracking-wide uppercase">
          Bee Log It
        </span>
        <span className="my-4 block text-5xl text-center font-bold tracking-tight">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        alt="This is the title image"
        width={800}
        height={800}
        className="rounded-lg mt-8 border"
        priority
      />
      <div className="my-16 prose prose-yellow prose-xl dark:prose-invert prose-li:marker:text-primary">
        <PortableText value={data.content}/>
      </div>
    </div>
  );
}
