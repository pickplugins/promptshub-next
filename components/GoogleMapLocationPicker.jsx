const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

import React, { useState, useCallback } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = apiKey; // Replace with your actual API key

// Autocomplete component
function PlaceAutocomplete({ onPlaceSelect }) {
  const map = useMap();
  const places = useMapsLibrary('places');
  const [sessionToken, setSessionToken] = useState();
  const [autocompleteService, setAutocompleteService] = useState();
  const [placesService, setPlacesService] = useState();
  const [predictionResults, setPredictionResults] = useState([]);
  const [inputValue, setInputValue] = useState('');

  React.useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setSessionToken(null);
  }, [places, map]);

  const fetchPredictions = useCallback(
    async (inputValue) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback((event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchPredictions(value);
  }, [fetchPredictions]);

  const handleSuggestionClick = useCallback(
    (placeId) => {
      if (!places || !placesService) return;

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken
      };

      placesService.getDetails(detailRequestOptions, (placeDetails) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address || '');
        setSessionToken(new places.AutocompleteSessionToken());
      });
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={onInputChange}
        placeholder="Search for a location..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {predictionResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {predictionResults.map((prediction) => (
            <div
              key={prediction.place_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(prediction.place_id)}
            >
              <div className="font-medium">{prediction.structured_formatting.main_text}</div>
              <div className="text-sm text-gray-600">{prediction.structured_formatting.secondary_text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main LocationPicker component
function LocationPickerMap({ onLocationChange, destination }) {

  const [selectedLocation, setSelectedLocation] = useState({
    lat: destination?.lat ?? 25.753623,
    lng: destination?.lng ?? 89.235516
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: destination?.lat ?? 25.753623,
    lng: destination?.lng ?? 89.235516
  });

  const updateLocation = useCallback((newPosition) => {
    setSelectedLocation(newPosition);
    setMarkerPosition(newPosition);
    if (onLocationChange) {
      onLocationChange(newPosition);
    }
  }, [onLocationChange]);

  const handleMapClick = useCallback((event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    const newPosition = { lat, lng };
    updateLocation(newPosition);
  }, [updateLocation]);

  const handlePlaceSelect = useCallback((place) => {
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newPosition = { lat, lng };
      updateLocation(newPosition);
    }
  }, [updateLocation]);

  const getCurrentLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newPosition = { lat, lng };
          updateLocation(newPosition);
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to get your current location. Please make sure location access is enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [updateLocation]);

  const handleMarkerDragEnd = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPosition = { lat, lng };
    updateLocation(newPosition);
  }, [updateLocation]);

  return (
    <div className="w-full max-w-4xl mx-auto ">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b flex gap-3 items-center">
          <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
          <div
            onClick={getCurrentLocation}
            className="rounded-sm cursor-pointer px-4 py-2 bg-[#783009] text-white flex gap-2 w-max"
          >
            Use Current Location
          </div>
        </div>

        <div className="h-96 relative overflow-hidden">
          <Map
            center={selectedLocation}
            zoom={13}
            onClick={handleMapClick}

            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
            options={{
              gestureHandling: 'greedy',
              scrollwheel: true,
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: true,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: true,
              clickableIcons: true,
              keyboardShortcuts: true,
              restriction: {
                latLngBounds: {
                  north: 85,
                  south: -85,
                  west: -180,
                  east: 180
                }
              }
            }}
            onLoad={(map) => {
              // Force enable scroll wheel zoom
              map.setOptions({
                scrollwheel: true,
                gestureHandling: 'greedy'
              });
              console.log('Map loaded with scroll wheel:', map.get('scrollwheel'));
            }}
          >
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          </Map>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="text-sm">
            <strong>Selected Location:</strong>
            <div>Latitude: {markerPosition.lat.toFixed(6)}</div>
            <div>Longitude: {markerPosition.lng.toFixed(6)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Root component with API Provider
export default function GoogleMapLocationPicker({ onLocationChange, destination }) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <LocationPickerMap destination={destination} onLocationChange={onLocationChange} />
    </APIProvider>
  );
}