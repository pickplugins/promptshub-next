
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

    title: "Kidobazar | Baby Products, Kids Toys & Fashion Online",
    description: "Shop baby products, kids toys, clothing & essentials online at Kidobazar. Affordable prices, trusted brands & fast delivery for your little ones.",
    post_thumbnail: { src: "", alt: "" },
    keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
    ogTitle: "Kidobazar – Baby Products, Kids Toys & Fashion Online",
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









var postData = {
  per_page: 18,
  order: "DESC",
  keyword: "",
};
postData = JSON.stringify(postData);

const res = await fetch(`${serverUrl}wp-json/promptshub/v2/get_products`, {
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

      {/* <div className="p-10 w-full  mx-auto">

        <div className="flex flex-col gap-20">

          <div className="flex gap-5 items-center">

            <div className="w-[500px]">
              <div className="text-2xl font-bold text-[#783009] my-5">Baby Diapers</div>
              <p className="">
                Keep your little one dry and comfortable with our premium baby diapers. Designed for maximum absorbency and gentle on sensitive skin, our diapers prevent leaks and ensure all-day protection. Available in various sizes, they offer a snug fit and soft material to support your baby’s active lifestyle. Shop now for reliable, affordable, and safe baby diapers for every stage.
              </p>
            </div>
            <div className="flex-1">
              <ProductGrid column={5} categories={["baby-diapers"]} />

            </div>

          </div>
          <div className="flex gap-5 items-center">


            <div className="flex-1">
              <ProductGrid column={5} categories={["baby-powder"]} />

            </div>
            <div className="w-[500px]">
              <div className="text-2xl font-bold text-[#783009] my-5">Baby Powder</div>
              <p className="">
                Keep your little one dry and comfortable with our premium baby diapers. Designed for maximum absorbency and gentle on sensitive skin, our diapers prevent leaks and ensure all-day protection. Available in various sizes, they offer a snug fit and soft material to support your baby’s active lifestyle. Shop now for reliable, affordable, and safe baby diapers for every stage.
              </p>
            </div>
          </div>





          <div className="text-2xl font-bold text-[#783009] my-5">Baby Lotion</div>
          <ProductGrid column={5} categories={["baby-lotion"]} />

          <div className="text-2xl font-bold text-[#783009] my-5">Baby Body Wash</div>
          <ProductGrid column={5} categories={["baby-body-wash"]} />


        </div>


      </div> */}

      <ProductArchive
        entries={promptsData}
      />
    </div>



  );
};

