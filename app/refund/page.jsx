

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "Refund Policy | PromptsHub.net",
		"description": "Read the Refund Policy of PromptsHub.net to understand our guidelines on payments, cancellations, and refund eligibility. We aim to provide a transparent and fair process for all users purchasing premium AI prompts or services.",
		"post_thumbnail": {
			"src": "",
			"alt": "PromptsHub.net Refund Policy Page"
		},
		"keywords": "PromptsHub refund policy, payment policy, cancellations, refund process, PromptsHub.net payments, AI prompts refund, premium prompt services"
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








export default function Home() {


	return (

		<AuthProvider>


			<div className="p-5 w-full xl:w-[900px] mx-auto">

				<article class="prose prose-lg">

					<h1><strong>Refund Policy</strong></h1>
					<p class="ds-markdown-paragraph"><strong>Last Updated: [Insert Date]</strong></p>
					<p class="ds-markdown-paragraph">At <strong><a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a></strong>, we strive to provide exceptional value through our high-quality AI prompts and subscription services. We want you to be completely satisfied with your purchase. Please read this refund policy carefully to understand your rights and our obligations regarding refunds.</p>

					<h2><strong>1. General Policy for Digital Products</strong></h2>
					<p class="ds-markdown-paragraph">Due to the digital and instantly accessible nature of our products—including individual prompt packs, downloadable resources, and subscription-based access—<strong>all sales are typically final</strong>.</p>
					<p class="ds-markdown-paragraph">Once a digital product is purchased and downloaded or accessed, it cannot be "returned." Therefore, we generally <strong>do not provide refunds or credits</strong> for any purchases unless required under applicable consumer law or as outlined in the exceptions below.</p>

					<h2><strong>2. Subscription Services</strong></h2>
					<p class="ds-markdown-paragraph"><a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a> may offer subscription services (e.g., Pro Membership) that provide recurring access to our premium prompt library and features.</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Billing Cycle:</strong> Subscriptions are billed on a recurring basis (e.g., monthly or annually) until you cancel.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Cancellation:</strong> You can cancel your subscription at any time through your account settings. <strong>Cancellation will stop all future charges.</strong></p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Refunds on Subscriptions:</strong> Refunds for subscription payments are generally not provided for partial membership periods. Upon cancellation, you will retain access to the subscription features until the end of your current billing period.</p>
						</li>
					</ul>
					<h2><strong>3. Exceptions: When a Refund May Be Considered</strong></h2>
					<p class="ds-markdown-paragraph">We understand that sometimes things go wrong. We will give due consideration to refund requests in the following specific scenarios:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Technical Issues:</strong> If you are unable to access or download the purchased digital product due to a persistent, verifiable fault on our website, and our technical support team is unable to resolve the issue.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Duplicate Charge:</strong> If you have been accidentally charged twice for the same product or service.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Unauthorized Purchase:</strong> If you can provide evidence that a purchase was made fraudulently using your payment method without your authorization.</p>
						</li>
					</ul>
					<h2><strong>4. How to Request a Refund for an Eligible Issue</strong></h2>
					<p class="ds-markdown-paragraph">If your situation falls under one of the exceptions listed above, please contact us to submit a refund request. To help us process your request quickly, please include the following information:</p>

					<ol start="1">
						<li>
							<p class="ds-markdown-paragraph">Your full name and the email address used for the purchase.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">The date of purchase and the name of the product(s).</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">A detailed explanation of the issue or reason for your request.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">Any relevant screenshots or transaction IDs.</p>
						</li>
					</ol>
					<p class="ds-markdown-paragraph"><strong>Contact for Refund Requests:</strong>
						<strong>Email:</strong> [Insert Dedicated Email, e.g., <a href="https://mailto:support@promptshub.net/" target="_blank" rel="noopener noreferrer">support@promptshub.net</a>]
						<strong>Contact Form:</strong> [Link to Contact Form Page]</p>
					<p class="ds-markdown-paragraph">We will review your request and respond to you within <strong>5-7 business days</strong>.</p>

					<h2><strong>5. Troubleshooting Before You Request a Refund</strong></h2>
					<p class="ds-markdown-paragraph">We are committed to your success with our AI prompts. Before requesting a refund, we highly encourage you to:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Check Our Documentation:</strong> Many common issues can be resolved by checking our FAQ or tutorial sections.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Ensure Prompt Compatibility:</strong> Double-check that the prompt is designed for the AI model you are using (e.g., a Midjourney prompt may not work correctly in ChatGPT).</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Contact Support First:</strong> Our support team is here to help! If a prompt isn't working as expected, contact us. We may be able to provide a revised prompt, troubleshooting tips, or a suitable alternative that meets your needs, making a refund unnecessary.</p>
						</li>
					</ul>
					<h2><strong>6. Changes to This Refund Policy</strong></h2>
					<p class="ds-markdown-paragraph">We may update our Refund Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>

					<h2><strong>Contact Us</strong></h2>
					<p class="ds-markdown-paragraph">If you have any questions about this Refund Policy, please contact us:</p>
					<p class="ds-markdown-paragraph"><strong>Email:</strong> [Insert General Contact Email]
						<strong>Contact Form:</strong> [Link to Contact Form Page]</p>

				</article>



			</div>

		</AuthProvider>
	);
}
