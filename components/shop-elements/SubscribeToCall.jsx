"use client"
import { useState, useEffect } from "react";
import { IconPhoneIncoming, IconRosetteDiscountCheck, IconX, IconStar, IconIdBadge2 } from "@tabler/icons-react";
import { useCounterStore } from '/store/useCounterStore'
import Spinner from "/components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SubscribeToCall = (props) => {

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, cartToggle, setcartToggle, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle, lang, coupons, setCoupons, cartTotalPay, setcartTotalPay, cartTotal, setcartTotal, shippingCost, setshippingCost } = useCounterStore()

	var productData = props?.productData

	var id = productData?.id

	const [isOpen, setIsOpen] = useState(false);
	const [loading, setloading] = useState(false);
	const [subscribed, setsubscribed] = useState(false);
	const [subscribeTo, setsubscribeTo] = useState({ user_id: userDataX?.id, subscribe_to: "product", product_id: id, start_date: new Date(), next_date: "", interval: "weekly", interval_count: 1, phone: userDataX?.phone, user_name: userDataX?.name, status: "active" }); // interval: weekly, monthly, 



	useEffect(() => {

		setsubscribeTo({ ...subscribeTo, user_id: userDataX?.id })

	}, [userDataX?.id]);
	useEffect(() => {

		var next = "";
		var interval_count = subscribeTo?.interval_count


		if (subscribeTo?.interval == "day") {
			next = addDays(subscribeTo?.start_date, 1 * interval_count);
		}
		if (subscribeTo?.interval == "week") {
			next = addDays(subscribeTo?.start_date, 7 * interval_count);
		}
		if (subscribeTo?.interval == "month") {
			next = addDays(subscribeTo?.start_date, 30 * interval_count);
		}
		if (subscribeTo?.interval == "year") {
			next = addDays(subscribeTo?.start_date, 365 * interval_count);
		}



		setsubscribeTo({ ...subscribeTo, next_date: next })

	}, [subscribeTo?.interval]);




	function subscribeToCall() {




		if (!userDataX?.id) {
			addNotification({ type: 'error', title: 'Login required', content: `Please login to manage sucribe to call.` })

			return;

		}

		setloading(true);
		var postData = JSON.stringify(subscribeTo);

		var url = serverUrl + "wp-json/promptshub/v2/create_subscribe_to_call";


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

						var id = res?.id;
						var status = res?.status;
						var message = res?.message;




						if (status == 'success') {
							addNotification({ type: 'success', title: 'Subscribe Successful', content: message })
							//resetCartItems();
							//setcartToggle(!cartToggle)

							//router.push(`/orders/${id}`);


						}
						else if (status == 'exist') {
							addNotification({ type: 'success', title: 'Subscribe exist', content: message })
							//resetCartItems();
							//setcartToggle(!cartToggle)

							//router.push(`/orders/${id}`);


						}


						else {
							addNotification({ type: 'error', title: 'Subscribe failed', content: message })
						}

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
	function check_subscribe_to_call() {



		if (subscribeTo.user_id == null) {
			addNotification({ type: 'error', title: 'Login required', content: `Please login to manage sucribe to call.` })

			return;

		}

		setloading(true);
		var postData = JSON.stringify(subscribeTo);

		var url = serverUrl + "wp-json/promptshub/v2/check_subscribe_to_call";


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

						var subscribedX = res?.subscribed;
						setsubscribed(subscsubscribedXribed)
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


	function addDays(date, days) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);

		// Format to YYYY-MM-DD
		const year = result.getFullYear();
		const month = String(result.getMonth() + 1).padStart(2, "0");
		const day = String(result.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}






	return (
		<div className={`flex gap-2 items-center relative`}>



			<div onClick={ev => {

				setIsOpen(!isOpen);

			}} className="bg-[#783009] hover:bg-[#783009] cursor-pointer text-white px-4 py-[10px] rounded-sm flex gap-3">

				<IconPhoneIncoming />



				{subscribed && (
					"Subscribed"
				)}
				{!subscribed && (
					"Subscribe To Call"
				)}

			</div>

			{isOpen && (

				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:h-auto h-[450px] overflow-y-auto z-40 shadow-sm rounded-sm bg-white  w-[90%] md:w-[700px]  ">



					<div className="bg-[#ffcbb3] p-3 flex  justify-between">

						<div>Subscribe To Call</div>
						<div className="cursor-pointer" onClick={ev => {

							setIsOpen(!isOpen);

						}}>

							<IconX />
						</div>

					</div>

					<div className="flex-wrap lg:flex-nowrap flex justify-between  p-4 gap-5">
						<div className="flex flex-col gap-4 w-[300px] lg:order-1 order-2">

							<div className="flex flex-col gap-2">
								<label htmlFor="">Interval</label>
								<select type="radio" value={subscribeTo?.interval} placeholder="" onChange={ev => {
									var value = ev.target.value;
									setsubscribeTo({ ...subscribeTo, interval: value })
								}} >
									<option value="">Choose</option>
									<option value={'day'}>Day</option>
									<option value={'week'}>Week</option>
									<option value={'month'}>Month</option>
									<option value={'year'}>Year</option>

								</select>
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="">Interval Count</label>
								<input type="number" className="!w-full" name={`interval_count`} value={subscribeTo?.interval_count} placeholder="" onChange={ev => {
									var value = ev.target.value;
									setsubscribeTo({ ...subscribeTo, interval_count: value })




								}} />
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="">Start Date</label>

								<div>
									<DatePicker className="!w-full" showTimeSelect selected={subscribeTo?.start_date} onChange={(date) => {
										setsubscribeTo({ ...subscribeTo, start_date: date })

									}} />
								</div>


							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="">Name</label>
								<input type="text" placeholder={""} value={subscribeTo?.name} onChange={ev => {
									var value = ev.target.value;
									setsubscribeTo({ ...subscribeTo, name: value })
								}} />
							</div>


							<div className="flex flex-col gap-2">
								<label htmlFor="">Phone Number</label>
								<input type="text" placeholder={"0173703...."} value={subscribeTo?.phone} onChange={ev => {
									var value = ev.target.value;
									setsubscribeTo({ ...subscribeTo, phone: value })
								}} />
							</div>




							<div className="flex flex-col gap-2">

								<div onClick={ev => {
									subscribeToCall()
								}} className="bg-[#ffcbb3] px-3 justify-center flex gap-3 items-centergap-2 py-2  rounded-sm cursor-pointer">



									<div>
										Submit
									</div>
									{loading && (
										<div>
											<Spinner />
										</div>
									)}
								</div>
							</div>








						</div>
						<div className="lg:order-2 order-1">

							<div className="">

								<div className="text-lg mb-4">How it works?</div>

								<ul className=" flex flex-col gap-2">

									<li className="flex gap-2" ><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>Our team will call you at the right time.</li>
									<li className="flex gap-2"><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>Simply confirm your order, and we’ll deliver it on time.</li>
									<li className="flex gap-2"><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>No advance payment needed.</li>
									<li className="flex gap-2"><div className="w-6"><IconRosetteDiscountCheck size={25} /></div>Just pay cash on delivery and enjoy your time hassle-free.</li>

								</ul>

								<div className="my-5">

									{subscribeTo?.interval == "day" && (
										<div>
											You choose <strong>daily</strong>, you will received call next <strong>{addDays(subscribeTo?.start_date, 1)}</strong>
										</div>
									)}
									{subscribeTo?.interval == "week" && (
										<div>
											You choose <strong>weekly</strong>, you will received call next <strong>{addDays(subscribeTo?.start_date, 7)}</strong>
										</div>
									)}

									{subscribeTo?.interval == "month" && (
										<div>
											You choose <strong>monthly</strong>, you will received call next <strong>{addDays(subscribeTo?.start_date, 30)}</strong>
										</div>
									)}


									{subscribeTo?.interval == "year" && (
										<div>
											You choose <strong>{subscribeTo?.interval}</strong>, you will received call next <strong>{addDays(subscribeTo?.start_date, 365)}</strong>
										</div>
									)}




								</div>

							</div>





						</div>
					</div>



				</div>

			)}



		</div>
	);
};

export default SubscribeToCall;
