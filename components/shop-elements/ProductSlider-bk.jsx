"use client"
import { useState, useEffect } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';

import Image from "next/image";
import Link from 'next/link';
import AddToCart from "/components/shop-elements/AddToCart";
import { useCounterStore } from '/store/useCounterStore'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ProductSlider = (props) => {

	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()

	var categories = props.categories;
	var column = props.column;

	var [entries, setentries] = useState(props.entries);
	var [queryPrams, setqueryPrams] = useState(props?.queryPrams ? props?.queryPrams : { categories: categories, category: null, tag: null, keyword: "", paged: 1, order: "DESC", per_page: 18, price: "" });

	var [loading, setloading] = useState(false);




	function fetchPosts() {



		// if (!token) {
		// 	//throw new Error("No token found");
		// }

		if (queryPrams.paged < 0) {
			return;
		}


		var postData = JSON.stringify(queryPrams);
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

						console.log(posts);


						setentries({ posts: posts, total: total, maxPages: max_pages })
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
	}, [queryPrams]);

	function loopLayoutX(entry, columnIndex) {

		return (
			<div className=" "
				key={columnIndex}>
				{entry?.title}


			</div>

		);
	}
	function loopLayout(entry, columnIndex) {

		return (
			<div className="bg-[#ffcbb3] text-[#783009] "
				key={columnIndex}>

				{/* {JSON.stringify(entry)} */}


				<div className="flex flex-col relative">
					<div className="w-full overflow-hidden bg-[#fff]  p-2">
						{entry?.post_thumbnail_url && (
							<Link className="cursor-pointer" href={`/product/${entry.slug}/`} >
								<Image className=" w-full" src={entry?.post_thumbnail_url} width={300} height={300} alt={entry?.title} />



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

						{/* {JSON.stringify(entry.categories)} */}



						<div className="flex gap-3 items-center">

							<div className="font-bold text-lg text-[#783009]">{entry?.price}Tk</div>

							{entry?.salePrice && (
								<>
									<div> - </div>
									<div className="line-through text-base text-gray-600">{entry?.regularPrice}Tk</div>

								</>
							)}


							{/* {entry?.price && (
								<div className="font-bold text-lg">{(entry?.price)}Tk</div>
							)}
							{entry?.salePrice && (
								<div className="line-through">{(entry?.regularPrice)}Tk</div>
							)} */}


						</div>


						{entry?.stockStatus == 'outofstock' && (
							<div className="text-red-400 font-bold">Out of stock</div>
						)}
						{entry?.stockStatus == 'instock' && (
							<AddToCart productData={entry} quantitySyncwithCart={true} hideButtonText={true} addCartItems={addCartItems} />
						)}








					</div>





				</div>
			</div>

		);
	}










	return (
		<div className="w-full">

			{entries?.posts.length > 0 && (

				<Splide aria-label="My Favorite Images" options={{
					type: 'loop',     // 'slide', 'loop', or 'fade'
					perPage: column,          // Number of columns (slides) visible
					perMove: 1,          // Number of slides to move per navigation
					gap: '1rem',     // Space between slides
					breakpoints: {
						768: {
							perPage: 2,
						},
						1024: {
							perPage: 4,
						},
					},
				}}>

					{entries?.posts?.map((entry, loopIndex) => {


						return (<SplideSlide key={loopIndex}>
							{loopLayout(entry, loopIndex)}

						</SplideSlide>)
					})}

				</Splide>
			)}








		</div>
	);
};

export default ProductSlider;
