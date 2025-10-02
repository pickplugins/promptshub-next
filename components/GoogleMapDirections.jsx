import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
	APIProvider,
	Map,
	useMap,
	useMapsLibrary,
	AdvancedMarker,
	InfoWindow,
	Pin,
} from "@vis.gl/react-google-maps";

function Directions({ origin, destination, waypoints = [] }) {
	const map = useMap();
	const routesLibrary = useMapsLibrary("routes");

	const [directionsService, setDirectionsService] = useState();
	const [directionsRenderer, setDirectionsRenderer] = useState();
	const [routes, setRoutes] = useState([]);
	const [routeIndex, setRouteIndex] = useState(0);

	const selected = routes[routeIndex];
	const leg = selected?.legs[0];

	// Memoize waypoints to prevent dependency array changes
	const memoizedWaypoints = useMemo(() => waypoints, [JSON.stringify(waypoints)]);
	const memoizedOrigin = useMemo(() => origin, [JSON.stringify(origin)]);
	const memoizedDestination = useMemo(() => destination, [JSON.stringify(destination)]);

	// Initialize DirectionsService and Renderer
	useEffect(() => {
		if (!routesLibrary || !map) return;

		setDirectionsService(new routesLibrary.DirectionsService());
		const renderer = new routesLibrary.DirectionsRenderer({
			draggable: false, // Set to false to avoid conflicts
			suppressMarkers: true,
			polylineOptions: {
				strokeColor: "#4285F4",
				strokeWeight: 5,
				strokeOpacity: 0.8,
				geodesic: true
			}
		});

		renderer.setMap(map);
		setDirectionsRenderer(renderer);

		return () => {
			if (renderer) {
				renderer.setMap(null);
			}
		};
	}, [routesLibrary, map]);

	// Request directions
	useEffect(() => {
		if (!directionsService || !directionsRenderer || !memoizedOrigin || !memoizedDestination) return;

		const requestDirections = async () => {
			try {
				const request = {
					origin: memoizedOrigin,
					destination: memoizedDestination,
					waypoints: memoizedWaypoints.map((point) => ({
						location: point,
						stopover: true,
					})),
					optimizeWaypoints: false,
					travelMode: google.maps.TravelMode.DRIVING,
					provideRouteAlternatives: true,
				};

				const response = await directionsService.route(request);

				if (response.status === "OK" && response.routes.length > 0) {
					directionsRenderer.setDirections(response);
					setRoutes(response.routes);
					setRouteIndex(0); // Reset to first route

					// Fit bounds with padding
					const bounds = new google.maps.LatLngBounds();

					// Extend bounds with all points from the route
					const route = response.routes[0];
					if (route.overview_path && route.overview_path.length > 0) {
						route.overview_path.forEach((point) => {
							bounds.extend(point);
						});
					}

					// Also include waypoints to ensure they're visible
					bounds.extend(memoizedOrigin);
					bounds.extend(memoizedDestination);
					memoizedWaypoints.forEach((wp) => bounds.extend(wp));

					// Fit bounds with padding
					setTimeout(() => {
						map.fitBounds(bounds, { padding: 100 });
					}, 100);
				} else {
					console.error("Directions request failed:", response.status);
				}
			} catch (error) {
				console.error("Error requesting directions:", error);
			}
		};

		requestDirections();
	}, [directionsService, directionsRenderer, memoizedOrigin, memoizedDestination, memoizedWaypoints, map]);

	// Handle route index changes
	useEffect(() => {
		if (!directionsRenderer || routes.length === 0) return;
		directionsRenderer.setRouteIndex(routeIndex);
	}, [routeIndex, directionsRenderer, routes.length]);

	if (!leg) return null;

	return (
		<div className="directions" style={{ padding: '10px', backgroundColor: 'white', borderRadius: '8px', margin: '10px' }}>
			<h2 style={{ margin: '0 0 10px 0' }}>{selected.summary}</h2>
			<p>
				{leg.start_address.split(",")[0]} → {leg.end_address.split(",")[0]}
			</p>
			<p>Distance: {leg.distance?.text}</p>
			<p>Duration: {leg.duration?.text}</p>

			{routes.length > 1 && (
				<>
					<h3>Other Routes</h3>
					<div>
						{routes.map((route, index) => (
							<div className="flex flex-col gap-2 cursor-pointer p-2"
								key={index}
								onClick={() => setRouteIndex(index)}
								style={{
									backgroundColor: index === routeIndex ? '#4285F4' : '#f0f0f0',
									color: index === routeIndex ? 'white' : 'black',

								}}
							>
								{route.summary} ({route.legs[0]?.duration?.text})
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default function GoogleMapDirections(props) {
	// State for managing which InfoWindow is open
	const [selectedMarker, setSelectedMarker] = useState(null);
	var originX = props?.origin
	var destinationX = props?.destination
	var waypointsX = props?.waypoints

	console.log(props);


	var waypointsZ = [];

	waypointsX.map((item, index) => {

		waypointsZ.push({
			id: `waypoint${index}`,
			position: item,
			title: `Waypoint ${index}`,
			content: {
				name: '',
				address: '',
				description: '',
				type: 'waypoint'
			}
		})

	})


	// return;

	// Memoize the coordinates to prevent recreating objects on each render
	const origin = useMemo(() => (originX), []);
	const destination = useMemo(() => (destinationX), []);
	const waypoints = useMemo(() => waypointsZ, []);

	// Define marker data with details for InfoWindows

	// var waypointsX = {};



	console.log("waypoints", waypoints);





	const markers = useMemo(() => [
		{
			id: 'origin',
			position: origin,
			title: 'Start Point',
			content: {
				name: 'Starting Location',
				address: '',
				description: 'Your journey begins here',
				type: 'origin'
			}
		},
		{
			id: 'destination',
			position: destination,
			title: 'End Point',
			content: {
				name: 'Destination',
				address: '',
				description: 'Your final destination',
				type: 'destination'
			}
		},
		...waypoints
		// {
		// 	id: 'waypoint1',
		// 	position: waypoints[0],
		// 	title: 'Waypoint 1',
		// 	content: {
		// 		name: 'First Stop',
		// 		address: 'Toronto, ON',
		// 		description: 'First waypoint on your route',
		// 		type: 'waypoint'
		// 	}
		// },
		// {
		// 	id: 'waypoint2',
		// 	position: waypoints[1],
		// 	title: 'Waypoint 2',
		// 	content: {
		// 		name: 'Second Stop',
		// 		address: 'Toronto, ON',
		// 		description: 'Second waypoint on your route',
		// 		type: 'waypoint'
		// 	}
		// }
	], [origin, destination, waypoints]);

	console.log("markers", markers);




	const handleMarkerClick = (markerId) => {
		setSelectedMarker(selectedMarker === markerId ? null : markerId);
	};

	const getMarkerColor = (type) => {
		switch (type) {
			case 'origin': return '#4CAF50'; // Green
			case 'destination': return '#F44336'; // Red
			case 'waypoint': return '#FF9800'; // Orange
			default: return '#2196F3'; // Blue
		}
	};

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
			<div style={{ height: "600px", width: "100%", position: 'relative' }}>
				<Map
					defaultZoom={12}
					defaultCenter={origin}
					gestureHandling="greedy"
					disableDefaultUI={false}
					onClick={() => setSelectedMarker(null)} // Close InfoWindow when clicking on map
					mapId={process.env.NEXT_PUBLIC_MAP_ID} // Required for AdvancedMarker
				>


					{markers.map((marker) => (
						<React.Fragment key={marker.id}>
							<AdvancedMarker
								position={marker.position}
								title={marker.title}
								onClick={() => handleMarkerClick(marker.id)}
							>
								<Pin
									background={getMarkerColor(marker.content.type)}
									borderColor="white"
									glyphColor="white"
									scale={1.2}
								>
									{marker.content.type === 'origin' && '🚀'}
									{marker.content.type === 'destination' && '🏁'}
									{marker.content.type === 'waypoint' && '📍'}
								</Pin>
							</AdvancedMarker>

							{selectedMarker === marker.id && (
								<InfoWindow
									position={marker.position}
									onCloseClick={() => setSelectedMarker(null)}
									maxWidth={250}
								>
									<div style={{
										padding: '12px',
										maxWidth: '220px',
										fontFamily: 'Arial, sans-serif'
									}}>
										<h3 style={{
											margin: '0 0 10px 0',
											fontSize: '18px',
											color: getMarkerColor(marker.content.type),
											display: 'flex',
											alignItems: 'center',
											gap: '8px'
										}}>
											<span style={{ fontSize: '20px' }}>
												{marker.content.type === 'origin' && '🚀'}
												{marker.content.type === 'destination' && '🏁'}
												{marker.content.type === 'waypoint' && '📍'}
											</span>
											{marker.content.name}
										</h3>
										<div style={{
											padding: '8px',
											backgroundColor: '#f8f9fa',
											borderRadius: '6px',
											border: `2px solid ${getMarkerColor(marker.content.type)}20`
										}}>
											<p style={{ margin: '4px 0', fontSize: '14px', color: '#333' }}>
												<strong>📍 Address:</strong> {marker.content.address}
											</p>
											<p style={{ margin: '8px 0 4px 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
												{marker.content.description}
											</p>
										</div>
										<div style={{
											marginTop: '10px',
											padding: '6px 12px',
											backgroundColor: getMarkerColor(marker.content.type),
											color: 'white',
											borderRadius: '20px',
											fontSize: '11px',
											textAlign: 'center',
											textTransform: 'uppercase',
											fontWeight: 'bold',
											letterSpacing: '0.5px'
										}}>
											{marker.content.type}
										</div>
									</div>
								</InfoWindow>
							)}
						</React.Fragment>
					))}
				</Map>
			</div>

			<Directions
				origin={origin}
				destination={destination}
				waypoints={waypoints}
			/>
		</APIProvider>
	);
}