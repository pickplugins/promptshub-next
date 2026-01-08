
import Link from "next/link";
import Image from "next/image";
import React from "react";

import BlogArchive from "../../components/BlogArchive";


import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

// import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;






export async function generateMetadata({ searchParams }) {



	var term = "";

	if (searchParams.tag) {
		term = searchParams.tag; // 👈 gets ?tag=baby-care
	}
	if (searchParams.category) {
		term = searchParams.category; // 👈 gets ?category=baby-care
	}





	var pageMetaData = {
		"title": "Blog - AI Tools, Prompts & Creativity Tips | PromptsHub.net",
		"description": "Explore the PromptsHub.net Blog for expert insights, tutorials, and tips on AI tools, prompt engineering, creative projects, and digital innovation.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/blog-thumbnail.jpg",
			"alt": "PromptsHub.net Blog - AI tools and creativity tips"
		},
		"keywords": "PromptsHub blog, AI tools, prompt engineering, AI creativity tips, AI tutorials, digital innovation"
	}




	return {
		title: pageMetaData.title,
		description: pageMetaData.description?.slice(0, 160),
		openGraph: {
			title: pageMetaData.title,
			description: pageMetaData.post_excerpt?.slice(0, 160),
			url: `${appUrl}blog/`,
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









var postData = {
	per_page: 15,
	paged: 1,
	order: "DESC",
	keyword: "",
};
postData = JSON.stringify(postData);

const res = await fetch(`${serverUrl}wp-json/combo-store/v2/get_posts`, {
	method: "POST",
	cache: "no-store", // disables caching

	headers: {
		'Content-Type': 'application/json',
	},
	body: postData,
});


const data = await res.json();






export default async function page({ params }) {
	// const token = useAuthStore((state) => state.token);
	// const { wrapCurrency, priceHtml } = useUtilsStore()

	// const router = useRouter();
	// const searchParams = useSearchParams(); // like location.search

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	// const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()



	// var [appData, setappData] = useState(window.appData);





	var promptsData = { posts: data?.posts, total: data?.total, maxPages: data?.max_pages };



	return (

		<div>

			<div className="flex justify-between px-5 py-3">


			</div>
			<BlogArchive
				entries={promptsData}

			/>
		</div>



	);
};

