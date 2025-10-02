
"use client"
import React, { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';

const ProductTable = () => {
	// Sample product data
	const [products] = useState([
		{
			id: 'P001',
			title: 'Wireless Bluetooth Headphones',
			description: 'Premium over-ear headphones with noise cancellation and 30-hour battery life',
			availability: 'in stock',
			condition: 'new',
			price: '$199.99',
			link: 'https://example.com/product/1',
			image_link: 'https://via.placeholder.com/100x100?text=Headphones',
			brand: 'AudioTech'
		},
		{
			id: 'P002',
			title: 'Smart Fitness Watch',
			description: 'Water-resistant smartwatch with heart rate monitoring and GPS tracking',
			availability: 'in stock',
			condition: 'new',
			price: '$299.99',
			link: 'https://example.com/product/2',
			image_link: 'https://via.placeholder.com/100x100?text=Watch',
			brand: 'FitPro'
		},
		{
			id: 'P003',
			title: 'Portable Power Bank',
			description: '20000mAh fast-charging power bank with dual USB ports and LED display',
			availability: 'out of stock',
			condition: 'new',
			price: '$49.99',
			link: 'https://example.com/product/3',
			image_link: 'https://via.placeholder.com/100x100?text=PowerBank',
			brand: 'ChargeMax'
		},
		{
			id: 'P004',
			title: 'Gaming Mechanical Keyboard',
			description: 'RGB backlit mechanical keyboard with blue switches and programmable keys',
			availability: 'in stock',
			condition: 'refurbished',
			price: '$129.99',
			link: 'https://example.com/product/4',
			image_link: 'https://via.placeholder.com/100x100?text=Keyboard',
			brand: 'GameGear'
		},
		{
			id: 'P005',
			title: 'Wireless Mouse',
			description: 'Ergonomic wireless mouse with precision tracking and 2-year battery life',
			availability: 'in stock',
			condition: 'new',
			price: '$39.99',
			link: 'https://example.com/product/5',
			image_link: 'https://via.placeholder.com/100x100?text=Mouse',
			brand: 'ClickPro'
		}
	]);

	// Function to download CSV
	const downloadCSV = () => {
		const headers = ['id', 'title', 'description', 'availability', 'condition', 'price', 'link', 'image_link', 'brand'];

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
					<Download size={20} />
					Download CSV
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
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Availability</th>
							<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Condition</th>
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
									<div className="line-clamp-2">{product.description}</div>
								</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
									{product.brand}
								</td>
								<td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
									{product.price}
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
								<td className="px-4 py-4 whitespace-nowrap text-sm">
									<a
										href={product.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
									>
										<ExternalLink size={16} />
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