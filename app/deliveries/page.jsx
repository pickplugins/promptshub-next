"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "/components/EntriesTable";
import { useCounterStore } from '/store/useCounterStore'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
import { useAuthStore } from "/store/authStore";

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";









const page = () => {
	const token = useAuthStore((state) => state.token);
	// const token = localStorage.getItem("token");

	console.log(token);

	if (!token) {

		return (
			<div className='p-10 text-center text-red-400'>You are not authorized to access this page</div>
		)
	}


	const { appData, notifications, addNotification, userDataX, setUserDataX } = useCounterStore()



	var [productsData, setproductsData] = useState({ posts: [], total: 20, maxPages: 1 });
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", per_page: 10, });

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	var columns = {
		// check: { label: ("Check"), },
		delivery_id: { label: ("ID"), callback: callbackDeliveryId, classes: "w-96 text-left" },
		order_id: { label: ("Order id"), callback: callbackOrderId, classes: "text-center" },
		rider_id: { label: ("Rider"), callback: callbackRiderId, classes: "text-center" },
		type: { label: ("Type"), callback: callbackType, classes: "text-center" },
		status: { label: ("status"), callback: callbackStatus, classes: "text-center" },
		latlng: { label: ("latlng"), callback: callbackLatlang, classes: "text-center" },

		notes: { label: ("notes"), callback: callbackNotes, classes: "text-center" },
		datetime: { label: ("Datetime"), callback: callbackDatetime, classes: "text-center" },
		// expiryDate: { label: "Expiry Date", callback: callbackExpiryDate },
	};
















	function fetchPosts() {



		if (!token) {
			return null;
		}


		if (queryPrams.page < 0) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_deliveries", {
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



	function callbackDatetime(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry.datetime;
		// Ensure date is in a proper format for parsing
		const dateObj = new Date(dateInput?.replace(" ", "T"));

		if (!dateObj) {
			return (
				<td data-label="Datetime"
					key={columnIndex}>
				</td>

			);

		}

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
			<td data-label="Datetime"
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}



	function callbackDeliveryId(entry, columnIndex) {

		return (
			<td data-label="Delivery Id" className="text-center pl-5 py-3"
				key={`title-${entry?.id}`}
			>

				<div className="flex gap-2 items-center">



					<div className="text-left">
						<Link className="text-left text-gray-600 font-medium" href={`/deliveries/${entry?.id}`}>
							#{entry?.id}
						</Link>

						<div className="flex gap-2 text-sm text-gray-500">




						</div>
					</div>
				</div>
			</td>

		);
	}

	function callbackOrderId(entry, columnIndex) {

		return (
			<td data-label="Order Id" className="text-center "
				key={`title-${entry?.order_id}`}
			>

				<Link className=" text-gray-600 font-medium" href={`/deliveries/${entry?.order_id}`}>
					{entry?.order_id}
				</Link>
			</td>

		);
	}
	function callbackRiderId(entry, columnIndex) {

		return (
			<td data-label="Rider Id" className="text-center "
				key={`title-${entry?.rider_id}`}
			>

				<Link className=" text-gray-600 font-medium" href={`/deliveries/${entry?.rider_id}`}>
					{entry?.rider_id}
				</Link>
			</td>

		);
	}





	function callbackType(entry, columnIndex) {

		return (
			<td data-label="Type" className="text-center pl-5"
				key={`title-${entry?.id}`}
			>
				{entry.type}

			</td>

		);
	}
	function callbackNotes(entry, columnIndex) {

		return (
			<td data-label="Notes" className="text-center pl-5"
				key={`title-${entry?.id}`}
			>


				{entry.notes}

			</td>

		);
	}






	function callbackLatlang(entry, columnIndex) {

		return (
			<td data-label="LatLng" className="text-center pl-5"
				key={`title-${entry?.id}`}
			>
				{entry.latlng}
			</td>

		);
	}
	function callbackStatus(entry, columnIndex) {

		return (
			<td data-label="Status" className="text-center pl-5"
				key={`title-${entry?.id}`}
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




	return (

		<div>

			<div>

				<div className="flex justify-between px-5 py-3">


					<div className="flex gap-3 md:justify-end p-4">



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
		</div>



	);
};

export default page;
