

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "Terms and Conditions - Kidobazar",
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
							Welcome to <strong>Kidobazar</strong> ("we", "our", "us"). These Terms and Conditions ("Terms") govern your
							use of our website kidobazar.com (the "Site") and any related services. By accessing or using our Site, you agree
							to comply with these Terms. If you do not agree, please discontinue use immediately.
						</p>
					</section>

					<section>
						<h2>Eligibility</h2>
						<p>
							You must be at least 18 years old, or have parental/guardian consent, to use Kidobazar. By using the Site, you
							confirm that you meet this requirement.
						</p>
					</section>

					<section>
						<h2>Accounts and Registration</h2>
						<p>
							To access certain features, you may be required to create an account. You agree to provide accurate information
							and keep your login details secure. You are responsible for all activities under your account.
						</p>
					</section>

					<section>
						<h2>Orders and Payments</h2>
						<ul>
							<li>All orders placed on the Site are subject to acceptance and availability.</li>
							<li>Prices are displayed in local currency and may change without notice.</li>
							<li>By placing an order, you authorize us to charge your selected payment method.</li>
							<li>We reserve the right to cancel or refuse any order at our discretion.</li>
						</ul>
					</section>

					<section>
						<h2>Shipping and Delivery</h2>
						<p>
							We strive to deliver products within the estimated timeframes, but delays may occur. Shipping costs, timelines,
							and policies are detailed during checkout. Risk of loss passes to you upon delivery.
						</p>
					</section>

					<section>
						<h2>Returns and Refunds</h2>
						<p>
							Please review our Returns Policy for details on product returns, exchanges, and refunds. Certain items may not be
							eligible for return due to hygiene, safety, or custom order restrictions.
						</p>
					</section>

					<section>
						<h2>User Conduct</h2>
						<p>When using Kidobazar, you agree not to:</p>
						<ul>
							<li>Violate any applicable laws or regulations</li>
							<li>Post or share harmful, offensive, or misleading content</li>
							<li>Attempt to gain unauthorized access to our systems</li>
							<li>Engage in fraudulent or abusive activities</li>
						</ul>
					</section>

					<section>
						<h2>Intellectual Property</h2>
						<p>
							All content on Kidobazar (text, graphics, logos, images, software) is owned or licensed by us and is protected by
							applicable intellectual property laws. You may not reproduce, distribute, or exploit our content without prior
							written consent.
						</p>
					</section>

					<section>
						<h2>Limitation of Liability</h2>
						<p>
							To the maximum extent permitted by law, Kidobazar shall not be liable for any indirect, incidental, or
							consequential damages arising from your use of the Site. Our total liability shall not exceed the amount you paid
							for products purchased through the Site.
						</p>
					</section>

					<section>
						<h2>Indemnification</h2>
						<p>
							You agree to indemnify and hold harmless Kidobazar, its affiliates, and staff from any claims, damages, or
							expenses arising from your violation of these Terms or misuse of the Site.
						</p>
					</section>

					<section>
						<h2>Termination</h2>
						<p>
							We may suspend or terminate your access to the Site at any time, without notice, if you violate these Terms or
							engage in harmful activities.
						</p>
					</section>

					<section>
						<h2>Changes to These Terms</h2>
						<p>
							We may update these Terms from time to time. Updated versions will be posted on this page with a revised "Last
							updated" date. Continued use of the Site constitutes acceptance of the updated Terms.
						</p>
					</section>

					<section>
						<h2>Governing Law</h2>
						<p>
							These Terms are governed by and construed in accordance with the laws of [Your Country/State], without regard to
							its conflict of law principles.
						</p>
					</section>


				</article>



			</div>

		</AuthProvider>
	);
}
