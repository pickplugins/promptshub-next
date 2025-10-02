"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "400px",
	borderRadius: "12px",
};

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapId = process.env.NEXT_PUBLIC_MAP_ID;

export default function LocationPicker({ onLocationSelect, latlng, markerDraggable, enableSearch = true }) {
	var defaultCenter = {
		lat: latlng?.lat ?? 0,
		lng: latlng?.lng ?? 0,
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: apiKey,
		libraries: ["places"],
		mapIds: [mapId],
	});

	const [selected, setSelected] = useState(defaultCenter);
	const [autocomplete, setAutocomplete] = useState(null);
	const mapRef = useRef(null);

	// ✅ Ask for user location
	useEffect(() => {
		if (navigator.geolocation && onLocationSelect) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const newLocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					setSelected(newLocation);


					onLocationSelect(newLocation);




					if (mapRef.current) {
						mapRef.current.panTo(newLocation);
					}
				},
				(error) => {

				}
			);
		}
	}, []);

	const handleClick = useCallback((event) => {
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
		const newLocation = { lat, lng };

		setSelected(newLocation);
		onLocationSelect(newLocation);
	}, []);

	const handleDragEnd = useCallback((event) => {
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
		const newLocation = { lat, lng };

		setSelected(newLocation);
		onLocationSelect(newLocation);
	}, []);

	const onLoadAutoComplete = (ac) => {
		setAutocomplete(ac);
	};

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const place = autocomplete.getPlace();
			if (place.geometry && place.geometry.location) {
				const lat = place.geometry.location.lat();
				const lng = place.geometry.location.lng();
				const newLocation = { lat, lng };

				setSelected(newLocation);
				onLocationSelect(newLocation);

				if (mapRef.current) {
					mapRef.current.panTo(newLocation);
				}
			}
		}
	};

	return isLoaded ? (
		<div>

			{enableSearch && (
				<div className="mb-2">
					<Autocomplete onLoad={onLoadAutoComplete} onPlaceChanged={onPlaceChanged}>
						<input
							type="text"
							placeholder="Search a place"
							className="w-full p-2 rounded border border-gray-300"
						/>
					</Autocomplete>
				</div>
			)}


			<GoogleMap
				mapContainerStyle={containerStyle}
				center={selected.lat ? selected : defaultCenter}
				zoom={12}
				mapId={mapId}
				onClick={handleClick}
				onLoad={(map) => (mapRef.current = map)}
			>
				{selected.lat && (
					<Marker
						position={selected}
						draggable={markerDraggable ? true : false}
						onDragEnd={handleDragEnd}
					/>
				)}
			</GoogleMap>

			<div className="mt-4 bg-gray-100 rounded-xl shadow">
				<p className="text-sm">📍 Selected Location:</p>
				<p className="text-lg font-semibold">
					{selected.lat.toFixed(6)}, {selected.lng.toFixed(6)}
				</p>
			</div>
		</div>
	) : (
		<p>Loading map...</p>
	);
}
