
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






export async function generateMetadata({ searchParams }) {



  var term = "";

  if (searchParams?.tag) {
    term = searchParams.tag; // 👈 gets ?tag=baby-care
  }
  if (searchParams?.category) {
    term = searchParams.category; // 👈 gets ?category=baby-care
  }
  if (searchParams?.brand) {
    term = searchParams.brand; // 👈 gets ?category=baby-care
  }



  var termname = term.replace("-", " ")
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');


  var pageMetaData = {

    title: `${termname} Price in Bangladesh - Kidobazar`,
    description: "Shop baby products, kids toys, clothing & essentials online at Kidobazar. Affordable prices, trusted brands & fast delivery for your little ones.",
    post_thumbnail: { src: "", alt: "" },
    keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
    ogTitle: `Shop by ${term.replace("-", " ").toUpperCase()} - Kidobazar`,
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




export default async function page({ params, searchParams }) {

  var term = "";

  if (searchParams?.tag) {
    term = searchParams.tag; // 👈 gets ?tag=baby-care
  }
  if (searchParams?.category) {
    term = searchParams.category; // 👈 gets ?category=baby-care
  }
  if (searchParams?.brand) {
    term = searchParams.brand; // 👈 gets ?category=baby-care
  }

  var queryPrams = { category: searchParams.category, brand: searchParams.brand, tag: searchParams.tag, keyword: "", paged: 1, order: "DESC", per_page: 18, price: "" };



  var postData = JSON.stringify(queryPrams);

  const res = await fetch(`${serverUrl}wp-json/promptshub/v2/get_prompts`, {
    method: "POST",
    // cache: "no-store", // disables caching

    headers: {
      'Content-Type': 'application/json',
    },
    body: postData,
  });


  const data = await res.json();






  // const token = useAuthStore((state) => state.token);
  // const { wrapCurrency, priceHtml } = useUtilsStore()

  // const router = useRouter();
  // const searchParams = useSearchParams(); // like location.search

  // const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()



  // var [appData, setappData] = useState(window.appData);





  var promptsData = { posts: data?.posts, total: data?.total, maxPages: data?.max_pages };
  // var [promptsData, setpromptsData] = useState({ posts: data?.posts, total: data?.total, maxPages: data?.maxPages });

  // var category = searchParams.get('category'); // e.g. "some-category-slug"





  return (

    <div>

      <div className="flex justify-between px-5 py-3">


      </div>
      <ProductArchive queryPrams={queryPrams}
        entries={promptsData}

      />
    </div>



  );
};

