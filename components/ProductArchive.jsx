"use client";
import { useEffect, useState } from "react";
import EntriesArchive from "/components/EntriesArchive";



import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";



import Link from 'next/link';
import Spinner from "./Spinner";
import AddToCart from "/components/shop-elements/AddToCart";
import Image from "next/image";

import { useCounterStore } from '/store/useCounterStore'


const ProductArchive = (props) => {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var onRefreshRequest = props.onRefreshRequest;
	// var onChange = props.onChange;
	var columns = props.columns;
	var loading = props.loading;
	var [entries, setentries] = useState(props.entries);
	var [queryPrams, setqueryPrams] = useState(props?.queryPrams ? props?.queryPrams : { category: null, tag: null, keyword: "", paged: 1, order: "DESC", per_page: 18, price: "" });
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

		fetch(serverUrl + "wp-json/promptshub/v2/get_prompts", {
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
	// }, [queryPrams, category]);



	// function onChangeQueryPrams(queryPramsX) {

	// 	setqueryPrams(queryPramsX)

	// }

	// function onRefreshRequest(rows) {
	// 	fetchPosts();
	// }


	function cents_to_dollar(cents) {
		const dollars = (cents / 100).toFixed(2);

		return "$" + dollars;

	}



	function loopLayout(entry, columnIndex) {

		return (
			<div className=""
				key={columnIndex}>

				<div className="flex flex-col gap-4 relative">



					<div className="w-full h-[300px] overflow-hidden bg-gray-600 rounded-sm ">
						{entry?.post_thumbnail_url && (
							<Link className="text-left text-xl  font-medium cursor-pointer" href={`/prompts/${entry?.slug}/`} >
								<img className="object-cover h-full w-full" src={entry?.post_thumbnail_url} alt={entry?.title} />



							</Link>

						)}
						{!entry?.post_thumbnail_url && (
							<Link className="text-left text-xl  font-medium cursor-pointer" href={`/prompts/${entry?.slug}/`} >
								<img className="object-cover h-full w-full opacity-20" src={`${appUrl}images/prompt-thumb.png`} alt={entry?.title} />

							</Link>

						)}




					</div>



					<div className="text-left flex flex-col gap-3 flex-1 p-3">
						<Link className="text-left text-base  font-medium cursor-pointer" href={`/prompts/${entry?.slug}/`} >{entry?.title}</Link>



						<div className="flex gap-4 items-center text-sm  flex-wrap">


							<div className="text-left  flex items-center gap-1" >

								<div><IconEyeSearch width={18} /></div>

								<div>{entry?.viewCount}</div>
							</div>
							<div className="text-left  flex items-center gap-1" >

								<div><IconHeartPlus width={18} /></div>

								<div>{entry?.loveCount}</div>
							</div>
							<div className="text-left  flex items-center gap-1" >

								<div><IconThumbUp width={18} /></div>

								<div>{entry?.voteCount}</div>
							</div>
							<div className="text-left  flex items-center gap-1" >

								<div><IconDownload width={18} /></div>

								<div>{entry?.downloadCount}</div>
							</div>


							{entry?.categories?.length > 0 && (
								<div className="flex items-center text-sm gap-2 flex-wrap">

									<div>
										<IconTags width={18} />
									</div>

									{entry?.categories?.map((item, index) => {

										return (
											<div >

												{/* <Link className="" href={`/category/${item?.slug}/`} >
													{item.name}
												</Link> */}
												{entry?.categories?.length > (index + 1) && (
													<span className="pr-1">, </span>
												)}
											</div>
										)

									})}
								</div>

							)}


							{/* <div className=" ">{entry?.sku}</div> */}



						</div>

						<div>
							{("Price")}: {entry?.credits ? cents_to_dollar(entry?.credits) : "$0.00"}


						</div>


					</div>





				</div>
			</div >

		);
	}







	return (
		<div className="w-full  xl:p-5  p-2">
			<div className=" ">


				<div className="hidden p-3 flex justify-between  flex-wrap gap-3 px-5 bg-[#ffcbb3]   rounded-md">
					<div className="flex flex-wrap gap-3 items-center">
						<input
							className="!border-2 border-solid !border-[#783009] !shadow-none"
							type="text"
							placeholder={("Search")}
							value={queryPrams?.keyword}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, keyword: ev.target.value, paged: 1 });
							}}
						/>




						<div className="text-red-400 cursor-pointer" onClick={ev => {
							setqueryPrams({ ...queryPrams, category: null, paged: 1, tag: null });

						}}>Reset</div>

					</div>



					<div className="flex flex-wrap gap-3 items-center ">
						{loading && (
							<>
								<Spinner />
							</>
						)}

						<div> {entries?.total} {("Items")}</div>

						<div>
							{queryPrams?.paged} / {entries?.maxPages}
						</div>

						{onRefreshRequest && (

							<div
								onClick={() => {
									onRefreshRequest();
								}}
								className="!border-2 border-solid !border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer">
								<IconRefresh />
							</div>
						)}

						<select
							name=""
							id=""
							className="!border-2 border-solid !border-[#783009] !shadow-none"
							value={queryPrams?.order}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, order: ev.target.value });




							}}>
							<option value="DESC">{("DESC")}</option>
							<option value="ASC">{("ASC")}</option>
						</select>

						<select
							name=""
							id=""
							className="!border-2 border-solid !border-[#783009] !shadow-none"
							value={queryPrams?.per_page}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, per_page: ev.target.value });
							}}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="200">200</option>
						</select>

						<div className="
					flex items-center gap-3 ">
							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged;


									if (paged == 1) return;
									setqueryPrams({ ...queryPrams, paged: queryPrams.paged - 1 });
								}}>
								<IconArrowNarrowLeftDashed />
							</div>

							<div>
								<input className="!border-2 border-solid !border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer w-16 text-center" type="text" value={queryPrams.paged} onChange={ev => {
									var value = parseInt(ev.target.value)

									if (value > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: value });

								}} />
							</div>

							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged + 1;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });
								}}>
								<IconArrowNarrowRightDashed />
							</div>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto w-full ">
					<div className=" w-full text-center border-collapse">

						<div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-2 gap-4">


							{(entries == null || entries?.posts?.length == 0) && (

								<div className="col-span-4 py-3 text-white">
									{("No items found")}
								</div>

							)}
							{entries?.posts?.map((entry, loopIndex) => {
								return (
									<div
										key={loopIndex}
										className=" ">


										{loopLayout(entry, loopIndex)}

									</div>
								);
							})}
						</div>

					</div>
				</div>

				{/* {JSON.stringify(queryPrams)} */}



				<div className=" p-3 mt-10 flex justify-between  flex-wrap gap-3 px-5 bg-[#ffcbb3]   rounded-md">
					<div className="flex flex-wrap gap-3 items-center">

					</div>

					<div className="flex flex-wrap gap-3 items-center ">
						{loading && (
							<>
								<Spinner />
							</>
						)}

						<div> {entries?.total} {("Items")}</div>

						<div>
							{queryPrams?.paged} / {entries?.maxPages}
						</div>

						{onRefreshRequest && (

							<div
								onClick={() => {
									onRefreshRequest();
								}}
								className="!border-2 border-solid !border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer">
								<IconRefresh />
							</div>
						)}

						<select
							name=""
							id=""
							className=""
							value={queryPrams?.order}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, order: ev.target.value });




							}}>
							<option value="DESC">{("DESC")}</option>
							<option value="ASC">{("ASC")}</option>
						</select>

						<select
							name=""
							id=""
							className=""
							value={queryPrams?.per_page}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, per_page: ev.target.value });
							}}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="200">200</option>
						</select>

						<div className="
					flex items-center gap-3 ">
							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged;


									if (paged == 1) return;
									setqueryPrams({ ...queryPrams, paged: queryPrams.paged - 1 });
								}}>
								<IconArrowNarrowLeftDashed />
							</div>

							<div>
								<input className=" px-2 py-1 rounded-sm cursor-pointer w-16 text-center" type="text" value={queryPrams.paged} onChange={ev => {
									var value = parseInt(ev.target.value)
									var paged = value;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });

								}} />
							</div>

							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged + 1;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });
								}}>
								<IconArrowNarrowRightDashed />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};









export default ProductArchive;
