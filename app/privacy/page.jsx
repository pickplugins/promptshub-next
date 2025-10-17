

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "Privacy Policy | PromptsHub.net",
		"description": "Review the Privacy Policy of PromptsHub.net to learn how we collect, use, and protect your personal information. We are committed to ensuring data security and transparency for all users of our AI prompt platform.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/privacy-policy-banner.jpg",
			"alt": "PromptsHub.net Privacy Policy Page"
		},
		"keywords": "PromptsHub privacy policy, data protection, user privacy, personal data, information security, PromptsHub.net privacy, AI prompt platform policy"
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
					<h1><strong>Privacy Policy</strong></h1>
					<p class="ds-markdown-paragraph"><strong>Last Updated: [Insert Date]</strong></p>
					<p class="ds-markdown-paragraph">At <strong><a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a></strong> ("we," "our," or "us"), we are committed to protecting your privacy and being transparent about how we handle your information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a> (the "Site") and use our services related to AI prompts and prompt engineering.</p>
					<p class="ds-markdown-paragraph">Please read this policy carefully. By using our Site and Services, you consent to the practices described in this Privacy Policy.</p>

					<h2><strong>1. Information We Collect</strong></h2>
					<h3><strong>Information You Provide Directly:</strong></h3>
					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Account Information:</strong> When you register for an account, we collect your username, email address, and password.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Profile Information:</strong> Information you add to your profile, such as a bio, profile picture, or social media links.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>User Content:</strong> The prompts you create, upload, save, or share on the platform, as well as any comments, reviews, or other content you post.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Communication Data:</strong> When you contact us via email or our contact form, we collect your email address and the content of your message.</p>
						</li>
					</ul>
					<h3><strong>Information Collected Automatically:</strong></h3>
					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Usage Data:</strong> We collect information about your interactions with our Site, such as the pages you visit, the prompts you view or download, the time and date of your visits, and other diagnostic data.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Device Information:</strong> We may collect information about the device you use to access our Site, including your IP address, browser type, operating system, and device identifiers.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Site and hold certain information. See our <strong>Cookie Policy</strong> below for more details.</p>
						</li>
					</ul>
					<h2><strong>2. How We Use Your Information</strong></h2>
					<p class="ds-markdown-paragraph">We use the information we collect for various purposes, including:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>To Provide and Maintain Our Services:</strong> To create and manage your account, provide customer support, and ensure the smooth functioning of our AI prompt platform.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>To Improve Our Services:</strong> To analyze how users interact with our Site, identify trends, and develop new features and content that enhance your experience with AI prompt engineering.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>To Communicate With You:</strong> To send you administrative information, such as updates to our terms or security alerts, and to respond to your inquiries.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For Security and Protection:</strong> To detect, prevent, and address technical issues, fraud, or other potentially illegal activities.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For Personalization:</strong> To personalize your experience by showing you prompts and content relevant to your interests and usage patterns.</p>
						</li>
					</ul>
					<h2><strong>3. Legal Basis for Processing (GDPR Compliance)</strong></h2>
					<p class="ds-markdown-paragraph">If you are located in the European Economic Area (EEA) or the UK, our legal basis for collecting and using your information is:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Performance of a Contract:</strong> When we use your information to provide the services you have requested.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Legitimate Interests:</strong> For our legitimate business interests in improving our Services, marketing, and preventing fraud, where these interests are not overridden by your data protection rights.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Consent:</strong> In certain cases, we may ask for your consent to process your information, which you can withdraw at any time.</p>
						</li>
					</ul>
					<h2><strong>4. How We Share Your Information</strong></h2>
					<p class="ds-markdown-paragraph">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>With Your Consent:</strong> We may share your information when you direct us to, such as when you choose to make your profile or prompts public.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Service Providers:</strong> We may share information with trusted third-party vendors who assist us in operating our website and providing our services (e.g., hosting providers, analytics services). These partners are contractually bound to protect your data.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Business Transfers:</strong> In connection with a merger, sale of company assets, or acquisition, your information may be transferred to the new owners.</p>
						</li>
					</ul>
					<h2><strong>5. Data Retention</strong></h2>
					<p class="ds-markdown-paragraph">We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or as needed to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>

					<h2><strong>6. Your Data Protection Rights</strong></h2>
					<p class="ds-markdown-paragraph">Depending on your location, you may have the following rights regarding your personal information:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Access and Portability:</strong> The right to request copies of your personal data.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Rectification:</strong> The right to have any inaccurate or incomplete information we hold about you corrected.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Erasure (The "Right to be Forgotten"):</strong> The right to ask us to delete your personal data.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Restriction of Processing:</strong> The right to request that we restrict the processing of your personal information.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Objection to Processing:</strong> The right to object to our processing of your personal data.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Withdraw Consent:</strong> Where we rely on consent, you have the right to withdraw it at any time.</p>
						</li>
					</ul>
					<p class="ds-markdown-paragraph">To exercise any of these rights, please contact us using the details at the end of this policy.</p>

					<h2><strong>7. Cookies and Tracking Technologies</strong></h2>
					<p class="ds-markdown-paragraph">We use cookies and similar tracking technologies to track activity on our Site and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
					<p class="ds-markdown-paragraph">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>

					<h2><strong>8. Data Security</strong></h2>
					<p class="ds-markdown-paragraph">We implement appropriate technical and organizational security measures designed to protect your personal information. However, please remember that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>

					<h2><strong>9. International Data Transfers</strong></h2>
					<p class="ds-markdown-paragraph">Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.</p>

					<h2><strong>10. Children's Privacy</strong></h2>
					<p class="ds-markdown-paragraph">Our Service is not intended for individuals under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with personal data, please contact us.</p>

					<h2><strong>11. Changes to This Privacy Policy</strong></h2>
					<p class="ds-markdown-paragraph">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

					<h2><strong>12. Contact Us</strong></h2>
					<p class="ds-markdown-paragraph">If you have any questions about this Privacy Policy or your data rights, please contact us at:</p>
					<p class="ds-markdown-paragraph"><strong>Email:</strong> [Insert Privacy-Specific Email, e.g., <a href="https://mailto:privacy@promptshub.net/" target="_blank" rel="noopener noreferrer">privacy@promptshub.net</a>]
						<strong>Contact Form:</strong> [Link to Contact Form Page]</p>


				</article>

			</div>

		</AuthProvider>
	);
}
