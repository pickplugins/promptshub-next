"use client"

import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const ToggleContent = (props) => {

  var children = props.children;
  var title = props.title;
  var isOpenX = props.isOpen;
  var labelIcon = props.labelIcon;
  var iconPosition = props.iconPosition;

  var headerClass = props.headerClass ? props.headerClass : "w-full flex justify-between items-center p-3 bg-[#ffcbb3] rounded-sm  hover:bg-[#783009] cursor-pointer text-white";
  var headerTitleClass = props.headerTitleClass ? props.headerTitleClass : "w-full flex items-center";
  var wrapperClass = props.wrapperClass ? props.wrapperClass : "w-full mb-1";
  var contentClass = props.contentClass ? props.contentClass : "p-3 bg-[#783009]";

  const [isOpen, setIsOpen] = useState(isOpenX);

  return (
    <div className={wrapperClass}>
      <div
        className={headerClass}
        onClick={(ev) => {

          ev.stopPropagation();
          ev.preventDefault();
          setIsOpen(!isOpen)
        }}
      >
        <div className={headerTitleClass}>
          {iconPosition == 'left' && (
            <div className="w-8">
              {isOpen && <IconChevronDown />}
              {!isOpen && <IconChevronUp />}
            </div>
          )}



          <div className="flex-1 flex gap-2">
            <div>{labelIcon}</div>
            <div>{title}</div>
          </div>

          {iconPosition == 'right' && (
            <div className="w-8">
              {isOpen && <IconChevronDown />}
              {!isOpen && <IconChevronUp />}
            </div>
          )}

        </div>
      </div>
      {isOpen && <div className={contentClass}>{children}</div>}
    </div>
  );
};

export default ToggleContent;
