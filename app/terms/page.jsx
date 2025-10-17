

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "Terms & Conditions | PromptsHub.net",
		"description": "Read the Terms & Conditions of PromptsHub.net to understand the rules, policies, and user responsibilities when using our AI prompt sharing and creation platform. Stay informed about your rights and obligations.",
		"post_thumbnail": {
			"src": "",
			"alt": "PromptsHub.net Terms and Conditions Page"
		},
		"keywords": "PromptsHub terms, conditions, user agreement, policies, legal information, prompt platform rules, PromptsHub.net terms"
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
					<h1><strong>Terms and Conditions</strong></h1>
					<p class="ds-markdown-paragraph"><strong>Last Updated: [Insert Date]</strong></p>
					<p class="ds-markdown-paragraph">Welcome to <strong><a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a></strong> (the "Site"). These Terms and Conditions ("Terms") govern your access to and use of our website, services, and any content, functionality, and services offered on or through <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a> (collectively, the "Services").</p>
					<p class="ds-markdown-paragraph">Please read these Terms carefully before using our Services. By accessing or using <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a>, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Site.</p>

					<h2><strong>1. Definitions</strong></h2>
					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>"We," "Us," "Our"</strong> refers to <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a>.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>"User," "You," "Your"</strong> refers to any individual or entity accessing or using the Services.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>"Content"</strong> refers to all text, prompts, graphics, images, software, and information available on the Site, including both user-generated and site-generated content.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>"AI Prompt"</strong> or <strong>"Prompt"</strong> refers to a piece of text, code, or instruction designed to be used with an artificial intelligence model to generate a specific output.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>"User-Generated Content"</strong> refers to prompts, comments, reviews, or any other content uploaded, submitted, or posted by Users to the Site.</p>
						</li>
					</ul>
					<h2><strong>2. Use of Our Services and Account Registration</strong></h2>
					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Eligibility:</strong> You must be at least 18 years old to use our Services. By using <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a>, you represent and warrant that you are of legal age to form a binding contract.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Account:</strong> Access to certain features may require you to register for an account. You agree to provide accurate, current, and complete information during the registration process.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Account Security:</strong> You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>
						</li>
					</ul>
					<h2><strong>3. Intellectual Property Rights</strong></h2>
					<p class="ds-markdown-paragraph"><strong>a. Our Content:</strong> All Content on the Site that is created and provided by <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a>, including but not limited to the website design, logo, graphics, and certain curated prompt collections, is our proprietary property and is protected by international copyright, trademark, and other intellectual property laws.</p>
					<p class="ds-markdown-paragraph"><strong>b. User-Generated Content (Prompts):</strong></p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Ownership:</strong> You retain all ownership rights to the original prompts you create and submit to <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a>.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>License to Us:</strong> By submitting, posting, or displaying your prompts on <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a>, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your prompts in connection with the Site and our business.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>License to Other Users:</strong> You also grant each user of <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a> a non-exclusive, worldwide license to access and use your submitted prompts through the features of the Site, and to use the prompts for their personal or commercial projects.</p>
						</li>
					</ul>
					<p class="ds-markdown-paragraph"><strong>c. AI-Generated Outputs:</strong> <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a> is a platform for sharing prompts. We do not claim any ownership over the outputs generated by AI models (like ChatGPT, Midjourney, etc.) based on prompts found on our site. The ownership and legal responsibility for these AI-generated outputs reside solely with the user who generated them. You are responsible for ensuring your use of AI outputs complies with the terms of the respective AI platform and applicable laws.</p>

					<h2><strong>4. Acceptable Use and User Responsibilities</strong></h2>
					<p class="ds-markdown-paragraph">You agree not to use the Services to upload, post, or otherwise transmit any Content that:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph">Is illegal, harmful, threatening, abusive, harassing, defamatory, or obscene.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">Infringes upon any third party's patent, trademark, trade secret, copyright, or other intellectual property rights.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">Contains viruses, malware, or any other malicious code.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">Is designed to disrupt, damage, or limit the functionality of any software, hardware, or telecommunications equipment.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">Constitutes unsolicited or unauthorized advertising, promotional materials, or "spam."</p>
						</li>
					</ul>
					<p class="ds-markdown-paragraph">You also agree not to use prompts from our site for any illegal, fraudulent, or harmful purpose.</p>

					<h2><strong>5. Disclaimer of Warranties</strong></h2>
					<p class="ds-markdown-paragraph">YOUR USE OF THE SERVICES AND CONTENT IS AT YOUR SOLE RISK. THE SERVICES AND CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PROMPTSHUB.NET</a> EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
					<p class="ds-markdown-paragraph">WE DO NOT WARRANT THAT THE CONTENT, INCLUDING THE AI PROMPTS, WILL BE ACCURATE, UNINTERRUPTED, ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.</p>

					<h2><strong>6. Limitation of Liability</strong></h2>
					<p class="ds-markdown-paragraph">TO THE FULLEST EXTENT PERMITTED BY LAW, <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PROMPTSHUB.NET</a>, ITS DIRECTORS, EMPLOYEES, OR AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph">YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">ANY CONTENT OBTAINED FROM THE SERVICES.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph">UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</p>
						</li>
					</ul>
					<h2><strong>7. Indemnification</strong></h2>
					<p class="ds-markdown-paragraph">You agree to defend, indemnify, and hold harmless <a href="https://promptshub.net/" target="_blank" rel="noopener noreferrer">PromptsHub.net</a> and its licensees and licensors from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from: (a) your use of and access to the Services; (b) your violation of any term of these Terms; (c) your violation of any third-party right; or (d) any User-Generated Content you post.</p>

					<h2><strong>8. Termination</strong></h2>
					<p class="ds-markdown-paragraph">We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.</p>

					<h2><strong>9. Governing Law</strong></h2>
					<p class="ds-markdown-paragraph">These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>

					<h2><strong>10. Changes to Terms</strong></h2>
					<p class="ds-markdown-paragraph">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Services after any change constitutes your acceptance of the new Terms.</p>

					<h2><strong>11. Contact Us</strong></h2>
					<p class="ds-markdown-paragraph">If you have any questions about these Terms and Conditions, please contact us at:</p>
					<p class="ds-markdown-paragraph"><strong>Email:</strong> [Insert Contact Email]
						<strong>Contact Form:</strong> [Link to Contact Form Page]</p>


				</article>



			</div>

		</AuthProvider>
	);
}
