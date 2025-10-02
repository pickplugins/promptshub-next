"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import EntriesTable from "/components/EntriesTable";
import { useState, useEffect, useContext } from "react";
import Spinner from "/components/Spinner";
import { IconRefresh } from "@tabler/icons-react";

import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
import { useAuthStore } from "/store/authStore";


const page = () => {
	const { setToken } = useAuthStore();
	const token = useAuthStore((state) => state.token);
	// const token = localStorage.getItem("token");

	console.log(token);


	if (!token) {

		return (
			<div className='p-10 text-center text-red-400'>You are not authorized to access this page</div>
		)
	}



	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, } = useCounterStore()
	const { wrapCurrency } = useUtilsStore()

	useEffect(() => {

		if (token) {


			setToken(token);
		}
	}, [setToken]);



	var [ordersData, setordersData] = useState(null);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", per_page: 10, first_date: "", last_date: "" });

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	var columns = {
		// check: { label: ("Check"), },
		id: { label: ("ID"), callback: callbackTitle, classes: "w-30 text-center" },
		billing_name: { label: ("User"), callback: callbackUserName, classes: "text-center" },
		payment_status: { label: ("Status"), callback: callbackStatus, classes: "text-center" },


		total_amount: { label: "Total", callback: callbackTotal, classes: "text-center" },
		subtotal_amount: { label: "Sub Total", callback: callbackSubtotal, classes: "text-center" },
		discount_amount: { label: "Discount", callback: callbackDiscount, classes: "text-center" },
		payment_method: { label: "Payment Method", callback: callbackPaymentMethod, classes: "text-center" },

		updated_at: { label: ("Datetime"), callback: callbackFormatDate, classes: "text-center" },
	};

	function delete_orders() {
		// const token = localStorage.getItem("token");



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
		fetch(serverUrl + "wp-json/promptshub/v2/delete_orders", {
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

						get_orders();

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

	function get_orders() {

		// const token = localStorage.getItem("token");

		console.log(token);

		if (!token) {
			return null;
		}


		// if (!token) {
		// 	//throw new Error("No token found");
		// }


		if (queryPrams.page < 0) {
			return;
		}


		var postData = JSON.stringify(queryPrams);
		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_orders", {
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




						var orders = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setordersData({ posts: orders, total: total, maxPages: max_pages })
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

		setTimeout(() => {

			get_orders();
		}, 500)
	}, [queryPrams]);


	function onChangeQueryPrams(queryPrams) {
		if (queryPrams) {
			setqueryPrams(queryPrams)
			get_orders();
		}

	}

	function onRefreshRequest(rows) {
		get_orders();
	}

	useEffect(() => {
		//checkUser();
	}, []);



	function callbackFormatDate(entry, columnIndex) {

		var format = "d/m/Y";
		var dateInput = entry.updated_at;
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
				data-label="Datetime"
				key={columnIndex}>
				{format.replace("d", day).replace("m", month).replace("Y", year)}
			</td>

		);

	}



	function callbackTitle(entry, columnIndex) {

		return (
			<td data-label="ID" className="text-center py-3"
				key={columnIndex}>
				<Link className=" text-gray-600 font-bold" href={`/orders/${entry.id}`}>
					{"#" + entry.id}
				</Link>
			</td>

		);
	}
	function callbackUserName(entry, columnIndex) {

		return (
			<td data-label="User" className="text-center "
				key={columnIndex}>
				{entry.billing_name}
			</td>

		);
	}

	function callbackTotal(entry, columnIndex) {

		return (
			<td data-label="Total" className="text-center "
				key={columnIndex}>
				<span>{wrapCurrency(entry.total_amount)}</span>
			</td>

		);
	}
	function callbackSubtotal(entry, columnIndex) {

		return (
			<td data-label="Sub Total" className="text-center "
				key={columnIndex}>
				<span>{wrapCurrency(entry.subtotal_amount)}</span>
			</td>

		);
	}
	function callbackDiscount(entry, columnIndex) {

		return (
			<td data-label="Discount" className="text-center "
				key={columnIndex}>
				<span>{wrapCurrency(entry.discount_amount)}</span>
			</td>

		);
	}
	function callbackPaymentMethod(entry, columnIndex) {

		return (
			<td data-label="Payment Method" className="text-center "
				key={columnIndex}>
				<span>{entry.payment_method}</span>
			</td>

		);
	}





	function callbackStatus(entry, columnIndex) {

		return (
			<td data-label="Status" className="text-center "
				key={columnIndex}>


				<div className={` text-sm `}>
					{(entry.status == 'pending' || entry.status == '') && (
						<span className="bg-indigo-400 px-3 py-1 rounded-sm text-white">Pending</span>
					)}
					{entry.status == 'completed' && (
						<span className="bg-amazon-400 px-3 py-1 rounded-sm text-white">Completed</span>
					)}
					{entry.status == 'cancelled' && (
						<span className="bg-red-400 px-3 py-1 rounded-sm text-white">Cancelled</span>
					)}
					{entry.status == 'refunded' && (
						<span className="bg-amber-400 px-3 py-1 rounded-sm text-white">Refunded</span>
					)}
					{entry.status == 'failed' && (
						<span className="bg-red-600 px-3 py-1 rounded-sm text-white">Failed</span>
					)}
					{entry.status == 'processing' && (
						<span className="bg-blue-400 px-3 py-1 rounded-sm text-white">Processing</span>
					)}
					{entry.status == 'hold' && (
						<span className="bg-orange-400 px-3 py-1 rounded-sm text-white">Hold</span>
					)}


				</div>





			</td>

		);
	}

	return (

		<div>
			<div className="flex gap-3 w-full  p-4">

				<div className="text-2xl font-bold">Your Orders</div>


			</div>

			<EntriesTable
				queryPrams={queryPrams}
				columns={columns}
				entries={ordersData}
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
