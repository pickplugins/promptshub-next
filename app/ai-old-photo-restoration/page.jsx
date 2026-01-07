


import { AuthProvider } from "../components/auth-context";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "AI Old Photo Restoration - Bring Memories Back to Life | PromptsHub.net",
		"description": "Restore old and damaged photos instantly with PromptsHub.net's AI Old Photo Restoration. Preserve precious memories with enhanced clarity and colors.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/ai-old-photo-restoration-thumbnail.jpg",
			"alt": "Restored old photo using AI Old Photo Restoration"
		},
		"keywords": "AI old photo restoration, restore old photos, photo repair AI, AI image restoration, vintage photo enhancement, PromptsHub"
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
					<h1><strong>Remove Image Backgrounds in One Click. 100% Free &amp; Instant.</strong></h1>
					<p class="ds-markdown-paragraph"><strong>Tired of complex photo editing software? Our AI Background Remover delivers perfect, clean cuts in seconds. Just upload your photo and get a transparent background PNG—no manual editing needed.</strong></p>
					<p class="ds-markdown-paragraph">[<strong>Remove Background Now - It's Free!</strong>]</p>
					<p class="ds-markdown-paragraph"><em>No sign-up. No watermarks. Fully automated.</em></p>

					<p class="ds-markdown-paragraph"><strong>(How It Works Section)</strong></p>

					<h2><strong>How to Remove a Background in 3 Seconds</strong></h2>
					<p class="ds-markdown-paragraph">Getting a clean, professional cutout has never been easier. No green screen or editing skills required.</p>

					<ol start="1">
						<li>
							<p class="ds-markdown-paragraph"><strong>Upload Your Image</strong>
								Drag and drop your JPG or PNG file. It can be a person, product, pet, or object.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Let Our AI Work Its Magic</strong>
								Our advanced AI automatically detects the subject and removes the background with pixel-level precision.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Download &amp; Use</strong>
								Download your image as a high-resolution PNG with a transparent background. Use it anywhere, instantly.</p>
						</li>
					</ol>
					<p class="ds-markdown-paragraph"><strong>(Features &amp; Benefits Section)</strong></p>

					<h2><strong>Why Our AI Background Remover is the Best</strong></h2>
					<h3><strong>✂️ Pixel-Perfect Precision</strong></h3>
					<p class="ds-markdown-paragraph">Our AI is trained to handle fine details like hair, fur, and complex edges, giving you a clean cutout every time.</p>

					<h3><strong>⚡ Blazing Fast Results</strong></h3>
					<p class="ds-markdown-paragraph">Why wait? Get your transparent background image in under 3 seconds. It’s faster than making a cup of coffee.</p>

					<h3><strong>🆓 100% Free &amp; Easy</strong></h3>
					<p class="ds-markdown-paragraph">We believe powerful tools should be accessible. Enjoy free background removal without hidden costs or watermarks.</p>

					<h3><strong>🎯 Handles Complex Images</strong></h3>
					<p class="ds-markdown-paragraph">From fluffy pets and wispy hair to intricate product details, our tool handles challenging subjects with ease.</p>

					<h3><strong>🔒 Your Privacy is Guaranteed</strong></h3>
					<p class="ds-markdown-paragraph">We automatically delete your uploaded images after processing. Your photos are never stored or shared.</p>
					<p class="ds-markdown-paragraph"><strong>(Use Cases Section)</strong></p>

					<h2><strong>Endless Possibilities for Everyone</strong></h2>
					<p class="ds-markdown-paragraph"><strong>🛒 E-commerce &amp; Product Listings</strong>
						Create clean, white-background product photos for Amazon, eBay, or your Shopify store. Boost sales with professional-looking images.</p>
					<p class="ds-markdown-paragraph"><strong>📸 Portrait Photography</strong>
						Isolate subjects for stunning composite images, new backgrounds, or creative digital art projects.</p>
					<p class="ds-markdown-paragraph"><strong>🎨 Graphic Design &amp; Marketing</strong>
						Quickly create logos, flyers, social media posts, and banners by easily extracting objects and people.</p>
					<p class="ds-markdown-paragraph"><strong>👔 Professional Profiles</strong>
						Get a clean headshot for your LinkedIn, company website, or resume by removing distracting backgrounds.</p>
					<p class="ds-markdown-paragraph"><strong>😊 Personal Projects &amp; Fun</strong>
						Create hilarious memes, custom stickers, or collage photos of your friends and family onto new backgrounds.</p>
					<p class="ds-markdown-paragraph"><strong>(FAQ Section - Targeted Keywords)</strong></p>

					<h2><strong>Frequently Asked Questions</strong></h2>
					<p class="ds-markdown-paragraph"><strong>🤔 Is this background remover really free?</strong>
						Yes! You can remove backgrounds for free as often as you like. We offer a premium plan for heavy commercial users who need batch processing and API access, but individual use is completely free.</p>
					<p class="ds-markdown-paragraph"><strong>🖼️ What image formats do you support?</strong>
						You can upload common formats like JPG, PNG, and WebP. The processed image is always downloaded as a high-quality PNG with a transparent background.</p>
					<p class="ds-markdown-paragraph"><strong>⏱️ How long does it take to remove a background?</strong>
						Typically, it takes less than 3 seconds for our AI to process an image and remove the background automatically.</p>
					<p class="ds-markdown-paragraph"><strong>📐 What is the maximum image size?</strong>
						You can upload images up to 10MB in size. For most high-resolution photos, this is more than enough.</p>
					<p class="ds-markdown-paragraph"><strong>🔍 How accurate is the AI?</strong>
						Our AI is exceptionally accurate, even with complex edges like hair and fur. For the best results, use a high-contrast image where the subject is clearly distinct from the background.</p>
					<p class="ds-markdown-paragraph"><strong>💾 Do you store my images?</strong>
						No. We value your privacy. All uploaded images are processed automatically and permanently deleted from our servers shortly after you download the result.</p>
					<p class="ds-markdown-paragraph"><strong>(Final Call-to-Action Section)</strong></p>

					<h2><strong>Get a Perfect Cutout in Seconds</strong></h2>
					<p class="ds-markdown-paragraph">Stop wasting time with manual tools. Experience the power of AI-driven editing. Join millions who use PromptsHub to create professional images effortlessly.</p>
					<p class="ds-markdown-paragraph">[<strong>Remove Your Background Now!</strong>]</p>
					<p class="ds-markdown-paragraph"><em>No registration required. Instant results.</em></p>

				</article>


			</div>

		</AuthProvider>
	);
}
