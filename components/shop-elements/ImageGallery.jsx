"use client"
import { useState } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from "next/image";
const ImageGallery = ({ images }) => {

	return (
		<div className="">
			<Splide aria-label="My Favorite Images">

				{images.map((item, index) => {


					return (<SplideSlide key={index}>
						<Image className="w-full h-auto" src={item.src} alt="" width={500} height={500} />
					</SplideSlide>)
				})}

			</Splide>






		</div>
	);
};

export default ImageGallery;
