"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "/components/EntriesTable";
import { useCounterStore } from '/store/useCounterStore'

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";
import { useAuthStore } from "/store/authStore";






// const res = await fetch(`http://localhost/wp/wp-json/promptshub/v2/get_products`, {
// 	method: "POST",
// 	headers: {
// 		'Content-Type': 'application/json',
// 	}
// });
// const data = await res.json();




const page = () => {
	const token = useAuthStore((state) => state.token);


	if (!token) {

		return (
			<div className='p-10 text-center text-red-400'>You are not authorized to access this page</div>
		)
	}

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()



	var [ticketsData, setticketsData] = useState(null);
	var [userRoles, setuserRoles] = useState(null);




	var queryPramsDefault = { keyword: "", paged: 1, orderby: "date", order: "DESC", per_page: 10, };
	var [queryPrams, setqueryPrams] = useState(queryPramsDefault);

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	useEffect(() => {
		if (userDataX != undefined || userDataX != null) {

			var roles = [];
			Object.entries(userDataX?.roles).map(args => {

				var role = args[1]
				roles.push(role)
			})

			setuserRoles(roles);
		}
	}, [userDataX]);

	var columns = {
		// check: { label: ("Check"), },
		id: { label: ("Ticket"), callback: callbackTitle, classes: "w-96 text-left" },
		categories: { label: ("Categories"), callback: callbackCategories, classes: "text-left" },
		tags: { label: ("Tags"), callback: callbackTags, classes: "text-left" },

		status: { label: ("Status"), callback: callbackStatus, classes: "text-center" },
		priority: { label: ("Priority"), callback: callbackPriority, classes: "text-center" },
		// markedAs: { label: ("Marked As"), callback: callbackMarkedAs, classes: "text-left" },
		author: { label: ("Author"), callback: callbackAuthor, classes: "text-right" },
	};

	function delete_tickets(ids) {


		if (!token) {
			//throw new Error("No token found");
		}

		if (queryPrams.paged < 0) {
			return;
		}

		ids = ids != undefined ? ids : selectedRows;

		//

		var postData = {
			ids: ids,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(serverUrl + "wp-json/promptshub/v2/delete_tickets", {
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

	function add_ticket() {


		// if (!token) {
		// 	//throw new Error("No token found");
		// }

		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(serverUrl + "wp-json/promptshub/v2/add_ticket", {
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












	function fetchPosts() {


		if (!token) {
			//throw new Error("No token found");
		}


		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			paged: queryPrams.paged,
			order: queryPrams.order,
			keyword: queryPrams.keyword,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_tickets", {
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

						//

						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;




						setticketsData({ posts: posts, total: total, maxPages: max_pages })
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


	useEffect(() => {

		fetchPosts();



	}, [queryPrams]);


	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			fetchPosts();
		}

	}

	function onRefreshRequest(rows) {
		fetchPosts();
	}

	useEffect(() => {
		//checkUser();
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
			<td data-label="User"
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}



	function callbackTitle(entry, columnIndex) {

		return (
			<td data-label="Title" className=" py-3 pl-5"
				key={columnIndex}>

				<div className="flex gap-3 items-center ">


					<div className="text-left flex-1">
						<Link className="text-left  font-medium" href={`/tickets/${entry?.id}/`}>
							{entry?.title} - {markedAsLabel(entry.markedAs)}
						</Link>

						<div className="flex gap-3 text-sm ">

							<div>#{entry?.id}</div>
							{/* <Link className="" href={`/tickets/${entry?.id}/`}>
								{("View")}
							</Link> */}
							{/* <div className=" ">{entry?.sku}</div> */}
							{/* <div className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => {
								delete_tickets([entry?.id]);
							}}>{("Delete")}</div> */}


						</div>
					</div>
				</div>
			</td>

		);
	}




	function callbackCategories(entry, columnIndex) {


		return (
			<td data-label="Categories" className=" pl-5"
				key={columnIndex}>
				<div className="flex text-sm flex-wrap ">
					{entry?.categories.map((item, index) => {

						return (
							<div >
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
			<td data-label="Tags" className=" pl-5"
				key={columnIndex}>
				<div className="flex text-sm flex-wrap ">
					{entry?.tags.map((item, index) => {

						return (
							<div >
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





	function callbackStatus(entry, columnIndex) {

		return (
			<td data-label="Status" className=" pl-5"
				key={columnIndex}>
				{entry.status == 'publish' && (
					<span className="bg-amazon-400 px-3 py-1 rounded-sm text-white">{("Publish")}</span>
				)}

				{entry.status == 'draft' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">{("Draft")}</span>
				)}
				{entry.status == 'pending' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">{("Pending")}</span>
				)}


			</td>

		);
	}

	function callbackPriority(entry, columnIndex) {

		return (
			<td data-label="Priority" className=" pl-5"
				key={columnIndex}>
				{entry.priority == '1' && (
					<span className="bg-gray-400 px-3 py-1 rounded-sm text-white">{("Normal")}</span>
				)}

				{entry.priority == '10' && (
					<span className="bg-amber-400 px-3 py-1 rounded-sm text-white">{("High")}</span>
				)}
				{entry.priority == '90' && (
					<span className="bg-red-400 px-3 py-1 rounded-sm text-white">{("Urgent")}</span>
				)}


			</td>

		);
	}

	function markedAsLabel(markedAs) {

		return (
			<>
				{markedAs == 'open' && (
					<span className=" px-3 py-1 rounded-sm text-[#783009] font-bold">{("Open")}</span>
				)}

				{markedAs == 'closed' && (
					<span className="text-gray-500 px-3 py-1 rounded-sm font-bold">{("Closed")}</span>
				)}
				{markedAs == 'processing' && (
					<span className="text-red-400 px-3 py-1 rounded-sm font-bold">{("Processing")}</span>
				)}


			</>

		);
	}











	function callbackAuthor(entry, columnIndex) {

		return (
			<td data-label="Author" className=" px-5 text-right "
				key={columnIndex}>

				<div className="flex  gap-2 items-center justify-end text-sm">

					<div className="w-8 h-8 rounded-full overflow-hidden"><Image src={entry?.author?.avatar} alt="" width={40} height={40} /></div>
					<div>{entry?.author?.name}</div>

				</div>




			</td>

		);
	}










	return (

		<div>

			<div>


				<>
					<div className="flex justify-between px-5 py-3">

						<div>
							{/* <div className="  text-white bg-[#783009]  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
								add_ticket();
							}}>{("Add ticket")}</div> */}

							<Link className="text-white bg-[#783009]  px-3 py-2 rounded-sm cursor-pointer" href={`/create-tickets/`} >Create  Ticket</Link>

						</div>
						<div className="flex gap-3 justify-end ">

							{userRoles?.includes("administrator") && (
								<>
									{selectedRows?.length > 0 && (
										<div
											className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
											onClick={() => {
												delete_tickets();
											}}>
											{("Delete tickets")}
										</div>
									)}
								</>
							)}





						</div>
					</div>
					<EntriesTable
						queryPrams={queryPrams}
						columns={columns}
						entries={ticketsData}
						itemPath={""}
						onChange={onChangeQueryPrams}
						loading={loading}
						selectedRows={selectedRows}
						onSelectRows={onSelectRows}
						onRefreshRequest={onRefreshRequest}

					/>
				</>
				{/* )} */}


			</div>
		</div>



	);
};

export default page;
