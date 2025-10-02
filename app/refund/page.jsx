

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "Refund Policy - Kidobazar",
		description: "Shop baby products, kids toys, clothing & essentials online at Kidobazar. Affordable prices, trusted brands & fast delivery for your little ones.",
		post_thumbnail: { src: "", alt: "" },
		keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
		ogTitle: "Create Support Ticket - Kidobazar",
		ogDes: "Discover Kidobazar, your one-stop kids marketplace for toys, clothing, baby products & more. Shop trusted brands at affordable prices."

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


			<div className="p-5 w-full xl:w-[900px] mx-auto">

				<article class="prose prose-lg">
					<section>
						<h2>Introduction</h2>
						<p>
							At <strong>Kidobazar</strong>, we want you to be completely satisfied with your purchase. This Refund Policy
							outlines the terms and conditions under which refunds and returns are processed for orders placed on kidobazar.com
							(the "Site").
						</p>
					</section>


					<section>
						<h2>Eligibility for Returns</h2>
						<ul>
							<li>Products must be returned within <strong>7 days</strong> of delivery.</li>
							<li>Items must be unused, in their original packaging, and in resalable condition.</li>
							<li>Proof of purchase (order confirmation or receipt) is required.</li>
							<li>Certain items (e.g., personal care products, perishable goods, customized items) may not be eligible for return.</li>
						</ul>
					</section>


					<section>
						<h2>Non-Returnable/Non-Refundable Items</h2>
						<ul>
							<li>Gift cards or promotional items</li>
							<li>Sale or clearance products marked as “final sale”</li>
							<li>Digital/downloadable products</li>
							<li>Items damaged due to misuse or negligence</li>
						</ul>
					</section>


					<section>
						<h2>Refund Process</h2>
						<p>
							Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If
							approved, your refund will be processed automatically to your original payment method within 7–10 business days.
						</p>
					</section>


					<section>
						<h2>Partial Refunds</h2>
						<p>
							In some cases, only partial refunds are granted (if applicable):
						</p>
						<ul>
							<li>Items not in original condition, damaged, or missing parts not due to our error</li>
							<li>Returns requested after the 7-day return window</li>
						</ul>
					</section>


					<section>
						<h2>Exchanges</h2>
						<p>
							We only replace items if they are defective or damaged. If you need an exchange, please contact us at the email
							address below before sending the product back.
						</p>
					</section>


					<section>
						<h2>Shipping Returns</h2>
						<p>
							To return your product, please ship it to the address provided by our customer support team. You are responsible
							for paying shipping costs for returning your item unless the return is due to our error (e.g., wrong or defective
							item).
						</p>
					</section>


					<section>
						<h2>Late or Missing Refunds</h2>
						<ul>
							<li>If you haven’t received a refund yet, first check your bank account again.</li>
							<li>Contact your credit card company; it may take some time before your refund is officially posted.</li>
							<li>Next, contact your bank. There is often some processing time before a refund is posted.</li>
							<li>If you’ve done all of this and still have not received your refund, please contact us at support@kidobazar.com.</li>
						</ul>
					</section>



				</article>



			</div>

		</AuthProvider>
	);
}
