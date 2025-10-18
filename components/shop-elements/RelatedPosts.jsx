"use client"
import { useState, useEffect, useContext } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from "next/link";
import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";

const RelatedPosts = (props) => {

	var categories = props.categories;
	var postId = props.postId;

	const appUrl = process.env.NEXT_PUBLIC_APP_URL;
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;



	const [isOpen, setIsOpen] = useState(false);
	var [loading, setloading] = useState(false);

	var queryPramsDefault = { category: "", post__not_in: postId, categories: categories, keyword: "", paged: 1, order: "DESC", per_page: 6, };

	var dymmyPromots = [

		{
			"id": 199,
			"title": "AI Image Prompt: Popcorn with chili flakes",
			"content": "Professional photograph of Popcorn with chili flakes shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
			"excerpt": "Professional AI image generation prompt for Popcorn with chili flakes with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1002.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 144,
					"name": "photography"
				},
				{
					"term_id": 268,
					"name": "Popcorn with chili flakes"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187601,
					"title": "image-1002",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1002.jpg"
				},
				{
					"id": 187600,
					"title": "image-1001",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1001.jpg"
				},
				{
					"id": 187598,
					"title": "image-999",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-999.jpg"
				},
				{
					"id": 187597,
					"title": "image-998",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-998.jpg"
				},
				{
					"id": 187596,
					"title": "image-997",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-997.jpg"
				},
				{
					"id": 187594,
					"title": "image-995",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-995.jpg"
				},
				{
					"id": 187593,
					"title": "image-994",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-994.jpg"
				},
				{
					"id": 187592,
					"title": "image-993",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-993.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "photography Style - Popcorn with chili flakes",
					"content": "cinematic Professional photograph of Popcorn with chili flakes shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
					"thumbnail": {
						"id": 187592,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-993.jpg"
					}
				},
				{
					"title": "landscape Style - Popcorn with chili flakes",
					"content": "soft Breathtaking landscape photography of Popcorn with chili flakes during [time of day] in [season], captured with [camera settings] using [lens type], featuring [weather conditions] with [atmospheric effects], [foreground elements] leading to [middle ground] and [background elements], [natural lighting] creating [mood and atmosphere], [color temperature] with [saturation level], [composition technique] following [photographic rule], [water/sky/terrain features], shot in [location type], [environmental details], [scale reference], ultra-high resolution, professional photography",
					"thumbnail": {
						"id": 187593,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-994.jpg"
					}
				},
				{
					"title": "abstract Style - Popcorn with chili flakes",
					"content": "vibrant Abstract artistic interpretation of Popcorn with chili flakes using [artistic medium], featuring [geometric/organic forms] with [pattern type] and [texture quality], composed with [color harmony] palette including [primary colors] and [secondary colors], utilizing [artistic technique] with [brush/tool technique], [composition balance] and [visual flow], [contrast level] with [tonal range], [spatial depth] through [layering method], [symbolic elements] representing [meaning/emotion], [artistic movement style], [surface treatment], contemporary art piece, gallery quality",
					"thumbnail": {
						"id": 187594,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-995.jpg"
					}
				},
				{
					"title": "digital art Style - Popcorn with chili flakes",
					"content": "muted Digital artwork featuring Popcorn with chili flakes created with [digital software] using [digital technique], rendered in [art style] with [rendering method], [color palette] consisting of [primary color scheme] and [accent colors], [lighting model] with [light sources] and [shadow technique], [texture mapping] and [surface materials], [composition layout] with [focal points], [background complexity] and [environmental details], [artistic influences], [level of detail], [resolution specification], digital painting mastery, concept art quality",
					"thumbnail": {
						"id": 187595,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-996.jpg"
					}
				},
				{
					"title": "illustration Style - Popcorn with chili flakes",
					"content": "bold Detailed illustration of Popcorn with chili flakes created in [illustration style] using [traditional/digital medium], featuring [line art quality] with [stroke technique], [color application] using [color theory], [shading method] and [highlighting technique], [texture rendering] and [pattern details], [composition structure] with [visual hierarchy], [background treatment] and [environmental elements], [character design] with [proportions] and [anatomical accuracy], [artistic influences], [level of finish], [publication quality], masterful illustration technique",
					"thumbnail": {
						"id": 187596,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-997.jpg"
					}
				},
				{
					"title": "3d render Style - Popcorn with chili flakes",
					"content": "elegant Photorealistic 3D render of Popcorn with chili flakes modeled in [3D software] using [modeling technique], featuring [material shaders] with [surface properties], [lighting setup] including [key light], [fill light], and [rim light], [rendering engine] with [global illumination], [texture resolution] and [UV mapping], [camera settings] with [focal length] and [aperture], [environmental details] and [atmospheric effects], [post-processing effects], [render quality], [resolution output], professional 3D visualization, architectural/product visualization quality",
					"thumbnail": {
						"id": 187597,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-998.jpg"
					}
				},
				{
					"title": "cartoon Style - Popcorn with chili flakes",
					"content": "rustic Stylized cartoon illustration of Popcorn with chili flakes in [animation style] featuring [character design] with [proportional style], [facial features] and [expression type], [color palette] using [cartoon color theory], [line art style] with [stroke weight], [shading technique] appropriate for [target audience], [background style] with [environmental details], [motion lines/effects], [clothing/accessories design], [personality expression], [artistic consistency], [animation quality], [studio style reference], professional animation artwork",
					"thumbnail": {
						"id": 187598,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-999.jpg"
					}
				},
				{
					"title": "realistic Style - Popcorn with chili flakes",
					"content": "futuristic Hyperrealistic depiction of Popcorn with chili flakes with [photographic quality], featuring [anatomical accuracy] and [proportional correctness], [skin/surface texture] with [pore/detail level], [lighting realism] creating [natural shadows], [color accuracy] with [realistic color saturation], [environmental interaction] and [physics accuracy], [material properties] showing [wear/aging], [atmospheric perspective], [depth perception], [fine detail rendering], [subsurface scattering], photorealistic quality, masterpiece realism",
					"thumbnail": {
						"id": 187599,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1000.jpg"
					}
				},
				{
					"title": "fantasy Style - Popcorn with chili flakes",
					"content": "classical Epic fantasy artwork featuring Popcorn with chili flakes in [fantasy setting] with [magical elements], [mythological creatures] and [enchanted objects], [atmospheric magic effects] and [particle systems], [fantasy architecture] with [ancient/mystical design], [costume design] featuring [fantasy materials] and [magical accessories], [dramatic lighting] with [magical illumination], [color palette] evoking [fantasy mood], [environmental storytelling], [epic scale], [detailed world-building], [fantasy art style], [legendary quality], masterpiece fantasy illustration",
					"thumbnail": {
						"id": 187600,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1001.jpg"
					}
				}
			]
		},
		{
			"id": 187,
			"title": "AI Image Prompt: Spicy cheese popcorn",
			"content": "Professional photograph of Spicy cheese popcorn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
			"excerpt": "Professional AI image generation prompt for Spicy cheese popcorn with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-983.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 144,
					"name": "photography"
				},
				{
					"term_id": 256,
					"name": "Spicy cheese popcorn"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187591,
					"title": "image-992",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-992.jpg"
				},
				{
					"id": 187590,
					"title": "image-991",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-991.jpg"
				},
				{
					"id": 187589,
					"title": "image-990",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-990.jpg"
				},
				{
					"id": 187588,
					"title": "image-989",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-989.jpg"
				},
				{
					"id": 187587,
					"title": "image-988",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-988.jpg"
				},
				{
					"id": 187586,
					"title": "image-987",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-987.jpg"
				},
				{
					"id": 187585,
					"title": "image-986",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-986.jpg"
				},
				{
					"id": 187583,
					"title": "image-984",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-984.jpg"
				},
				{
					"id": 187582,
					"title": "image-983",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-983.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "photography Style - Spicy cheese popcorn",
					"content": "cinematic Professional photograph of Spicy cheese popcorn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
					"thumbnail": {
						"id": 187583,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-984.jpg"
					}
				},
				{
					"title": "landscape Style - Spicy cheese popcorn",
					"content": "soft Breathtaking landscape photography of Spicy cheese popcorn during [time of day] in [season], captured with [camera settings] using [lens type], featuring [weather conditions] with [atmospheric effects], [foreground elements] leading to [middle ground] and [background elements], [natural lighting] creating [mood and atmosphere], [color temperature] with [saturation level], [composition technique] following [photographic rule], [water/sky/terrain features], shot in [location type], [environmental details], [scale reference], ultra-high resolution, professional photography",
					"thumbnail": {
						"id": 187585,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-986.jpg"
					}
				},
				{
					"title": "abstract Style - Spicy cheese popcorn",
					"content": "vibrant Abstract artistic interpretation of Spicy cheese popcorn using [artistic medium], featuring [geometric/organic forms] with [pattern type] and [texture quality], composed with [color harmony] palette including [primary colors] and [secondary colors], utilizing [artistic technique] with [brush/tool technique], [composition balance] and [visual flow], [contrast level] with [tonal range], [spatial depth] through [layering method], [symbolic elements] representing [meaning/emotion], [artistic movement style], [surface treatment], contemporary art piece, gallery quality",
					"thumbnail": {
						"id": 187586,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-987.jpg"
					}
				},
				{
					"title": "digital art Style - Spicy cheese popcorn",
					"content": "muted Digital artwork featuring Spicy cheese popcorn created with [digital software] using [digital technique], rendered in [art style] with [rendering method], [color palette] consisting of [primary color scheme] and [accent colors], [lighting model] with [light sources] and [shadow technique], [texture mapping] and [surface materials], [composition layout] with [focal points], [background complexity] and [environmental details], [artistic influences], [level of detail], [resolution specification], digital painting mastery, concept art quality",
					"thumbnail": {
						"id": 187587,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-988.jpg"
					}
				},
				{
					"title": "illustration Style - Spicy cheese popcorn",
					"content": "bold Detailed illustration of Spicy cheese popcorn created in [illustration style] using [traditional/digital medium], featuring [line art quality] with [stroke technique], [color application] using [color theory], [shading method] and [highlighting technique], [texture rendering] and [pattern details], [composition structure] with [visual hierarchy], [background treatment] and [environmental elements], [character design] with [proportions] and [anatomical accuracy], [artistic influences], [level of finish], [publication quality], masterful illustration technique",
					"thumbnail": {
						"id": 187588,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-989.jpg"
					}
				},
				{
					"title": "3d render Style - Spicy cheese popcorn",
					"content": "elegant Photorealistic 3D render of Spicy cheese popcorn modeled in [3D software] using [modeling technique], featuring [material shaders] with [surface properties], [lighting setup] including [key light], [fill light], and [rim light], [rendering engine] with [global illumination], [texture resolution] and [UV mapping], [camera settings] with [focal length] and [aperture], [environmental details] and [atmospheric effects], [post-processing effects], [render quality], [resolution output], professional 3D visualization, architectural/product visualization quality",
					"thumbnail": {
						"id": 187589,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-990.jpg"
					}
				},
				{
					"title": "cartoon Style - Spicy cheese popcorn",
					"content": "rustic Stylized cartoon illustration of Spicy cheese popcorn in [animation style] featuring [character design] with [proportional style], [facial features] and [expression type], [color palette] using [cartoon color theory], [line art style] with [stroke weight], [shading technique] appropriate for [target audience], [background style] with [environmental details], [motion lines/effects], [clothing/accessories design], [personality expression], [artistic consistency], [animation quality], [studio style reference], professional animation artwork",
					"thumbnail": {
						"id": 187590,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-991.jpg"
					}
				},
				{
					"title": "realistic Style - Spicy cheese popcorn",
					"content": "futuristic Hyperrealistic depiction of Spicy cheese popcorn with [photographic quality], featuring [anatomical accuracy] and [proportional correctness], [skin/surface texture] with [pore/detail level], [lighting realism] creating [natural shadows], [color accuracy] with [realistic color saturation], [environmental interaction] and [physics accuracy], [material properties] showing [wear/aging], [atmospheric perspective], [depth perception], [fine detail rendering], [subsurface scattering], photorealistic quality, masterpiece realism",
					"thumbnail": {
						"id": 187591,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-992.jpg"
					}
				},
				{
					"title": "fantasy Style - Spicy cheese popcorn",
					"content": "classical Epic fantasy artwork featuring Spicy cheese popcorn in [fantasy setting] with [magical elements], [mythological creatures] and [enchanted objects], [atmospheric magic effects] and [particle systems], [fantasy architecture] with [ancient/mystical design], [costume design] featuring [fantasy materials] and [magical accessories], [dramatic lighting] with [magical illumination], [color palette] evoking [fantasy mood], [environmental storytelling], [epic scale], [detailed world-building], [fantasy art style], [legendary quality], masterpiece fantasy illustration",
					"thumbnail": {
						"id": "",
						"title": "fantasy style thumbnail",
						"src": ""
					}
				}
			]
		},
		{
			"id": 183,
			"title": "AI Image Prompt: Kettle corn",
			"content": "Professional photograph of Kettle corn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
			"excerpt": "Professional AI image generation prompt for Kettle corn with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-972.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 252,
					"name": "Kettle corn"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187581,
					"title": "image-982",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-982.jpg"
				},
				{
					"id": 187580,
					"title": "image-981",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-981.jpg"
				},
				{
					"id": 187579,
					"title": "image-980",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-980.jpg"
				},
				{
					"id": 187578,
					"title": "image-979",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-979.jpg"
				},
				{
					"id": 187577,
					"title": "image-978",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-978.jpg"
				},
				{
					"id": 187574,
					"title": "image-975",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-975.jpg"
				},
				{
					"id": 187572,
					"title": "image-973",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-973.jpg"
				},
				{
					"id": 187571,
					"title": "image-972",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-972.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "photography Style - Kettle corn",
					"content": "cinematic Professional photograph of Kettle corn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
					"thumbnail": {
						"id": 187572,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-973.jpg"
					}
				},
				{
					"title": "landscape Style - Kettle corn",
					"content": "soft Breathtaking landscape photography of Kettle corn during [time of day] in [season], captured with [camera settings] using [lens type], featuring [weather conditions] with [atmospheric effects], [foreground elements] leading to [middle ground] and [background elements], [natural lighting] creating [mood and atmosphere], [color temperature] with [saturation level], [composition technique] following [photographic rule], [water/sky/terrain features], shot in [location type], [environmental details], [scale reference], ultra-high resolution, professional photography",
					"thumbnail": {
						"id": 187574,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-975.jpg"
					}
				},
				{
					"title": "abstract Style - Kettle corn",
					"content": "vibrant Abstract artistic interpretation of Kettle corn using [artistic medium], featuring [geometric/organic forms] with [pattern type] and [texture quality], composed with [color harmony] palette including [primary colors] and [secondary colors], utilizing [artistic technique] with [brush/tool technique], [composition balance] and [visual flow], [contrast level] with [tonal range], [spatial depth] through [layering method], [symbolic elements] representing [meaning/emotion], [artistic movement style], [surface treatment], contemporary art piece, gallery quality",
					"thumbnail": {
						"id": 187575,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-976.jpg"
					}
				},
				{
					"title": "digital art Style - Kettle corn",
					"content": "muted Digital artwork featuring Kettle corn created with [digital software] using [digital technique], rendered in [art style] with [rendering method], [color palette] consisting of [primary color scheme] and [accent colors], [lighting model] with [light sources] and [shadow technique], [texture mapping] and [surface materials], [composition layout] with [focal points], [background complexity] and [environmental details], [artistic influences], [level of detail], [resolution specification], digital painting mastery, concept art quality",
					"thumbnail": {
						"id": 187576,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-977.jpg"
					}
				},
				{
					"title": "illustration Style - Kettle corn",
					"content": "bold Detailed illustration of Kettle corn created in [illustration style] using [traditional/digital medium], featuring [line art quality] with [stroke technique], [color application] using [color theory], [shading method] and [highlighting technique], [texture rendering] and [pattern details], [composition structure] with [visual hierarchy], [background treatment] and [environmental elements], [character design] with [proportions] and [anatomical accuracy], [artistic influences], [level of finish], [publication quality], masterful illustration technique",
					"thumbnail": {
						"id": 187577,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-978.jpg"
					}
				},
				{
					"title": "3d render Style - Kettle corn",
					"content": "elegant Photorealistic 3D render of Kettle corn modeled in [3D software] using [modeling technique], featuring [material shaders] with [surface properties], [lighting setup] including [key light], [fill light], and [rim light], [rendering engine] with [global illumination], [texture resolution] and [UV mapping], [camera settings] with [focal length] and [aperture], [environmental details] and [atmospheric effects], [post-processing effects], [render quality], [resolution output], professional 3D visualization, architectural/product visualization quality",
					"thumbnail": {
						"id": 187578,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-979.jpg"
					}
				},
				{
					"title": "cartoon Style - Kettle corn",
					"content": "rustic Stylized cartoon illustration of Kettle corn in [animation style] featuring [character design] with [proportional style], [facial features] and [expression type], [color palette] using [cartoon color theory], [line art style] with [stroke weight], [shading technique] appropriate for [target audience], [background style] with [environmental details], [motion lines/effects], [clothing/accessories design], [personality expression], [artistic consistency], [animation quality], [studio style reference], professional animation artwork",
					"thumbnail": {
						"id": 187579,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-980.jpg"
					}
				},
				{
					"title": "realistic Style - Kettle corn",
					"content": "futuristic Hyperrealistic depiction of Kettle corn with [photographic quality], featuring [anatomical accuracy] and [proportional correctness], [skin/surface texture] with [pore/detail level], [lighting realism] creating [natural shadows], [color accuracy] with [realistic color saturation], [environmental interaction] and [physics accuracy], [material properties] showing [wear/aging], [atmospheric perspective], [depth perception], [fine detail rendering], [subsurface scattering], photorealistic quality, masterpiece realism",
					"thumbnail": {
						"id": 187580,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-981.jpg"
					}
				},
				{
					"title": "fantasy Style - Kettle corn",
					"content": "classical Epic fantasy artwork featuring Kettle corn in [fantasy setting] with [magical elements], [mythological creatures] and [enchanted objects], [atmospheric magic effects] and [particle systems], [fantasy architecture] with [ancient/mystical design], [costume design] featuring [fantasy materials] and [magical accessories], [dramatic lighting] with [magical illumination], [color palette] evoking [fantasy mood], [environmental storytelling], [epic scale], [detailed world-building], [fantasy art style], [legendary quality], masterpiece fantasy illustration",
					"thumbnail": {
						"id": 187581,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-982.jpg"
					}
				}
			]
		},
		{
			"id": 182,
			"title": "AI Image Prompt: Unsalted popcorn",
			"content": "Professional photograph of Unsalted popcorn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
			"excerpt": "Professional AI image generation prompt for Unsalted popcorn with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-961.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 144,
					"name": "photography"
				},
				{
					"term_id": 251,
					"name": "Unsalted popcorn"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187570,
					"title": "image-971",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-971.jpg"
				},
				{
					"id": 187569,
					"title": "image-970",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-970.jpg"
				},
				{
					"id": 187568,
					"title": "image-969",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-969.jpg"
				},
				{
					"id": 187567,
					"title": "image-968",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-968.jpg"
				},
				{
					"id": 187566,
					"title": "image-967",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-967.jpg"
				},
				{
					"id": 187565,
					"title": "image-966",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-966.jpg"
				},
				{
					"id": 187564,
					"title": "image-965",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-965.jpg"
				},
				{
					"id": 187563,
					"title": "image-964",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-964.jpg"
				},
				{
					"id": 187561,
					"title": "image-962",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-962.jpg"
				},
				{
					"id": 187560,
					"title": "image-961",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-961.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "photography Style - Unsalted popcorn",
					"content": "cinematic Professional photograph of Unsalted popcorn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
					"thumbnail": {
						"id": 187561,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-962.jpg"
					}
				},
				{
					"title": "landscape Style - Unsalted popcorn",
					"content": "soft Breathtaking landscape photography of Unsalted popcorn during [time of day] in [season], captured with [camera settings] using [lens type], featuring [weather conditions] with [atmospheric effects], [foreground elements] leading to [middle ground] and [background elements], [natural lighting] creating [mood and atmosphere], [color temperature] with [saturation level], [composition technique] following [photographic rule], [water/sky/terrain features], shot in [location type], [environmental details], [scale reference], ultra-high resolution, professional photography",
					"thumbnail": {
						"id": 187563,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-964.jpg"
					}
				},
				{
					"title": "abstract Style - Unsalted popcorn",
					"content": "vibrant Abstract artistic interpretation of Unsalted popcorn using [artistic medium], featuring [geometric/organic forms] with [pattern type] and [texture quality], composed with [color harmony] palette including [primary colors] and [secondary colors], utilizing [artistic technique] with [brush/tool technique], [composition balance] and [visual flow], [contrast level] with [tonal range], [spatial depth] through [layering method], [symbolic elements] representing [meaning/emotion], [artistic movement style], [surface treatment], contemporary art piece, gallery quality",
					"thumbnail": {
						"id": 187564,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-965.jpg"
					}
				},
				{
					"title": "digital art Style - Unsalted popcorn",
					"content": "muted Digital artwork featuring Unsalted popcorn created with [digital software] using [digital technique], rendered in [art style] with [rendering method], [color palette] consisting of [primary color scheme] and [accent colors], [lighting model] with [light sources] and [shadow technique], [texture mapping] and [surface materials], [composition layout] with [focal points], [background complexity] and [environmental details], [artistic influences], [level of detail], [resolution specification], digital painting mastery, concept art quality",
					"thumbnail": {
						"id": 187565,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-966.jpg"
					}
				},
				{
					"title": "illustration Style - Unsalted popcorn",
					"content": "bold Detailed illustration of Unsalted popcorn created in [illustration style] using [traditional/digital medium], featuring [line art quality] with [stroke technique], [color application] using [color theory], [shading method] and [highlighting technique], [texture rendering] and [pattern details], [composition structure] with [visual hierarchy], [background treatment] and [environmental elements], [character design] with [proportions] and [anatomical accuracy], [artistic influences], [level of finish], [publication quality], masterful illustration technique",
					"thumbnail": {
						"id": 187566,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-967.jpg"
					}
				},
				{
					"title": "3d render Style - Unsalted popcorn",
					"content": "elegant Photorealistic 3D render of Unsalted popcorn modeled in [3D software] using [modeling technique], featuring [material shaders] with [surface properties], [lighting setup] including [key light], [fill light], and [rim light], [rendering engine] with [global illumination], [texture resolution] and [UV mapping], [camera settings] with [focal length] and [aperture], [environmental details] and [atmospheric effects], [post-processing effects], [render quality], [resolution output], professional 3D visualization, architectural/product visualization quality",
					"thumbnail": {
						"id": 187567,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-968.jpg"
					}
				},
				{
					"title": "cartoon Style - Unsalted popcorn",
					"content": "rustic Stylized cartoon illustration of Unsalted popcorn in [animation style] featuring [character design] with [proportional style], [facial features] and [expression type], [color palette] using [cartoon color theory], [line art style] with [stroke weight], [shading technique] appropriate for [target audience], [background style] with [environmental details], [motion lines/effects], [clothing/accessories design], [personality expression], [artistic consistency], [animation quality], [studio style reference], professional animation artwork",
					"thumbnail": {
						"id": 187568,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-969.jpg"
					}
				},
				{
					"title": "realistic Style - Unsalted popcorn",
					"content": "futuristic Hyperrealistic depiction of Unsalted popcorn with [photographic quality], featuring [anatomical accuracy] and [proportional correctness], [skin/surface texture] with [pore/detail level], [lighting realism] creating [natural shadows], [color accuracy] with [realistic color saturation], [environmental interaction] and [physics accuracy], [material properties] showing [wear/aging], [atmospheric perspective], [depth perception], [fine detail rendering], [subsurface scattering], photorealistic quality, masterpiece realism",
					"thumbnail": {
						"id": 187569,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-970.jpg"
					}
				},
				{
					"title": "fantasy Style - Unsalted popcorn",
					"content": "classical Epic fantasy artwork featuring Unsalted popcorn in [fantasy setting] with [magical elements], [mythological creatures] and [enchanted objects], [atmospheric magic effects] and [particle systems], [fantasy architecture] with [ancient/mystical design], [costume design] featuring [fantasy materials] and [magical accessories], [dramatic lighting] with [magical illumination], [color palette] evoking [fantasy mood], [environmental storytelling], [epic scale], [detailed world-building], [fantasy art style], [legendary quality], masterpiece fantasy illustration",
					"thumbnail": {
						"id": 187570,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-971.jpg"
					}
				}
			]
		},
		{
			"id": 205,
			"title": "AI Image Prompt: Tandoori spiced popcorn",
			"content": "Professional photograph of Tandoori spiced popcorn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
			"excerpt": "Professional AI image generation prompt for Tandoori spiced popcorn with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-918.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 144,
					"name": "photography"
				},
				{
					"term_id": 274,
					"name": "Tandoori spiced popcorn"
				}
			],
			"models": [],
			"gallery": [],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": "1",
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "photography Style - Tandoori spiced popcorn",
					"content": "cinematic Professional photograph of Tandoori spiced popcorn shot with [camera brand and model] using [lens specifications], [shooting mode] with [exposure settings], [lighting conditions] featuring [natural/artificial light], [composition technique] with [rule of thirds/leading lines], [depth of field] creating [bokeh quality], [color grading] with [mood/tone], [perspective angle] from [shooting position], [environmental context], [foreground/background elements], [moment capture], [technical quality], [post-processing style], award-winning photography",
					"thumbnail": {
						"id": 1531,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-792.jpg"
					}
				},
				{
					"title": "portrait Style - Tandoori spiced popcorn",
					"content": "dramatic Professional portrait photography of Tandoori spiced popcorn, captured with [camera type] using [lens focal length], featuring [lighting setup] with [light direction] creating [shadow quality] on the face, shot from [camera angle] at [distance from subject], displaying [facial expression] and [eye direction], wearing [clothing style] in [color scheme], with [background type] background using [depth of field], [skin texture detail], [hair lighting], post-processed with [editing style], [image quality], [resolution], trending on [platform]",
					"thumbnail": {
						"id": 1532,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-793.jpg"
					}
				},
				{
					"title": "landscape Style - Tandoori spiced popcorn",
					"content": "soft Breathtaking landscape photography of Tandoori spiced popcorn during [time of day] in [season], captured with [camera settings] using [lens type], featuring [weather conditions] with [atmospheric effects], [foreground elements] leading to [middle ground] and [background elements], [natural lighting] creating [mood and atmosphere], [color temperature] with [saturation level], [composition technique] following [photographic rule], [water/sky/terrain features], shot in [location type], [environmental details], [scale reference], ultra-high resolution, professional photography",
					"thumbnail": {
						"id": 187519,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-920.jpg"
					}
				},
				{
					"title": "abstract Style - Tandoori spiced popcorn",
					"content": "vibrant Abstract artistic interpretation of Tandoori spiced popcorn using [artistic medium], featuring [geometric/organic forms] with [pattern type] and [texture quality], composed with [color harmony] palette including [primary colors] and [secondary colors], utilizing [artistic technique] with [brush/tool technique], [composition balance] and [visual flow], [contrast level] with [tonal range], [spatial depth] through [layering method], [symbolic elements] representing [meaning/emotion], [artistic movement style], [surface treatment], contemporary art piece, gallery quality",
					"thumbnail": {
						"id": 187520,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-921.jpg"
					}
				},
				{
					"title": "digital art Style - Tandoori spiced popcorn",
					"content": "muted Digital artwork featuring Tandoori spiced popcorn created with [digital software] using [digital technique], rendered in [art style] with [rendering method], [color palette] consisting of [primary color scheme] and [accent colors], [lighting model] with [light sources] and [shadow technique], [texture mapping] and [surface materials], [composition layout] with [focal points], [background complexity] and [environmental details], [artistic influences], [level of detail], [resolution specification], digital painting mastery, concept art quality",
					"thumbnail": {
						"id": 187521,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-922.jpg"
					}
				},
				{
					"title": "illustration Style - Tandoori spiced popcorn",
					"content": "bold Detailed illustration of Tandoori spiced popcorn created in [illustration style] using [traditional/digital medium], featuring [line art quality] with [stroke technique], [color application] using [color theory], [shading method] and [highlighting technique], [texture rendering] and [pattern details], [composition structure] with [visual hierarchy], [background treatment] and [environmental elements], [character design] with [proportions] and [anatomical accuracy], [artistic influences], [level of finish], [publication quality], masterful illustration technique",
					"thumbnail": {
						"id": 187522,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-923.jpg"
					}
				},
				{
					"title": "3d render Style - Tandoori spiced popcorn",
					"content": "elegant Photorealistic 3D render of Tandoori spiced popcorn modeled in [3D software] using [modeling technique], featuring [material shaders] with [surface properties], [lighting setup] including [key light], [fill light], and [rim light], [rendering engine] with [global illumination], [texture resolution] and [UV mapping], [camera settings] with [focal length] and [aperture], [environmental details] and [atmospheric effects], [post-processing effects], [render quality], [resolution output], professional 3D visualization, architectural/product visualization quality",
					"thumbnail": {
						"id": 187523,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-924.jpg"
					}
				},
				{
					"title": "cartoon Style - Tandoori spiced popcorn",
					"content": "rustic Stylized cartoon illustration of Tandoori spiced popcorn in [animation style] featuring [character design] with [proportional style], [facial features] and [expression type], [color palette] using [cartoon color theory], [line art style] with [stroke weight], [shading technique] appropriate for [target audience], [background style] with [environmental details], [motion lines/effects], [clothing/accessories design], [personality expression], [artistic consistency], [animation quality], [studio style reference], professional animation artwork",
					"thumbnail": {
						"id": 187524,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-925.jpg"
					}
				},
				{
					"title": "realistic Style - Tandoori spiced popcorn",
					"content": "futuristic Hyperrealistic depiction of Tandoori spiced popcorn with [photographic quality], featuring [anatomical accuracy] and [proportional correctness], [skin/surface texture] with [pore/detail level], [lighting realism] creating [natural shadows], [color accuracy] with [realistic color saturation], [environmental interaction] and [physics accuracy], [material properties] showing [wear/aging], [atmospheric perspective], [depth perception], [fine detail rendering], [subsurface scattering], photorealistic quality, masterpiece realism",
					"thumbnail": {
						"id": 187525,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-926.jpg"
					}
				},
				{
					"title": "fantasy Style - Tandoori spiced popcorn",
					"content": "classical Epic fantasy artwork featuring Tandoori spiced popcorn in [fantasy setting] with [magical elements], [mythological creatures] and [enchanted objects], [atmospheric magic effects] and [particle systems], [fantasy architecture] with [ancient/mystical design], [costume design] featuring [fantasy materials] and [magical accessories], [dramatic lighting] with [magical illumination], [color palette] evoking [fantasy mood], [environmental storytelling], [epic scale], [detailed world-building], [fantasy art style], [legendary quality], masterpiece fantasy illustration",
					"thumbnail": {
						"id": 187526,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-927.jpg"
					}
				}
			]
		},
		{
			"id": 187516,
			"title": "AI Image Prompt: Lap desk / Bed tray Furniture",
			"content": "Lap desk / Bed tray Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Lap desk / Bed tray Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-939.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 498,
					"name": "Lap desk / Bed tray Furniture"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187538,
					"title": "image-939",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-939.jpg"
				},
				{
					"id": 187540,
					"title": "image-941",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-941.jpg"
				},
				{
					"id": 187548,
					"title": "image-949",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-949.jpg"
				},
				{
					"id": 187547,
					"title": "image-948",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-948.jpg"
				},
				{
					"id": 187542,
					"title": "image-943",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-943.jpg"
				},
				{
					"id": 187545,
					"title": "image-946",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-946.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": "2",
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Lap desk / Bed tray Furniture",
					"content": "cinematic Lap desk / Bed tray Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187539,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-940.jpg"
					}
				},
				{
					"title": "photography Style - Lap desk / Bed tray Furniture",
					"content": "dramatic professional photograph of Lap desk / Bed tray Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187541,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-942.jpg"
					}
				},
				{
					"title": "illustration Style - Lap desk / Bed tray Furniture",
					"content": "soft detailed illustration of Lap desk / Bed tray Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187540,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-941.jpg"
					}
				},
				{
					"title": "3d render Style - Lap desk / Bed tray Furniture",
					"content": "vibrant 3D rendered Lap desk / Bed tray Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187542,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-943.jpg"
					}
				},
				{
					"title": "cartoon Style - Lap desk / Bed tray Furniture",
					"content": "muted cartoon style illustration of Lap desk / Bed tray Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187543,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-944.jpg"
					}
				},
				{
					"title": "fantasy Style - Lap desk / Bed tray Furniture",
					"content": "bold fantasy art of Lap desk / Bed tray Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187544,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-945.jpg"
					}
				},
				{
					"title": "vintage Style - Lap desk / Bed tray Furniture",
					"content": "elegant vintage style image of Lap desk / Bed tray Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187545,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-946.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Lap desk / Bed tray Furniture",
					"content": "hyperrealistic Lap desk / Bed tray Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187546,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-947.jpg"
					}
				},
				{
					"title": "surreal photography - Lap desk / Bed tray Furniture",
					"content": "surreal professional photograph of Lap desk / Bed tray Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187547,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-948.jpg"
					}
				},
				{
					"title": "impressionist illustration - Lap desk / Bed tray Furniture",
					"content": "impressionist detailed illustration of Lap desk / Bed tray Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187548,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-949.jpg"
					}
				}
			]
		},
		{
			"id": 187515,
			"title": "AI Image Prompt: Stair shelf / Corner shelf Furniture",
			"content": "Stair shelf / Corner shelf Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Stair shelf / Corner shelf Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1142.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				},
				{
					"term_id": 497,
					"name": "Stair shelf / Corner shelf Furniture"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187752,
					"title": "image-1152",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1152.jpg"
				},
				{
					"id": 187751,
					"title": "image-1151",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1151.jpg"
				},
				{
					"id": 187750,
					"title": "image-1150",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1150.jpg"
				},
				{
					"id": 187749,
					"title": "image-1149",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1149.jpg"
				},
				{
					"id": 187748,
					"title": "image-1148",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1148.jpg"
				},
				{
					"id": 187747,
					"title": "image-1147",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1147.jpg"
				},
				{
					"id": 187746,
					"title": "image-1146",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1146.jpg"
				},
				{
					"id": 187745,
					"title": "image-1145",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1145.jpg"
				},
				{
					"id": 187744,
					"title": "image-1144",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1144.jpg"
				},
				{
					"id": 187743,
					"title": "image-1143",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1143.jpg"
				},
				{
					"id": 187742,
					"title": "image-1142",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1142.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Stair shelf / Corner shelf Furniture",
					"content": "cinematic Stair shelf / Corner shelf Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187743,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1143.jpg"
					}
				},
				{
					"title": "photography Style - Stair shelf / Corner shelf Furniture",
					"content": "dramatic professional photograph of Stair shelf / Corner shelf Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187744,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1144.jpg"
					}
				},
				{
					"title": "illustration Style - Stair shelf / Corner shelf Furniture",
					"content": "soft detailed illustration of Stair shelf / Corner shelf Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187745,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1145.jpg"
					}
				},
				{
					"title": "3d render Style - Stair shelf / Corner shelf Furniture",
					"content": "vibrant 3D rendered Stair shelf / Corner shelf Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187746,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1146.jpg"
					}
				},
				{
					"title": "cartoon Style - Stair shelf / Corner shelf Furniture",
					"content": "muted cartoon style illustration of Stair shelf / Corner shelf Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187747,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1147.jpg"
					}
				},
				{
					"title": "fantasy Style - Stair shelf / Corner shelf Furniture",
					"content": "bold fantasy art of Stair shelf / Corner shelf Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187748,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1148.jpg"
					}
				},
				{
					"title": "vintage Style - Stair shelf / Corner shelf Furniture",
					"content": "elegant vintage style image of Stair shelf / Corner shelf Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187749,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1149.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Stair shelf / Corner shelf Furniture",
					"content": "hyperrealistic Stair shelf / Corner shelf Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187750,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1150.jpg"
					}
				},
				{
					"title": "surreal photography - Stair shelf / Corner shelf Furniture",
					"content": "surreal professional photograph of Stair shelf / Corner shelf Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187751,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1151.jpg"
					}
				},
				{
					"title": "impressionist illustration - Stair shelf / Corner shelf Furniture",
					"content": "impressionist detailed illustration of Stair shelf / Corner shelf Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187752,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1152.jpg"
					}
				}
			]
		},
		{
			"id": 187514,
			"title": "AI Image Prompt: Fireplace mantle / Surround Furniture",
			"content": "Fireplace mantle / Surround Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Fireplace mantle / Surround Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1167.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 496,
					"name": "Fireplace mantle / Surround Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187774,
					"title": "image-1174",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1174.jpg"
				},
				{
					"id": 187773,
					"title": "image-1173",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1173.jpg"
				},
				{
					"id": 187772,
					"title": "image-1172",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1172.jpg"
				},
				{
					"id": 187771,
					"title": "image-1171",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1171.jpg"
				},
				{
					"id": 187769,
					"title": "image-1169",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1169.jpg"
				},
				{
					"id": 187768,
					"title": "image-1168",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1168.jpg"
				},
				{
					"id": 187767,
					"title": "image-1167",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1167.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Fireplace mantle / Surround Furniture",
					"content": "cinematic Fireplace mantle / Surround Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187764,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1164.jpg"
					}
				},
				{
					"title": "photography Style - Fireplace mantle / Surround Furniture",
					"content": "dramatic professional photograph of Fireplace mantle / Surround Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187765,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1165.jpg"
					}
				},
				{
					"title": "illustration Style - Fireplace mantle / Surround Furniture",
					"content": "soft detailed illustration of Fireplace mantle / Surround Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187766,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1166.jpg"
					}
				},
				{
					"title": "3d render Style - Fireplace mantle / Surround Furniture",
					"content": "vibrant 3D rendered Fireplace mantle / Surround Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187768,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1168.jpg"
					}
				},
				{
					"title": "cartoon Style - Fireplace mantle / Surround Furniture",
					"content": "muted cartoon style illustration of Fireplace mantle / Surround Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187769,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1169.jpg"
					}
				},
				{
					"title": "fantasy Style - Fireplace mantle / Surround Furniture",
					"content": "bold fantasy art of Fireplace mantle / Surround Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187770,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1170.jpg"
					}
				},
				{
					"title": "vintage Style - Fireplace mantle / Surround Furniture",
					"content": "elegant vintage style image of Fireplace mantle / Surround Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187771,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1171.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Fireplace mantle / Surround Furniture",
					"content": "hyperrealistic Fireplace mantle / Surround Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187772,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1172.jpg"
					}
				},
				{
					"title": "surreal photography - Fireplace mantle / Surround Furniture",
					"content": "surreal professional photograph of Fireplace mantle / Surround Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187773,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1173.jpg"
					}
				},
				{
					"title": "impressionist illustration - Fireplace mantle / Surround Furniture",
					"content": "impressionist detailed illustration of Fireplace mantle / Surround Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187774,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1174.jpg"
					}
				}
			]
		},
		{
			"id": 187513,
			"title": "AI Image Prompt: Pet furniture (cat tree, dog bed, etc.) Furniture",
			"content": "Pet furniture (cat tree, dog bed, etc.) Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Pet furniture (cat tree, dog bed, etc.) Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1175.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 495,
					"name": "Pet furniture (cat tree, dog bed, etc.) Furniture"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187785,
					"title": "image-1185",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1185.jpg"
				},
				{
					"id": 187784,
					"title": "image-1184",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1184.jpg"
				},
				{
					"id": 187783,
					"title": "image-1183",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1183.jpg"
				},
				{
					"id": 187782,
					"title": "image-1182",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1182.jpg"
				},
				{
					"id": 187781,
					"title": "image-1181",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1181.jpg"
				},
				{
					"id": 187780,
					"title": "image-1180",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1180.jpg"
				},
				{
					"id": 187779,
					"title": "image-1179",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1179.jpg"
				},
				{
					"id": 187778,
					"title": "image-1178",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1178.jpg"
				},
				{
					"id": 187777,
					"title": "image-1177",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1177.jpg"
				},
				{
					"id": 187776,
					"title": "image-1176",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1176.jpg"
				},
				{
					"id": 187775,
					"title": "image-1175",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1175.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "cinematic Pet furniture (cat tree, dog bed, etc.) Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187776,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1176.jpg"
					}
				},
				{
					"title": "photography Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "dramatic professional photograph of Pet furniture (cat tree, dog bed, etc.) Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187777,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1177.jpg"
					}
				},
				{
					"title": "illustration Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "soft detailed illustration of Pet furniture (cat tree, dog bed, etc.) Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187778,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1178.jpg"
					}
				},
				{
					"title": "3d render Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "vibrant 3D rendered Pet furniture (cat tree, dog bed, etc.) Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187779,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1179.jpg"
					}
				},
				{
					"title": "cartoon Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "muted cartoon style illustration of Pet furniture (cat tree, dog bed, etc.) Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187780,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1180.jpg"
					}
				},
				{
					"title": "fantasy Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "bold fantasy art of Pet furniture (cat tree, dog bed, etc.) Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187781,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1181.jpg"
					}
				},
				{
					"title": "vintage Style - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "elegant vintage style image of Pet furniture (cat tree, dog bed, etc.) Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187782,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1182.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "hyperrealistic Pet furniture (cat tree, dog bed, etc.) Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187783,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1183.jpg"
					}
				},
				{
					"title": "surreal photography - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "surreal professional photograph of Pet furniture (cat tree, dog bed, etc.) Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187784,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1184.jpg"
					}
				},
				{
					"title": "impressionist illustration - Pet furniture (cat tree, dog bed, etc.) Furniture",
					"content": "impressionist detailed illustration of Pet furniture (cat tree, dog bed, etc.) Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187785,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1185.jpg"
					}
				}
			]
		},
		{
			"id": 187512,
			"title": "AI Image Prompt: Aquarium stand Furniture",
			"content": "Aquarium stand Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Aquarium stand Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1196.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 494,
					"name": "Aquarium stand Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187796,
					"title": "image-1196",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1196.jpg"
				},
				{
					"id": 187795,
					"title": "image-1195",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1195.jpg"
				},
				{
					"id": 187794,
					"title": "image-1194",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1194.jpg"
				},
				{
					"id": 187793,
					"title": "image-1193",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1193.jpg"
				},
				{
					"id": 187791,
					"title": "image-1191",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1191.jpg"
				},
				{
					"id": 187789,
					"title": "image-1189",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1189.jpg"
				},
				{
					"id": 187788,
					"title": "image-1188",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1188.jpg"
				},
				{
					"id": 187787,
					"title": "image-1187",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1187.jpg"
				},
				{
					"id": 187786,
					"title": "image-1186",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1186.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Aquarium stand Furniture",
					"content": "cinematic Aquarium stand Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187786,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1186.jpg"
					}
				},
				{
					"title": "photography Style - Aquarium stand Furniture",
					"content": "dramatic professional photograph of Aquarium stand Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187787,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1187.jpg"
					}
				},
				{
					"title": "illustration Style - Aquarium stand Furniture",
					"content": "soft detailed illustration of Aquarium stand Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187788,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1188.jpg"
					}
				},
				{
					"title": "3d render Style - Aquarium stand Furniture",
					"content": "vibrant 3D rendered Aquarium stand Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187789,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1189.jpg"
					}
				},
				{
					"title": "cartoon Style - Aquarium stand Furniture",
					"content": "muted cartoon style illustration of Aquarium stand Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187790,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1190.jpg"
					}
				},
				{
					"title": "fantasy Style - Aquarium stand Furniture",
					"content": "bold fantasy art of Aquarium stand Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187791,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1191.jpg"
					}
				},
				{
					"title": "vintage Style - Aquarium stand Furniture",
					"content": "elegant vintage style image of Aquarium stand Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187792,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1192.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Aquarium stand Furniture",
					"content": "hyperrealistic Aquarium stand Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187793,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1193.jpg"
					}
				},
				{
					"title": "surreal photography - Aquarium stand Furniture",
					"content": "surreal professional photograph of Aquarium stand Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187794,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1194.jpg"
					}
				},
				{
					"title": "impressionist illustration - Aquarium stand Furniture",
					"content": "impressionist detailed illustration of Aquarium stand Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187795,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1195.jpg"
					}
				}
			]
		},
		{
			"id": 187511,
			"title": "AI Image Prompt: Folding screen / Room divider Furniture",
			"content": "Folding screen / Room divider Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Folding screen / Room divider Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1207.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 493,
					"name": "Folding screen / Room divider Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187807,
					"title": "image-1207",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1207.jpg"
				},
				{
					"id": 187806,
					"title": "image-1206",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1206.jpg"
				},
				{
					"id": 187805,
					"title": "image-1205",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1205.jpg"
				},
				{
					"id": 187804,
					"title": "image-1204",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1204.jpg"
				},
				{
					"id": 187803,
					"title": "image-1203",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1203.jpg"
				},
				{
					"id": 187802,
					"title": "image-1202",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1202.jpg"
				},
				{
					"id": 187801,
					"title": "image-1201",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1201.jpg"
				},
				{
					"id": 187800,
					"title": "image-1200",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1200.jpg"
				},
				{
					"id": 187799,
					"title": "image-1199",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1199.jpg"
				},
				{
					"id": 187798,
					"title": "image-1198",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1198.jpg"
				},
				{
					"id": 187797,
					"title": "image-1197",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1197.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Folding screen / Room divider Furniture",
					"content": "cinematic Folding screen / Room divider Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187797,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1197.jpg"
					}
				},
				{
					"title": "photography Style - Folding screen / Room divider Furniture",
					"content": "dramatic professional photograph of Folding screen / Room divider Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187798,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1198.jpg"
					}
				},
				{
					"title": "illustration Style - Folding screen / Room divider Furniture",
					"content": "soft detailed illustration of Folding screen / Room divider Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187799,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1199.jpg"
					}
				},
				{
					"title": "3d render Style - Folding screen / Room divider Furniture",
					"content": "vibrant 3D rendered Folding screen / Room divider Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187800,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1200.jpg"
					}
				},
				{
					"title": "cartoon Style - Folding screen / Room divider Furniture",
					"content": "muted cartoon style illustration of Folding screen / Room divider Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187801,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1201.jpg"
					}
				},
				{
					"title": "fantasy Style - Folding screen / Room divider Furniture",
					"content": "bold fantasy art of Folding screen / Room divider Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187802,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1202.jpg"
					}
				},
				{
					"title": "vintage Style - Folding screen / Room divider Furniture",
					"content": "elegant vintage style image of Folding screen / Room divider Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187803,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1203.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Folding screen / Room divider Furniture",
					"content": "hyperrealistic Folding screen / Room divider Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187804,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1204.jpg"
					}
				},
				{
					"title": "surreal photography - Folding screen / Room divider Furniture",
					"content": "surreal professional photograph of Folding screen / Room divider Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187805,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1205.jpg"
					}
				},
				{
					"title": "impressionist illustration - Folding screen / Room divider Furniture",
					"content": "impressionist detailed illustration of Folding screen / Room divider Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187806,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1206.jpg"
					}
				}
			]
		},
		{
			"id": 187510,
			"title": "AI Image Prompt: Gaming chair Furniture",
			"content": "Gaming chair Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Gaming chair Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1218.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 492,
					"name": "Gaming chair Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187818,
					"title": "image-1218",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1218.jpg"
				},
				{
					"id": 187817,
					"title": "image-1217",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1217.jpg"
				},
				{
					"id": 187816,
					"title": "image-1216",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1216.jpg"
				},
				{
					"id": 187815,
					"title": "image-1215",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1215.jpg"
				},
				{
					"id": 187814,
					"title": "image-1214",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1214.jpg"
				},
				{
					"id": 187813,
					"title": "image-1213",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1213.jpg"
				},
				{
					"id": 187811,
					"title": "image-1211",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1211.jpg"
				},
				{
					"id": 187810,
					"title": "image-1210",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1210.jpg"
				},
				{
					"id": 187809,
					"title": "image-1209",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1209.jpg"
				},
				{
					"id": 187808,
					"title": "image-1208",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1208.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Gaming chair Furniture",
					"content": "cinematic Gaming chair Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187808,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1208.jpg"
					}
				},
				{
					"title": "photography Style - Gaming chair Furniture",
					"content": "dramatic professional photograph of Gaming chair Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187809,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1209.jpg"
					}
				},
				{
					"title": "illustration Style - Gaming chair Furniture",
					"content": "soft detailed illustration of Gaming chair Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187810,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1210.jpg"
					}
				},
				{
					"title": "3d render Style - Gaming chair Furniture",
					"content": "vibrant 3D rendered Gaming chair Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187811,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1211.jpg"
					}
				},
				{
					"title": "cartoon Style - Gaming chair Furniture",
					"content": "muted cartoon style illustration of Gaming chair Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187812,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1212.jpg"
					}
				},
				{
					"title": "fantasy Style - Gaming chair Furniture",
					"content": "bold fantasy art of Gaming chair Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187813,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1213.jpg"
					}
				},
				{
					"title": "vintage Style - Gaming chair Furniture",
					"content": "elegant vintage style image of Gaming chair Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187814,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1214.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Gaming chair Furniture",
					"content": "hyperrealistic Gaming chair Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187815,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1215.jpg"
					}
				},
				{
					"title": "surreal photography - Gaming chair Furniture",
					"content": "surreal professional photograph of Gaming chair Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187816,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1216.jpg"
					}
				},
				{
					"title": "impressionist illustration - Gaming chair Furniture",
					"content": "impressionist detailed illustration of Gaming chair Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187817,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1217.jpg"
					}
				}
			]
		},
		{
			"id": 187509,
			"title": "AI Image Prompt: Massage chair Furniture",
			"content": "Massage chair Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Massage chair Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1229.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 491,
					"name": "Massage chair Furniture"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187829,
					"title": "image-1229",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1229.jpg"
				},
				{
					"id": 187828,
					"title": "image-1228",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1228.jpg"
				},
				{
					"id": 187827,
					"title": "image-1227",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1227.jpg"
				},
				{
					"id": 187826,
					"title": "image-1226",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1226.jpg"
				},
				{
					"id": 187825,
					"title": "image-1225",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1225.jpg"
				},
				{
					"id": 187824,
					"title": "image-1224",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1224.jpg"
				},
				{
					"id": 187823,
					"title": "image-1223",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1223.jpg"
				},
				{
					"id": 187822,
					"title": "image-1222",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1222.jpg"
				},
				{
					"id": 187821,
					"title": "image-1221",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1221.jpg"
				},
				{
					"id": 187820,
					"title": "image-1220",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1220.jpg"
				},
				{
					"id": 187819,
					"title": "image-1219",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1219.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": "1",
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Massage chair Furniture",
					"content": "cinematic Massage chair Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187822,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1222.jpg"
					}
				},
				{
					"title": "photography Style - Massage chair Furniture",
					"content": "dramatic professional photograph of Massage chair Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187821,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1221.jpg"
					}
				},
				{
					"title": "illustration Style - Massage chair Furniture",
					"content": "soft detailed illustration of Massage chair Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187819,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1219.jpg"
					}
				},
				{
					"title": "3d render Style - Massage chair Furniture",
					"content": "vibrant 3D rendered Massage chair Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187820,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1220.jpg"
					}
				},
				{
					"title": "cartoon Style - Massage chair Furniture",
					"content": "muted cartoon style illustration of Massage chair Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187823,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1223.jpg"
					}
				},
				{
					"title": "fantasy Style - Massage chair Furniture",
					"content": "bold fantasy art of Massage chair Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187824,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1224.jpg"
					}
				},
				{
					"title": "vintage Style - Massage chair Furniture",
					"content": "elegant vintage style image of Massage chair Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187825,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1225.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Massage chair Furniture",
					"content": "hyperrealistic Massage chair Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187826,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1226.jpg"
					}
				},
				{
					"title": "surreal photography - Massage chair Furniture",
					"content": "surreal professional photograph of Massage chair Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187827,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1227.jpg"
					}
				},
				{
					"title": "impressionist illustration - Massage chair Furniture",
					"content": "impressionist detailed illustration of Massage chair Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187828,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1228.jpg"
					}
				}
			]
		},
		{
			"id": 187508,
			"title": "AI Image Prompt: Daybed Furniture",
			"content": "Daybed Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Daybed Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1240.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 490,
					"name": "Daybed Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187840,
					"title": "image-1240",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1240.jpg"
				},
				{
					"id": 187839,
					"title": "image-1239",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1239.jpg"
				},
				{
					"id": 187837,
					"title": "image-1237",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1237.jpg"
				},
				{
					"id": 187836,
					"title": "image-1236",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1236.jpg"
				},
				{
					"id": 187835,
					"title": "image-1235",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1235.jpg"
				},
				{
					"id": 187833,
					"title": "image-1233",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1233.jpg"
				},
				{
					"id": 187832,
					"title": "image-1232",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1232.jpg"
				},
				{
					"id": 187831,
					"title": "image-1231",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1231.jpg"
				},
				{
					"id": 187830,
					"title": "image-1230",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1230.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Daybed Furniture",
					"content": "cinematic Daybed Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187839,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1239.jpg"
					}
				},
				{
					"title": "photography Style - Daybed Furniture",
					"content": "dramatic professional photograph of Daybed Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187830,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1230.jpg"
					}
				},
				{
					"title": "illustration Style - Daybed Furniture",
					"content": "soft detailed illustration of Daybed Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187831,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1231.jpg"
					}
				},
				{
					"title": "3d render Style - Daybed Furniture",
					"content": "vibrant 3D rendered Daybed Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187832,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1232.jpg"
					}
				},
				{
					"title": "cartoon Style - Daybed Furniture",
					"content": "muted cartoon style illustration of Daybed Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187833,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1233.jpg"
					}
				},
				{
					"title": "fantasy Style - Daybed Furniture",
					"content": "bold fantasy art of Daybed Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187834,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1234.jpg"
					}
				},
				{
					"title": "vintage Style - Daybed Furniture",
					"content": "elegant vintage style image of Daybed Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187835,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1235.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Daybed Furniture",
					"content": "hyperrealistic Daybed Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187836,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1236.jpg"
					}
				},
				{
					"title": "surreal photography - Daybed Furniture",
					"content": "surreal professional photograph of Daybed Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187837,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1237.jpg"
					}
				},
				{
					"title": "impressionist illustration - Daybed Furniture",
					"content": "impressionist detailed illustration of Daybed Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187838,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1238.jpg"
					}
				}
			]
		},
		{
			"id": 187507,
			"title": "AI Image Prompt: Futon / Sofa bed Furniture",
			"content": "Futon / Sofa bed Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Futon / Sofa bed Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1249.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 489,
					"name": "Futon / Sofa bed Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187851,
					"title": "image-1251",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1251.jpg"
				},
				{
					"id": 187850,
					"title": "image-1250",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1250.jpg"
				},
				{
					"id": 187848,
					"title": "image-1248",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1248.jpg"
				},
				{
					"id": 187847,
					"title": "image-1247",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1247.jpg"
				},
				{
					"id": 187846,
					"title": "image-1246",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1246.jpg"
				},
				{
					"id": 187845,
					"title": "image-1245",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1245.jpg"
				},
				{
					"id": 187844,
					"title": "image-1244",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1244.jpg"
				},
				{
					"id": 187843,
					"title": "image-1243",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1243.jpg"
				},
				{
					"id": 187842,
					"title": "image-1242",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1242.jpg"
				},
				{
					"id": 187841,
					"title": "image-1241",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1241.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Futon / Sofa bed Furniture",
					"content": "cinematic Futon / Sofa bed Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187841,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1241.jpg"
					}
				},
				{
					"title": "photography Style - Futon / Sofa bed Furniture",
					"content": "dramatic professional photograph of Futon / Sofa bed Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187842,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1242.jpg"
					}
				},
				{
					"title": "illustration Style - Futon / Sofa bed Furniture",
					"content": "soft detailed illustration of Futon / Sofa bed Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187843,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1243.jpg"
					}
				},
				{
					"title": "3d render Style - Futon / Sofa bed Furniture",
					"content": "vibrant 3D rendered Futon / Sofa bed Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187844,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1244.jpg"
					}
				},
				{
					"title": "cartoon Style - Futon / Sofa bed Furniture",
					"content": "muted cartoon style illustration of Futon / Sofa bed Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187845,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1245.jpg"
					}
				},
				{
					"title": "fantasy Style - Futon / Sofa bed Furniture",
					"content": "bold fantasy art of Futon / Sofa bed Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187846,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1246.jpg"
					}
				},
				{
					"title": "vintage Style - Futon / Sofa bed Furniture",
					"content": "elegant vintage style image of Futon / Sofa bed Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187847,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1247.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Futon / Sofa bed Furniture",
					"content": "hyperrealistic Futon / Sofa bed Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187848,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1248.jpg"
					}
				},
				{
					"title": "surreal photography - Futon / Sofa bed Furniture",
					"content": "surreal professional photograph of Futon / Sofa bed Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187849,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1249.jpg"
					}
				},
				{
					"title": "impressionist illustration - Futon / Sofa bed Furniture",
					"content": "impressionist detailed illustration of Futon / Sofa bed Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187850,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1250.jpg"
					}
				}
			]
		},
		{
			"id": 187506,
			"title": "AI Image Prompt: Foldable furniture  Furniture",
			"content": "Foldable furniture  Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Foldable furniture  Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1255.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 488,
					"name": "Foldable furniture Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187862,
					"title": "image-1262",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1262.jpg"
				},
				{
					"id": 187861,
					"title": "image-1261",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1261.jpg"
				},
				{
					"id": 187860,
					"title": "image-1260",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1260.jpg"
				},
				{
					"id": 187859,
					"title": "image-1259",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1259.jpg"
				},
				{
					"id": 187858,
					"title": "image-1258",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1258.jpg"
				},
				{
					"id": 187857,
					"title": "image-1257",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1257.jpg"
				},
				{
					"id": 187856,
					"title": "image-1256",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1256.jpg"
				},
				{
					"id": 187854,
					"title": "image-1254",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1254.jpg"
				},
				{
					"id": 187853,
					"title": "image-1253",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1253.jpg"
				},
				{
					"id": 187852,
					"title": "image-1252",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1252.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Foldable furniture  Furniture",
					"content": "cinematic Foldable furniture  Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187852,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1252.jpg"
					}
				},
				{
					"title": "photography Style - Foldable furniture  Furniture",
					"content": "dramatic professional photograph of Foldable furniture  Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187853,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1253.jpg"
					}
				},
				{
					"title": "illustration Style - Foldable furniture  Furniture",
					"content": "soft detailed illustration of Foldable furniture  Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187854,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1254.jpg"
					}
				},
				{
					"title": "3d render Style - Foldable furniture  Furniture",
					"content": "vibrant 3D rendered Foldable furniture  Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187855,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1255.jpg"
					}
				},
				{
					"title": "cartoon Style - Foldable furniture  Furniture",
					"content": "muted cartoon style illustration of Foldable furniture  Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187856,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1256.jpg"
					}
				},
				{
					"title": "fantasy Style - Foldable furniture  Furniture",
					"content": "bold fantasy art of Foldable furniture  Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187857,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1257.jpg"
					}
				},
				{
					"title": "vintage Style - Foldable furniture  Furniture",
					"content": "elegant vintage style image of Foldable furniture  Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187858,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1258.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Foldable furniture  Furniture",
					"content": "hyperrealistic Foldable furniture  Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187859,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1259.jpg"
					}
				},
				{
					"title": "surreal photography - Foldable furniture  Furniture",
					"content": "surreal professional photograph of Foldable furniture  Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187860,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1260.jpg"
					}
				},
				{
					"title": "impressionist illustration - Foldable furniture  Furniture",
					"content": "impressionist detailed illustration of Foldable furniture  Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187861,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1261.jpg"
					}
				}
			]
		},
		{
			"id": 187505,
			"title": "AI Image Prompt: Under-bed storage Storage Furniture",
			"content": "Under-bed storage Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Under-bed storage Storage Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1271.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				},
				{
					"term_id": 487,
					"name": "Under-bed storage Storage Furniture"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187873,
					"title": "image-1273",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1273.jpg"
				},
				{
					"id": 187872,
					"title": "image-1272",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1272.jpg"
				},
				{
					"id": 187870,
					"title": "image-1270",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1270.jpg"
				},
				{
					"id": 187868,
					"title": "image-1268",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1268.jpg"
				},
				{
					"id": 187866,
					"title": "image-1266",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1266.jpg"
				},
				{
					"id": 187865,
					"title": "image-1265",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1265.jpg"
				},
				{
					"id": 187864,
					"title": "image-1264",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1264.jpg"
				},
				{
					"id": 187863,
					"title": "image-1263",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1263.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Under-bed storage Storage Furniture",
					"content": "cinematic Under-bed storage Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187863,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1263.jpg"
					}
				},
				{
					"title": "photography Style - Under-bed storage Storage Furniture",
					"content": "dramatic professional photograph of Under-bed storage Storage Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187864,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1264.jpg"
					}
				},
				{
					"title": "illustration Style - Under-bed storage Storage Furniture",
					"content": "soft detailed illustration of Under-bed storage Storage Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187865,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1265.jpg"
					}
				},
				{
					"title": "3d render Style - Under-bed storage Storage Furniture",
					"content": "vibrant 3D rendered Under-bed storage Storage Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187866,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1266.jpg"
					}
				},
				{
					"title": "cartoon Style - Under-bed storage Storage Furniture",
					"content": "muted cartoon style illustration of Under-bed storage Storage Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187867,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1267.jpg"
					}
				},
				{
					"title": "fantasy Style - Under-bed storage Storage Furniture",
					"content": "bold fantasy art of Under-bed storage Storage Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187868,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1268.jpg"
					}
				},
				{
					"title": "vintage Style - Under-bed storage Storage Furniture",
					"content": "elegant vintage style image of Under-bed storage Storage Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187869,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1269.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Under-bed storage Storage Furniture",
					"content": "hyperrealistic Under-bed storage Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187870,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1270.jpg"
					}
				},
				{
					"title": "surreal photography - Under-bed storage Storage Furniture",
					"content": "surreal professional photograph of Under-bed storage Storage Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187871,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1271.jpg"
					}
				},
				{
					"title": "impressionist illustration - Under-bed storage Storage Furniture",
					"content": "impressionist detailed illustration of Under-bed storage Storage Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187872,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1272.jpg"
					}
				}
			]
		},
		{
			"id": 187504,
			"title": "AI Image Prompt: Closet organizer system Storage Furniture",
			"content": "Closet organizer system Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Closet organizer system Storage Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1275.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 486,
					"name": "Closet organizer system Storage Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187884,
					"title": "image-1284",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1284.jpg"
				},
				{
					"id": 187883,
					"title": "image-1283",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1283.jpg"
				},
				{
					"id": 187882,
					"title": "image-1282",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1282.jpg"
				},
				{
					"id": 187881,
					"title": "image-1281",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1281.jpg"
				},
				{
					"id": 187880,
					"title": "image-1280",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1280.jpg"
				},
				{
					"id": 187879,
					"title": "image-1279",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1279.jpg"
				},
				{
					"id": 187878,
					"title": "image-1278",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1278.jpg"
				},
				{
					"id": 187877,
					"title": "image-1277",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1277.jpg"
				},
				{
					"id": 187876,
					"title": "image-1276",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1276.jpg"
				},
				{
					"id": 187875,
					"title": "image-1275",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1275.jpg"
				},
				{
					"id": 187874,
					"title": "image-1274",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1274.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Closet organizer system Storage Furniture",
					"content": "cinematic Closet organizer system Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187874,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1274.jpg"
					}
				},
				{
					"title": "photography Style - Closet organizer system Storage Furniture",
					"content": "dramatic professional photograph of Closet organizer system Storage Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187875,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1275.jpg"
					}
				},
				{
					"title": "illustration Style - Closet organizer system Storage Furniture",
					"content": "soft detailed illustration of Closet organizer system Storage Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187876,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1276.jpg"
					}
				},
				{
					"title": "3d render Style - Closet organizer system Storage Furniture",
					"content": "vibrant 3D rendered Closet organizer system Storage Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187877,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1277.jpg"
					}
				},
				{
					"title": "cartoon Style - Closet organizer system Storage Furniture",
					"content": "muted cartoon style illustration of Closet organizer system Storage Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187878,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1278.jpg"
					}
				},
				{
					"title": "fantasy Style - Closet organizer system Storage Furniture",
					"content": "bold fantasy art of Closet organizer system Storage Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187879,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1279.jpg"
					}
				},
				{
					"title": "vintage Style - Closet organizer system Storage Furniture",
					"content": "elegant vintage style image of Closet organizer system Storage Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187880,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1280.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Closet organizer system Storage Furniture",
					"content": "hyperrealistic Closet organizer system Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187881,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1281.jpg"
					}
				},
				{
					"title": "surreal photography - Closet organizer system Storage Furniture",
					"content": "surreal professional photograph of Closet organizer system Storage Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187882,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1282.jpg"
					}
				},
				{
					"title": "impressionist illustration - Closet organizer system Storage Furniture",
					"content": "impressionist detailed illustration of Closet organizer system Storage Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187883,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1283.jpg"
					}
				}
			]
		},
		{
			"id": 187503,
			"title": "AI Image Prompt: Floating shelves Storage Furniture",
			"content": "Floating shelves Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
			"excerpt": "Professional AI image generation prompt for Floating shelves Storage Furniture with multiple style variations and placeholder formatting",
			"status": "publish",
			"post_thumbnail_url": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1288.jpg",
			"featured": "",
			"author": {
				"name": "promptshub",
				"id": 1,
				"avatar": "https://secure.gravatar.com/avatar/1f2f3dea3b8375441a98b59f83d916a3557265d92d84cbea027ecb1ae1743399?s=40&d=mm&r=g"
			},
			"categories": [],
			"tags": [
				{
					"term_id": 141,
					"name": "AI Image Generation"
				},
				{
					"term_id": 485,
					"name": "Floating shelves Storage Furniture"
				},
				{
					"term_id": 142,
					"name": "Image Prompts"
				},
				{
					"term_id": 397,
					"name": "landscape"
				},
				{
					"term_id": 144,
					"name": "photography"
				}
			],
			"models": [],
			"gallery": [
				{
					"id": 187895,
					"title": "image-1295",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1295.jpg"
				},
				{
					"id": 187894,
					"title": "image-1294",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1294.jpg"
				},
				{
					"id": 187893,
					"title": "image-1293",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1293.jpg"
				},
				{
					"id": 187892,
					"title": "image-1292",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1292.jpg"
				},
				{
					"id": 187891,
					"title": "image-1291",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1291.jpg"
				},
				{
					"id": 187890,
					"title": "image-1290",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1290.jpg"
				},
				{
					"id": 187889,
					"title": "image-1289",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1289.jpg"
				},
				{
					"id": 187888,
					"title": "image-1288",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1288.jpg"
				},
				{
					"id": 187887,
					"title": "image-1287",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1287.jpg"
				},
				{
					"id": 187886,
					"title": "image-1286",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1286.jpg"
				},
				{
					"id": 187885,
					"title": "image-1285",
					"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1285.jpg"
				}
			],
			"addons": [],
			"downloads": [],
			"voteCount": 0,
			"viewCount": 0,
			"loveCount": 0,
			"downloadCount": 0,
			"loved": false,
			"faq": [
				{
					"title": "How to use these image prompts?",
					"content": "Replace the placeholder text in brackets [ ] with your specific requirements. For example, replace [lighting style] with 'soft natural lighting' or 'dramatic studio lighting' based on your needs."
				},
				{
					"title": "What AI models work with these prompts?",
					"content": "These prompts are designed to work with popular AI image generators like DALL-E, Midjourney, Stable Diffusion, and other text-to-image models. Adjust the technical terms based on your specific AI model."
				},
				{
					"title": "Can I modify the prompts?",
					"content": "Absolutely! These prompts are templates. Feel free to add, remove, or modify any elements to better suit your creative vision and specific requirements."
				}
			],
			"relatedPrompts": [],
			"variations": [
				{
					"title": "landscape Style - Floating shelves Storage Furniture",
					"content": "cinematic Floating shelves Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187885,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1285.jpg"
					}
				},
				{
					"title": "photography Style - Floating shelves Storage Furniture",
					"content": "dramatic professional photograph of Floating shelves Storage Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187886,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1286.jpg"
					}
				},
				{
					"title": "illustration Style - Floating shelves Storage Furniture",
					"content": "soft detailed illustration of Floating shelves Storage Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187887,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1287.jpg"
					}
				},
				{
					"title": "3d render Style - Floating shelves Storage Furniture",
					"content": "vibrant 3D rendered Floating shelves Storage Furniture, photorealistic rendering, [three point studio lighting], [brushed metal material], [octane render engine], detailed textures, [commercial product quality]",
					"thumbnail": {
						"id": 187888,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1288.jpg"
					}
				},
				{
					"title": "cartoon Style - Floating shelves Storage Furniture",
					"content": "muted cartoon style illustration of Floating shelves Storage Furniture, [Disney animation style], [bright primary colors], [happy friendly expression], digital art, [simple flat background]",
					"thumbnail": {
						"id": 187889,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1289.jpg"
					}
				},
				{
					"title": "fantasy Style - Floating shelves Storage Furniture",
					"content": "bold fantasy art of Floating shelves Storage Furniture, [glowing magical aura], [enchanted forest setting], fantasy illustration style, [rich jewel tone colors], [ethereal particle effects], epic artwork",
					"thumbnail": {
						"id": 187890,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1290.jpg"
					}
				},
				{
					"title": "vintage Style - Floating shelves Storage Furniture",
					"content": "elegant vintage style image of Floating shelves Storage Furniture, [1950s retro aesthetic], [aged film grain texture], [sepia brown tones], [mid-century period details], nostalgic mood",
					"thumbnail": {
						"id": 187891,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1291.jpg"
					}
				},
				{
					"title": "hyperrealistic landscape - Floating shelves Storage Furniture",
					"content": "hyperrealistic Floating shelves Storage Furniture landscape, [golden hour lighting], scenic view, [8k ultra detail], [vibrant autumn colors], [wide angle 24mm lens], photography, [peaceful serene atmosphere]",
					"thumbnail": {
						"id": 187892,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1292.jpg"
					}
				},
				{
					"title": "surreal photography - Floating shelves Storage Furniture",
					"content": "surreal professional photograph of Floating shelves Storage Furniture, [natural window light], sharp focus, [Canon 85mm portrait lens], photorealistic, [shallow depth of field], award winning photography",
					"thumbnail": {
						"id": 187893,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1293.jpg"
					}
				},
				{
					"title": "impressionist illustration - Floating shelves Storage Furniture",
					"content": "impressionist detailed illustration of Floating shelves Storage Furniture, [watercolor painting technique], colorful artwork, [warm earth tone palette], [expressive brush strokes], professional drawing, [artistic storytelling mood]",
					"thumbnail": {
						"id": 187894,
						"title": "",
						"src": "https://promptshub.net/server/wp-content/uploads/2025/07/image-1294.jpg"
					}
				}
			]
		}
	]

	var [queryPrams, setqueryPrams] = useState(queryPramsDefault);
	var [promptsData, setpromptsData] = useState({ posts: dymmyPromots, total: 6, maxPages: 1 });



	function fetchPosts() {

		const token = localStorage.getItem("token");

		// if (!token) {
		// 	throw new Error("No token found");
		// }


		if (queryPrams.paged < 0) {
			return;
		}

		var postData = {
			per_page: queryPrams.per_page,
			paged: queryPrams.paged,
			order: queryPrams.order,
			keyword: queryPrams.keyword,
			category: queryPrams.category,
			categories: queryPrams.categories,
			post__not_in: queryPrams.post__not_in,
		};



		postData = JSON.stringify(postData);





		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_prompts", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {



						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;





						setpromptsData({ posts: posts, total: total, maxPages: max_pages })
						setloading(false);


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}


	useEffect(() => {

		fetchPosts();
	}, []);


	return (
		<div className="pb-5 w-full grid grid-cols-1 xl:grid-cols-3 gap-5">


			{promptsData?.posts.map((entry, index) => {


				return (



					<div className="  bg-gray-600 rounded-sm p-5 flex flex-col gap-4" key={index}>

						{entry?.post_thumbnail_url && (
							<Link className="text-left   cursor-pointer" href={`/prompts/${entry.slug}/`} >
								<div className="h-[200px] overflow-hidden">
									<img className="h-full w-full object-cover" src={entry?.post_thumbnail_url} alt={entry?.title} />

								</div>
								<div className="text-gray-200 p-5 font-bold">
									{entry?.title}
								</div>

							</Link>

						)}
						{!entry?.post_thumbnail_url && (
							<Link className="text-left   cursor-pointer" href={`/prompts/${entry.slug}/`} >
								<div className="h-[200px] overflow-hidden">
									<img className=" opacity-20 h-full w-full object-cover" src={`${appUrl}thumb.png`} alt={entry?.title} />

								</div>


							</Link>

						)}

						<div className="text-gray-200  font-bold">

						</div>

						<Link className="text-gray-200  font-bold" href={`/prompts/${entry.slug}/`} >
							{entry?.title}


						</Link>

						<div className="text-gray-200 ">

							{entry?.categories.length > 0 && (
								<div className="flex items-center text-sm gap-2 flex-wrap">

									<div>
										<IconTags width={18} />
									</div>

									{entry?.categories.map((item, index) => {

										return (
											<div key={index}>
												<span>{item.name}</span>
												{entry?.categories.length > (index + 1) && (
													<span className="pr-1">, </span>
												)}
											</div>
										)

									})}
								</div>

							)}

						</div>



					</div>


				)
			})}







		</div>
	);
};

export default RelatedPosts;
