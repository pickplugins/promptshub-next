import { Children, useContext } from "react";
import { IconMenu } from "@tabler/icons-react";
import {
	IconBasketCheck,
	IconBrandCitymapper,
	IconCards,
	IconCloudDataConnection,
	IconDashboard,
	IconList,
	IconRotateRectangle,
	IconX,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarRightCollapse, IconAlien,
	IconBuildingStore,
	IconHome,
	IconUserPin,
	IconTruckDelivery,
	IconRosetteDiscount,
	IconBrandCodesandbox,
	IconPencilCode,
	IconHeartPlus,
	IconUserCircle,
	IconMailStar,
} from "@tabler/icons-react";
import EmailSubscribe from "../components/EmailSubscribe";
import Link from "next/link";
import Image from "next/image";

const GlobalFooter = () => {
	// var [notifications, setnotifications] = useState([]);








	return (
		<div className="bg-[#783009] w-full text-white  px-5 xl:px-10">

			<div className="flex flex-col xl:flex-row gap-14 w-full xl:w-[1200px] mx-auto justify-between py-20">

				<div className="flex flex-col gap-3">
					<div className="text-left  text-xl font-bold cursor-pointer"  >Terms & Policy</div>
					<Link className="text-left   font-base cursor-pointer" href={`/terms/`} >Terms</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/privacy/`} >Privacy Policy</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/refund/`} >Refund Policy</Link>

				</div>
				<div className="flex flex-col gap-3">
					<div className="text-left  text-xl font-bold cursor-pointer"  >Tools</div>

					<Link className="text-left   font-base cursor-pointer" href={`/ai-image-generator/`} >AI Image Generator</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-text-generator/`} >AI Text Generator</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-audio-generator/`} >AI Audio/Voice Generator</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-pdf-generator/`} >AI PDF Generator</Link>

				</div>
				<div className="flex flex-col gap-3">
					<div className="text-left  text-xl font-bold cursor-pointer"  >AI Image Tools</div>

					<Link className="text-left   font-base cursor-pointer" href={`/ai-sticker-generator/`} >AI Sticker Generator</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-tshirt-designer/`} >AI Tshirt Designer</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-cartoon-character-generator/`} >AI Cartoon Generator</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-background-remover/`} >AI Background Remover</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/ai-old-photo-restoration/`} >AI Old Photo Restoration</Link>


				</div>




				<div className="flex flex-col gap-3">
					<div className="text-left  text-xl font-bold cursor-pointer"  >Company</div>

					<Link className="text-left   font-base cursor-pointer" href={`/about/`} >About Us</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/newsletter/`} >Newsletter</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/podcast/`} >Podcast</Link>
					<Link className="text-left   font-base cursor-pointer" href={`/tickets-submit/`} >Create Support Ticket</Link>

				</div>

				<div className="w-full xl:w-[300px]">
					<div className="text-left  text-xl font-bold cursor-pointer mb-5"  >Subscribe to News </div>

					<EmailSubscribe />
				</div>

			</div>

		</div>
	);
};

export default GlobalFooter;
