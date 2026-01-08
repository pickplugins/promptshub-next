

import { AuthProvider } from "../../components/auth-context";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "AI Image Generator | Create Stunning Images with PromptsHub.net",
		"description": "Generate high-quality AI images instantly using PromptsHub.net’s AI Image Generator. Turn your creative ideas into visually stunning artwork with the power of advanced AI models and expertly crafted prompts.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/ai-image-generator-banner.jpg",
			"alt": "AI Image Generator by PromptsHub.net"
		},
		"keywords": "AI image generator, PromptsHub AI tools, text to image, AI art generator, Midjourney prompts, image creation AI, AI artwork, generate images online"
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
					<h1><strong>Unleash Your Imagination with Our Free AI Image Generator</strong></h1>
					<p class="ds-markdown-paragraph">Transform your words into breathtaking visuals. Our powerful <strong>AI Image Generator</strong> turns your text descriptions into stunning, high-quality art, photos, and graphics in seconds. Whether you're a digital artist, a marketer, or just exploring AI creativity, create unique, royalty-free images with just a few clicks.</p>
					<p class="ds-markdown-paragraph"><strong>Generate your first AI image now – no sign-up or credit card required.</strong></p>
					<p class="ds-markdown-paragraph">[<strong>Generate AI Image Now</strong>] - <em>This should be a prominent button</em></p>

					<h2><strong>Why Use the PromptsHub AI Image Generator?</strong></h2>
					<h3><strong>🖼️ Create Anything You Imagine</strong></h3>
					<p class="ds-markdown-paragraph">From photorealistic scenes to fantastical concept art, our AI understands your vision. Generate:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Digital Art &amp; Paintings:</strong> In the style of famous artists or your own unique vision.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Marketing &amp; Ad Graphics:</strong> Create compelling visuals for social media, blogs, and ads.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Concept Art &amp; Characters:</strong> Bring your storyboards, game characters, and world ideas to life.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Logo &amp; Design Ideas:</strong> Brainstorm visual concepts for your brand or projects.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Fantasy &amp; Sci-Fi Scenes:</strong> Imagine otherworldly landscapes and futuristic cities.</p>
						</li>
					</ul>
					<h3><strong>🚀 Fast, Free &amp; Easy to Use</strong></h3>
					<p class="ds-markdown-paragraph">You don't need to be a designer or tech expert. Our tool is built for everyone.</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Instant Results:</strong> Get multiple image variations in under a minute.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Completely Free:</strong> Generate images without watermarks. No hidden fees.</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>No Experience Needed:</strong> Just type what you see in your mind, and let the AI do the rest.</p>
						</li>
					</ul>
					<h3><strong>💡 Powered by PromptsHub Expertise</strong></h3>
					<p class="ds-markdown-paragraph">What makes our generator truly powerful is the <strong>prompt engineering</strong> behind it. We leverage the best practices from our vast prompt library to help you get better results, faster. You're not just using an AI; you're using an AI optimized for creativity.</p>

					<h2><strong>How to Generate Amazing AI Images in 3 Steps</strong></h2>
					<ol start="1">
						<li>
							<p class="ds-markdown-paragraph"><strong>Describe Your Vision</strong></p>

							<ul>
								<li>
									<p class="ds-markdown-paragraph">Enter a detailed text description (<strong>prompt</strong>) in the box. The more descriptive, the better!</p>
								</li>
								<li>
									<p class="ds-markdown-paragraph"><em>Example: "A majestic white wolf howling at a neon-lit aurora borealis in a cyberpunk forest, digital art."</em></p>
								</li>
							</ul>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Choose Your Style (Optional)</strong></p>

							<ul>
								<li>
									<p class="ds-markdown-paragraph">Select from popular art styles like <strong>Photorealistic, Oil Painting, Anime, Cyberpunk, or 3D Render</strong> to guide the AI.</p>
								</li>
							</ul>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Click "Generate" &amp; Be Amazed</strong></p>

							<ul>
								<li>
									<p class="ds-markdown-paragraph">Watch as our AI creates multiple unique image options for you to download, share, or refine.</p>
								</li>
							</ul>
						</li>
					</ol>
					<p class="ds-markdown-paragraph">[<strong>Try It Now - Generate Your First Image</strong>] - <em>Another prominent button</em></p>

					<h2><strong>Need Inspiration? Explore Our AI Prompt Library</strong></h2>
					<p class="ds-markdown-paragraph">Stuck on what to create? The key to incredible AI art is a great prompt. Browse our curated collection of high-quality prompts designed specifically for image generators like <strong>Midjourney, Stable Diffusion, and DALL-E 3</strong>.</p>
					<p class="ds-markdown-paragraph"><strong><a href="https://ai-image-prompts/" target="_blank" rel="noopener noreferrer">Explore Our AI Image Prompts</a></strong></p>

					<h3><strong>Sample Prompts to Get You Started:</strong></h3>
					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>For a Logo:</strong> "Minimalist logo for a coffee shop named 'The Quiet Bean', using a coffee bean and a steam swirl, single color."</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For a Fantasy Art:</strong> "An ancient dragon sleeping on a hoard of gold in a sunken cathedral, beams of light breaking through the water, epic fantasy illustration."</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For a Product Photo:</strong> "A sleek, modern smartphone on a marble table with a plant in the background, professional product photography, soft lighting."</p>
						</li>
					</ul>
					<h2><strong>AI Image Generator FAQ</strong></h2>
					<p class="ds-markdown-paragraph"><strong>What AI model does this use?</strong>
						Our tool is powered by cutting-edge AI technology, optimized to deliver the best possible results for creative projects. We continuously update our backend to use the most advanced models available.</p>
					<p class="ds-markdown-paragraph"><strong>Are the generated images free to use?</strong>
						Yes! You own the images you create. They are free for both personal and commercial use (check our <a href="https://terms/" target="_blank" rel="noopener noreferrer">Terms of Service</a> for details).</p>
					<p class="ds-markdown-paragraph"><strong>Do I need to create an account?</strong>
						No! You can start generating images immediately without an account. Creating a free account allows you to save your favorite images and prompts for later.</p>
					<p class="ds-markdown-paragraph"><strong>What's the difference between this and Midjourney/DALL-E?</strong>
						Our tool provides a free, user-friendly gateway into AI image generation. While platforms like Midjourney and DALL-E are powerful, they often require paid subscriptions or complex setups. We simplify the process and integrate seamlessly with our vast prompt library to enhance your creativity.</p>

					<h2><strong>Ready to Create? Your Digital Canvas Awaits.</strong></h2>
					<p class="ds-markdown-paragraph">Don't just imagine it—see it. Use our free AI Image Generator to bring your ideas to life today. The only limit is your imagination.</p>
					<p class="ds-markdown-paragraph">[<strong>Generate Your AI Image for Free</strong>]</p>


				</article>


			</div>

		</AuthProvider>
	);
}
