"use client";
import Image from "next/image";

import Link from 'next/link';
import React from 'react'
import { useState, useEffect, useContext } from "react";

import ToggleMenu from "./ToggleMenu";
import AccordionMenu from "./AccordionMenu";
import Accounts from "./Accounts";
import {
	IconBasketCheck,
	IconStarHalfFilled,
	IconAdjustmentsAlt,
	IconTrolley,
	IconDashboard,
	IconPropeller,
	IconRotateRectangle,
	IconX,
	IconSubtask,
	IconShoppingBagHeart, IconMessageUser,
	IconBuildingStore,
	IconTags,
	IconUserPin,
	IconTruckDelivery,
	IconRosetteDiscount,
	IconBike,
	IconReceiptRefund,
	IconUserDollar,
	IconBox,
	IconInfoHexagon,
	IconNews,
	IconMessage,
	IconList,
} from "@tabler/icons-react";

import { useCounterStore } from '/store/useCounterStore'



// var postData = {
// 	taxonomy: "product_cat",
// 	hierarchical: true,
// };
// postData = JSON.stringify(postData);

// const res = await fetch("http://localhost/wp/wp-json/promptshub/v2/get_terms", {
// 	method: "POST",
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	body: postData,
// });
// const data = await res.json();
// 


const Sidebar = () => {
	var [categories, setcategories] = useState([]);
	var [loading, setloading] = useState(false);

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, mobileMenu, setmobileMenu } = useCounterStore()
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(!animate)

	}, [mobileMenu]);

	useEffect(() => {

		var postData = {
			taxonomy: 'product_cat',
			hierarchical: true,
		};

		postData = JSON.stringify(postData);
		setloading(true);
		fetch(
			serverUrl + "wp-json/promptshub/v2/get_terms",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
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
						var terms = res?.terms ? res?.terms : [];


						setcategories(terms);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}, []);



	return (
		<aside className={` w-[300px]  hidden md:block bg-[#ffcbb3]  `}>


			<div className="flex flex-col gap-4 text-gray-800">




				<div className="p-4">
					<div className="mb-2 text-base text-white">{("Categories")}</div>
					<AccordionMenu navId={"categoriesnavs"} root={"/categories/"} categories={categories} />

					<div>
						<Accounts />
					</div>

				</div>





			</div>




		</aside>
	);
}

export default Sidebar