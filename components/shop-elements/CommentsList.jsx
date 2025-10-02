"use client"
import { useState, useEffect, useContext } from "react";
import CommentsForm from "./CommentsForm";
import { IconStar, IconStarFilled, IconCopy, IconBrandOpenai, IconX, IconBookmark, IconHeart, IconHeartFilled, IconChevronDown, IconChevronUp, IconDownload, IconThumbUp, IconThumbDown, IconTags, IconLink, IconEyeSearch, IconHeartPlus, IconTrash, IconStackPop } from "@tabler/icons-react";
import Image from "next/image";

const CommentsList = (props) => {

	var comments = props?.comments
	var id = props?.id
	var commentSubmitted = props?.commentSubmitted
	var addNotification = props?.addNotification
	var userDataX = props?.userDataX
	var setUserDataX = props?.setUserDataX

	const [replyTo, setreplyTo] = useState({ index: null });






	const CommentTemplate = ({ comment, index, id, commentSubmitted }) => {


		var comment_parent = comment?.comment_parent;

		var stars = [
			{ label: "Very Poor", value: 1 },
			{ label: "Poor", value: 2 },
			{ label: "Normal", value: 3 },
			{ label: "Good", value: 4 },
			{ label: "Supper", value: 5 },
		]


		return (
			<div className={`${comment_parent > 0 ? "ml-7" : ""}  bg-[#ffcbb3] rounded-sm p-3 `}>

				<div className="flex gap-4 flex-col  ">

					<div className="flex justify-between items-center">

						<div className="w-max flex gap-2 items-center ">
							<div className="w-[40px] h-[40px] rounded-full overflow-hidden">
								<Image className="w-full h-full object-cover" src={comment?.avatar} alt={comment?.comment_author} width={200} height={200} /></div>
							<div className="text-sm w-max ">{comment?.comment_author}</div>
						</div>
						<div>
							{comment.rate > 0 && (
								<div>
									<div className="flex gap-1 items-center" >

										<div>Rate: </div>

										{stars.map((item, index) => {

											return (

												<div
													title={item?.label} className=" text-amber-400" key={index}>


													{comment.rate <= index && (
														<><IconStar width={18} /></>
													)}
													{comment.rate > index && (
														<><IconStarFilled width={18} /></>
													)}



												</div>
											)

										})}




									</div>
								</div>

							)}
						</div>
					</div>




					<div className=" w-full text-sm ">
						{comment?.comment_content}
					</div>

					<div className="flex justify-end gap-2 text-sm w-full">

						<div className="cursor-pointer" onClick={ev => {

							setreplyTo({ ...replyTo, index: index })

						}}>Reply</div>

						{replyTo.index == index && (
							<div className="cursor-pointer text-red-400" onClick={ev => {

								setreplyTo({ ...replyTo, index: null })

							}}>Cancel</div>
						)}


					</div>

					{replyTo.index == index && (

						<div className="w-full">
							<CommentsForm id={id} parentId={comment.comment_ID} commentSubmitted={commentSubmitted} addNotification={addNotification} userDataX={userDataX} setUserDataX={setUserDataX} />
						</div>
					)}


				</div>

			</div>
		);
	};



	return (
		<div className="">


			<div className="flex flex-col gap-5 max-h-[600px] overflow-auto">
				{comments?.map((comment, index) => {

					return (
						<CommentTemplate key={index} comment={comment} id={id} commentSubmitted={commentSubmitted} index={index} />

					)

				})}
			</div>


		</div>
	);
};

export default CommentsList;
