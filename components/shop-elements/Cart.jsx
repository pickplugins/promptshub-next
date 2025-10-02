"use client"
import { useState, useEffect, useContext } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconTrash, IconBasketCheck, IconChevronUp, IconChevronDown, IconX, IconShoppingCartCancel, IconLetterX, IconCornerUpLeftDouble } from "@tabler/icons-react";
import Image from "next/image";

import Checkout from "./Checkout";
import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
import { useAuthStore } from "/store/authStore";
import Spinner from "../Spinner";
import 'animate.css';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
import * as fbq from "/lib/fpixel";


const Cart = (props) => {
	const token = useAuthStore((state) => state.token);
	const trackPageVisit = useUtilsStore((state) => state.trackPageVisit);

	const { cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, coupons, setCoupons, cartTotalPay, setcartTotalPay, cartTotal, setcartTotal, shippingMethod, setshippingMethod, shippingCost, setshippingCost } = useCounterStore()


	const { wrapCurrency } = useUtilsStore()
	const [steps, setSteps] = useState(0);
	const [cartTotalQuantity, setcartTotalQuantity] = useState(0);
	const [animate, setAnimate] = useState(false);
	const [couponData, setCouponData] = useState(null);


	useEffect(() => {
		var total = 0;
		var totalQuantity = 0;

		cartItems?.map(item => {

			var quantity = parseInt(item.quantity)
			var price = parseInt(item.price)

			total += (price * quantity);
			totalQuantity += quantity;

		})



		setcartTotal(total)
		setcartTotalQuantity(totalQuantity)

		var totalPay = total + shippingCost;
		if (coupons.applied) {
			totalPay = totalPay - coupons.discountAmount
		}

		setcartTotalPay(totalPay)



	}, [cartItems, shippingCost, coupons]);

	useEffect(() => {
		setAnimate(!animate)

	}, [cartToggle]);


	function calculateShipping() {

		var amount = 0;

		if (shippingMethod == 'express') {
			amount = 150;
		}
		if (shippingMethod == 'normal') {
			amount = 40;
		}
		if (shippingMethod == 'free') {
			amount = 0;
		}

		setshippingCost(amount)

	}



	useEffect(() => {
		calculateShipping()

	}, [shippingMethod]);




	function calculateCoupon(amount, discountType) {

		var discountAmount = 0;

		if (discountType == "percent") {
			var discountAmount = (cartTotal * amount) / 100;

		}
		if (discountType == "fixed") {
			var discountAmount = amount;

		}



		return discountAmount;
	}


	return (
		<div className="relative">
			<div className={` ${cartItems.length == 0 ? 'hidden ' : "flex"} items-center gap-3 text-500 px-4 rounded-sm py-2 hover:bg-[#783009] bg-[#783009] cursor-pointer text-white`} onClick={ev => {
				setcartToggle(!cartToggle)


			}}>
				<IconBasketCheck />
				{cartTotalQuantity}
			</div>

			{cartToggle && (
				<div className={`fixed z-50 top-0 right-0 h-full w-[95%] lg:w-[500px] bg-white  shadow-xl overflow-y-auto   rounded-sm animate__animated ${animate ? " animate__fadeOutRight" : "animate__fadeInRight"}`}>
					{steps == 0 && (
						<>
							<div className="flex justify-between items-center bg-[#783009] py-2 px-3 text-white">
								<div>Total Items - {cartTotalQuantity}</div>
								<div className="flex gap-2">
									<div className="  border-2 border-gray-200 px-3 py-1 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
										onClick={ev => {
											resetCartItems()
											addNotification({ type: 'success', title: 'Cart reset', content: "Cart items reset success" })

										}}
									><IconShoppingCartCancel width={18} />
										Reset
									</div>
									<div className="  border-2 border-gray-200 px-3 py-1 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
										onClick={ev => {
											setcartToggle(!cartToggle)

										}}
									><IconX width={18} />
										Close
									</div>


								</div>
							</div>


							<div className="px-2">
								{cartItems.map((item, index) => {

									return (
										<div key={index} className="flex gap-2 px-2 items-center justify-between py-3 border-b border-solid border-gray-400">
											<div className="flex gap-2 flex-1 items-center">

												<div className="flex flex-col gap-1 items-center   rounded-sm border-gray-500  ">


													<span onClick={() => {

														var quantity = item.quantity + 1;
														updateCartItems(item.id, { quantity: quantity })
													}} className="cursor-pointer hover:text-gray-600 bg-amazon-600 rounded-sm ">
														<IconChevronUp />
													</span>

													<span>{item.quantity}</span>
													<span onClick={() => {

														var quantity = item.quantity == 1 ? 1 : item.quantity - 1;
														updateCartItems(item.id, { quantity: quantity })

													}} className="cursor-pointer hover:text-gray-600 bg-amazon-600 rounded-sm ">
														<IconChevronDown />
													</span>
												</div>
												<div className="flex text-xs items-center gap-2">

													<div className="w-18 overflow-hidden bg-[#ffcbb3]">
														{item.thumbnail && (
															<Image className="object-cover h-full w-full " src={item.thumbnail} width={200} height={200} alt={item?.title} />
														)}
														{!item.thumbnail && (
															<Image className="object-cover h-full w-full " src={`/thumb.png`} width={200} height={200} alt={item?.title} />
														)}
														{/* <Image className="w-full" src={item.thumbnail} alt="" /> */}

													</div>

													<div className="">

														<div className="text-sm">{item.title}</div>


														<div className="flex  gap-3 items-center ">
															{/* {item.price && (
																<div className="text-xs">{wrapCurrency(item.price)}</div>
															)}
															{item.regularPrice && (
																<div className="text-xs line-through">{wrapCurrency(item.regularPrice)}</div>
															)} */}


															<div className="flex gap-3 items-center">
																<div className="text-xs">{wrapCurrency(item.price)}</div>
																{item?.salePrice && (
																	<>
																		<div> - </div>
																		<div className="text-xs line-through">{wrapCurrency(item.regularPrice)}</div>
																	</>
																)}
															</div>








															<div className=" text-red-500 cursor-pointer flex gap-1 items-center rounded-sm text-xs"
																onClick={ev => {
																	var cartItemsX = [...cartItems]
																	cartItemsX.splice(index, 1)
																	//setcartItems(cartItemsX)
																	removeCartItems(item.id)
																	addNotification({ type: 'success', title: 'Item removed', content: `<span class="font-bold">${item.title}</span> removed from cart.` })

																}}
															><IconTrash width={16} /> Remove</div>
														</div>

													</div>
												</div>
											</div>
											<div className="flex gap-1  justify-end text-xs items-center ">
												{(item.price)} X {item.quantity} = {wrapCurrency(item.price * item.quantity)}




											</div>

										</div>
									)

								})}
							</div>


							<div className="flex justify-between px-4 py-4">
								<div>Cart Total</div>
								<div className="font-bold">{wrapCurrency(cartTotal)}</div>
							</div>



							{!coupons?.applied && (

								<div className="flex gap-2 items-center px-4 py-4">
									<div>
										<input type="text" name="" className="w-28   !border-2 border-solid border-gray-400 !shadow-none text-center focus:border-0" value={coupons.couponCode} onChange={ev => {

											var value = ev.target.value;
											var couponsX = { ...coupons }
											couponsX.couponCode = value;

											setCoupons(couponsX)
										}} />
									</div>
									<div className="text-white bg-[#783009]  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {

										var couponsX = { ...coupons }



										if (couponsX.couponCode?.length == 0) {
											addNotification({ type: 'error', title: 'Coupon is empty', content: "Please write coupon code." });

											return;
										}



										couponsX.loading = true;
										setCoupons(couponsX)

										var postData = {
											couponCode: couponsX.couponCode,
										};
										postData = JSON.stringify(postData);

										fetch(serverUrl + "wp-json/promptshub/v2/get_coupon_details", {
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




														var errors = res.errors;


														if (errors) {
															var message = res.message;

															addNotification({ type: 'error', title: 'Coupon is not valid', content: message });

															couponsX.loading = false;
															couponsX.couponCode = "";

															setCoupons(couponsX)
															return;
														}

														var couponRes = res.coupon;

														var amount = couponRes.amount;
														var discountType = couponRes.couponType;

														var discountAmount = calculateCoupon(amount, discountType);


														couponsX.applied = true;
														couponsX.discountAmount = discountAmount;
														couponsX.couponType = couponRes?.couponType;
														couponsX.amount = couponRes?.amount;
														couponsX.loading = false;





														setCoupons(couponsX)




														setTimeout(() => {
															addNotification({ type: 'success', title: 'Coupon Applied', content: "Win! Win!" })

														}, 500);
													});
												}
											})
											.catch((_error) => {
												//this.saveAsStatus = 'error';
												// handle the error
											});









									}}>Apply Coupon</div>

									{coupons.loading && (

										<Spinner />

									)}


								</div>
							)}
							{coupons.applied && (

								<div className="flex justify-between items-center px-4 py-4">
									<div className="flex flex-col gap-1">
										<div>Discount</div>
										<div className="flex gap-2 items-center">
											<div className="border-2 border-dashed rounded-sm px-4 py-1 border-green-700 cursor-pointer hover:bg-amazon-300 ">{coupons.couponCode}</div>
											<div className="text-red-400 cursor-pointer hover:text-red-600" onClick={ev => {
												var couponsX = { ...coupons }
												couponsX.applied = false;
												couponsX.couponCode = "";
												couponsX.discountAmount = 0;

												setCoupons(couponsX)

											}}>Remove</div>
										</div>

										<div className="flex gap-1 text-xs mt-3">


											{coupons.couponType == 'fixed' && (
												<span>You recived {coupons.amount}TK discount.</span>
											)}
											{coupons.couponType == 'percent' && (
												<span>You recived {coupons.amount}% discount.</span>
											)}


										</div>

									</div>
									<div className="font-bold text-red-500">-{wrapCurrency(coupons.discountAmount)}</div>
								</div>

							)}

							<div className="flex justify-between items-center px-4 py-4">
								<div className="flex flex-col gap-2">
									<div>Delivery</div>

									<select value={shippingMethod} name="" id="" onChange={ev => {
										var value = ev.target.value;
										setshippingMethod(value)

									}}>
										<option value="">Choose</option>
										<option value="free">Free</option>
										<option value="express">Express</option>
										<option value="normal">Normal</option>
									</select>
								</div>
								<div className="font-bold text-green-500">

									{shippingCost == 0 && (
										"Free!"
									)}
									{shippingCost > 0 && (
										<>
											+{wrapCurrency(shippingCost)}
										</>
									)}



								</div>
							</div>

							{/* {JSON.stringify(shippingMethod)} */}


							<div className="my-2 text-sm px-5">
								{shippingMethod == 'free' && (
									<div>You choose <strong>free</strong> delivery, Free delivery usual takes 2-5 business days.</div>
								)}
								{shippingMethod == 'express' && (
									<div>Thank you choosing <strong>express</strong> delivery, we promised to deliver within 2-3 hours.</div>
								)}
								{shippingMethod == 'normal' && (
									<div>You choose <strong>normal</strong> delivery, Normal delivery usual takes 1-3 business days.</div>
								)}


							</div>





							<div className="flex justify-between px-4 py-4 border-t-2 border-dashed border-t-gray-400 ">
								<div className="text-lg font-bold ">Total Amount to Pay</div>
								<div className="font-bold text-green-500">{wrapCurrency(cartTotalPay)}</div>
							</div>


							<div className="flex justify-end px-4 py-4">


								<div>
									<div className="  text-white bg-[#783009]  px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {

										if (cartItems?.length == 0) {
											addNotification({ type: 'error', title: 'Cart Empty', content: `Please add some items to cart.` })
											return;
										}

										setSteps(1)

										var trackPrams = { userid: userDataX?.id, event: "goToCheckout", source: "cart" }

										trackPageVisit(trackPrams);
										fbq.event("InitiateCheckout", { value: cartTotalPay, currency: "BDT" })


									}}>Go To Checkout</div>

								</div>

							</div>


						</>
					)}
					{steps == 1 && (
						<>
							<div className="flex justify-between items-center bg-[#783009] py-2 px-3 text-white">
								<div>Checkout</div>
								<div className="flex gap-2">

									<div className=" text-red-500 border-2 border-gray-200 px-3 py-1 cursor-pointer flex gap-1 items-center rounded-sm text-sm"
										onClick={ev => {
											setcartToggle(!cartToggle)

										}}
									><IconX width={18} />
										Close
									</div>


								</div>
							</div>

							<div className=" flex gap-2   px-3 py-2 rounded-sm cursor-pointer" onClick={ev => {
								setSteps(0)
							}}>
								<IconCornerUpLeftDouble />
								Back to Cart</div>

							<Checkout />

						</>
					)}
				</div>
			)}








		</div>
	);
};

export default Cart;
