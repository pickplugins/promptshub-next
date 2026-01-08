
import Link from "next/link";
import React from "react";

import EmailSubscribe from "../../components/EmailSubscribe";
import ToggleContent from "../../components/ToggleContent";
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
			"title": "What kind of content will I receive in the PromptsHub newsletter?",
			"content": "Our newsletter delivers: weekly AI prompt ideas and templates, updates on new AI tools and features, tutorials and how-to guides, industry news and trends, exclusive discounts and early access to new features, and creative inspiration from our community."
		},
		{
			"title": "How often will I receive emails?",
			"content": "We send our main newsletter weekly, typically on Tuesday mornings. You may occasionally receive special announcements for major updates or promotions, but we respect your inbox and avoid spam. You can adjust frequency preferences anytime."
		},
		{
			"title": "Is the newsletter really free?",
			"content": "Yes! The PromptsHub newsletter is completely free. You'll receive valuable AI prompts, tips, and industry insights at no cost. We believe in sharing knowledge and helping our community grow together."
		},
		{
			"title": "How do I unsubscribe or change my preferences?",
			"content": "Every email we send includes an 'Unsubscribe' link at the bottom. You can click this to instantly remove yourself, or use it to update your preferences and choose which types of emails you'd like to receive."
		},
		{
			"title": "What if I'm not receiving the newsletter after signing up?",
			"content": "First, check your spam or promotions folder. If you still can't find our emails, add 'newsletter@promptshub.net' to your email contacts or safe sender list. If issues persist, contact our support team and we'll help troubleshoot."
		},
		{
			"title": "Do you share my email with third parties?",
			"content": "Never. We take your privacy seriously. Your email address is used exclusively for sending PromptsHub newsletters and updates. We do not sell, rent, or share your personal information with any third parties."
		},
		{
			"title": "Can I share newsletter content with others?",
			"content": "Absolutely! We encourage sharing our prompts and tips with friends and colleagues. However, please do not forward the entire newsletter or redistribute it commercially. Better yet, invite them to subscribe so they can get their own updates!"
		},
		{
			"title": "I have ideas for newsletter content. How can I contribute?",
			"content": "We love hearing from our community! If you have prompt ideas, tutorials, or topics you'd like covered, please email us at 'content@promptshub.net' with your suggestions. We often feature community contributions with proper credit."
		},
		{
			"title": "Is there a mobile app for the newsletter?",
			"content": "While we don't have a dedicated newsletter app, our emails are fully optimized for mobile devices. You can also access our blog and all AI tools through our mobile-responsive website at PromptsHub.net."
		},
		{
			"title": "Do you offer different newsletter categories or topics?",
			"content": "Currently, we offer a general AI prompts newsletter that covers various topics. However, we're planning to introduce specialized newsletters for different interests like AI Art, Writing Prompts, and Business AI. Stay tuned for these updates!"
		},
		{
			"title": "How current is the information in your newsletters?",
			"content": "Our content is always fresh and relevant. We cover the latest AI developments, new prompt techniques, and recent platform updates. Our team works to ensure you receive timely information that helps you stay ahead in the AI space."
		},
		{
			"title": "Can businesses or educators use your newsletter content?",
			"content": "Yes! Many businesses, educators, and teams find our newsletter content valuable for training, inspiration, and staying updated on AI trends. For enterprise-level usage or licensing, please contact our business team at 'enterprise@promptshub.net'."
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
									<ToggleContent key={index} title={<FAQTitle text={item.title} index={index} />}
										contentClass="text-gray-600 p-5"
										headerClass="w-full flex justify-between items-center p-3  rounded-sm  bg-[#783009] cursor-pointer text-white"
										headerTitleClass=""
										wrapperClass=""
										labelIcon={<IconHelpHexagon />}

									>

										<div className="">


											{item?.content}


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
