

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "Privacy Policy - Kidobazar",
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
							Welcome to <strong>Kidobazar</strong> ("we", "our", "us"). We respect your privacy and are committed to protecting
							the personal information of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard
							your information when you visit promptshub.net (the "Site").
						</p>
					</section>


					<section>
						<h2>Information We Collect</h2>
						<h3 class="text-base font-semibold">Information you provide</h3>
						<ul>
							<li>Account details (name, email address, password)</li>
							<li>Shipping and billing information (address, phone number)</li>
							<li>Messages, reviews, and other content you submit</li>
						</ul>


						<h3 class="text-base font-semibold mt-4">Information we collect automatically</h3>
						<ul>
							<li>Log data (IP address, browser type, pages visited, timestamps)</li>
							<li>Device and usage information (device type, operating system, referral source)</li>
							<li>Cookies and similar tracking technologies</li>
						</ul>
					</section>


					<section>
						<h2>How We Use Your Information</h2>
						<ul>
							<li>To provide, maintain, and improve our services</li>
							<li>To process transactions and send order-related communications</li>
							<li>To personalize content and recommend products</li>
							<li>To respond to inquiries and provide customer support</li>
							<li>To detect, prevent, and investigate fraud or other illegal activities</li>
						</ul>
					</section>


					<section>
						<h2>Legal Bases for Processing</h2>
						<p>
							When applicable, we process your personal data based on your consent, performance of a contract, compliance with a
							legal obligation, or our legitimate interests (for example, to improve our services and protect against abuse).
						</p>
					</section>


					<section>
						<h2>Cookies and Tracking Technologies</h2>
						<p>
							We use cookies and similar technologies to operate and improve the Site, remember your preferences, analyze trends,
							and deliver relevant advertising. You can control cookie preferences through your browser settings or via any
							cookie controls presented on the Site.
						</p>
					</section>


					<section>
						<h2>Sharing Your Information</h2>
						<p>We may share information with:</p>
						<ul>
							<li>Service providers who perform services on our behalf (payment processors, hosting, analytics)</li>
							<li>Business partners for joint promotions or integrations</li>
							<li>Law enforcement or government authorities when required by law or to protect our rights</li>
							<li>Third parties in connection with a merger, acquisition, or sale of assets</li>
						</ul>
					</section>


				</article>

			</div>

		</AuthProvider>
	);
}
