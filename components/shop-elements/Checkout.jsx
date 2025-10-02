'use client'
import { useState, useEffect, useContext, useRef } from "react";
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled, IconStarFilled, IconStar, IconTrash, IconBasketCheck, IconChevronUp, IconChevronDown, IconX, IconShoppingCartCancel, IconSquare, IconSquareCheck } from "@tabler/icons-react";
import Spinner from "/components/Spinner";

import ToggleContent from "../ToggleContent";
import LocationPicker from "../LocationPicker";
import { useCounterStore } from '/store/useCounterStore'
import { useUtilsStore } from "/store/useUtilsStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "/store/authStore";
import * as fbq from "/lib/fpixel";


const Checkout = (props) => {
	const router = useRouter();
	var token = useAuthStore((state) => state.token);

	// var cartItems = props?.cartItems
	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, cartToggle, setcartToggle, currencySymbole, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, currency, coupons, setCoupons, cartTotalPay, setcartTotalPay, cartTotal, setcartTotal, shippingCost, setshippingCost, } = useCounterStore()


	const { wrapCurrency } = useUtilsStore()



	const didFetch = useRef(false);


	const [checkoutData, setcheckoutData] = useState({
		cartItems: cartItems,
		"user_id": userDataX?.id,
		"status": "pending",
		"currency": currency,
		"total_amount": cartTotal,
		"subtotal_amount": cartTotalPay,
		"discount_amount": coupons?.discountAmount,
		"tax_amount": "",
		"shipping_amount": shippingCost,
		"payment_method": "COD",
		"payment_status": "pending",
		"transaction_id": "",
		"shipping_method": "",
		"subscription": { enable: false, interval: "month", interval_count: 1 },

		billing: { name: userDataX?.name, firstName: userDataX?.first_name, lastName: userDataX?.last_name, company: "", address1: userDataX?.address_1, address2: userDataX?.address_2, country: userDataX?.country, city: userDataX?.city, phone: userDataX?.phone, email: userDataX?.email },
		shipping: { name: "", firstName: "", lastName: "", company: "", address1: "", address2: "", country: "", city: "", phone: "", },
		"delivery_location": userDataX?.delivery_location,

	});



	const [loading, setloading] = useState(false);
	const [aamarPayData, setaamarPayData] = useState({ payment_url: "" });


	var paymentMethods = [
		{ label: "Cash on delivery", value: "COD", icon: "" },
		// { label: "aamarPay", value: "aamarpay", icon: "" }
	]


	useEffect(() => {

		//console.log(checkoutData?.payment_method);

		//initiateAmarPay();

	}, [checkoutData?.payment_method]);


	function initiateAmarPay() {

		var data = {
			"store_id": "aamarpaytest",
			"tran_id": "kido1231231773363",
			"success_url": "http://www.merchantdomain.com/suc esspage.html",
			"fail_url": "http://www.merchantdomain.com/faile dpage.html",
			"cancel_url": "http://www.merchantdomain.com/can cellpage.html",
			"amount": checkoutData?.billing?.address2,
			"currency": "BDT",
			"signature_key": "dbb74894e82415a2f7ff0ec3a97e4183",
			"desc": "KidoBazar Order Payment",
			"cus_name": `${checkoutData?.billing?.name}`,
			"cus_email": checkoutData?.billing?.email,
			"cus_add1": `${checkoutData?.billing?.address1}`,
			"cus_add2": `${checkoutData?.billing?.address2}`,
			"cus_city": checkoutData?.billing?.city,
			"cus_state": checkoutData?.billing?.city,
			"cus_postcode": "",
			"cus_country": checkoutData?.billing?.country,
			"cus_phone": checkoutData?.billing?.address2,
			"type": "json"
		}




		var postData = JSON.stringify(data);




		var url = "https://​sandbox​.aamarpay.com/jsonpost.php";


		var headers = {
			'Content-Type': 'application/json',
			// 'Authorization': `Bearer ${token}`
		}


		fetch(url, {
			method: "POST",
			headers: headers,
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						console.log(res);
						var result = res?.result;
						var payment_url = res?.payment_url;
						setaamarPayData({ ...aamarPayData, payment_url: payment_url })
						// 
						// var status = res?.status;
						// var message = res?.message;


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


	function submitOrder() {


		if (cartItems?.length == 0) {
			addNotification({ type: 'error', title: 'Cart items empty', content: "Please add some items first." })
			return;
		}
		if (checkoutData?.billing.phone?.length == 0) {
			addNotification({ type: 'error', title: 'Phone number empty', content: "Without a valid phone number we can't deliver your product on time." })
			return;
		}
		if (checkoutData?.billing.email?.length == 0) {
			addNotification({ type: 'error', title: 'Eamil is empty', content: "Without a valid email we can't sent order progress and update notifications." })
			return;
		}





		setloading(true);









		var postData = JSON.stringify(checkoutData);




		var url = serverUrl + "wp-json/promptshub/v2/create_order";


		var headers = {
			'Content-Type': 'application/json',
			// 'Authorization': `Bearer ${token}`
		}


		fetch(url, {
			method: "POST",
			headers: headers,
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						var order_id = res?.order_id;
						var order_hash = res?.order_hash;
						var status = res?.status;
						var message = res?.message;

						if (status == 'success') {
							addNotification({ type: 'success', title: 'Order Created', content: message })
							resetCartItems();
							setcartToggle(!cartToggle)

							router.push(`/thank-you/${order_hash}`);


						} else {
							addNotification({ type: 'error', title: 'Creating order failed', content: message })
						}

						setloading(false);
						fbq.event("Purchase", { value: cartTotalPay, currency: "BDT" })

						if (checkoutData?.subscription?.enable) {
							fbq.event("Subscribe", { value: cartTotalPay, currency: "BDT" })

						}

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





	return (
		<div className="overflow-y-auto">

			<div className="p-4 flex flex-col gap-3">



				<div className="flex justify-between items-center">

					<div className="text-lg">Billing details</div>

					{loading && (

						<div className="bg-[#783009] px-2 py-2 rounded-sm"><Spinner /></div>

					)}

				</div>



				<div className="grid grid-cols-1 gap-5">



					<div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Your Name *</label>
							<input type="text" value={checkoutData?.billing?.name} placeholder="" onChange={ev => {
								var value = ev.target.value;

								var billing = { ...checkoutData.billing, name: value }
								setcheckoutData({ ...checkoutData, billing: billing })

							}} />
						</div>
					</div>
					{/* <div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">First Name *</label>
							<input type="text" value={checkoutData?.billing?.firstName} placeholder="" onChange={ev => {
								var value = ev.target.value;

								var billing = { ...checkoutData.billing, firstName: value }
								setcheckoutData({ ...checkoutData, billing: billing })

							}} />
						</div>
					</div>



					<div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Last Name *</label>
							<input type="text" value={checkoutData?.billing.lastName} placeholder="" onChange={ev => {
								var value = ev.target.value;

								var billing = { ...checkoutData.billing, lastName: value }
								setcheckoutData({ ...checkoutData, billing: billing })


							}} />
						</div>
					</div> */}

				</div>

				{/* <div className="flex flex-col gap-2">
					<label htmlFor="">Company Name</label>
					<input type="text" value={checkoutData?.billing.company} placeholder="" onChange={ev => {
						var value = ev.target.value;

						var billing = { ...checkoutData.billing, company: value }
						setcheckoutData({ ...checkoutData, billing: billing })




					}} />
				</div> */}
				<div className="flex flex-col gap-2">
					<label htmlFor="">Address 1</label>
					<input type="text" value={checkoutData?.billing.address1} placeholder="House number and street name" onChange={ev => {
						var value = ev.target.value;

						var billing = { ...checkoutData.billing, address1: value }
						setcheckoutData({ ...checkoutData, billing: billing })




					}} />
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="">Address 2</label>
					<input type="text" value={checkoutData?.billing.address2} placeholder="Apartment, suite, unit, etc. (optional)" onChange={ev => {
						var value = ev.target.value;

						var billing = { ...checkoutData.billing, address2: value }
						setcheckoutData({ ...checkoutData, billing: billing })



					}} />
				</div>



				<div className="grid grid-cols-1 gap-5">
					{/* <div className="flex flex-col gap-2">
						<label htmlFor="">Country</label>
						<input type="text" value={checkoutData?.billing.country} placeholder="" onChange={ev => {
							var value = ev.target.value;

							var billing = { ...checkoutData.billing, country: value }
							setcheckoutData({ ...checkoutData, billing: billing })




						}} />
					</div> */}
					<div className="flex flex-col gap-2">
						<label htmlFor="">City</label>
						<input type="text" value={checkoutData?.billing.city} placeholder="" onChange={ev => {
							var value = ev.target.value;

							var billing = { ...checkoutData.billing, city: value }
							setcheckoutData({ ...checkoutData, billing: billing })



						}} />
					</div>


				</div>
				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<label htmlFor="">Phone</label>
						<input type="text" value={checkoutData?.billing.phone} placeholder="" onChange={ev => {
							var value = ev.target.value;

							var billing = { ...checkoutData.billing, phone: value }
							setcheckoutData({ ...checkoutData, billing: billing })

						}} />
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="">Email</label>
						<input type="text" value={checkoutData?.billing.email} placeholder="" onChange={ev => {
							var value = ev.target.value;

							var billing = { ...checkoutData.billing, email: value }
							setcheckoutData({ ...checkoutData, billing: billing })

						}} />
					</div>


				</div>



			</div>

			{userDataX?.delivery_location && (
				<div className="p-4 flex flex-col gap-4">
					<div className="text-lg">Delivery Location</div>
					<LocationPicker markerDraggable={true} latlng={userDataX?.delivery_location}

						onLocationSelect={(coords) => {

							setcheckoutData({ ...checkoutData, delivery_location: coords })



						}}

					/>
				</div>
			)}

			{!userDataX?.delivery_location && (
				<div className="p-4 flex flex-col gap-4">
					<div className="text-lg">Delivery Location</div>

					<LocationPicker markerDraggable={true}
						onLocationSelect={(coords) => {

							setcheckoutData({ ...checkoutData, delivery_location: coords })



						}}
					/>
				</div>
			)}




			<div className="px-4">
				<ToggleContent isOpen={false} labelIcon={``} iconPosition={`right`} title={"Ship to a different address?"} headerClass={`hover:bg-amazon-600  mb-2 rounded-sm   border-2 border-gray-400 bg-[#ffcbb3]  cursor-pointer px-4 py-2 flex items-center gap-2`} headerTitleClass={``} contentClass={`bg-white`}>
					<div className="p-4 flex flex-col gap-3">

						<div className="text-lg">Shipping details</div>

						<div className="grid grid-cols-1 gap-5">



							<div>
								<div className="flex flex-col gap-2">
									<label htmlFor="">Name *</label>
									<input type="text" value={checkoutData?.shipping.name} placeholder="" onChange={ev => {
										var value = ev.target.value;

										var billing = { ...checkoutData.billing, name: value }
										setcheckoutData({ ...checkoutData, billing: billing })



									}} />
								</div>
							</div>
							{/* <div>
								<div className="flex flex-col gap-2">
									<label htmlFor="">First Name *</label>
									<input type="text" value={checkoutData?.shipping.firstName} placeholder="" onChange={ev => {
										var value = ev.target.value;

										var billing = { ...checkoutData.billing, firstName: value }
										setcheckoutData({ ...checkoutData, billing: billing })



									}} />
								</div>
							</div>
							<div>
								<div className="flex flex-col gap-2">
									<label htmlFor="">Last Name *</label>
									<input type="text" value={checkoutData?.shipping.lastName} placeholder="" onChange={ev => {
										var value = ev.target.value;

										var billing = { ...checkoutData.billing, lastName: value }
										setcheckoutData({ ...checkoutData, billing: billing })





									}} />
								</div>
							</div> */}

						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="">Address 1</label>
							<input type="text" value={checkoutData?.shipping.address1} placeholder="House number and street name" onChange={ev => {
								var value = ev.target.value;

								var billing = { ...checkoutData.billing, address1: value }
								setcheckoutData({ ...checkoutData, billing: billing })





							}} />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="">Address 2</label>
							<input type="text" value={checkoutData?.shipping.address2} placeholder="Apartment, suite, unit, etc. (optional)" onChange={ev => {
								var value = ev.target.value;

								var billing = { ...checkoutData.billing, address2: value }
								setcheckoutData({ ...checkoutData, billing: billing })




							}} />
						</div>



						<div className="grid grid-cols-1 gap-5">
							{/* <div className="flex flex-col gap-2">
								<label htmlFor="">Country</label>
								<input type="text" value={checkoutData?.shipping.country} placeholder="" onChange={ev => {
									var value = ev.target.value;

									var billing = { ...checkoutData.billing, country: value }
									setcheckoutData({ ...checkoutData, billing: billing })




								}} />
							</div> */}
							<div className="flex flex-col gap-2">
								<label htmlFor="">City</label>
								<input type="text" value={checkoutData?.shipping.city} placeholder="" onChange={ev => {
									var value = ev.target.value;

									var billing = { ...checkoutData.billing, city: value }
									setcheckoutData({ ...checkoutData, billing: billing })



								}} />
							</div>


						</div>
						<div className="grid grid-cols-1 gap-5">
							<div className="flex flex-col gap-2">
								<label htmlFor="">Phone</label>
								<input type="text" value={checkoutData?.shipping.phone} placeholder="" onChange={ev => {
									var value = ev.target.value;

									var billing = { ...checkoutData.billing, phone: value }
									setcheckoutData({ ...checkoutData, billing: billing })


								}} />
							</div>


						</div>



					</div>
				</ToggleContent>
			</div>

			<div className="p-4 flex flex-col gap-4">

				<div className="flex cursor-pointer text-lg gap-3" >
					<div>
						{checkoutData.subscription.enable && (
							<IconSquareCheck />
						)}
						{!checkoutData.subscription.enable && (
							<IconSquare />
						)}
					</div>
					<div onClick={ev => {

						var subscription = { ...checkoutData.subscription }
						subscription.enable = !subscription.enable
						setcheckoutData({ ...checkoutData, subscription: subscription })
					}}>Enable Subscription?</div>

				</div>

				{checkoutData.subscription.enable && (

					<div className="flex flex-col gap-3">

						<div className="flex flex-col gap-2">
							<label htmlFor="">Interval</label>
							<select value={checkoutData?.subscription.interval} placeholder="" onChange={ev => {
								var value = ev.target.value;

								var subscription = { ...checkoutData.subscription }
								subscription.interval = value
								setcheckoutData({ ...checkoutData, subscription: subscription })

							}} >
								<option value={'day'}>Day</option>
								<option value={'week'}>Week</option>
								<option value={'month'}>Month</option>
								<option value={'year'}>Year</option>
							</select>

						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="">Count</label>
							<input type="number" value={checkoutData?.subscription.interval_count} placeholder="" onChange={ev => {
								var value = ev.target.value;

								var subscription = { ...checkoutData.subscription }
								subscription.interval_count = value
								setcheckoutData({ ...checkoutData, subscription: subscription })



							}} />
						</div>


						<div className="bg-[#ffcbb3] p-2 rounded-sm">
							Your items will be shipped every <strong>{checkoutData?.subscription.interval_count} {checkoutData?.subscription.interval}</strong> from the date of your order. Enjoy the flexibility to cancel your subscription anytime—no questions asked!
						</div>

					</div>
				)}

			</div>

			<div className="p-4 flex flex-col gap-4">
				<div className="text-lg">Payment Methods				</div>

				<div className="flex flex-col gap-2">
					{paymentMethods.map(method => {

						return (
							<div key={method?.value} className="flex cursor-pointer gap-3" onClick={ev => {
								setcheckoutData({ ...checkoutData, payment_method: method.value })
							}}>
								<div>
									{checkoutData.payment_method == method.value && (
										<IconSquareCheck />
									)}
									{checkoutData.payment_method != method.value && (
										<IconSquare />
									)}


								</div>
								<div>{method.label}</div>

							</div>
						)

					})}
				</div>

				{checkoutData.payment_method == "aamarpay" && (
					<div>

						{JSON.stringify(aamarPayData)}


						Please wait</div>
				)}
				{checkoutData.payment_method == "COD" && (
					<div className="flex flex-col gap-3">
						<div className="font-bold italaic">
							Thank you choosing cash on delivery, our team will call you to confirm order.
						</div>
						<div className="bg-blue-800 justify-center flex gap-3 cursor-pointer py-3 px-4 text-center rounded-sm text-white" onClick={ev => {
							submitOrder()
						}}>

							<div>Submit Order ({wrapCurrency(cartTotalPay)})</div>

							{loading && (
								<Spinner />
							)}
						</div>
					</div>
				)}









			</div>







		</div>
	);
};

export default Checkout;
