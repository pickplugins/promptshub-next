
import Link from "next/link";
import Image from "next/image";
import React from "react";
// import { useState, useEffect, useContext } from "react";
import { useCounterStore } from '/store/useCounterStore'
// import { useUtilsStore } from "/store/useUtilsStore";
// import { useAuthStore } from "/store/authStore";
import AddToCart from "/components/shop-elements/AddToCart";
import ProductArchive from "/components/ProductArchive";


import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

// import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;






export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await params

  var slugname = slug.replace("-", " ")
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');


  var pageMetaData = {

    title: `${slugname} products price in Bangladesh - Kidobazar`,
    description: "Shop baby products, kids toys, clothing & essentials online at Kidobazar. Affordable prices, trusted brands & fast delivery for your little ones.",
    post_thumbnail: { src: "", alt: "" },
    keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
    ogTitle: ` ${slug} baby products - Kidobazar – Baby Products, Kids Toys & Fashion Online`,
    ogDes: "Discover Kidobazar, your one-stop kids marketplace for toys, clothing, baby products & more. Shop trusted brands at affordable prices."

  }



  return {
    title: pageMetaData.title,
    description: pageMetaData.description?.slice(0, 160),
    openGraph: {
      title: pageMetaData.ogTitle,
      description: pageMetaData.post_excerpt?.slice(0, 160),
      url: `${appUrl}product/`,
      images: [{ url: pageMetaData.post_thumbnail?.src, alt: pageMetaData.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMetaData.ogTitle,
      description: pageMetaData.post_excerpt?.slice(0, 160),
      images: [pageMetaData.post_thumbnail?.src],
    },
  };
}














export default async function page({ params }) {


  const { slug } = await params; // ✅ await params

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  var queryPrams = { tag: slug, keyword: "", paged: 1, order: "DESC", per_page: 18, price: "" };



  var postData = JSON.stringify(queryPrams);

  const res = await fetch(`${serverUrl}wp-json/promptshub/v2/get_products`, {
    method: "POST",
    // cache: "no-store", // disables caching

    headers: {
      'Content-Type': 'application/json',
    },
    body: postData,
  });


  const data = await res.json();


  var termQueryPrams = { slug: slug, taxonomy: 'product_tag', };


  var termPostData = JSON.stringify(termQueryPrams);

  const resTerm = await fetch(`${serverUrl}wp-json/promptshub/v2/get_term`, {
    method: "POST",
    // cache: "no-store", // disables caching

    headers: {
      'Content-Type': 'application/json',
    },
    body: termPostData,
  });


  const termData = await resTerm.json();

  console.log(termData);






  var promptsData = { posts: data?.posts, total: data?.total, maxPages: data?.max_pages };














  return (

    <div className="py-5">

      <div className="flex items-center gap-3 px-5 py-3">

        {termData?.term?.thumbnail && (
          <div className="w-[150px] h-[150px] rounded-sm">
            <Image src={termData?.term?.thumbnail} width={200} height={200}></Image>
          </div>
        )}


        <div>
          <h2 className="text-2xl">{termData?.term?.name}</h2>
          <div>{termData?.term?.description}</div>
        </div>

      </div>
      <ProductArchive queryPrams={queryPrams}
        entries={promptsData}

      />
    </div>



  );
};

