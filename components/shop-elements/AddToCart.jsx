
"use client"
import { useState, useEffect } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconIdBadge2 } from "@tabler/icons-react";
import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";

import * as fbq from "/lib/fpixel";




const AddToCart = (props) => {
	const trackPageVisit = useUtilsStore((state) => state.trackPageVisit);

	const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, coupons, setCoupons, cartTotalPay, setcartTotalPay, cartTotal, setcartTotal, shippingCost, setshippingCost } = useCounterStore()

	var productData = props?.productData
	var hideButtonText = props?.hideButtonText
	var quantitySyncwithCart = props?.quantitySyncwithCart

	var id = productData?.id

	const [isOpen, setIsOpen] = useState(false);
	var [quantity, setquantity] = useState(0);


	function addToCart() {



		if (!productData?.price) {
			addNotification({ type: 'error', title: 'Cant add to cart', content: "Sorry this product doesn't have price." })
			return;
		}

		quantity = (quantity == 0) ? 1 : quantity;

		addCartItems({ id: id, title: productData?.title, quantity: quantity, price: productData?.price, regularPrice: productData?.regularPrice, salePrice: productData?.salePrice, priceHtml: productData?.price_html, thumbnail: productData?.post_thumbnail?.src })

		setcartToggle(true)

		var trackPrams = { productId: id, userid: userDataX?.id, event: "addToCart", source: "cartButton" }

		trackPageVisit(trackPrams);
		fbq.event("AddToCart", { value: productData?.price, currency: "BDT" })

		// fbq('track', 'ViewContent', {
		// 	content_ids: ['12345'],
		// 	content_type: 'product',
		// 	value: 29.99,
		// 	currency: 'USD'
		// });

	}

	function getQuantityById(id) {


		const item = cartItems?.find(obj => obj.id === id);
		return item ? item.quantity : 0; // returns null if not found
	}

	useEffect(() => {

		var quantity = getQuantityById(id)
		setquantity(quantity)
	}, [productData]);
	useEffect(() => {

		var quantity = getQuantityById(id)

		quantity = quantity != null ? quantity : 0;

		setquantity(quantity)


	}, [cartItems]);





	function buyNow() { }


	return (
		<div className={`flex gap-2 items-center ${hideButtonText ? "w-full" : ""}`}>

			<div className={`flex  border-2 border-solid border-[#783009]  gap-2 items-center  p-1 rounded-sm  text-[#783009]`}>
				<span onClick={() => {

					if (!productData?.price) {
						addNotification({ type: 'error', title: 'Cant add to cart', content: "Sorry this product doesn't have price." })
						return;
					}


					setquantity(quantity == 1 ? 1 : quantity - 1)



					if (hideButtonText) {




						var quantityX = quantity == 1 ? 1 : quantity - 1;
						updateCartItems(id, { id: id, title: productData?.title, quantity: quantityX, price: productData?.price, regularPrice: productData?.regularPrice, salePrice: productData?.salePrice, priceHtml: productData?.price_html, thumbnail: productData?.post_thumbnail?.src })
						setcartToggle(true)

					}


				}} className="cursor-pointer ">
					<IconSquareRoundedMinusFilled />
				</span>
				<input type="text" name="addToCart" className={` ${hideButtonText ? "w-full" : "w-16"} !border-0 !shadow-none text-center focus:border-0`} value={quantity} onChange={ev => {
					var quantity = parseInt(ev.target.value);
					setquantity(quantity)
				}} />
				<span onClick={() => {

					if (!productData?.price) {
						addNotification({ type: 'error', title: 'Cant add to cart', content: "Sorry this product doesn't have price." })
						return;
					}


					setquantity(quantity + 1)




					if (hideButtonText) {




						var quantityX = quantity + 1;
						updateCartItems(id, { id: id, title: productData?.title, quantity: quantityX, price: productData?.price, regularPrice: productData?.regularPrice, salePrice: productData?.salePrice, priceHtml: productData?.price_html, thumbnail: productData?.post_thumbnail?.src })
						setcartToggle(true)

					}


				}} className="cursor-pointer ">
					<IconSquareRoundedPlusFilled />
				</span>
			</div>
			{!hideButtonText && (
				<div onClick={() => addToCart()} className="bg-[#783009] hover:bg-[#783009] cursor-pointer text-white px-4 py-[10px] rounded-sm">Add To Cart</div>

			)}
			{/* <div onClick={() => buyNow(id)} className="bg-amazon-500 hover:bg-amazon-600 cursor-pointer text-white px-4 py-[10px] rounded-sm">By Now</div> */}


		</div>
	);
};

export default AddToCart;
