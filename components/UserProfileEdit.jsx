"use client";

import { useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";
import { useCounterStore } from '../store/useCounterStore'
import { useAuthStore } from "/store/authStore";
import LocationPicker from "./LocationPicker";


const UserProfileEdit = ({ user }) => {
	const token = useAuthStore((state) => state.token);
	// const token = localStorage.getItem("token");


	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX, navToggle, setnavToggle } = useCounterStore()



	var [editUserData, seteditUserData] = useState(null);
	var [passwordData, setpasswordData] = useState({ currentPass: "", newPass1: "", newPass2: "", passMatched: false, passUpdate: false, loading: false });

	const [loading, setloading] = useState(false);




	function updateUserProfile() {
		setloading(true);

		// const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		var postData = {
			id: userDataX.id,
			userData: editUserData,

		};


		postData = JSON.stringify(postData);

		fetch(serverUrl + "wp-json/promptshub/v2/update_user_profile", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						addNotification({ type: 'success', title: 'Profile Updated', content: "Your information updated successful." })

						setTimeout(() => {
							setloading(false);
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}

	function getUserProfile() {

		//const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		setloading(true);


		var postData = {
			id: userDataX.id,

		};

		postData = JSON.stringify(postData);

		fetch(serverUrl + "wp-json/promptshub/v2/get_user_profile", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {


						seteditUserData({ ...res })



						setTimeout(() => {
							setloading(false);

						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}
	function updateUserPassword() {

		//const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}
		if (passwordData.newPass1 !== passwordData.newPass2) {
			setpasswordData({ ...passwordData, passMatched: false, errors: ("Password doesn't match."), passUpdate: false, });

			addNotification({ type: 'error', title: 'Password update failed', content: "Password doesn't match." })

			return;
		}


		setpasswordData({ ...passwordData, loading: true, });

		setloading(true);


		var postData = {
			id: userDataX.id,
			old_password: passwordData.currentPass,
			new_password: passwordData.newPass1,


		};

		postData = JSON.stringify(postData);

		fetch(serverUrl + "wp-json/promptshub/v2/update_user_password", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((res) => {



						var success = res?.success
						var errors = res?.errors


						if (errors?.length > 0) {
							setpasswordData({ ...passwordData, passUpdate: false, loading: false, });
							addNotification({ type: 'error', title: 'Update failed', content: errors })
						}
						if (success?.length > 0) {
							setpasswordData({ ...passwordData, passUpdate: true, loading: false, });
							addNotification({ type: 'success', title: 'Password updated', content: success })
						}








						setTimeout(() => {
							setloading(false);

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
		getUserProfile();
	}, []);





	return (
		<div className=" ">
			<div className="lg:w-[900px] mx-auto">
				<div className="flex flex-col gap-5">

					<div className=" flex items-center justify-end gap-2">

						{loading && (

							<div className="bg-[#783009] px-2 py-2 rounded-sm"><Spinner /></div>

						)}

						<div

							onClick={(ev) => {
								ev.preventDefault();

								updateUserProfile();
							}}
							className="p-2 inline hover:bg-[#783009] rounded-sm cursor-pointer px-4 bg-[#783009] text-white"
						>
							{("Update Profile")}

						</div>

					</div>



					<div className=" bg-[#ffcbb3] rounded-sm">
						<form action="" className="p-5">
							<h3 className="mb-5 text-2xl ">{("General Information")}</h3>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">



								<div className="">
									<label htmlFor="" className=" font-bold">
										{("Your Name")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.name}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, name: value });
										}}
									/>
								</div>
								{/* <div className="">
									<label htmlFor="" className=" font-bold">
										{("First Name")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.first_name}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, first_name: value });
										}}
									/>
								</div>

								<div className="">
									<label htmlFor="" className="font-bold text-lg">
										{("Last Name")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.last_name}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, last_name: value });
										}}
									/>
								</div> */}
								<div className="">
									<label htmlFor="" className="font-bold ">
										{("Email")}
									</label>
									<input
										type="text"
										disabled
										className=" px-2 py-1 rounded-sm w-full  "
										value={editUserData?.email}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, email: value });
										}}
									/>
								</div>

								<div className="">
									<label htmlFor="" className="font-bold ">
										{("Phone")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.phone}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, phone: value });
										}}
									/>
								</div>
							</div>

							<h3 className="my-5 text-2xl text-gray-600">Address</h3>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<div className="">
									<label htmlFor="" className="font-bold ">
										{("Address 1")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.address_1}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, address_1: value });
										}}
									/>
								</div>
								<div className="">
									<label htmlFor="" className="font-bold ">
										{("Address 2")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.address_2}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, address_2: value });
										}}
									/>
								</div>

								{/* <div className="">
									<label htmlFor="" className="font-bold ">
										{("Zip Code")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.zip_code}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, zip_code: value });
										}}
									/>
								</div> */}
								<div className="">
									<label htmlFor="" className="font-bold ">
										{("City")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.city}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, city: value });
										}}
									/>
								</div>
								{/* <div className="">
									<label htmlFor="" className="font-bold ">
										{("Country")}
									</label>
									<input
										type="text"
										className=" px-2 py-1 rounded-sm w-full "
										value={editUserData?.country}
										onChange={(ev) => {
											var value = ev.target.value;
											seteditUserData({ ...editUserData, country: value });
										}}
									/>
								</div> */}
							</div>


						</form>
					</div>



					{editUserData?.delivery_location && (
						<div className=" bg-[#ffcbb3]  rounded-sm p-5">

							<div className="flex-col 2xl:flex-row 2xl:flex gap-3 justify-between">
								<h3 className=" text-2xl ">{("Delivery Location")}</h3>

								<div className="flex justify-between items-center gap-4 pb-4">

									<div className="text-red-400 cursor-pointer" onClick={ev => {
										seteditUserData({ ...editUserData, delivery_location: null });

									}}>Reset</div>

									<div

										onClick={(ev) => {
											ev.preventDefault();

											updateUserProfile();
										}}
										className="p-2 inline hover:bg-[#783009] rounded-sm cursor-pointer px-4 bg-[#783009] text-white"
									>
										{("Update")}

									</div>


								</div>
							</div>
							<LocationPicker markerDraggable={true} latlng={editUserData?.delivery_location} onLocationSelect={(coords) => {

								seteditUserData({ ...editUserData, delivery_location: coords });



							}} />
						</div>
					)}
					{!editUserData?.delivery_location && (
						<div className=" bg-[#ffcbb3]  rounded-sm p-5">
							<h3 className="mb-5 text-2xl ">{("Delivery Location")}</h3>
							<p>You haven't set any delivery location.</p>

							<LocationPicker markerDraggable={true} onLocationSelect={(coords) => {

								seteditUserData({ ...editUserData, delivery_location: coords });



							}} />
						</div>
					)}




					<div className=" bg-[#ffcbb3]  rounded-sm p-5">
						<h3 className="mb-5 text-2xl ">{("Change Password")}</h3>




						<form className="grid grid-cols-1 gap-8">
							<div>
								<label htmlFor="" className="block  ">
									{("Current Password")}
								</label>
								<input
									type="password"
									className=" px-2 py-1 rounded-sm w-full "
									onChange={(ev) => {
										var value = ev.target.value;
										setpasswordData({ ...passwordData, currentPass: value });
									}}
								/>
							</div>
							<div>
								<label htmlFor="" className="block ">
									{("New Password")}
								</label>
								<input
									type="password"
									className=" px-2 py-1 rounded-sm w-full "
									onChange={(ev) => {
										var value = ev.target.value;
										setpasswordData({ ...passwordData, newPass1: value });
									}}
								/>
							</div>
							<div>
								<label htmlFor="" className="block ">
									{("Confirm Password")}
								</label>
								<input
									type="password"
									className=" px-2 py-1 rounded-sm w-full "
									onChange={(ev) => {
										var value = ev.target.value;




										if (passwordData.newPass1 == value) {
											setpasswordData({ ...passwordData, newPass2: value, passMatched: true });

										} else {
											setpasswordData({ ...passwordData, newPass2: value, passMatched: false, errors: ("Password doesn't match.") });

										}


									}}
								/>


							</div>





							<div className="flex items-center gap-2">

								<input
									disabled={!passwordData?.passMatched}
									type="submit"
									value={("Update")}
									className={`${!passwordData?.passMatched ? "opacity-30 !cursor-not-allowed" : ""}`}
									onClick={(ev) => {
										ev.preventDefault();

										updateUserPassword();
									}}
								/>
								{passwordData?.loading && (
									<Spinner />
								)}
							</div>



						</form>




					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfileEdit