
"use client";

import { IconChevronDown, IconChevronUp, IconSquare, IconFidgetSpinner, IconTrash, IconStarFilled, IconStar, IconClockPause, IconExclamationCircle, IconRosetteDiscountCheck, IconX } from "@tabler/icons-react";
import ToggleContent from "./ToggleContent";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const ToggleMenu = (props) => {
  const pathname = usePathname();

  // 



  var currentLocationArr = pathname?.split("/");
  currentLocationArr = currentLocationArr?.filter(item => item);
  var navs = props.navs;
  // var children = props.children;
  // var title = props.title;
  // var isOpenX = props.isOpen;
  // var labelIcon = props.labelIcon;
  // var iconPosition = props.iconPosition;

  var headerClass = props.headerClass ? props.headerClass : "";



  function buildNavTree(navs) {
    const map = {};
    const tree = [];

    // First, create a lookup map
    navs.forEach(item => {
      map[item.value] = { ...item, children: [] };
    });

    // Then, build the tree
    navs.forEach(item => {
      if (item.parent) {
        if (map[item.parent]) {
          map[item.parent].children.push(map[item.value]);
        }
      } else {
        tree.push(map[item.value]);
      }
    });

    return tree;
  }

  const navTree = buildNavTree(navs);



  return (
    <div className="flex flex-col flex-1">

      {navTree.map((nav, index) => {

        var children = nav?.children;



        if (children?.length == 0) {
          return (
            <Link
              key={nav.value}
              href={`/${nav.value}`}
              className={`${pathname == "/" + nav.value
                ? "bg-[#ffcbb3] text-white"
                : "bg-[#ffcbb3] text-white"
                } hover:bg-amazon-600 hover:text-white mb-2 rounded-sm   border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`}>
              <span className="">{nav.icon}</span>{" "}
              <span
              // className={`${navToggle ? "hidden" : "hidden md:block"}`}
              >
                {nav.label}
              </span>
            </Link>
          );
        }


        if (children?.length > 0) {


          const index = children.findIndex(item => item.value === currentLocationArr[0]);

          return (

            <div className="" key={nav.value}>

              <ToggleContent isOpen={(nav.value === children[index]?.parent) ? true : false} labelIcon={nav.icon} iconPosition={`right`} title={nav.label} headerClass={`bg-[#ffcbb3] text-white mb-2 rounded-sm   border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`} headerTitleClass={``} contentClass={` `}>

                <div className="ml-2 pl-2 border-l-2 border-gray-500">

                  {children.map((nav, index) => {
                    return (

                      <Link
                        key={nav.value}
                        href={`/${nav.value}`}
                        className={`${pathname == "/" + nav.value ? "bg-[#ffcbb3] text-white" : "bg-[#ffcbb3] text-white"
                          } hover:bg-amazon-600 hover:text-white mb-2 rounded-sm  text-gray-600 border-0  border-solid border-gray-300 cursor-pointer px-4 py-2 flex items-center gap-2`}>
                        <span className="">{nav.icon}</span>{" "}
                        <span
                        // className={`${navToggle ? "hidden" : "hidden md:block"}`}
                        >
                          {nav.label}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </ToggleContent>
            </div>

          );
        }








      })}


    </div>
  );
};

export default ToggleMenu;
