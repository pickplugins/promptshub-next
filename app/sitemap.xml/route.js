
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;


export async function GET() {
  const baseUrl = appUrl;

  // Example: dynamic routes (you can fetch from DB, CMS, API, etc.)
  const staticRoutes = [
    "terms",
    "privacy",
    "refund",

    "ai-image-generator",
    "ai-text-generator",
    "ai-audio-generator",
    "ai-pdf-generator",
    "ai-sticker-generator",
    "ai-tshirt-designer",
    "ai-cartoon-character-generator",
    "ai-background-remover",
    "ai-old-photo-restoration",
    "about",
    "podcast",
    "newsletter",
    "account",
    "blog",
    "contact",
    "support",
    "create-ticket",

  ];
  // const blogPosts = [
  //   { slug: "blog" },
  //   { slug: "nextjs-sitemap-guide" },
  // ];




  var postData = {
    per_page: 999,
    order: "ASC",
    keyword: "",
  };
  postData = JSON.stringify(postData);

  const res = await fetch(`${serverUrl}wp-json/promptshub/v2/get_prompts`, {
    method: "POST",
    cache: "no-store", // disables caching

    headers: {
      'Content-Type': 'application/json',
    },
    body: postData,
  });


  const products = await res.json();


  // 








  // Merge routes
  const allRoutes = [
    ...staticRoutes,
    // ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...products?.posts.map((product) => `prompts/${product.slug}`),
  ];


  // console.log(allRoutes);


  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map((route) => {
        return `
        <url>
          <loc>${baseUrl}${route}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
