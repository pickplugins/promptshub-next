

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "Podcast - Kidobazar",
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


				<article class="">
					<section>
						<h2>About the Podcast</h2>
						<p>
							The <strong>Kidobazar Podcast</strong> is where parenting meets inspiration. We bring together experts, real
							parents, and thought leaders to share practical advice, personal experiences, and engaging stories that matter to
							families. Whether you’re looking for parenting hacks, product recommendations, or uplifting stories, we’ve got you
							covered.
						</p>
					</section>


					<section>
						<h2>What You’ll Hear</h2>
						<ul>
							<li>Expert tips on child care, education, and family well-being</li>
							<li>Interviews with inspiring parents and caregivers</li>
							<li>Discussions on the latest family-friendly trends and products</li>
							<li>Real stories from our Kidobazar community</li>
						</ul>
					</section>


					<section>
						<h2>Listen Anywhere</h2>
						<p>
							You can tune in to the Kidobazar Podcast on your favorite platforms including Spotify, Apple Podcasts, Google
							Podcasts, and directly on our website. Subscribe and never miss an episode!
						</p>
					</section>


					<section>
						<h2>Recent Episodes</h2>
						<ul>
							<li><strong>Episode 1:</strong> Parenting in the Digital Age – Balancing Screen Time</li>
							<li><strong>Episode 2:</strong> Nutrition for Growing Kids – What Every Parent Should Know</li>
							<li><strong>Episode 3:</strong> Building Strong Family Bonds Through Play</li>
						</ul>
					</section>


					<section>
						<h2>Join the Conversation</h2>
						<p>
							We’d love to hear from you! Share your parenting stories, suggest topics, or send us feedback for future episodes.
							Reach out to us anytime:
						</p>
						<address class="not-italic">
							<strong>Email:</strong> <a href="mailto:podcast@kidobazar.com" class="text-indigo-600">podcast@kidobazar.com</a>
							<strong>Social:</strong> Follow us on <a href="#" class="text-indigo-600">Instagram</a>, <a href="#" class="text-indigo-600">Facebook</a>, and <a href="#" class="text-indigo-600">Twitter</a>
						</address>
					</section>


					<section>
						<h2>Stay Connected</h2>
						<p>
							Subscribe to our newsletter and be the first to know about new episodes, exclusive content, and parenting
							resources from Kidobazar.
						</p>
					</section>
				</article>


			</div>

		</AuthProvider>
	);
}
