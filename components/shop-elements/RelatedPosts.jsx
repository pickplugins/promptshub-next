"use client";
import { useState, useEffect, useContext } from "react";

import Link from "next/link";
import Image from "next/image";
import AddToCart from "/components/shop-elements/AddToCart";

import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

import { useCounterStore } from '/store/useCounterStore'



const RelatedPosts = (props) => {


	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var productData = props.productData;
	var categories = productData.categories;
	var relatedProducts = productData.relatedProducts;
	var postId = productData.id;

	console.log(relatedProducts);



	var [loading, setloading] = useState(false);

	var queryPramsDefault = { category: "", post__not_in: postId, categories: categories, keyword: "", paged: 1, order: "DESC", per_page: 8, };

	var dymmyPromots = []

	var [queryPrams, setqueryPrams] = useState(queryPramsDefault);
	var [promptsData, setpromptsData] = useState({ posts: relatedProducts, total: 8, maxPages: 1 });



	function fetchPosts() {



		// if (!token) {
		// 	throw new Error("No token found");
		// }


		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			paged: queryPrams.paged,
			order: queryPrams.order,
			keyword: queryPrams.keyword,
			category: queryPrams.category,
			categories: queryPrams.categories,
			post__not_in: queryPrams.post__not_in,
		};



		postData = JSON.stringify(postData);





		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_products", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {



						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;





						setpromptsData({ posts: posts, total: total, maxPages: max_pages })
						setloading(false);


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}


	useEffect(() => {

		fetchPosts();
	}, []);

	if (promptsData?.posts.length == 0) {

		return null;
	}


	return (
		<div className="p-5  rounded-sm">
			<div className="flex gap-3">
				<div className="text-2xl ">{("Related Products")}</div>
			</div>
			<div className="my-4 ">
				<div className="pb-5 w-full grid grid-cols-2 xl:grid-cols-6 gap-5">


					{promptsData?.posts.map((entry, index) => {

						return (



							<div className="flex flex-col relative bg-[#ffcbb3] text-[#783009]">
								<div className="w-full  overflow-hidden bg-[#fff]  p-2">
									{entry?.post_thumbnail?.src && (
										<Link className="cursor-pointer" href={`/product/${entry.slug}/`} >
											<Image className="  w-full" src={entry?.post_thumbnail?.src} width={300} height={300} alt={entry?.title} />



										</Link>

									)}
									{!entry?.post_thumbnail?.src && (
										<Link className=" cursor-pointer opacity-45" href={`/product/${entry.slug}/`} >
											<Image className="object-contain h-full w-full " src={`/thumb.png`} width={200} height={200} alt={entry?.title} />

										</Link>

									)}




								</div>



								<div className="text-left flex flex-col gap-3 flex-1 p-3">
									<Link className="text-left text-sm lg:text-base  cursor-pointer" href={`/product/${entry.slug}/`} >{entry?.title}
									</Link>

									<div className="flex gap-3 items-center">
										<div className="font-bold  text-[#783009]">{entry?.price}Tk</div>
										{entry?.salePrice && (
											<>
												<div> - </div>
												<div className="line-through text-base text-gray-600">{entry?.regularPrice}Tk</div>
											</>
										)}
									</div>

									{entry?.stockStatus == 'outofstock' && (
										<div className="text-red-400 font-bold">Out of stock</div>
									)}
									{entry?.stockStatus == 'instock' && (
										<AddToCart productData={entry} quantitySyncwithCart={true} hideButtonText={true} addCartItems={addCartItems} />
									)}








								</div>





							</div>


						)
					})}







				</div>
			</div>
		</div>


	);
};

export default RelatedPosts;
