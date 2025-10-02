"use client";
// import Cart from "./shop-elements/Cart";
import Notify from "../components/Notify";
import QuickSearch from "../components/QuickSearch";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	IconMenu, IconSearch,
	IconUserCircle,
	IconX,
	IconBuildingStore,
	IconLogs,
} from "@tabler/icons-react";
import { useCounterStore } from '/store/useCounterStore'
import { usePathname } from 'next/navigation';
import Cart from "./shop-elements/Cart";
import { useAuthStore } from "/store/authStore";
import 'animate.css';
import Accounts from "./Accounts";
import AccordionMenu from "./AccordionMenu";
import PopoverButton from "/components/PopoverButton";

const GlobalHeader = () => {
	const token = useAuthStore((state) => state.token);
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

	const { notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, setlang, mobileMenu, setmobileMenu } = useCounterStore()
	const pathname = usePathname();

	var [loading, setloading] = useState(false);



	var currentLocation = pathname;

	var currentRoutes = currentLocation.split("/");

	currentRoutes = currentRoutes.filter(function (e) {
		return e.replace(/(\r\n|\n|\r)/gm, "");
	});


	var routesArgs = {
		products: { label: ("Products"), value: "products" },
		dashboard: { label: "", value: "dashboard" },
		orders: { label: ("Orders"), value: "orders" },
		tasks: { label: ("Tasks"), value: "tasks" },
		subscriptions: { label: ("Subscriptions"), value: "subscriptions" },
		licenses: { label: ("Licenses"), value: "licenses" },
		apiKeys: { label: ("API Keys"), value: "apiKeys" },
		ValidationRequests: {
			label: ("Validation Requests"),
			value: "ValidationRequests",
		},
	};

	// addNotifications({
	// 	title: "Data Saved!",
	// 	content: "You change successfully saved!.",
	// 	type: "success",
	// });

	// function addNotifications(notification) {
	// 	var notificationsX = [...notifications];
	// 	notificationsX.push(notification);
	// 	setnotifications(notificationsX);
	// }

	// useEffect(() => {
	// 	setnotifications(notifications);

	// 	const timer = setTimeout(() => {
	// 		setnotifications([]); // Update the debounced value after delay
	// 	}, 5000); // 300ms debounce delay

	// 	return () => clearTimeout(timer); // Cleanup timer on value change or unmount
	// }, [notifications]);

	var headerLinks = [
		// { label: "Home", url: "/", icon: <IconHome width={20} /> },
		{ label: ("Home"), url: "/", icon: <IconBuildingStore width={20} /> },
		{ label: ("Blog"), url: "/blog/", icon: <IconLogs width={20} /> },
		// { label: ("Newsletter"), url: "/newsletter/", icon: <IconMailStar width={20} /> },

		{ label: ("Account"), url: "/account/", icon: <IconUserCircle width={20} /> },

	]


	useEffect(() => {



	}, []);

	function onTriggerOpenSearch(args) {

		console.log(args);

	}


	return (
		<div className=" gap-4  justify-between items-center text-[#783009] bg-white  border-b border-gray-400 p-3 px-5 flex lg:h-[60px] h-auto">

			<div className="flex items-center justify-start gap-4">
				<div className={` lg:w-[300px] text-left`}>
					<Link href={`/`} className=" text-left">
						<Image

							src="/logo-h.png"
							className="" width={200} height={`50`} alt=""
							priority
						/>
					</Link>
				</div>

				<PopoverButton buttonLabel={("")} buttonClass={`border-2 lg:!w-80 rounded-sm border-[#783009] px-2 py-[8px] cursor-pointer hover:bg-[#ffcbb3]`} popoverClass={`mx-auto overflow-y-auto h-screen w-[90%] md:w-2/4 fixed inset-x-0 top-5 pb-10 z-20 shadow-sm rounded-sm`} buttonIcon={<IconSearch size={16} />} title={"Search"} position={""} onTriggerOpen={onTriggerOpenSearch}>

					<div className="p-2 bg-white">
						<QuickSearch />

					</div>

				</PopoverButton>



			</div>


			<div className="gap-6 flex-wrap items-center flex">
				<div className="gap-6 flex-wrap items-center hidden xl:flex">
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

				<Cart />



			</div>



			<div className="md:hidden flex gap-3 items-center ">


				<div onClick={ev => {
					setmobileMenu(!mobileMenu)
				}}>
					<IconMenu />


				</div>

			</div>




			<Notify />

		</div>
	);
};

export default GlobalHeader;
