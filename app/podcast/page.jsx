

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '/store/useCounterStore'
import { AuthProvider } from "/components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "Podcast - AI, Creativity & Prompts Insights | PromptsHub.net",
		"description": "Tune into PromptsHub.net's Podcast for the latest discussions on AI, creative tools, prompt engineering, and digital innovation. Learn tips, trends, and expert insights.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/podcast-thumbnail.jpg",
			"alt": "PromptsHub.net Podcast - AI and creativity discussions"
		},
		"keywords": "PromptsHub podcast, AI podcast, creative tools, prompt engineering, digital innovation, AI insights"
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


				<article class="">
					<h1><strong>The PromptsHub Podcast: Where AI Meets Creativity</strong></h1>
					<strong>Join thousands of listeners discovering the art and science of AI prompting. Each week, we explore cutting-edge techniques, interview industry experts, and break down how to get the most from AI tools.</strong>

					[<strong>Listen to Latest Episode</strong>]

					<em>New episodes every Tuesday • 30-45 minutes • Free to listen</em>
					<h2><strong>What You'll Discover in Every Episode</strong></h2>
					<h3><strong>🎙️ Expert Interviews</strong></h3>
					Learn from AI researchers, prompt engineers, artists, and industry leaders who are shaping the future of creative technology.
					<h3><strong>💡 Practical Prompting Techniques</strong></h3>
					Get actionable tips and advanced prompting strategies you can immediately apply to your projects.
					<h3><strong>🚀 Tool Deep Dives</strong></h3>
					Comprehensive reviews and tutorials of the latest AI tools, platforms, and technologies.
					<h3><strong>📈 Industry Trends</strong></h3>
					Stay ahead of the curve with analysis of emerging trends in AI, creative technology, and digital art.
					<h3><strong>🎨 Creative Inspiration</strong></h3>
					Hear success stories, creative breakthroughs, and innovative uses of AI from our global community.

					[<strong>View All Episodes</strong>]
					<h2><strong>Subscribe and Never Miss an Episode</strong></h2>
					Choose your favorite platform and get new episodes automatically delivered.

					<strong>Popular Platforms:</strong>
					<ul>
						<li>Spotify</li>
						<li>Apple Podcasts</li>
						<li>Google Podcasts</li>
						<li>Amazon Music</li>
						<li>YouTube Music</li>
						<li>Overcast</li>
					</ul>
					<strong>Or subscribe via:</strong>
					<ul>
						<li>RSS Feed</li>
						<li>Email Newsletter</li>
					</ul>
					[<strong>Subscribe on Apple Podcasts</strong>]
					<h2><strong>Frequently Asked Questions</strong></h2>
					<strong>🎧 How often do you release new episodes?</strong> We release new episodes every Tuesday. Each episode runs 30-45 minutes, perfect for your commute or creative break.

					<strong>📱 Where can I listen to the podcast?</strong> You can listen on all major podcast platforms including Spotify, Apple Podcasts, Google Podcasts, Amazon Music, and more. We're also available on YouTube with video versions.

					<strong>💬 Can I suggest a topic or guest?</strong> Absolutely! We love hearing from our listeners. Email us at <a href="mailto:podcast@promptshub.net">podcast@promptshub.net</a> with your suggestions for topics, guests, or questions you'd like answered on the show.

					<strong>🎙️ Are you looking for guests?</strong> Yes! We're always looking for interesting guests with expertise in AI, creative technology, prompt engineering, or related fields. Reach out to us with your idea and background.

					<strong>📊 Do you have transcripts available?</strong> Yes, full transcripts are available for every episode on our blog, making our content accessible and SEO-friendly.

					<strong>💰 Is the podcast free?</strong> Yes, The PromptsHub Podcast is completely free to listen to. We're committed to democratizing AI education and inspiration.

					<strong>🤝 Do you have sponsorship opportunities?</strong> We offer limited sponsorship opportunities for brands aligned with our values. Contact our partnerships team at <a href="mailto:sponsors@promptshub.net">sponsors@promptshub.net</a> for more information.

					&nbsp;
					<h2><strong>What Our Listeners Say</strong></h2>
					<blockquote>"The PromptsHub Podcast has completely transformed how I approach AI tools. Each episode gives me practical strategies I can use immediately." - <em>Jessica T., Digital Artist</em></blockquote>
					<blockquote>"Finally a podcast that balances technical depth with creative inspiration. The guest interviews are consistently excellent." - <em>Mark R., AI Researcher</em></blockquote>
					<blockquote>"I never miss an episode. It's like having a personal mentor in AI prompting and creative technology." - <em>David L., Content Creator</em></blockquote>
					&nbsp;
					<h2><strong>Ready to Level Up Your AI Skills?</strong></h2>
					Join our growing community of AI enthusiasts, artists, and innovators. Subscribe today and get the next episode delivered automatically.

					[<strong>Subscribe on Your Favorite Platform</strong>]

					<em>Have questions? Contact us at <a href="mailto:podcast@promptshub.net">podcast@promptshub.net</a></em>
				</article>


			</div>

		</AuthProvider>
	);
}
