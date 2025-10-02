

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "Account - Login/Register - Kidobazar",
		description: "Login or create your Kidobazar account to enjoy secure shopping, track your orders, and access exclusive deals tailored just for you.",
		post_thumbnail: { src: "", alt: "" },
		keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
		ogTitle: "Account - Login/Register - Kidobazar",
		ogDes: "Login or create your Kidobazar account to enjoy secure shopping, track your orders, and access exclusive deals tailored just for you."

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








export default function Home() {


	return (

		<AuthProvider>

			<div className="p-10">
				<UserAccount />

			</div>
		</AuthProvider>
	);
}
