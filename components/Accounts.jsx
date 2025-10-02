"use client";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { useAuth } from "./auth-context";
import Image from "next/image";

import {
	IconMoodSad,
	IconDatabaseSmile,
	IconShoppingCart,
} from "@tabler/icons-react";
import { useCounterStore } from '/store/useCounterStore'
import AccordionMenu from "./AccordionMenu";
import { useAuthStore } from "/store/authStore";

const Accounts = () => {

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle } = useCounterStore()


	const { user, handleLogout } = useAuth();

	const token = useAuthStore((state) => state.token);
	// const token = localStorage.getItem("token");


	var [buyCreditsPrams, setbuyCreditsPrams] = useState({ showPopup: false });
	var [hasCredit, sethasCredit] = useState(true);
	var [modal, setmodal] = useState(false);
	const [creditShow, setCreditShow] = useState(false);

	useEffect(() => {
		var remining = userDataX?.total_credit - userDataX?.total_credit_used;

		if (remining <= 0) sethasCredit(false);
	}, [hasCredit]);





	const accountNavs = [
		{

			name: "Account",
			slug: "account/",

			thumbnail: {},
			children: [
				{
					name: "Orders",
					slug: "orders/",
					thumbnail: "",
				},
				{
					name: "Deliveries",
					slug: "deliveries/",
					thumbnail: "",
				},


				{
					name: "Subscriptions",
					slug: "subscriptions/",
					thumbnail: ""
				},
				{
					name: "Subscriptions to Call",
					slug: "subscriptions-to-call/",
					thumbnail: ""
				},

			]
		},
		{

			name: "Support",
			slug: "support/",

			thumbnail: {},
			children: [
				{

					name: "Tickets",
					slug: "tickets/",

					thumbnail: "",

				},
				{
					name: "Create Ticket",
					slug: "create-ticket/",
					thumbnail: ""
				},

			]
		},




	];









	return (
		<div className="border-t pt-4">

			<div className="flex gap-3 flex-col">

				{token && (

					<>
						<div>
							<div className="mb-2 text-base text-white">{("Account")}</div>
							<AccordionMenu navId={"Accountnavs"} root={"/"} categories={accountNavs} />
						</div>

					</>

				)}
				<>
					{token && (
						<div className="flex items-center gap-4 flex-wrap">

							<div title={userDataX?.name} className=" flex flex-col gap-4">


								<div className="flex items-center gap-3">
									<div
										className="w-10 h-10 rounded-full overflow-hidden border border-gray-500 cursor-pointer "
										onClick={(ev) => {
											setmodal(!modal);
										}}>
										{userDataX?.avatar && (
											<Image
												className="w-full"
												src={userDataX?.avatar}
												alt={userDataX?.name}
												width={200} height={200}
											/>
										)}

									</div>
									<div className="font-bold">
										{userDataX?.name}
									</div>
								</div>

								<div className="flex gap-3 items-center">
									<Link
										href={`/edit-profile`}
										className="p-2 inline hover:bg-[#783009] rounded-sm cursor-pointer px-4 bg-[#783009] text-white">
										{("Edit Profile")}
									</Link>
									<div
										className="p-2 inline hover:bg-red-600 rounded-sm cursor-pointer px-4 bg-red-400 text-white"
										onClick={(ev) => {
											handleLogout();
										}}>
										{("Logout")}
									</div>
								</div>

							</div>
						</div>
					)}


				</>

			</div>
		</div>
	);
};

export default Accounts;
