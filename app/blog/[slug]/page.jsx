import React, { use } from 'react'
import Link from "next/link";
import Image from "next/image";


import Comments from "/components/shop-elements/Comments";
import RelatedPosts from "/components/shop-elements/RelatedPosts";
import EmailSubscribe from "/components/EmailSubscribe";



import { getBlogPost } from "/lib/getBlogPost";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;


export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await params
  const productResponse = await getBlogPost(slug);

  if (!productResponse) return { title: "Product Not Found" };


  var postData = productResponse?.post;



  return {
    title: postData.title,
    description: postData.post_excerpt || postData.description?.slice(0, 160),
    openGraph: {
      title: postData.title,
      description: postData.post_excerpt || postData.post_excerpt?.slice(0, 160),
      url: `${appUrl}product/`,
      images: [{ url: postData.post_thumbnail?.src, alt: postData.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.post_excerpt || postData.post_excerpt?.slice(0, 160),
      images: [postData.post_thumbnail?.src],
    },
  };
}





export default async function page({ params }) {
  const { slug } = await params; // ✅ await params


  const productResponse = await getBlogPost(slug);

  if (!productResponse) return { title: "Product Not Found" };


  var postData = productResponse?.post;





  return (
    <div>

      <div className="  w-full xl:w-[1200px] mx-auto my-10 ">



        <div className=" p-5 flex flex-col gap-10 ">

          <div className="flex flex-col  p-5 gap-10 bg-[#ffcbb3]  rounded-sm">




            {postData?.post_thumbnail_url?.length > 0 && (
              <div className="rounded-sm overflow-hidden h-[350px] ">
                <Image className="object-cover w-full h-full" src={postData?.post_thumbnail_url} alt={postData?.title} />
              </div>

            )}








            <div className="text-left flex flex-col gap-4 ">
              <div className=" text-2xl">{postData?.title}</div>

              {postData?.excerpt && (
                <div>
                  {postData?.excerpt}
                </div>
              )}




            </div>

          </div>


          <div className="p-5 bg-[#ffcbb3] rounded-sm">

            <article className="my-4 flex flex-col gap-5 text-gray-600">

              <div dangerouslySetInnerHTML={{ __html: postData?.content }} />

            </article>

          </div>


          <div className=" p-5 gap-10   rounded-sm">

            {/* {JSON.stringify(postData?.gallery)} */}

            <div className="xl:w-[500px] w-full mx-auto">
              <div className="text-2xl  mb-5">{("Subscribe to News")}</div>

              <EmailSubscribe />
            </div>



          </div>


          <div>
            <Comments id={postData?.id} />
          </div>












        </div>

      </div>

    </div>
  )
}

