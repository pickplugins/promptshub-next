
import Link from "next/link";
import Image from "next/image";
import React from "react";
// import { useState, useEffect, useContext } from "react";
import { useCounterStore } from '/store/useCounterStore'
// import { useUtilsStore } from "/store/useUtilsStore";
// import { useAuthStore } from "/store/authStore";
import AddToCart from "/components/shop-elements/AddToCart";
import ProductGrid from "/components/shop-elements/ProductGrid";
import ProductArchive from "/components/ProductArchive";


import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

// import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;






export async function generateMetadata() {


  var pageMetaData = {

    title: "PromptShub – Ultimate AI Prompt Library & Prompt Engineering Hub",
    description: "Discover, create, and share top-tier AI prompts at PromptShub. Explore prompt templates, tools, guides, and a vibrant community to supercharge your prompt engineering skills.",
    post_thumbnail: { src: "", alt: "" },
    keywords: "AI prompts, prompt library, ChatGPT prompts, MidJourney prompts, Stable Diffusion prompts, AI tools, prompt engineering, AI workflow, prompt marketplace",
    ogTitle: "PromptShub: AI Prompt Marketplace & Engineering Resources",
    ogDes: "Discover, create, and share top-tier AI prompts at PromptShub. Explore prompt templates, tools, guides, and a vibrant community to supercharge your prompt engineering skills."

  }



  return {
    title: pageMetaData.title,
    description: pageMetaData.description?.slice(0, 160),
    openGraph: {
      title: pageMetaData.ogTitle,
      description: pageMetaData.description?.slice(0, 160),
      url: `${appUrl}product/`,
      images: [{ url: pageMetaData.post_thumbnail?.src, alt: pageMetaData.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMetaData.ogTitle,
      description: pageMetaData.description?.slice(0, 160),
      images: [pageMetaData.post_thumbnail?.src],
    },
  };
}









var postData = {
  per_page: 18,
  order: "DESC",
  keyword: "",
};
postData = JSON.stringify(postData);

const res = await fetch(`${serverUrl}wp-json/promptshub/v2/get_prompts`, {
  method: "POST",
  cache: "no-store", // disables caching

  headers: {
    'Content-Type': 'application/json',
  },
  body: postData,
});


const data = await res.json();







export default async function page({ params }) {
  // const token = useAuthStore((state) => state.token);
  // const { wrapCurrency, priceHtml } = useUtilsStore()

  // const router = useRouter();
  // const searchParams = useSearchParams(); // like location.search
  // var category = searchParams.get('category'); // e.g. "some-category-slug"

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  // const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()



  // var [appData, setappData] = useState(window.appData);





  var promptsData = { posts: data?.posts, total: data?.total, maxPages: data?.max_pages };
  // var [promptsData, setpromptsData] = useState({ posts: data?.posts, total: data?.total, maxPages: data?.maxPages });

  // var category = searchParams.get('category'); // e.g. "some-category-slug"


  // category: category,
  // var queryPramsDefault = { tag: null, keyword: "", paged: 1, order: "DESC", per_page: 18, price: "" };
  // var [queryPrams, setqueryPrams] = useState(queryPramsDefault);


  // var [loading, setloading] = useState(false);




















  return (

    <div>



      <ProductArchive
        entries={promptsData}
      />
    </div>



  );
};

