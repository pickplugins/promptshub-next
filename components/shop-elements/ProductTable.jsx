"use client"

import React, { useState, useEffect } from 'react';

const ProductTable = (props) => {

	var entries = props.entries;

	console.log(entries);








	// Sample product data
	var [products, setproducts] = useState([]);


	useEffect(() => {

		var productsX = [];

		entries?.posts?.map(item => {

			productsX.push({
				id: item.id,
				title: item.title,
				post_content: item.post_content,
				post_excerpt: item.post_excerpt,
				description: item.description,
				availability: 'in stock',
				condition: 'new',
				price: item.price,
				salePrice: item.salePrice,
				link: `https://kidobazar.com/product/${item.slug}/`,
				image_link: item.post_thumbnail?.src,
				brand: item?.brands[0]?.name,
				fb_prompt_category: item?.fb_prompt_category,
				google_prompt_category: item?.google_prompt_category,
			})

		})

		setproducts(productsX)

	}, [entries]);

	// Function to download CSV
	const downloadCSV = () => {
		const headers = ['id', 'title', 'description', 'availability', 'condition', 'price', 'sale_price', 'prompt_tags[0]', 'link', 'image_link', 'brand', 'google_prompt_category', 'fb_prompt_category'];

		// Create CSV content
		const csvContent = [
			headers.join(','),
			...products.map(product =>
				headers.map(header => {
					const value = product[header] || '';
					// Escape commas and quotes in CSV values
					return `"${value.toString().replace(/"/g, '""')}"`;
				}).join(',')
			)
		].join('\n');

		// Create and download file
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'products.csv');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="p-6 max-w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-800">Product Inventory</h1>
				<button
					onClick={downloadCSV}
					className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
				>
					⬇ Download CSV
				</button>
			</div>

			<div className="overflow-x-auto shadow-lg rounded-lg">
				<table className="min-w-full bg-white border border-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Image</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Title</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Brand</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Price</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Sale Price</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Product tags[0]</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Availability</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Condition</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Google product category</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">FB Product Category</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Link</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{products.map((product, index) => (
							<tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>


								<td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{product.id}
								</td>
								<td className="px-4 py-4 whitespace-nowrap">
									<img
										src={product.image_link}
										alt={product.title}
										className="w-12 h-12 object-cover rounded-md"
									/>
								</td>
								<td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
									<div className="font-medium">{product.title}</div>
								</td>
								<td className="px-4 py-4 text-sm text-gray-600 max-w-md">
									<div className="">{product.description}</div>
								</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
									{product?.brands ? product?.brands[0]?.name : ''}
								</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
									{product.price ? `${product.price} BDT` : ''}

								</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
									{product.salePrice ? `${product.salePrice} BDT` : ''}
								</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
									{product?.tags ? product?.tags[0]?.name : ''}
								</td>

								<td className="px-4 py-4 whitespace-nowrap">
									<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.availability === 'in stock'
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
										}`}>
										{product.availability}
									</span>
								</td>
								<td className="px-4 py-4 whitespace-nowrap">
									<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.condition === 'new'
										? 'bg-blue-100 text-blue-800'
										: 'bg-yellow-100 text-yellow-800'
										}`}>
										{product.condition}
									</span>
								</td>

								<td className="px-4 py-4 whitespace-nowrap">
									<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full `}>
										{product.google_prompt_category}
									</span>
								</td>
								<td className="px-4 py-4 whitespace-nowrap">
									<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full `}>
										{product.fb_prompt_category}
									</span>
								</td>

								<td className="px-4 py-4 whitespace-nowrap text-sm">
									<a
										href={product.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
									>
										🔗
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-4 text-sm text-gray-600">
				Showing {products.length} products
			</div>
		</div>
	);
};

export default ProductTable;