
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconHelpHexagon, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";

import FormCreateSupportTickets from "/components/FormCreateSupportTickets";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;





export async function generateMetadata() {


	var pageMetaData = {

		title: "Create Support Ticket - Kidobazar",
		description: "Need help? Create a support ticket on Kidobazar to get quick assistance from our customer service team for your orders, account, or inquiries.",
		post_thumbnail: { src: "", alt: "" },
		keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
		ogTitle: "Create Support Ticket - Kidobazar",
		ogDes: "Need help? Create a support ticket on Kidobazar to get quick assistance from our customer service team for your orders, account, or inquiries."

	}



	return {
		title: pageMetaData.title,
		description: pageMetaData.description?.slice(0, 160),
		openGraph: {
			title: pageMetaData.ogTitle,
			description: pageMetaData.post_excerpt?.slice(0, 160),
			url: `${appUrl}product/`,
			images: [{ url: pageMetaData.post_thumbnail?.src, alt: pageMetaData.ogTitle }],
		},
		twitter: {
			card: "summary_large_image",
			title: pageMetaData.ogTitle,
			description: pageMetaData.post_excerpt?.slice(0, 160),
			images: [pageMetaData.post_thumbnail?.src],
		},
	};
}











const page = () => {




	// const searchParams = useSearchParams();
	// const prompt_id = parseInt(searchParams.get('prompt_id')); // 'react'
	// const category = parseInt(searchParams.get('category')); // 'react'















	return (

		<div className="flex-1 py-10 ">


			<FormCreateSupportTickets />


		</div>



	);
};

export default page;
