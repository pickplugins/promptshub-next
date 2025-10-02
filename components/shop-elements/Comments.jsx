"use client";
import { useState, useEffect, useContext } from "react";

import CommentsList from "./CommentsList";
import CommentsForm from "./CommentsForm";
import { useCounterStore } from '/store/useCounterStore'
import { useAuthStore } from "/store/authStore";

const Comments = (props) => {
	const token = useAuthStore((state) => state.token);

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var postData = props?.postData
	var id = props?.id
	var dummyComments = props?.dummyComments




	const [loading, setloading] = useState(false);
	const [comments, setcomments] = useState([]);

	function fetchComments() {



		// if (!token) {
		// 	throw new Error("No token found");
		// }

		var queryPrams = { post_id: id, paged: 1, order: "ASC", per_page: 20, }


		if (queryPrams.paged < 0) {
			return;
		}

		var postData = JSON.stringify(queryPrams);
		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_comments", {
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

						var comments = res?.comments;

						setcomments(comments)
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


	useEffect(() => {

		fetchComments();
	}, []);








	function fetchComments() {



		// if (!token) {
		// 	throw new Error("No token found");
		// }

		var queryPrams = { post_id: id, paged: 1, order: "ASC", per_page: 20, }


		if (queryPrams.paged < 0) {
			return;
		}


		var postData = JSON.stringify(queryPrams);
		setloading(true);

		fetch(serverUrl + "wp-json/promptshub/v2/get_comments", {
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

						// 


						var comments = res?.comments;
						setcomments(comments)
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


	useEffect(() => {

		fetchComments();
	}, []);

	function onCommentSubmitted(comment) {


		var commentsX = [...comments];
		commentsX.push(comment)
		setcomments(commentsX)

	}


	return (


		<div className="grid grid-cols-1 lg:grid-cols-2 gap-10   rounded-sm">

			<div className="rounded-sm overflow-hidden">
				<div className="text-2xl mb-5 ">{("Comments")}({comments?.length})</div>

				<CommentsList comments={comments} id={id} commentSubmitted={onCommentSubmitted} addNotification={addNotification} userDataX={userDataX} setUserDataX={setUserDataX} />

				{comments?.length == 0 && (

					<div className="text-sm">No Comments Yet. Write First Comment.</div>
				)}

			</div>
			<div className="rounded-sm overflow-hidden">
				<div className="text-2xl mb-5 ">{("Submit Comment")}</div>

				<CommentsForm postData={postData} dummyComments={dummyComments} id={id} commentSubmitted={onCommentSubmitted} addNotification={addNotification} userDataX={userDataX} setUserDataX={setUserDataX} />
			</div>
		</div>

	);
};

export default Comments;
