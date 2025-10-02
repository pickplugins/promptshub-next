'use client'
import React, { useContext, useState } from "react";
import Spinner from "/components/Spinner";
import { useCounterStore } from '/store/useCounterStore'

const EmailSubscribe = () => {


	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()



	const [loading, setloading] = useState(false);
	const [errors, seterrors] = useState(false);
	const [messages, setmessages] = useState([]);
	var [formData, setformData] = useState({ name: "", email: "" });


	const handleFormSubmit = async () => {
		setloading(true);


		var postData = JSON.stringify(formData);


		fetch(serverUrl + "wp-json/promptshub/v2/email_subscribe", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {



						var messagesX = res?.messages;
						var errors = res?.errors;
						var messagesX = res?.messages;
						seterrors(errors)
						setmessages(messagesX)
						// var result = JSON.parse(res)



						setloading(false);


					});
				}
			})
			.catch((err) => {
				//this.saveAsStatus = 'error';
				// handle the error

			});













	};






	const handleError = () => {

	};




	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div className="grid grid-cols-1 gap-5 ">
					<div>
						<label htmlFor="" className="block">
							{("Name")}
						</label>
						<input
							className="p-3 py-[5px] border-2 !border-[#ffcbb3]  rounded-sm  w-full"
							type="text"
							name="name"
							value={formData.name}
							placeholder="Write Name"
							onChange={ev => {
								setformData({ ...formData, name: ev.target.value })
							}}
							required
						/>
					</div>
					<div>
						<label htmlFor="" className="block">
							{("Email")}
						</label>
						<input
							className="p-3 py-[5px] border-2 !border-[#ffcbb3]  rounded-sm  w-full"
							type="email"
							name="email"
							placeholder="Write Email"
							onChange={ev => {
								setformData({ ...formData, email: ev.target.value })
							}} required
						/>
					</div>


					<div className="mt-3">
						<button
							className="p-3 py-[5px]  !text-white bg-[#783009]   cursor-pointer  rounded-sm  w-full flex gap-2 items-center justify-center"
							type="submit" onClick={ev => {
								ev.preventDefault();
								ev.stopPropagation();
								handleFormSubmit()
							}}>
							{("Subscribe")} {loading && <Spinner />}
						</button>
					</div>
				</div>
			</form>

			<div className="my-5">

				{Object.entries(messages)?.length > 0 && (

					<div className="">
						{Object.entries(messages).map(message => {

							return (
								<div >{message[1]}</div>
							)

						})}
					</div>

				)}
			</div>


		</div>
	);
};

export default EmailSubscribe;
