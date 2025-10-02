"use client";
import { useState, useEffect, useContext } from "react";

import { IconArrowNarrowRightDashed, IconArrowNarrowLeftDashed, IconMessage2, IconMessages, IconX, IconBookmark, IconTrolley, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconEyeSearch, IconExclamationCircle } from "@tabler/icons-react";
import StarRating from "./StarRating";
import { useCounterStore } from '/store/useCounterStore'
import { useAuthStore } from "/store/authStore";
import PopoverButton from "/components/PopoverButton";

const CommentsForm = (props) => {
	const token = useAuthStore((state) => state.token);

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var postData = props?.postData
	var id = props?.id
	var dummyComments = props?.dummyComments
	var parentId = props?.parentId
	var commentSubmitted = props?.commentSubmitted

	const [comment, setcomment] = useState({ content: "", postId: id, parentId: parentId, rate: null });
	var [errors, seterrors] = useState([]);
	var [loading, setloading] = useState(false);

	var [submission, setsubmission] = useState({ id: null, success: false });



	function getRandomComments(arr, count = 10) {
		const shuffled = arr?.sort(() => 0.5 - Math.random());
		return shuffled?.slice(0, count);
	}

	// Usage
	const randomCommentsLimited = getRandomComments(dummyComments, 4);
	const randomComments = getRandomComments(dummyComments, 99);


	function submit_comment() {





		if (!token) {
			addNotification({ type: 'error', title: 'Login Required', content: "Please Login to submit comment." })

			seterrors(["Please login first. "])

			throw new Error("No token found");
		}




		if (comment.content?.length == 0) {
			seterrors(["Comment Should not empty"])
			throw new Error("Comment Should not empty");

			return;
		}



		var bodyData = JSON.stringify(comment);




		setloading(true);
		fetch(
			serverUrl + "wp-json/promptshub/v2/submit_comment",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: bodyData,
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Token validation failed");
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {
						var errors = res?.errors;
						var success = res?.success;
						var commentData = res?.comment;
						var message = res?.message;






						if (errors) {
							seterrors(errors)


							addNotification({ type: 'error', title: 'There is an error.', content: message })
							setloading(false);
							return;
						}
						if (success) {
							seterrors([])
							commentSubmitted(commentData)

							setsubmission({ ...submission, success: true })
							setcomment({ ...comment, content: "", rate: null });

							addNotification({ type: 'success', title: 'Thank you for your comment', content: "Your feedback is percious to us, Keep up good works." })

							var total_credit = parseInt(userDataX.total_credit) + 5
							setUserDataX({ ...userDataX, total_credit: total_credit });



						}




						setloading(false);

					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});
	}

	function onChangeCommentRate(rate) {

		setcomment({ ...comment, rate: rate });

	}



	return (
		<div className="">

			<div className="flex flex-col gap-5">

				{postData?.purchased && (
					<div className="flex flex-col gap-3">
						<label htmlFor="" className="block ">
							{("Rate")}
						</label>
						<StarRating rate={comment.rate} onChange={onChangeCommentRate} />
					</div>
				)}


				<div className="flex flex-col gap-3">
					<label htmlFor="" className="block ">
						{("Write Comment")}
					</label>
					<textarea
						className="!shadow-none h-40 bg-[#ffcbb3]  !border-2 border-[#783009] px-2 py-1 rounded-sm w-full "
						value={comment?.content}
						onChange={(ev) => {
							var value = ev.target.value;
							setcomment({ ...comment, content: value });
						}}
					/>
				</div>

				<div className="flex flex-wrap gap-2 items-center text-xs">

					{/* {JSON.stringify(randomComments)} */}
					<PopoverButton buttonLabel={("More Comments")} buttonClass={`border rounded-full border-[#783009] px-2 py-1 cursor-pointer hover:bg-[#ffcbb3]`} buttonIcon={<IconMessages size={16} />} title={"More Comments"} position={""}>

						<div className="bg-[#ffcbb3] p-5 flex flex-wrap gap-2">
							{randomComments?.map((item, index) => {

								return (
									<div key={index} className="border flex gap-2 rounded-full border-[#783009] px-2 py-1 cursor-pointer hover:bg-[#ffcbb3]" onClick={ev => {

										setcomment({ ...comment, content: item });

									}}>
										<IconMessage2 size={16} />
										{item}</div>
								)

							})}

						</div>

					</PopoverButton>

					{randomCommentsLimited?.map((item, index) => {

						return (
							<div key={index} className="border flex gap-2 rounded-full border-[#783009] px-2 py-1 cursor-pointer hover:bg-[#ffcbb3]" onClick={ev => {

								setcomment({ ...comment, content: item });

							}}>
								<IconMessage2 size={16} />
								{item}</div>
						)

					})}






				</div>

				<div className="p-2 text-center  rounded-sm cursor-pointer px-4 bg-[#783009] text-white"
					onClick={ev => {
						submit_comment()
					}}

				>




					{!loading && (
						<>{("Submit")}</>
					)}
					{loading && (
						<> {("Please wait.")}</>
					)}


				</div>

				{errors?.length > 0 && (
					<div className="text-red-400 text-sm">
						{errors?.map((item, index) => {

							return (
								<div key={index} className="flex items-center gap-2"> <IconExclamationCircle /> {item}</div>
							)
						})}
					</div>
				)}



			</div>

		</div>
	);
};

export default CommentsForm;
