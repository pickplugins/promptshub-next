// lib/getProduct.js



export async function getProduct(slug) {
  var postData = {
    slug: slug,
  };
  postData = JSON.stringify(postData);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;



  const res = await fetch(`${serverUrl}wp-json/promptshub/v2/get_prompt_public`, {
    // cache: "no-store", // disable caching -> always fresh data
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    },
    body: postData,
  });



  if (!res.ok) return null;
  return res.json();
}
