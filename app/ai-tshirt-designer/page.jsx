

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {

		title: "About Us - Kidobazar",
		description: "Discover Kidobazar – your trusted online marketplace for quality products at the best prices. Learn about our mission, values, and commitment to delivering a seamless shopping experience for families everywhere.",
		post_thumbnail: { src: "", alt: "" },
		keywords: "Kidobazar, kids online store, baby products, children’s toys, kids fashion, baby clothes, kids essentials, kids marketplace, buy baby toys online, kids shop",
		ogTitle: "About Us - Kidobazar",
		ogDes: "Discover Kidobazar – your trusted online marketplace for quality products at the best prices. Learn about our mission, values, and commitment to delivering a seamless shopping experience for families everywhere."

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
						<h2>Our Story</h2>
						<p>
							<strong>Kidobazar</strong> was founded with a simple vision: to provide families with high-quality, affordable,
							and thoughtfully curated products for kids and parents. What started as a small initiative has grown into a trusted
							online marketplace that brings together a wide range of products designed to make parenting easier and more joyful.
						</p>
					</section>


					<section>
						<h2>Our Mission</h2>
						<p>
							Our mission is to create a reliable and convenient shopping experience for parents and guardians, while ensuring
							that every product we offer is safe, durable, and family-friendly. We aim to simplify your shopping journey with a
							platform that you can trust.
						</p>
					</section>


					<section>
						<h2>What We Offer</h2>
						<ul>
							<li>A wide variety of baby, kids, and family products</li>
							<li>Carefully selected items from trusted brands and suppliers</li>
							<li>Secure and easy-to-use online shopping experience</li>
							<li>Dedicated customer support to assist you at every step</li>
						</ul>
					</section>


					<section>
						<h2>Why Choose Us</h2>
						<p>
							At Kidobazar, we know that parenting can be both exciting and challenging. That’s why we go the extra mile to make
							sure our platform is not only about products but also about building trust and relationships with our customers.
							With competitive prices, fast delivery, and a focus on customer satisfaction, we strive to be your go-to online
							store for family needs.
						</p>
					</section>


					<section>
						<h2>Our Values</h2>
						<ul>
							<li><strong>Trust:</strong> We value the confidence you place in us and work hard to maintain it.</li>
							<li><strong>Quality:</strong> Every product is carefully chosen to meet safety and quality standards.</li>
							<li><strong>Care:</strong> We care deeply about families and aim to make your shopping experience stress-free.</li>
							<li><strong>Community:</strong> We believe in building a supportive and helpful community around parenting.</li>
						</ul>
					</section>



				</article>


			</div>

		</AuthProvider>
	);
}
