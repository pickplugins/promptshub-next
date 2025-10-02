
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
import ToggleContent from "/components/ToggleContent";
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


  var productData = productResponse?.product;



  return {
    title: productData?.title?.slice(0, 65),
    description: productData.post_excerpt || productData.post_excerpt?.slice(0, 160),
    openGraph: {
      title: productData.title,
      description: productData.post_excerpt || productData.post_excerpt?.slice(0, 160),
      url: `${appUrl}product/`,
      images: [{ url: productData.post_thumbnail?.src, alt: productData.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: productData.title,
      description: productData.post_excerpt || productData.post_excerpt?.slice(0, 160),
      images: [productData.post_thumbnail?.src],
    },
  };
}








export default async function page({ params }) {
  const { slug } = await params; // ✅ await params

  const productResponse = await getProduct(slug);

  if (!productResponse) return { title: "Product Not Found" };


  var productData = productResponse?.product;




  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productData?.title,
    "image": [productData?.post_thumbnail?.src],
    "sku": productData?.sku || slug,
    "description": productData?.post_excerpt ? productData?.post_excerpt : productData?.title,
    "brand": {
      "@type": "Brand",
      "name": productData?.brands[0]?.name || "KidoBazar"
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
      "url": `${appUrl}/product/${slug}`,
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



  // function downloadPrompt() {

  //   // download_count(productData?.id)

  //   const token = localStorage.getItem("token");

  //   if (!token) {

  //     addNotification({ type: 'error', title: 'Login Required', content: "Please Login to download prompt" })

  //     throw new Error("No token found");
  //   }

  //   var allowDownload = false;

  //   var postData = {
  //     id: productData?.id,
  //   };

  //   postData = JSON.stringify(postData);

  //   fetch(serverUrl + "wp-json/promptshub/v2/download_count", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: postData,
  //   })
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Token validation failed');
  //       }

  //       if (response.ok && response.status < 400) {
  //         response.json().then((res) => {




  //           var content = productData?.content;
  //           var variations = productData?.variations;



  //           var variationsText = "";

  //           variations.map(variation => {

  //             variationsText += "Title: " + variation.title + "\n";
  //             variationsText += "Prompt: " + variation.content + "\n\n";

  //           })



  //           var title = toSlug(productData?.title)


  //           const blob = new Blob([variationsText], { type: 'text/plain' });
  //           const url = URL.createObjectURL(blob);

  //           const a = document.createElement('a');
  //           a.href = url;
  //           a.download = productData?.id + "-" + title + ".txt";  // file name
  //           document.body.appendChild(a);
  //           a.click();
  //           document.body.removeChild(a);
  //           URL.revokeObjectURL(url);

  //           setTimeout(() => {
  //           }, 500);
  //         });
  //       }
  //     })
  //     .catch((_error) => {
  //       //this.saveAsStatus = 'error';
  //       // handle the error
  //     });

  // }

  // function purchase_by_credits() {


  //   setloading(true);

  //   const token = localStorage.getItem("token");

  //   if (!token) {

  //     addNotification({ type: 'error', title: 'Login Required', content: "Please Login to download prompt" })
  //     setloading(false);

  //     throw new Error("No token found");
  //   }

  //   var prompt_credits = parseInt(productData?.credits)

  //   var postData = {
  //     id: productData?.id,
  //     credits: productData?.credits,
  //   };

  //   postData = JSON.stringify(postData);

  //   fetch(serverUrl + "wp-json/promptshub/v2/create_purchase", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: postData,
  //   })
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Token validation failed');
  //       }

  //       if (response.ok && response.status < 400) {
  //         response.json().then((res) => {


  //           var status = res.status;
  //           var message = res.message;

  //           if (status == "success") {
  //             addNotification({ type: 'success', title: 'Thank you for your purchase', content: message })
  //             setpromptData({ ...productData, purchased: true })

  //             var total_credit = parseInt(userDataX.total_credit) - prompt_credits
  //             setUserDataX({ ...userDataX, total_credit: total_credit });

  //           }

  //           if (status == "exist") {
  //             addNotification({ type: 'warnning', title: 'Thank you for trying.', content: message })
  //             setpromptData({ ...productData, purchased: true })

  //           }

  //           if (status == "failed") {
  //             addNotification({ type: 'error', title: 'Sorry, Somthing went wrong!', content: message })
  //           }




  //           // var content = productData?.content;
  //           // var title = toSlug(productData?.title)


  //           setTimeout(() => {
  //             setloading(false);

  //           }, 500);
  //         });
  //       }
  //     })
  //     .catch((_error) => {
  //       //this.saveAsStatus = 'error';
  //       // handle the error
  //     });

  // }







  function toSlug(text) {
    return text
      .toLowerCase()
      .replace(/\[.*?\]/g, '')        // remove anything inside [ ]
      .replace(/[^\w\s-]/g, '')       // remove non-word chars except space and dash
      .replace(/\s+/g, '-')           // replace spaces with dashes
      .replace(/-+/g, '-')            // collapse multiple dashes
      .replace(/^-|-$/g, '');         // trim starting/trailing dash
  }






  // function votePost(postId, vote_type) {

  //   const token = localStorage.getItem("token");


  //   if (!token) {

  //     addNotification({ type: 'error', title: 'Login Required', content: "Please Login to vote prompt" })

  //     throw new Error("No token found");
  //   }

  //   if (productData?.has_voted == "upvote") {
  //     addNotification({ type: 'error', title: 'Already voted', content: "Thank you for your vote." })
  //     return;
  //   }

  //   if (productData?.has_voted == "downvote") {
  //     addNotification({ type: 'error', title: 'Already voted', content: "Thank you for your vote." })
  //     return;
  //   }









  //   // if (!token) {
  //   // 	throw new Error("No token found");
  //   // }

  //   // if (action) {
  //   // 	return;
  //   // }

  //   var postData = {
  //     object_id: postId,
  //     vote_type: vote_type,
  //   };



  //   postData = JSON.stringify(postData);

  //   fetch(serverUrl + "wp-json/promptshub/v2/post_vote", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: postData,
  //   })
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Token validation failed');
  //       }

  //       if (response.ok && response.status < 400) {
  //         response.json().then((res) => {

  //           var errors = res?.errors;
  //           var message = res?.message;
  //           if (errors) {
  //             addNotification({ type: 'error', title: 'Sorry, There was an error.', content: message })
  //           }
  //           if (!errors) {
  //             addNotification({ type: 'success', title: 'Great! You earned credits', content: "By Voting other content you will earn credits." })





  //             if (vote_type == 'downvote') {

  //               var voteCount = parseInt(productData.voteCount) - 1;;
  //               setpromptData({ ...productData, voteCount: voteCount, has_voted: "downvote" })

  //               // Update user credit

  //               var total_credit = parseInt(userDataX.total_credit) + 1
  //               setUserDataX({ ...userDataX, total_credit: total_credit });
  //             }
  //             if (vote_type == 'upvote') {
  //               var voteCount = parseInt(productData.voteCount) + 1;
  //               setpromptData({ ...productData, voteCount: voteCount, has_voted: "upvote" })

  //               var total_credit = parseInt(userDataX.total_credit) + 1
  //               setUserDataX({ ...userDataX, total_credit: total_credit });
  //             }








  //           }


  //         });
  //       }
  //     })
  //     .catch((_error) => {
  //       //this.saveAsStatus = 'error';
  //       // handle the error
  //     });

  // }

  // function viewPost(postId) {

  //   const token = localStorage.getItem("token");

  //   // if (!token) {
  //   // 	throw new Error("No token found");
  //   // }

  //   // if (action) {
  //   // 	return;
  //   // }

  //   var postData = {
  //     id: postId,
  //     source: 'promptPage',
  //   };


  //   postData = JSON.stringify(postData);

  //   fetch(serverUrl + "wp-json/promptshub/v2/post_view", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Authorization': `Bearer ${token}`
  //     },
  //     body: postData,
  //   })
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Token validation failed');
  //       }

  //       if (response.ok && response.status < 400) {
  //         response.json().then((res) => {



  //           setTimeout(() => {
  //           }, 500);
  //         });
  //       }
  //     })
  //     .catch((_error) => {
  //       //this.saveAsStatus = 'error';
  //       // handle the error
  //     });

  // }

  // function lovePost(postId) {

  //   const token = localStorage.getItem("token");

  //   if (!token) {

  //     addNotification({ type: 'error', title: 'Login Required', content: "Please Login to Love prompt" })

  //     throw new Error("No token found");
  //   }

  //   var loved = productData?.loved;



  //   var postData = {
  //     object_id: postId,
  //     source: 'archive',
  //   };


  //   postData = JSON.stringify(postData);

  //   fetch(serverUrl + "wp-json/promptshub/v2/post_loved", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: postData,
  //   })
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Token validation failed');
  //       }

  //       if (response.ok && response.status < 400) {
  //         response.json().then((res) => {

  //           var errors = res?.errors;
  //           var message = res?.message;


  //           if (errors) {
  //             addNotification({ type: 'error', title: 'Sorry, There was an error.', content: message })
  //             return;
  //           }


  //           setTimeout(() => {

  //             if (loved) {
  //               var loveCount = productData.loveCount - 1;
  //               loved = false;
  //             } else {
  //               var loveCount = productData.loveCount + 1;
  //               loved = true;
  //               addNotification({ type: 'success', title: 'Great! You earned credits', content: "By Loving other content you will earn credits." })

  //             }


  //             // setpromptData({ ...productData, loved: loved })
  //             setpromptData({ ...productData, loveCount: loveCount, loved: loved })

  //             var total_credit = parseInt(userDataX.total_credit) + 1
  //             setUserDataX({ ...userDataX, total_credit: total_credit });


  //           }, 200);
  //         });
  //       }
  //     })
  //     .catch((_error) => {
  //       //this.saveAsStatus = 'error';
  //       // handle the error
  //     });

  // }



  // function download_count(postId) {

  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     throw new Error("No token found");
  //   }


  //   // if (action) {
  //   // 	return;
  //   // }

  //   var postData = {
  //     id: postId,
  //   };




  //   postData = JSON.stringify(postData);

  //   fetch(serverUrl + "wp-json/promptshub/v2/download_count", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: postData,
  //   })
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Token validation failed');
  //       }

  //       if (response.ok && response.status < 400) {
  //         response.json().then((res) => {


  //           setTimeout(() => {
  //           }, 500);
  //         });
  //       }
  //     })
  //     .catch((_error) => {
  //       //this.saveAsStatus = 'error';
  //       // handle the error
  //     });

  // }



  // function onChangePlaceholder(comment) {


  // }


  // function run_prompt_on(site, prompt) {


  //   const encodedPrompt = encodeURIComponent(prompt);

  //   if (site == 'chatgpt') {
  //     var chatUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
  //   }
  //   if (site == 'gemini') {
  //     var chatUrl = `https://gemini.google.com/?q=${encodedPrompt}`;
  //   }
  //   if (site == 'perplexity') {
  //     var chatUrl = `https://www.perplexity.ai/search/?q=${encodedPrompt}`;
  //   }
  //   if (site == 'huggingchat') {
  //     var chatUrl = `https://huggingface.co/chat?q=${encodedPrompt}`;
  //   }
  //   if (site == 'xai') {
  //     var chatUrl = `https://grok.com?q=${encodedPrompt}`;
  //   }
  //   if (site == 'copilot') {
  //     var chatUrl = `https://copilot.microsoft.com/?q=${encodedPrompt}`;
  //   }
  //   if (site == 'poe') {
  //     var chatUrl = `https://poe.com?q=${encodedPrompt}`;
  //   }



  //   window.open(chatUrl, '_blank');

  // }

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








        {/* {JSON.stringify(userDataX)} */}


        <div className=" p-5 flex flex-col gap-10 ">

          <div className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-10 bg-gray-800 text-gray-200 rounded-sm">

            {/* {JSON.stringify(productData?.gallery)} */}


            <div className="rounded-sm overflow-hidden">

              {productData?.gallery.length > 0 && (

                <ImageGallery images={productData?.gallery} />
              )}

              {productData?.gallery.length == 0 && (

                <ImageGallery images={[{ "id": 188099, "title": "image", "src": appUrl + "images/prompt-thumb-gallery.png" }]

                } />
              )}





            </div>
            <div className="text-left flex flex-col gap-4 ">
              <div className=" text-2xl">{productData?.title}</div>

              <div className="flex gap-4 flex-wrap">
                <div className="flex gap-3 items-center">

                  <div className={`border-2 ${productData?.has_voted == "upvote" ? "bg-gray-600" : ""} border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-2 rounded-sm flex gap-2 items-center`} onClick={() => {



                    votePost(productData?.id, 'upvote');



                  }}>
                    <IconThumbUp width={20} />

                  </div>

                  <div>{productData?.voteCount}</div>

                  <div className={`border-2 ${productData?.has_voted == "downvote" ? "bg-gray-600" : ""} border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-2 rounded-sm flex gap-2 items-center`} onClick={() => {




                    votePost(productData?.id, 'downvote');



                  }}>
                    <IconThumbDown width={20} />

                  </div>

                </div>
                <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" onClick={ev => {

                  if (!productData?.purchased) {
                    addNotification({ type: 'error', title: 'Please purchase first', content: "Premium prompt only can download by purchase." })
                    return;
                  }

                  downloadPrompt();



                }}><IconDownload />
                  <div>{productData?.downloadCount}</div>
                </div>
                <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" ><IconEyeSearch />
                  <div>{productData?.viewCount}</div>
                </div>



                <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center " onClick={ev => {





                  lovePost(productData?.id);



                }}>

                  {productData?.loved && (
                    <div className="flex gap-2 ">

                      <div className="text-red-400">
                        <IconHeartFilled />
                      </div>

                      <div>{productData?.loveCount}</div>
                    </div>
                  )}
                  {!productData?.loved && (
                    <div className="text-red-500 flex gap-2"><IconHeart /> <div>{productData?.loveCount}</div></div>


                  )}




                </div>

              </div>



              <div>
                {productData?.excerpt}
              </div>

              {/* {productData?.categories.length > 0 && (
                <div className="flex gap-2 flex-wrap items-center">
                  <div>{("Categories")}</div>
                  {productData?.categories.map((item, index) => {
                    return (
                      <div key={index} className="border border-gray-700 px-2 py-1 rounded-sm hover:bg-gray-700 cursor-pointer">
                        <Link className="" to={`/category/${item.slug}/`} dangerouslySetInnerHTML={{ __html: item.name }}>

                        </Link>


                      
                      </div>
                    )
                  })}
                </div>

              )} */}


              {productData?.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  <div >	{("Tags")}</div>
                  {productData?.tags.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-wrap">
                        <Link className="hover:text-indigo-500" to={`/tag/${item.slug}/`} dangerouslySetInnerHTML={{ __html: item.name }}>

                        </Link>
                        {productData?.tags.length > (index + 1) && (
                          <span>,</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}








              <div className="flex gap-4 items-center">

                <div className="  overflow-hidden">
                  <img className="rounded-full " src={productData?.author?.avatar} alt={productData?.author?.name} />
                </div>
                <div>


                  <div className="text-left text-gray-200 font-medium" to={`/author/${productData?.author?.id}/`}>
                    {productData?.author?.name}
                  </div>
                </div>

              </div>

              <div className="flex items-center flex-wrap gap-2">
                <div className="text-base text-indigo-500 font-bold">
                  {("Price")}: {productData?.credits ? cents_to_dollar(productData?.credits) : "$0.00"}
                </div>

                {!productData?.purchased && (
                  <div className="bg-gray-600 hover:bg-indigo-500 hover:text-white  rounded-sm  text-gray-200 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2" onClick={ev => {

                    var remaining_credits = parseInt(userDataX?.total_credit) - parseInt(userDataX?.total_credit_used)

                    var prompt_credits = parseInt(productData.credits);

                    if (remaining_credits < prompt_credits) {
                      addNotification({ type: 'error', title: 'Low Credits', content: "Sorry, you do not have enough credits." })
                      return;
                    }


                    purchase_by_credits(productData.id, prompt_credits)



                  }}> <IconShoppingCartPlus /> Purchase</div>
                )}
                {productData?.purchased && (
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-600 hover:bg-indigo-500 hover:text-white  rounded-sm  text-gray-200 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2" onClick={ev => {




                    }}><IconShoppingCartCopy /> Purchased</div>


                    <div className="bg-gray-600 hover:bg-indigo-500 hover:text-white  rounded-sm  text-gray-200 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2" onClick={ev => {


                      downloadPrompt();



                    }}><IconDownload />
                      <div>Download Prompt</div>
                    </div>
                  </div>

                )}



              </div>

              <div className="my-5">
                <ToggleContent title={"What is the credit pricing system?"}
                  contentClass=""
                  headerClass=""
                  headerTitleClass=""
                  wrapperClass=""
                >
                  <div className="text-gray-200">
                    In addition to subscriptions, we offer a credit-based pricing option. Each credit equals 1 cent (USD). You can use credits to purchase prompts individually or in bulk, offering flexible access without a subscription.
                  </div>

                </ToggleContent>

              </div>

              <div>
                <div>
                  <Link className="text-left flex gap-2 text-amber-600" rel="nofollow" to={`/tickets-submit/?prompt_id=${id}&category=15196`}>
                    <IconHelp /> {("Report an Issue")}
                  </Link>

                </div>
              </div>

            </div>

          </div>
          <div className=" p-5 gap-10 bg-gray-500 text-gray-200 rounded-sm">

            {/* {JSON.stringify(productData?.gallery)} */}

            <div className="xl:w-[500px] w-full mx-auto">
              <div className="text-2xl text-white mb-5">{("Subscribe to News")}</div>

              <EmailSubscribe />
            </div>



          </div>








          {/* {productData?.content && (
            <PlaceholderEditor content={productData?.content} onChange={onChangePlaceholder} />
          )} */}


          {productData?.variations.length > 0 && (

            <div className="p-5 bg-gray-800 rounded-sm">
              <div className="flex gap-3">

                <div className="text-2xl text-white">{("Variations")}</div>

                {/* {JSON.stringify(productData)} */}



              </div>
              <div className="my-4 flex flex-col gap-5 ">
                {productData?.variations?.map((item, index) => {

                  return (
                    <div key={index} className="flex gap-4  bg-gray-700 p-4 rounded-sm text-white"                        >

                      {item?.thumbnail?.src?.length > 0 && (
                        <div className="w-48 ">
                          <div className="flex flex-col gap-3">
                            <div className="border-2 border-solid border-gray-600 rounded-sm overflow-hidden">
                              <img src={item?.thumbnail?.src} alt={item?.title} />
                            </div>
                          </div></div>
                      )}



                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-3 text-left">
                          <div>

                            {!userDataX?.id && (
                              <div className="relative">
                                <img className="w-full" src="https://i.ibb.co/WNJ6B5j9/image.png" alt="Premium AI Prompts" />
                                <div className="bg-amber-600 hover:bg-amber-500 cursor-pointer text-white py-2 px-4 rounded-sm xl:absolute top-1/2 xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:-translate-y-1/2 
">
                                  <Link className="text-left  font-medium" to={`/account/`}>
                                    {("Login to Unlock")}
                                  </Link>


                                </div>
                              </div>
                            )}

                            {userDataX?.id && (
                              <div>
                                <div className="text-base font-bold mb-5">{item?.title}</div>
                                <div>{item?.content}</div>
                              </div>
                            )}



                          </div>

                          {userDataX?.id && (
                            <div className="flex gap-3 flex-wrap">
                              <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" onClick={() => {


                                copyData(item?.content);
                                addNotification({ type: 'success', title: 'Coppied', content: "Prompt Coppied Successful." })
                              }}>
                                <IconCopy width={20} />
                                <span>{("Copy")}</span>
                              </div>



                              <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center" >
                                <IconBrandOpenai width={20} />

                                <select name="" id="" className="!border-0 !shadow-none " onChange={ev => {
                                  var value = ev.target.value;

                                  run_prompt_on(value, item?.content);

                                }}>
                                  <option value="" className="!text-gray-700">{("Run on")}</option>
                                  {runToSites.map((item, index) => {

                                    return (<option value={item.value} key={index}>{item.label}</option>)
                                  })}


                                </select>

                              </div>








                              <div className="border-2 border-gray-600 hover:bg-gray-600 cursor-pointer text-gray-200 py-1 px-4 rounded-sm flex gap-2 items-center relative" >
                                <div className="flex gap-2" onClick={ev => {

                                  ev.preventDefault()
                                  ev.stopPropagation()




                                  // if (editPlaceholders?.index == index) {
                                  //   seteditPlaceholders(null)

                                  // } else {
                                  //   seteditPlaceholders({ index: index })
                                  // }

                                }}>
                                  <IconReplace width={20} />
                                  <span>{("Edit Placeholders")}</span>
                                </div>



                                {/* 
                                {editPlaceholders?.index == index && (
                                  <Popover className={`absolute bottom-full left-1/2 transform -translate-x-1/2 z-10       bg-gray-800 border-2 border-indigo-600 w-[900px] rounded-sm `}>
                                    <div className="flex gap-3 items-center justify-between ">
                                      <div></div>
                                      <div className=" bg-red-400 text-white px-1 py-1 rounded-sm cursor-pointer" onClick={ev => {
                                        seteditPlaceholders(null)

                                      }}>
                                        <IconX />
                                      </div>
                                    </div>
                                    <div >
                                      {productData?.content && (
                                        <PlaceholderEditor content={item?.content} onChange={null} />

                                      )}
                                    </div>
                                  </Popover>
                                )} */}

                              </div>
                            </div>
                          )}


                        </div>

                      </div>



                    </div>
                  )

                })}
              </div>

            </div>
          )}

          <div>
            <Comments postData={productData} dummyComments={communityComments} id={id} />
          </div>


          <div className="p-5 bg-gray-800 rounded-sm">
            <div className="flex gap-3">
              <div className="text-2xl text-white">{("Frequently Asked Questions")}</div>
            </div>
            <div className="my-4 flex flex-col gap-5 ">


              {productData?.faq && (

                <div className="my-4">
                  {productData?.faq.map((item, index) => {

                    return (
                      <ToggleContent key={index} title={<FAQTitle text={item.title} index={index} />}
                        contentClass=""
                        headerClass=""
                        headerTitleClass=""
                        wrapperClass=""
                      >

                        <div className="text-gray-200">


                          {item?.content}


                        </div>

                      </ToggleContent>
                    )

                  })}
                </div>
              )}


            </div>

          </div>

          {productData?.content && (
            <div className="p-5 bg-gray-800 rounded-sm">
              <div id="blog-content" className="my-4 flex flex-col gap-5 text-white">
                <ReactMarkdown>{productData?.content}</ReactMarkdown>
              </div>
            </div>

          )}






          {/* {categories?.length > 0 && (
            <div className="p-5 bg-gray-800 rounded-sm">
              <div className="flex gap-3">
                <div className="text-2xl text-white">{("Related Prompts")}</div>
              </div>
              <div className="my-4 ">



                <RelatedPosts postId={productData?.id} categories={categories} />
              </div>

            </div>

          )} */}






        </div>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />


    </div>
  );
}
