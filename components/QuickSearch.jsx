import PropTypes from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import {
	IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconTrash, IconSearch, IconChevronUp, IconChevronDown, IconX, IconShoppingCartCancel, IconLetterX, IconCornerUpLeftDouble, IconArrowNarrowLeftDashed,
	IconArrowNarrowRightDashed,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./Spinner";
import { useUtilsStore } from "/store/useUtilsStore";
import { useCounterStore } from '/store/useCounterStore'

import AddToCart from "/components/shop-elements/AddToCart";
import * as fbq from "/lib/fpixel";



const QuickSearch = (props) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


	const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, coupons, setCoupons, cartTotalPay, setcartTotalPay, cartTotal, setcartTotal, shippingCost, setshippingCost, } = useCounterStore()





	const { wrapCurrency, priceHtml } = useUtilsStore()

	var onTriggerOpen = props?.onTriggerOpen;

	var prams = props?.prams;
	var wrapperClass = props?.wrapperClass ? props?.wrapperClass : "";


	const [isOpen, setIsOpen] = useState(true);
	var [loading, setloading] = useState(false);
	var [promptsData, setpromptsData] = useState({ posts: [], total: 0, maxPages: 1 });

	var [queryPrams, setqueryPrams] = useState({ keyword: "", category: "", paged: 1, order: "DESC", per_page: 5, });

	var [queryTerms, setqueryTerms] = useState({ taxonomy: 'prompt_cat', order: "ASC", });
	var [terms, setterms] = useState([]);

	function fetchTerms() {
		//const token = useAuthStore((state) => state.token);

		// const token = localStorage.getItem("token");




		var postData = {
			taxonomy: queryTerms.taxonomy,
			per_page: queryTerms.per_page,
			paged: queryTerms.paged,
			order: queryTerms.order,
			hierarchical: true,
		};
		postData = JSON.stringify(postData);

		fetch(serverUrl + "wp-json/promptshub/v2/get_terms", {
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


						var terms = res?.terms;
						var total = res?.total;
						var max_pages = res?.max_pages;




						var termsX = [];

						Object.entries(terms).map(args => {
							var index = args[0]
							var item = args[1]
							termsX.push(item)
						})


						setterms(termsX)


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



	function fetchPosts() {



		// if (!token) {
		// 	//throw new Error("No token found");
		// }

		if (queryPrams.keyword?.length < 3) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			paged: queryPrams.paged,
			order: queryPrams.order,
			keyword: queryPrams.keyword,
			category: queryPrams.category,
			price: queryPrams.price,
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
							fbq.event("Search", { value: queryPrams.keyword })

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
		fetchTerms();
	}, []);
	useEffect(() => {

		if (queryPrams.keyword?.length == 0) {
			setpromptsData({ ...promptsData, posts: [] })
		} else {


		}


		fetchPosts();
	}, [queryPrams]);


	function getQuantityById(id) {


		const item = cartItems?.find(obj => obj.id === id);
		return item ? item.quantity : null; // returns null if not found
	}

	return <div className={`${wrapperClass}`}>

		<div className={`flex flex-wrap gap-2  items-center`} onClick={ev => {
			if (onTriggerOpen) {
				onTriggerOpen(isOpen, prams)
			}

			setIsOpen(!isOpen)
		}}>



			<input value={queryPrams.keyword} onChange={ev => {

				var value = ev.target.value;
				setqueryPrams({ ...queryPrams, keyword: value, paged: 1 })

			}} type="text" className={`  w-full lg:w-max border-2 !border-[#ffcbb3] !text-[#783009] px-3`} placeholder="Search..." />

			<select name="" id="" className="!border-2 border-solid !border-gray-600 !shadow-none xl:w-56 w-full" onChange={ev => {

				var value = ev.target.value;

				setqueryPrams({ ...queryPrams, category: value, paged: 1 });

			}}>
				<option value={""}>{("All Categories")}</option>

				{terms?.map(item => {

					var children = item?.children;

					if (children) {

						return (

							<optgroup label={`${item.name}(${item.count})`} key={item.term_id}>
								<option value={item.slug} key={item.slug}>
									{item.name}({item.count})
								</option>


								{children?.map(childItem => {

									return (
										<option value={childItem.slug} key={childItem.term_id}>
											{childItem.name}({childItem.count})
										</option>

									)
								})}

							</optgroup>


						)

					}
					if (!children) {
						return (
							<option value={item.slug} key={item.term_id}>
								{item.name}({item.count})
							</option>
						)
					}




				})}

			</select>


			{queryPrams?.keyword?.length > 0 && (
				<div className="text-red-400 text-sm cursor-pointer" onClick={ev => {
					setqueryPrams({ ...queryPrams, keyword: "" })
				}}>Reset</div>
			)}


			{loading && (

				<Spinner />

			)}




		</div>

		{queryPrams?.keyword?.length > 0 && (
			<div className={` bg-white rounded-sm    `}>


				<div className="flex text-sm mb-3">



				</div>



				<div className="flex gap-4 flex-col">

					{promptsData?.posts?.length == 0 && (

						<div>No products found.</div>

					)}

					{promptsData?.posts?.map((product, index) => {


						var quantityInCart = getQuantityById(product?.id)

						quantityInCart = quantityInCart ? quantityInCart : 0;


						return (

							<div className="flex gap-3 text-sm items-center bg-[#ffcbb3]    p-1" key={index}>
								{product?.post_thumbnail_url && (
									<Link className="border" href={`/product/${product.slug}/`} >
										<Image className="object-cover w-16 h-16" src={product?.post_thumbnail?.src} width={200} height={200} alt={product?.title} />
									</Link>

								)}

								{!product?.post_thumbnail_url && (
									<Link className="border" href={`/product/${product.slug}/`} >
										<Image className="object-cover w-16 h-16" src={`/thumb.png`} width={200} height={200} alt={product?.title} />

									</Link>

								)}

								<div className="flex flex-col gap-1 items-center   rounded-sm border-gray-500  ">


									<span onClick={() => {


										var quantity = 1;
										// updateCartItems(product.id, { quantity: quantity })



										addCartItems({ id: product?.id, title: product?.title, quantity: quantity, price: product?.price, regularPrice: product?.regularPrice, salePrice: product?.salePrice, priceHtml: product?.price_html, thumbnail: product?.post_thumbnail?.src })



									}} className="cursor-pointer hover:text-gray-600 bg-amazon-600 rounded-sm ">
										<IconChevronUp />
									</span>

									<span>{quantityInCart}</span>
									<span onClick={() => {

										var quantity = - 1;


										addCartItems({ id: product?.id, title: product?.title, quantity: quantity, price: product?.price, regularPrice: product?.regularPrice, salePrice: product?.salePrice, priceHtml: product?.price_html, thumbnail: product?.post_thumbnail?.src })



									}} className="cursor-pointer hover:text-gray-600 bg-amazon-600 rounded-sm ">
										<IconChevronDown />
									</span>
								</div>




								<div className="flex flex-col gap-2">
									<Link className="" href={`/product/${product.slug}/`} >{product?.title}</Link>

									<div className="flex gap-3 items-center">
										<div className="font-bold  text-[#783009]">{product?.price}Tk</div>
										{product?.salePrice && (
											<>
												<div> - </div>
												<div className="line-through text-base text-gray-600">{product?.regularPrice}Tk</div>
											</>
										)}
									</div>


								</div>
							</div>

						)

					})}



				</div>

				{promptsData?.posts?.length > 0 && (
					<div className="
					flex items-center justify-center gap-3  my-3">
						<div
							className="!border-2 border-solid border-gray-600 !shadow-none px-2 py-1 rounded-sm cursor-pointer"
							onClick={(ev) => {
								var paged = queryPrams.paged;


								if (paged == 1) return;
								setqueryPrams({ ...queryPrams, paged: queryPrams.paged - 1 });
							}}>
							<IconArrowNarrowLeftDashed />
						</div>

						<div>
							<input className="!border-2 border-solid !border-gray-600 !shadow-none px-2 py-1 rounded-sm cursor-pointer w-16 text-center" type="text" value={queryPrams.paged} onChange={ev => {
								var value = parseInt(ev.target.value)
								var paged = value;

								if (paged > promptsData?.maxPages) return;
								setqueryPrams({ ...queryPrams, paged: paged });

							}} />
						</div>

						<div
							className="!border-2 border-solid border-gray-600 !shadow-none px-2 py-1 rounded-sm cursor-pointer"
							onClick={(ev) => {
								var paged = queryPrams.paged + 1;

								if (paged > promptsData?.maxPages) return;
								setqueryPrams({ ...queryPrams, paged: paged });
							}}>
							<IconArrowNarrowRightDashed />
						</div>
					</div>

				)}




			</div>

		)}

	</div>;
};



export default QuickSearch;
