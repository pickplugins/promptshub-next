"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "/components/EntriesTable";
import GoogleMapLineMap from "/components/GoogleMapLineMap";
import { useCounterStore } from '/store/useCounterStore'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
import { useAuthStore } from "/store/authStore";

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";









const page = () => {
	const token = useAuthStore((state) => state.token);


	const { appData, notifications, addNotification, userDataX, setUserDataX } = useCounterStore()



	var [productsData, setproductsData] = useState({ posts: [], total: 20, maxPages: 1 });
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, });

	var [path, setpath] = useState([]);
	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}


	var columns = {
		// check: { label: ("Check"), },
		notes: { label: ("Notes"), callback: callbackNotes, classes: "text-left" },
		order_id: { label: ("Order id"), callback: callbackOrderId, classes: "text-center" },
		// rider_id: { label: ("Rider"), callback: callbackRiderId, classes: "text-center" },
		// latlng: { label: ("Lat-Lang"), callback: callbackLatlang, classes: "text-center" },

		// datetime: { label: ("Datetime"), callback: callbackDatetime, classes: "text-center" },
		// expiryDate: { label: "Expiry Date", callback: callbackExpiryDate },
	};





	function fetchPosts() {



		if (!token) {
			//throw new Error("No token found");
		}


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

		fetch(serverUrl + "wp-json/promptshub/v2/get_trackings", {
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

						var arr = [];

						posts.map(item => {
							var coords = item.latlng;
							const path = coords.split(",").map(Number);


							arr.push({ lat: path[0], lng: path[1] })
						})

						setpath(arr)


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

		if (!dateInput) {
			return (
				<td
					key={columnIndex}>
				</td>

			);
		}

		// Ensure date is in a proper format for parsing
		const dateObj = new Date(dateInput?.replace(" ", "T"));

		if (!dateObj) {
			return (
				<td
					key={columnIndex}>
				</td>

			);

		}

		if (isNaN(dateObj)) {
			//throw new Error("Invalid date format");
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



	function callbackDeliveryId(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
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
			<td className="text-center "
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
			<td className="text-center "
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
			<td className="text-center pl-5"
				key={`title-${entry?.id}`}
			>


				{entry.type}

			</td>

		);
	}
	function callbackNotes(entry, columnIndex) {

		return (
			<td className="text-left pl-5 py-3"
				key={`title-${entry?.id}`}
			>


				{entry.notes}

			</td>

		);
	}






	function callbackLatlang(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
				key={`title-${entry?.id}`}
			>
				{entry.latlng}
			</td>

		);
	}
	function callbackStatus(entry, columnIndex) {

		return (
			<td className="text-center pl-5"
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

					<div className="">
						<div className="text-2xl">Trackings</div>
					</div>

					<div className="flex gap-3 md:justify-end p-4">



					</div>
				</div>

				<div className="px-5 flex gap-10">

					<div className="w-[400px]">

						<div className="flex flex-col gap-3">

							<div className="text-xl">Rider</div>
							<div className="text-base">
								Name: MD Nur Hasan
							</div>
							<div className="text-base">
								Total Delivery: 500
							</div>
						</div>

					</div>
					<div className="w-full">
						{path?.length > 0 && (
							<GoogleMapLineMap
								path={path ? path : [{ lat: 23.7808875, lng: 90.2792371 }, { lat: 23.81, lng: 90.41 }]}
								strokeColor="#FF0000"
								strokeWeight={4}
								fitBounds={true}
								height="400px"
							/>

						)}

					</div>



				</div>

				<div className=" my-5">

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
		</div>



	);
};

export default page;
