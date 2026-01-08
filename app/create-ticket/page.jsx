
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconHelpHexagon, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";

import FormCreateSupportTickets from "../../components/FormCreateSupportTickets";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;





export async function generateMetadata() {


	var pageMetaData = {
		"title": "Create Support Ticket - Get Help Fast | PromptsHub.net",
		"description": "Submit your support requests quickly and efficiently with PromptsHub.net's Create Support Ticket page. Our team is ready to assist you with any issues or queries.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/support-ticket-thumbnail.jpg",
			"alt": "Create a support ticket on PromptsHub.net"
		},
		"keywords": "create support ticket, contact support, help desk, customer support, submit issue, PromptsHub"
	}




	return {
		title: pageMetaData.title,
		description: pageMetaData.description?.slice(0, 160),
		openGraph: {
			title: pageMetaData.title,
			description: pageMetaData.post_excerpt?.slice(0, 160),
			url: `${appUrl}product/`,
			images: [{ url: pageMetaData.post_thumbnail?.src, alt: pageMetaData.title }],
		},
		twitter: {
			card: "summary_large_image",
			title: pageMetaData.title,
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
