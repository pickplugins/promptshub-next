import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

const AccordionMenu = ({ categories, root, navId }) => {




  return (
    <div id={navId} className="w-full max-w-md mx-auto">
      {categories.map((category) => (
        <AccordionItem key={category.slug} root={root} item={category} />
      ))}
    </div>
  );
};

const AccordionItem = ({ item, root }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children?.length > 0;

  return (
    <div className="">
      <div
        onClick={() => hasChildren && setOpen(!open)}
        className="bg-white flex justify-between text-gray-800 mb-2 rounded-sm cursor-pointer px-4 py-2 items-center gap-2"
      >
        <Link className="font-medium" href={`${root}${item?.slug}/`}>
          <span dangerouslySetInnerHTML={{ __html: item.name }} />
          {item.count > 0 && (
            <span dangerouslySetInnerHTML={{ __html: ` (${item.count})` }} />
          )}

        </Link>
        {hasChildren && (open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />)}
      </div>

      {/* Children */}
      {open && hasChildren && (
        <div key={item?.slug} className="pl-4 border-l-2 border-gray-500">
          {item.children.map((child, index) => (
            <AccordionItem key={index} root={root} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionMenu;
