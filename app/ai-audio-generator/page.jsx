

import UserAccount from "/components/UserAccount";

import { useCounterStore } from '../store/useCounterStore'
import { AuthProvider } from "../components/auth-context";
import { useAuthStore } from "/store/authStore";





export async function generateMetadata() {
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;


	var pageMetaData = {
		"title": "AI Audio & Voice Generator | Create Realistic Voices with PromptsHub.net",
		"description": "Transform text into lifelike speech using PromptsHub.net’s AI Audio & Voice Generator. Generate natural-sounding voices for podcasts, videos, and marketing content with advanced AI-powered voice synthesis.",
		"post_thumbnail": {
			"src": "https://promptshub.net/assets/images/ai-audio-voice-generator-banner.jpg",
			"alt": "AI Audio and Voice Generator by PromptsHub.net"
		},
		"keywords": "AI voice generator, AI audio generator, text to speech, realistic voice AI, voiceover generator, AI podcast tools, audio content creator, PromptsHub AI tools"
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

					<h1><strong>Create Natural-Sounding Speech with Our AI Voice Generator</strong></h1>
					<p class="ds-markdown-paragraph">Transform any text into realistic, human-like audio in seconds. Our advanced <strong>AI Voice Generator</strong> lets you create professional voiceovers, audiobooks, podcasts, and audio content with stunning clarity and natural expression. Experience the future of audio creation - no expensive equipment or voice actors needed.</p>
					<p class="ds-markdown-paragraph"><strong>Convert your text to speech now - completely free, no sign-up required.</strong></p>
					<p class="ds-markdown-paragraph">[<strong>Generate Audio Now</strong>]</p>

					<h2><strong>What Can You Create with AI Voice Generation?</strong></h2>
					<h3><strong>🎙️ Professional Audio for Every Need</strong></h3>
					<p class="ds-markdown-paragraph">Our text-to-speech technology delivers studio-quality results for:</p>

					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>Video Voiceovers:</strong> Create perfect narration for YouTube videos, tutorials, and presentations</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Audiobooks &amp; Podcasts:</strong> Convert written content into engaging audio formats</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>E-Learning Content:</strong> Make educational materials more accessible with clear narration</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>IVR &amp; Phone Systems:</strong> Generate professional voice prompts for business phone systems</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Accessibility Features:</strong> Create audio versions of written content for visually impaired users</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Character Voices:</strong> Bring stories and games to life with diverse voice personalities</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Multilingual Content:</strong> Reach global audiences with natural-sounding language translation</p>
						</li>
					</ul>
					<h3><strong>🚀 Why Choose Our AI Voice Generator?</strong></h3>
					<p class="ds-markdown-paragraph"><strong>Natural-Sounding Speech</strong>
						Experience emotional nuance and human-like inflection that basic text-to-speech tools can't match. Our AI understands context and delivers expressive, realistic audio.</p>
					<p class="ds-markdown-paragraph"><strong>Diverse Voice Library</strong>
						Choose from multiple voice types including male, female, young, mature, and character voices. Find the perfect tone for your project.</p>
					<p class="ds-markdown-paragraph"><strong>Multi-Language Support</strong>
						Generate audio in multiple languages and accents to reach international audiences with authentic pronunciation.</p>
					<p class="ds-markdown-paragraph"><strong>Instant Processing</strong>
						Go from text to downloadable audio file in under 30 seconds. No waiting for rendering or processing.</p>
					<p class="ds-markdown-paragraph"><strong>Completely Free</strong>
						Generate unlimited audio without watermarks, time limits, or hidden costs. Professional results at zero cost.</p>

					<h2><strong>How to Generate Professional Audio in 3 Simple Steps</strong></h2>
					<ol start="1">
						<li>
							<p class="ds-markdown-paragraph"><strong>Enter Your Text</strong></p>

							<ul>
								<li>
									<p class="ds-markdown-paragraph">Type or paste your script into the text box. For best results, use proper punctuation and natural phrasing.</p>
								</li>
								<li>
									<p class="ds-markdown-paragraph"><em>Example: "Welcome to our tutorial series on digital photography. In this lesson, we'll explore the fundamentals of lighting and composition."</em></p>
								</li>
							</ul>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Customize Your Voice</strong></p>

							<ul>
								<li>
									<p class="ds-markdown-paragraph">Select from available voice profiles: <strong>Professional, Friendly, Authoritative, Conversational, or Character</strong></p>
								</li>
								<li>
									<p class="ds-markdown-paragraph">Adjust speech rate and pitch to match your desired tone</p>
								</li>
								<li>
									<p class="ds-markdown-paragraph">Choose from supported languages and accents</p>
								</li>
							</ul>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>Generate &amp; Download</strong></p>

							<ul>
								<li>
									<p class="ds-markdown-paragraph">Click "Generate" to create your audio file</p>
								</li>
								<li>
									<p class="ds-markdown-paragraph">Preview the result and make adjustments if needed</p>
								</li>
								<li>
									<p class="ds-markdown-paragraph">Download as MP3 or WAV file for immediate use</p>
								</li>
							</ul>
						</li>
					</ol>
					<p class="ds-markdown-paragraph">[<strong>Try It Now - Generate Your First Audio</strong>] </p>

					<h2><strong>Perfect for Content Creators &amp; Professionals</strong></h2>
					<h3><strong>🎬 Video Creators &amp; YouTubers</strong></h3>
					<p class="ds-markdown-paragraph">Create consistent, professional voiceovers for your videos without expensive recording equipment or studio time.</p>

					<h3><strong>📚 Authors &amp; Publishers</strong></h3>
					<p class="ds-markdown-paragraph">Convert books, articles, and written content into high-quality audiobooks and audio articles.</p>

					<h3><strong>👨‍🏫 Educators &amp; Trainers</strong></h3>
					<p class="ds-markdown-paragraph">Make learning materials more engaging and accessible with clear, pleasant narration.</p>

					<h3><strong>👨‍💼 Business Professionals</strong></h3>
					<p class="ds-markdown-paragraph">Generate professional voice prompts for phone systems, training materials, and presentations.</p>

					<h3><strong>🎮 Game Developers &amp; Animators</strong></h3>
					<p class="ds-markdown-paragraph">Create character voices and narration for games, animations, and interactive experiences.</p>

					<h2><strong>Get Better Results with Expert Voice Prompts</strong></h2>
					<p class="ds-markdown-paragraph">The secret to natural-sounding AI audio is in the script writing. Browse our curated collection of voice and narration prompts designed specifically for audio generation.</p>
					<p class="ds-markdown-paragraph"><strong><a href="https://ai-voice-prompts/" target="_blank" rel="noopener noreferrer">Explore Our Voice Generation Prompts</a></strong></p>

					<h3><strong>Sample Scripts to Get You Started:</strong></h3>
					<ul>
						<li>
							<p class="ds-markdown-paragraph"><strong>For Professional Narration:</strong> "As we examine the quarterly results, please note the significant growth in our European markets. This represents a thirty-four percent increase over the previous fiscal period."</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For Character Voice:</strong> "I've been waiting for you, old friend. The stars have foretold your arrival. Come, sit by the fire and I shall share what destiny has planned."</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For Product Demonstration:</strong> "The new Omega smartwatch features a forty-eight-hour battery life, water resistance up to one hundred meters, and real-time health monitoring."</p>
						</li>
						<li>
							<p class="ds-markdown-paragraph"><strong>For Educational Content:</strong> "The process of photosynthesis can be divided into two main stages: the light-dependent reactions and the Calvin cycle. Let's examine each in detail."</p>
						</li>
					</ul>
					<h2><strong>AI Voice Generator FAQ</strong></h2>
					<p class="ds-markdown-paragraph"><strong>What voice models does this generator use?</strong>
						Our tool uses state-of-the-art neural text-to-speech technology, delivering some of the most natural-sounding AI voices available today.</p>
					<p class="ds-markdown-paragraph"><strong>What audio formats are supported?</strong>
						You can download your generated audio as MP3 or WAV files, compatible with all major audio and video editing software.</p>
					<p class="ds-markdown-paragraph"><strong>Can I use the generated audio commercially?</strong>
						Yes! You have full commercial rights to audio you generate with our tool (review our <a href="https://terms/" target="_blank" rel="noopener noreferrer">Terms of Service</a> for complete details).</p>
					<p class="ds-markdown-paragraph"><strong>Is there a limit to how much audio I can generate?</strong>
						Our free version allows generous usage for most projects. Create an account for additional features and extended generation limits.</p>
					<p class="ds-markdown-paragraph"><strong>How does this compare to other text-to-speech services?</strong>
						Unlike many basic TTS tools, our generator focuses on emotional expression and natural rhythm. Combined with our prompt library, you get professional-grade results without the professional price tag.</p>
					<p class="ds-markdown-paragraph"><strong>Do you support multiple languages?</strong>
						Yes! We offer voice generation in multiple languages including English, Spanish, French, German, Italian, and more, with authentic accents and pronunciation.</p>

					<h2><strong>Ready to Bring Your Words to Life?</strong></h2>
					<p class="ds-markdown-paragraph">Stop reading and start listening. Transform your text into engaging, professional audio content in seconds. Join thousands of creators who are enhancing their content with AI voice technology.</p>
					<p class="ds-markdown-paragraph">[<strong>Generate Your Free Audio Now</strong>]</p>

				</article>


			</div>

		</AuthProvider>
	);
}
