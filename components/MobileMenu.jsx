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
	IconMenu, IconBasketBolt,
	IconUserCircle,
	IconLogs,
} from "@tabler/icons-react";
import 'animate.css';

import { useCounterStore } from '/store/useCounterStore'





const MobileMenu = () => {
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

	var headerLinks = [
		// { label: "Home", url: "/", icon: <IconHome width={20} /> },
		{ label: ("Home"), url: "/", icon: <IconBuildingStore width={20} /> },
		{ label: ("Blog"), url: "/blog/", icon: <IconLogs width={20} /> },
		// { label: ("Newsletter"), url: "/newsletter/", icon: <IconMailStar width={20} /> },

		{ label: ("Account"), url: "/account/", icon: <IconUserCircle width={20} /> },

	]


	if (!mobileMenu) {

		return <></>
	}

	return (
		<div className={` animate__animated ${animate ? " animate__fadeOutLeft" : "animate__fadeInLeft"} h-screen overflow-y-auto fixed z-[999] top-0 left-0 w-[300px]  bg-[#ffcbb3]  `}>
			<div className="flex flex-col gap-4 text-gray-800">

				<div className="bg-white flex px-4 justify-between items-center">
					<Link href={`/`} className="">
						<Image

							src="/logo-h.png"
							className="mx-auto" width={200} height={`50`} alt=""
							priority
						/>
					</Link>

					<div onClick={ev => {
						setmobileMenu(!mobileMenu)
					}}>
						<IconX />
					</div>
				</div>


				<div className="px-4">

					<div className="gap-3 my-3 flex mb-5">
						{headerLinks.map((item, index) => {

							return (
								<div className="  cursor-pointer text-[#783009] " key={index}>

									<Link key={`index-${index}`} href={`${item.url}`} className="flex gap-2">
										<div>{item.icon}</div>
										<div>{item.label}</div>
									</Link>
								</div>
							)

						})}
					</div>


					<div className="mb-2 text-base text-white">{("Categories")}</div>
					<AccordionMenu navId={"categoriesnavs"} root={"/categories/"} categories={categories} />




					<div>
						<Accounts />
					</div>

				</div>





			</div>




		</div>
	);
}

export default MobileMenu