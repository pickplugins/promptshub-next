"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "/components/EntriesTable";
import { useCounterStore } from '/store/useCounterStore'

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";






// const res = await fetch(`http://localhost/wp/wp-json/promptshub/v2/get_products`, {
// 	method: "POST",
// 	headers: {
// 		'Content-Type': 'application/json',
// 	}
// });
// const data = await res.json();




const page = () => {


	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()



	// var [appData, setappData] = useState(window.appData);

	var [productsData, setproductsData] = useState({ posts: [], total: 0, maxPages: 1 });
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, });

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	var columns = {
		check: { id: "check", label: ("Check"), },
		id: { id: "id", label: ("Product"), callback: callbackTitle, classes: "w-96 text-left" },
		categories: { id: "categories", label: ("Categories"), callback: callbackCategories, classes: "text-left" },
		tags: { id: "tags", label: ("Tags"), callback: callbackTags, classes: "text-left" },

		// refunded_total: { id:"check",label: "Refunded" },
		status: { id: "status", label: ("Status"), callback: callbackStatus },
	};



	async function fetchPosts() {



		// if (!token) {
		// 	//throw new Error("No token found");
		// }


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_products", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
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

						setproductsData({ posts: posts, total: total, maxPages: max_pages })
						//setqueryPrams({ ...queryPrams, loading: false })
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

	async function delete_products(ids) {


		if (!token) {
			//throw new Error("No token found");
		}

		if (queryPrams.page < 0) {
			return;
		}

		ids = ids != undefined ? ids : selectedRows;


		var postData = {
			ids: ids,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(serverUrl + "wp-json/promptshub/v2/delete_products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var errors = res?.errors;
						var success = res?.success;

						setloading(false);

						fetchPosts();

						// setaddTask({ ...addTask, loading: false, errors: errors, success: success })

						// setTimeout(() => {
						// 	setaddTask({ ...addTask, title: "", success: null, errors: null })

						// }, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	async function add_product() {


		// if (!token) {
		// 	//throw new Error("No token found");
		// }

		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(serverUrl + "wp-json/promptshub/v2/add_product", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: postData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var errors = res?.errors;
						var success = res?.success;

						setloading(false);

						fetchPosts();

						// setaddTask({ ...addTask, loading: false, errors: errors, success: success })

						// setTimeout(() => {
						// 	setaddTask({ ...addTask, title: "", success: null, errors: null })

						// }, 3000);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}













	useEffect(() => {

		//fetchPosts();
	}, [queryPrams]);


	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			//fetchPosts();
		}

	}

	function onRefreshRequest(rows) {
		//fetchPosts();
	}

	useEffect(() => {
		//fetchPosts();
	}, []);



	function callbackFormatDate(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry.order_date;
		// Ensure date is in a proper format for parsing
		const dateObj = new Date(dateInput.replace(" ", "T"));

		if (isNaN(dateObj)) {
			throw new Error("Invalid date format");
		}

		// Extract date components
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = dateObj.getFullYear();

		// Replace format placeholders with actual values
		//return ;

		return (
			<td
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}



	function callbackTitle(entry, columnIndex) {




		return (
			<td className="text-center pl-5"
				key={`title-${entry?.id}`}>

				<div className="flex gap-2 items-center">

					{entry?.featured && (
						<div className="text-amber-500"><IconStarFilled /></div>
					)}
					{!entry?.featured && (
						<div className=""><IconStar /></div>
					)}

					<div style={{ width: "40px", height: "40px", overflow: "hidden" }}>
						<Image src={entry?.post_thumbnail_url} alt="" width={40} height={40} />
					</div>

					<div className="text-left">
						<Link className="text-left text-gray-600 font-medium" href={`/products/${entry?.id}`}>
							{entry?.title}
						</Link>

						<div className="flex gap-3 text-sm text-gray-500">

							<div>#{entry?.id}</div>
							<Link className="" href={`/product/${entry?.id}`}>
								View
							</Link>
							{/* <div className=" ">{entry?.sku}</div> */}
							<div className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => {
								delete_products([entry?.id]);
							}}>Delete</div>


						</div>
					</div>
				</div>
			</td>

		);
	}



	function callbackPrice(entry, columnIndex) {

		var type = entry.type;
		var price = entry.price;
		var regularPrice = entry.regularPrice;

		return (
			<td className=" pl-5"
				key={columnIndex}>
				<div className="flex gap-2 justify-center">




					{price && (
						<span>${price}</span>
					)}
					{regularPrice && (
						<>
							<span className="line-through">${regularPrice}</span>
						</>
					)}



				</div>
			</td>

		);
	}



	function callbackCategories(entry, columnIndex) {


		return (
			<td className="text-center pl-5"
				key={`category-${entry?.id}`}
			>
				<div className="flex text-sm ">
					{entry?.categories.map((item, index) => {

						return (
							<div key={index}>
								<span>{item.name}</span>
								{entry?.categories?.length > (index + 1) && (
									<span className="pr-1">, </span>
								)}
							</div>
						)

					})}
				</div>
			</td>

		);
	}
	function callbackTags(entry, columnIndex) {


		return (
			<td className="text-center pl-5"
				key={`tags-${entry?.id}`}

			>
				<div className="flex text-sm">
					{entry?.tags.map((item, index) => {

						return (
							<div key={index}>
								<span>{item.name}</span>
								{entry?.tags?.length > (index + 1) && (
									<span className="pr-1">, </span>
								)}
							</div>
						)

					})}
				</div>
			</td>

		);
	}
	function callbackBrands(entry, columnIndex) {


		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				<div className="flex text-sm ">
					{entry?.brands.map((item, index) => {

						return (
							<div key={index}>
								<span>{item.name}</span>
								{entry?.brands?.length > (index + 1) && (
									<span className="pr-1">, </span>
								)}
							</div>
						)

					})}
				</div>
			</td>

		);
	}


	function callbackStock(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={`stock-${entry?.id}`}

			>

				<div className="text-center text-sm">
					{entry.stockStatus == 'instock' && (
						<span className="">{entry.stockCount}</span>
					)}

					{entry.stockStatus == 'outofstock' && (
						<span className="bg-red-400 px-3 py-1 rounded-sm text-white">Out of Stock</span>
					)}
				</div>

			</td>

		);
	}
	function callbackTotal(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>
				{entry.order_total} {entry.order_currency}
			</td>

		);
	}
	function callbackStatus(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={`status-${entry?.id}`}
			>
				{entry.status == 'publish' && (
					<span className="bg-amazon-400 px-3 py-1 rounded-sm text-white">Publish</span>
				)}

				{entry.status == 'draft' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">Draft</span>
				)}
			</td>

		);
	}
	// function callbackStock(entry, columnIndex) {

	// 	return (
	// 		<td className="text-center pl-5"
	// 			key={columnIndex}>

	// 			{entry?.stockCount}
	// 		</td>

	// 	);
	// }
	function callbackType(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={columnIndex}>

				{entry.type == 'physical' && (
					<span className="">Physical</span>
				)}

				{entry.type == 'digital' && (
					<span className="">Digital</span>
				)}
			</td>

		);
	}











	return (

		<div>

			<div className="flex justify-between px-5 py-3">

				<div>
					<div className="  text-white bg-[#783009]  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
						add_product();
					}}>Add Product</div>
				</div>
				<div className="flex gap-3 justify-end ">
					{selectedRows?.length > 0 && (
						<div
							className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
							onClick={() => {
								delete_products();
							}}>
							{("Delete Products")}
						</div>
					)}


				</div>
			</div>
			<EntriesTable
				queryPrams={queryPrams}
				columns={columns}
				entries={productsData}
				itemPath={""}
				onChange={onChangeQueryPrams}
				loading={loading}
				selectedRows={selectedRows}
				onSelectRows={onSelectRows}
				onRefreshRequest={onRefreshRequest}

			/>
		</div>



	);
};

export default page;
