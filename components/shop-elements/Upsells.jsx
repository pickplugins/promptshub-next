"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconPlus, IconEqual } from "@tabler/icons-react";

import { useCounterStore } from '/store/useCounterStore'


const Upsells = (props) => {



	const appUrl = process.env.NEXT_PUBLIC_APP_URL;
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var productData = props.productData;
	var upsells = productData?.upsells;

	console.log(upsells);


	var ids = upsells?.map(item => item.id);



	if (ids?.length == 0) return;


	var [loading, setloading] = useState(false);


	var [queryPrams, setqueryPrams] = useState({ post__in: ids, order: "DESC", per_page: 8, });
	var [promptsData, setpromptsData] = useState({ posts: [], total: 8, maxPages: 1 });
	var [upsellPrice, setupsellPrice] = useState({ total: "", saved: "" });



	function fetchPosts() {



		// if (!token) {
		// 	throw new Error("No token found");
		// }



		var postData = {
			order: queryPrams.order,
			post__in: queryPrams.post__in,
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


	useEffect(() => {

		var total_regularPrice = 0;
		var total_salePrice = 0;
		var total_price = 0;
		var saved = 0;

		upsells.map(item => {

			var price = item?.price ? parseFloat(item?.price) : 0;
			var regularPrice = item?.regularPrice ? parseFloat(item?.regularPrice) : 0;
			var salePrice = item?.salePrice ? parseFloat(item?.salePrice) : 0;

			total_regularPrice += regularPrice
			total_price += price




		})

		saved = total_regularPrice - total_price;





		console.log("total_price", total_price);


		setupsellPrice({ total: total_price, total_regularPrice: total_regularPrice, saved: saved })

	}, [upsells]);



	// useEffect(() => {

	// 	setqueryPrams({ ...queryPrams, post__in: ids, })

	// 	setTimeout(() => {
	// 		fetchPosts();
	// 	}, 500)

	// }, [ids]);

	console.log(upsellPrice);


	if (!upsellPrice.saved) {
		return null;
	}


	return (
		<div className="p-5  rounded-sm">
			<div className="flex gap-3">
				<div className="text-2xl ">{("Frequently Bought Together")}</div>
			</div>
			<div className="my-4 ">
				<div className="pb-5 flex flex-wrap 2xl:flex-nowrap align-top items-center gap-2">

					{/* {JSON.stringify(upsells)} */}


					{promptsData?.posts.map((entry, index) => {



						return (



							<div key={entry?.id} className="flex lg:flex-row flex-col max-w-[300px] 2xl:w-[300px]  gap-2 items-center">
								<div className="flex flex-col relative bg-[#ffcbb3] text-[#783009]">
									<div className="w-full  overflow-hidden bg-[#fff]  p-2">
										{entry?.post_thumbnail_url && (
											<Link className="cursor-pointer" href={`/product/${entry.slug}/`} >
												<Image className="  w-full" src={entry?.post_thumbnail_url} width={300} height={300} alt={entry?.title} />



											</Link>

										)}
										{!entry?.post_thumbnail_url && (
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









									</div>

								</div>

								<div>
									{promptsData?.posts?.length > (index + 1) && (
										<div className="px-5">
											<IconPlus />
										</div>
									)}
									{promptsData?.posts?.length == (index + 1) && (
										<div className="px-5">
											<IconEqual />
										</div>
									)}
								</div>


							</div>


						)
					})}

					{(upsells.length > 0 && upsellPrice.saved > 0) && (

						<div className="flex flex-1 justify-center    ">
							<div className="flex flex-col items-center gap-3">
								<div className="bg-[#783009] flex w-max hover:bg-[#783009] cursor-pointer text-white px-4 py-[10px] rounded-sm" onClick={ev => {

									upsells.map(item => {


										addCartItems({ id: item?.id, title: item?.title, quantity: 1, price: item?.price, regularPrice: item?.regularPrice, salePrice: item?.salePrice, priceHtml: item?.price_html, thumbnail: item?.post_thumbnail?.src })


									})


								}}>Add to Cart All</div>
								<div className="text-lg flex flex-col items-center gap-3">

									{upsellPrice.total && (
										<div className="flex flex-col gap-5 items-center">

											<div className="flex gap-2">
												<div>Regular Price: </div>

												<div>{upsellPrice.total}Tk</div>
											</div>

											<div className="flex gap-2">
												<div>Discounted:</div>
												<div className="line-through"> {upsellPrice.total_regularPrice}Tk</div>

											</div>

										</div>

									)}
									{upsellPrice.saved && (
										<div className="">Your Saved {upsellPrice.saved}Tk</div>

									)}


								</div>
							</div>
						</div>
					)}







				</div>
			</div>
		</div>

	);
};

export default Upsells;
