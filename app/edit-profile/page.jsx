"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EntriesTable from "/components/EntriesTable";
import { useCounterStore } from '/store/useCounterStore'

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";

import UserProfileEdit from "/components/UserProfileEdit";
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



	var [productsData, setproductsData] = useState({ posts: [], total: 0, maxPages: 1 });
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 10, });

	var [loading, setloading] = useState(false);
	var [selectedRows, setselectedRows] = useState([]);
	function onSelectRows(rows) {
		setselectedRows(rows);
	}








	return (

		<div className="bg-gray-100 p-10">
			{userDataX && (
				<UserProfileEdit />
			)}
		</div>


	);
};

export default page;
