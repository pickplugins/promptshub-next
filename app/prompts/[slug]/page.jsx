
// app/products/[slug]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


// import { useState, useEffect, useContext } from "react";
import AddToCart from "/components/shop-elements/AddToCart";
import SubscribeToCall from "/components/shop-elements/SubscribeToCall";
import RequestForStock from "/components/shop-elements/RequestForStock";
import ImageGallery from "/components/shop-elements/ImageGallery";
import Tabs from "/components/Tabs";
import Tab from "/components/Tab";
import Comments from "/components/shop-elements/Comments";
import RelatedPosts from "/components/shop-elements/RelatedPosts";
import RequestForDiscount from "/components/shop-elements/RequestForDiscount";
import Upsells from "/components/shop-elements/Upsells";
import PromptView from "/components/PromptView";
import ToggleContent from "/components/ToggleContent";
import ReactMarkdown from 'react-markdown';

// import { useCounterStore } from '/store/useCounterStore'
// import { useUtilsStore } from "/store/useUtilsStore";
// import { useAuthStore } from "/store/authStore";
import { marked } from 'marked';
import { IconArrowNarrowRightDashed, IconHelp, IconCopy, IconBrandOpenai, IconX, IconShoppingCartPlus, IconHeart, IconHeartFilled, IconChevronDown, IconShoppingCartCopy, IconDownload, IconThumbUp, IconThumbDown, IconEyeSearch, IconReplace } from "@tabler/icons-react";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


// ⬅️ Force server-side rendering on every request
export const dynamic = "force-dynamic";

import { getProduct } from "/lib/getProduct";

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await params
  const productResponse = await getProduct(slug);

  if (!productResponse) return { title: "Product Not Found" };


  var productData = productResponse?.prompt;



  return {
    title: productData?.title?.slice(0, 65),
    description: productData?.post_excerpt || productData?.post_excerpt?.slice(0, 160),
    openGraph: {
      title: productData.title,
      description: productData?.post_excerpt || productData?.post_excerpt?.slice(0, 160),
      url: `${appUrl}/prompts/${slug}`,
      images: [{ url: productData.post_thumbnail?.src, alt: productData.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: productData.title,
      description: productData?.post_excerpt || productData?.post_excerpt?.slice(0, 160),
      images: [productData.post_thumbnail?.src],
    },
  };
}








export default async function page({ params }) {
  const { slug } = await params; // ✅ await params

  console.log(slug);


  const productResponse = await getProduct(slug);

  if (!productResponse) return { title: "Product Not Found" };


  var productData = productResponse?.prompt;

  console.log(productData);



  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productData?.title,
    "image": [productData?.post_thumbnail?.src],
    "sku": productData?.sku || slug,
    "description": productData?.post_excerpt ? productData?.post_excerpt : productData?.title,
    "brand": {
      "@type": "Brand",
      "name": "PromptsHub"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Customer"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25"
    },
    "offers": {
      "@type": "Offer",
      "url": `${appUrl}/prompts/${slug}`,
      "priceCurrency": "BDT",
      "price": productData?.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "priceValidUntil": "2025-12-31",
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "applicableCountry": "BD",
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "d"
          }
        },
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "BDT"
        }
      }
    }
  }

    ;



  // var [editPlaceholders, seteditPlaceholders] = useState(null);



  function cents_to_dollar(cents) {
    const dollars = (cents / 100).toFixed(2);

    return "$" + dollars;

  }














  const copyData = (data) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
      })
      .catch((err) => { });
  };







  var runToSites = [
    { label: "Chat GPT", value: "chatgpt" },
    { label: "Google Gemini", value: "gemini" },
    { label: "Perplexity AI", value: "perplexity" },
    { label: "HuggingChat ", value: "huggingchat " },
    { label: "X.AI", value: "xai" },
    { label: "Microsoft Copilot", value: "copilot" },
    { label: "Poe (by Quora)", value: "poe" },
    { label: "Ideogram", value: "ideogram" },
    { label: "reve", value: "reve" },
    { label: "picsart", value: "picsart" },
    { label: "firefly.adobe.com", value: "firefly.adobe.com" },
    { label: "fotor", value: "fotor" },
    { label: "recraft", value: "recraft" },
    { label: "akool", value: "akool" },
    { label: "gencraft", value: "gencraft" },
    { label: "magichour", value: "magichour" },
    { label: "veed.io", value: "veed" },
  ]

  const FAQTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">


        <div>{text}</div>
      </div>
    )

  }

  const communityComments = [
    "Keep inspiring us!",
    "Your voice matters!",
    "Let’s build together!",
    "Love this energy!",
    "Shoutout to the whole team!",
    "Thanks for sharing!",
    "Creativity on point!",
    "This made my day!",
    "Appreciate the update!",
    "Such a powerful message.",
    "We hear you!",
    "This community rocks!",
    "Grateful to be here.",
    "Proud of everyone here!",
    "Let’s keep growing!",
    "Big love to all!",
    "Unity makes us strong.",
    "Your effort shows!",
    "We rise together!",
    "So well said!",
    "Inspired by this!",
    "Always learning here.",
    "Open minds, open hearts.",
    "Thank you for the support!",
    "Let’s keep the ideas flowing!",
    "Such creative work!",
    "Connection is everything.",
    "You’re not alone here.",
    "Keep creating magic!",
    "Together, we thrive."
  ];



  return (
    <div>

      <div className="  w-full xl:w-[1200px] mx-auto my-10 ">

        <PromptView promptData={productData} />

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />


    </div>
  );
}
