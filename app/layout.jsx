import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "/components/Sidebar";
import MobileMenu from "/components/MobileMenu";
import GlobalHeader from "/components/GlobalHeader";
import GlobalFooter from "/components/GlobalFooter";
import { AuthProvider } from "/components/auth-context";
import { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";
import Providers from "./providers";
import * as gtag from '../lib/gtag';

var NEXT_PUBLIC_FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "PromptShub – Ultimate AI Prompt Library & Prompt Engineering Hub",
	description: "Discover, create, and share top-tier AI prompts at PromptShub. Explore prompt templates, tools, guides, and a vibrant community to supercharge your prompt engineering skills.",
	icons: {
		icon: "/favicon.png",
	},
};



export default function RootLayout({ children }) {





	return (
		<html lang="en">
			<head>
				{/* Facebook Pixel Script */}
				<Script id="fb-pixel" strategy="afterInteractive">
					{`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
				</Script>
				<noscript>
					<img
						height="1"
						width="1"
						style={{ display: "none" }}
						src={`https://www.facebook.com/tr?id=${NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
						alt=""
					/>
				</noscript>
				{/* Google Analytics */}
				<Script
					strategy="afterInteractive"
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
				/>
				<Script id="gtag-init" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
				</Script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}>

				<Providers>
					<AuthProvider>
						<NextTopLoader
							color="#783009"
							initialPosition={0.08}
							crawlSpeed={200}
							height={2}
							crawl={true}
							showSpinner={false}
							easing="ease"
							speed={200}
						/>



						<GlobalHeader />
						<div className={`flex `}>


							<Sidebar />
							<main className="flex-1 bg-gray-100">
								<div className="">{children}</div>
							</main>

						</div>
						<MobileMenu />
						<GlobalFooter />
					</AuthProvider>
				</Providers>







			</body>
		</html>
	);
}
