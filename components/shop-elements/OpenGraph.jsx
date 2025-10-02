import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';

const OpenGraph = (props) => {

	var OpenGraphData = props?.OpenGraphData;


	var id = props?.id ? props?.id : OpenGraphData?.id;
	var url = props?.url ? props?.url : OpenGraphData?.url;
	var keywords = props?.keywords ? props?.keywords : OpenGraphData?.keywords;
	var title = props?.title ? props?.title : OpenGraphData?.title;
	var description = props?.description ? props?.description : OpenGraphData?.description;
	var image = props?.image ? props?.image : OpenGraphData?.image;
	var robots = props?.robots ? props?.robots : OpenGraphData?.robots;


	// const [isOpen, setIsOpen] = useState(false);



	// useEffect(() => {

	// }, []);

	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Place",
				"@id": "https://kidobazar.com/#place",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "House: 145, Road: 01",
					"addressLocality": "New Shalbon",
					"addressRegion": "Rangpur",
					"postalCode": "5460",
					"addressCountry": "Bangladesh"
				}
			},
			{
				"@type": "Organization",
				"@id": "https://kidobazar.com/#organization",
				"name": "PromptsHub",
				"url": "https://kidobazar.com",
				"sameAs": [
					"https://facebook.com/PromptsHub/",
					"https://twitter.com/PromptsHub/"
				],
				"email": "contact@promptshub.net",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "House: 145, Road: 01",
					"addressLocality": "New Shalbon",
					"addressRegion": "Rangpur",
					"postalCode": "5460",
					"addressCountry": "Bangladesh"
				},
				"logo": {
					"@type": "ImageObject",
					"@id": "https://kidobazar.com/#logo",
					"url": "https://kidobazar.com/images/promptshub-icon.jpg",
					"contentUrl": "https://kidobazar.com/images/promptshub-icon.jpg",
					"caption": "PromptsHub",
					"inLanguage": "en-US",
					"width": "300",
					"height": "80"
				},
				"contactPoint": [
					{
						"@type": "ContactPoint",
						"telephone": "+8801537034053",
						"contactType": "customer support"
					}
				],
				"location": {
					"@id": "https://kidobazar.com/#place"
				}
			},
			{
				"@type": "WebSite",
				"@id": "https://kidobazar.com/#website",
				"url": "https://kidobazar.com",
				"name": "PromptsHub",
				"publisher": {
					"@id": "https://kidobazar.com/#organization"
				},
				"inLanguage": "en-US"
			},
			{
				"@type": "WebPage",
				"@id": url + "#webpage",
				"url": url,
				"name": title,
				"datePublished": "2015-08-06T19:18:26+06:00",
				"dateModified": "2025-01-22T17:14:37+06:00",
				"isPartOf": {
					"@id": "https://kidobazar.com/#website"
				},
				"inLanguage": "en-US"

			},
			{
				"@type": "Person",
				"@id": "https://kidobazar.com/author/promptshub/",
				"name": "PromptsHub",
				"description": "Creative AI prompt engineer on PromptsHub, specializing in crafting optimized, role-based prompts for ChatGPT, Midjourney, and other LLM platforms.",
				"url": "https://kidobazar.com/author/promptshub/",
				"image": {
					"@type": "ImageObject",
					"@id": "https://kidobazar.com/wp-content/litespeed/avatar/d38ca42d4f45383da7db03ffba0e0db9.jpg?ver=1752803893",
					"url": "https://kidobazar.com/wp-content/litespeed/avatar/d38ca42d4f45383da7db03ffba0e0db9.jpg?ver=1752803893",
					"caption": "PromptsHub",
					"inLanguage": "en-US"
				},
				"sameAs": [
					"https://kidobazar.com"
				],
				"worksFor": {
					"@id": "https://kidobazar.com/#organization"
				}
			},
			{
				"@type": "Article",
				"headline": title,
				"keywords": keywords,
				"datePublished": "2015-08-06T19:18:26+06:00",
				"dateModified": "2025-01-22T17:14:37+06:00",
				"author": {
					"@id": "https://kidobazar.com/author/promptshub/",
					"name": "PromptsHub"
				},
				"publisher": {
					"@id": "https://kidobazar.com/#organization"
				},
				"description": description,
				"name": title,
				"@id": url + "#richSnippet",
				"isPartOf": {
					"@id": url + "#webpage"
				},
				"inLanguage": "en-US",
				"mainEntityOfPage": {
					"@id": url + "#webpage"
				}
			}
		]
	};

	return (
		<Helmet>
			<title>{title}</title>
			{description && (
				<meta name="description" content={description} />
			)}
			{description && (
				<meta property="og:description" content={description} />
			)}
			{title && (
				<meta property="og:title" content={title} />
			)}
			{image && (
				<meta property="og:image" content={image} />
			)}
			{robots && (
				<meta name="robots" content={robots} />

			)}

			<script type="application/ld+json">
				{JSON.stringify(schemaData)}
			</script>


		</Helmet>
	);
};

export default OpenGraph;
