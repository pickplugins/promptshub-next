import PropTypes from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import { IconLibraryPhoto, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconX } from "@tabler/icons-react";

const PopoverButton = (props) => {

	var onTriggerOpen = props?.onTriggerOpen;

	var title = props.title;
	var prams = props.prams;
	var buttonIcon = props.buttonIcon;
	var wrapperClass = props.wrapperClass;
	var children = props.children;
	var buttonLabel = props.buttonLabel ? props.buttonLabel : "";
	var buttonClass = props.buttonClass ? props.buttonClass : " rounded-sm cursor-pointer px-4 py-2 bg-[#783009] text-white";
	var position = props.position;
	var position = props.position;


	var popoverClass = props.popoverClass ? props.popoverClass : ` ${position ? "absolute" : "mx-auto w-[90%] md:w-2/4 fixed inset-x-0 top-10"}   z-20 border-2 border-solid border-indigo-600 rounded-sm `;

	const [isOpen, setIsOpen] = useState(props?.isOpen);

	var positionClass = "";

	if (position == 'topLeft') {
		var positionClass = "left-0 bottom-full";

	}
	if (position == 'topRight') {
		var positionClass = " bottom-full right-0";

	}
	if (position == 'bottomLeft') {
		var positionClass = " left-0 bottom-full";

	}
	if (position == 'bottomRight') {
		var positionClass = "right-0 bottom-full";

	}


	return <div className={`relative ${wrapperClass}`}>

		<div className={`${buttonClass} flex items-center gap-2 w-max`} onClick={ev => {

			setIsOpen(!isOpen)


			if (onTriggerOpen) {
				onTriggerOpen(isOpen, prams)
			}


		}}>
			{buttonIcon}
			{buttonLabel}</div>

		{isOpen && (
			<div className={` ${popoverClass} ${positionClass} `}>

				<div className="flex justify-between bg-[#783009] p-2">
					<div className="text-white">{title}</div>
					<div className=" bg-red-400 text-white px-1 py-1 rounded-sm cursor-pointer" onClick={ev => {

						if (onTriggerOpen) {
							onTriggerOpen(isOpen, prams)
						}
						setIsOpen(!isOpen)

					}}>
						<IconX />
					</div>
				</div>
				<div className="popover-content" >
					{children}
				</div>
			</div>

		)}

	</div>;
};



export default PopoverButton;
