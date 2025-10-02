"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useContext, useEffect, useState } from "react";

import EntriesTable from "/components/EntriesTable";
import { useCounterStore } from '/store/useCounterStore'
import { useAuthStore } from "/store/authStore";

const page = () => {
	const token = useAuthStore((state) => state.token);

	if (!token) {

		return (
			<div className='p-10 text-center text-red-400'>You are not authorized to access this page, Plesae login to see your order details.</div>
		)
	}

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var [subscriptionsData, setsubscriptionsData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({
		keyword: "",
		page: 1,
		order: "DESC",
		limit: 10,
		first_date: "",
		last_date: "",
	});


	var [loading, setloading] = useState(false);

	var [selectedRows, setselectedRows] = useState([]);

	function onSelectRows(rows) {
		setselectedRows(rows);
	}
	function onRefreshRequest(rows) {
		fetchPosts();
	}

	function delete_subscriptions() {


		if (!token) {
			//throw new Error("No token found");
		}



		var postData = {
			ids: selectedRows,
		};
		postData = JSON.stringify(postData);
		setloading(true);
		fetch(
			serverUrl + "wp-json/promptshub/v2/delete_subscriptions_to_call",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: postData,
			}
		)
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
		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
		};
		postData = JSON.stringify(postData);

		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_subscribe_to_calls", {
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
						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;



						setsubscriptionsData({
							posts: posts,
							total: total,
							maxPages: max_pages,
						});
						setloading(false);

						setTimeout(() => { }, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	useEffect(() => {
		fetchPosts();
	}, [queryPrams]);

	var columns = {
		check: { label: ("Check") },
		id: { label: ("ID"), callback: callbackTitleLinkTo, classes: "w-30" },
		interval: { label: ("Interval"), callback: callbackInterval, },
		interval_count: { label: ("Interval Count"), callback: callbackIntervalCount, },
		phone: { label: ("Phone"), callback: callbackPhone, },
		product_id: { label: ("Product"), callback: callbackProduct, classes: "" },
		status: { label: ("Status"), callback: callbackStatus, },
		// subscribe_to: { label: ("Subscribe To"), callback: callbackSubscribeTo, },
		next_date: { label: ("Next Datetime"), callback: callbackFormatNextDate },
		start_date: { label: ("Start Date"), callback: callbackStartDate },
	};

	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams);
			fetchPosts();
		}
	}

	function callbackTitleLinkTo(entry, columnIndex) {

		return (
			<td data-label="ID" className="text-center pl-5  "
				key={columnIndex}>
				{"#" + entry.id}
			</td>

		);
	}
	function callbackProduct(entry, columnIndex) {

		return (
			<td data-label="Product" className="text-center py-3 w-[300px]"
				key={columnIndex}>
				<Link className="text-sm" href={``}>


					<span dangerouslySetInnerHTML={{ __html: entry.product_title }}></span>
				</Link>
			</td>

		);
	}


	function callbackInterval(entry, columnIndex) {

		return (
			<td data-label="Interval" className="text-center py-3 w-[300px]"
				key={columnIndex}>
				{entry.interval}
			</td>

		);
	}
	function callbackIntervalCount(entry, columnIndex) {

		return (
			<td data-label="Interval Count" className="text-center py-3 w-[300px]"
				key={columnIndex}>
				{entry.interval_count}
			</td>

		);
	}
	function callbackPhone(entry, columnIndex) {

		return (
			<td data-label="Phone" className="text-center py-3 w-[300px]"
				key={columnIndex}>
				{entry.phone}
			</td>

		);
	}

	function callbackStatus(entry, columnIndex) {

		return (
			<td data-label="Status" className="text-center py-3 w-[300px]"
				key={columnIndex}>
				{entry.status}
			</td>

		);
	}
	function callbackSubscribeTo(entry, columnIndex) {

		return (
			<td data-label="Subscribe To" className="text-center py-3 w-[300px]"
				key={columnIndex}>
				{entry.subscribe_to}
			</td>

		);
	}



	function callbackStartDate(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry.start_date;
		// Ensure date is in a proper format for parsing
		const dateObj = new Date(dateInput.replace(" ", "T"));

		if (isNaN(dateObj)) {
			return (
				<td data-label="Start Date"
					key={columnIndex}>

				</td>

			);
		}

		// Extract date components
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = dateObj.getFullYear();

		// Replace format placeholders with actual values
		//return ;

		return (
			<td data-label="Start Date"
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}
	function callbackFormatNextDate(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry?.next_date;

		// Ensure date is in a proper format for parsing
		const dateObj = new Date(dateInput?.replace(" ", "T"));

		if (isNaN(dateObj)) {
			return (
				<td data-label="Next Datetime"
					key={columnIndex}>

				</td>

			);
		}

		// Extract date components
		const day = String(dateObj.getDate()).padStart(2, '0');
		const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const year = dateObj.getFullYear();

		// Replace format placeholders with actual values
		//return ;

		return (
			<td data-label="Next Datetime"
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}

	return (
		<div>
			<div>
				<div className="flex w-full gap-2 md:justify-end p-4">
					{selectedRows?.length > 0 && (
						<div
							className="px-3 py-[5px] rounded-sm bg-red-600 hover:bg-red-500 text-white cursor-pointer"
							onClick={() => {
								delete_subscriptions();
							}}>
							{("Delete Subscriptions")}
						</div>
					)}


				</div>

				<EntriesTable
					queryPrams={queryPrams}
					columns={columns}
					entries={subscriptionsData}
					itemPath={"subscriptions"}
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
