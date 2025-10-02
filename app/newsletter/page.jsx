
import Link from "next/link";
import React from "react";

import EmailSubscribe from "/components/EmailSubscribe";
import ToggleContent from "/components/ToggleContent";
import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconHelpHexagon, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "Newsletter - Kidobazar",
		description: "Subscribe to the Kidobazar Newsletter and get the latest deals, product updates, and exclusive offers delivered straight to your inbox.",
		post_thumbnail: { src: "", alt: "" },
		keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
		ogTitle: "Newsletter - Kidobazar",
		ogDes: "Subscribe to the Kidobazar Newsletter and get the latest deals, product updates, and exclusive offers delivered straight to your inbox."

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

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

	var faqs = [
		{
			"question": "What is the Kidobazar.com newsletter?",
			"answer": "The Kidobazar.com newsletter is a free subscription service that delivers the latest product updates, special offers, parenting tips, and exclusive deals directly to your email."
		},
		{
			"question": "How can I subscribe to the Kidobazar.com newsletter?",
			"answer": "You can subscribe by entering your email address in the newsletter sign-up form on the Kidobazar.com homepage or during checkout when making a purchase."
		},
		{
			"question": "Is the Kidobazar.com newsletter free?",
			"answer": "Yes, subscribing to the Kidobazar.com newsletter is completely free. You will only receive updates, offers, and tips without any charges."
		},
		{
			"question": "How often will I receive the newsletter?",
			"answer": "The Kidobazar.com newsletter is sent out weekly, ensuring you stay updated with new arrivals, seasonal promotions, and parenting insights."
		},
		{
			"question": "Can I unsubscribe from the Kidobazar.com newsletter?",
			"answer": "Yes, you can unsubscribe at any time by clicking the 'Unsubscribe' link provided at the bottom of every newsletter email."
		}
	]


	const FAQTitle = ({ text, index }) => {

		return (
			<div className="flex gap-3 items-center text-base">


				{text}
			</div>
		)

	}


	return (
		<div>

			<div className=" my-10 p-5 gap-10  xl:w-[900px] mx-auto  rounded-sm">


				<div className="xl:w-[500px] w-full mx-auto">
					<div className="text-2xl  mb-5">{("Subscribe to News")}</div>

					<EmailSubscribe />
				</div>




			</div>


			<div className="p-5  rounded-sm my-20 w-full ">
				<div className=" ">
					<div className="text-2xl  text-center">{("Frequently Asked Questions")}</div>
				</div>
				<div className="my-4 flex flex-col gap-5 ">


					{faqs && (

						<div className="my-4 w-full xl:w-[900px] mx-auto">
							{faqs.map((item, index) => {

								return (
									<ToggleContent key={index} title={<FAQTitle text={item.question} index={index} />}
										contentClass="text-gray-600 p-5"
										headerClass="w-full flex justify-between items-center p-3  rounded-sm  bg-[#783009] cursor-pointer text-white"
										headerTitleClass=""
										wrapperClass=""
										labelIcon={<IconHelpHexagon />}

									>

										<div className="">


											{item?.answer}


										</div>

									</ToggleContent>
								)

							})}
						</div>
					)}


				</div>

			</div>

		</div>
	);
};

export default page;
