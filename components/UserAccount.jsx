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


import Login from '/components/Login';

import Register from '/components/Register';
import UserProfileDetails from "/components/UserProfileDetails";




const UserAccount = () => {

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle } = useCounterStore()


	const { user, handleLogout } = useAuth();

	const token = useAuthStore((state) => state.token);
	// const token = localStorage.getItem("token");




	return (
		<div className="">




			{token ? (
				<div className=" ">
					<UserProfileDetails />
				</div>
			) : (
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-20 w-full xl:w-[1200px] px-10 mx-auto mt-10 ">
					<div>
						<h2 className="my-5 text-2xl">{("Register")}</h2>
						<Register />
					</div>
					<div>
						<h2 className="my-5 text-2xl">{("Login")}</h2>

						<Login />
					</div>
				</div>
			)}


		</div>
	);
};

export default UserAccount;
