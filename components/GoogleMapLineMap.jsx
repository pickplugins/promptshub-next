import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// GoogleMapLineMap.jsx
// A single-file React component that dynamically loads the Google Maps JS API
// and renders a map with a configurable polyline (line map). Uses Tailwind for minimal layout.

// Usage:
// <GoogleMapLineMap
//   apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//   path={[{lat: 23.7808875, lng: 90.2792371}, {lat:23.81, lng:90.41}]}
//   strokeColor="#FF0000"
//   strokeWeight={4}
//   fitBounds={true}
//   height="400px"
// />

export default function GoogleMapLineMap({
  path = [],
  initialCenter = null, // { lat, lng } or null to auto compute from path
  zoom = 12,
  strokeColor = '#3388ff',
  strokeOpacity = 1.0,
  strokeWeight = 3,
  editable = false,
  draggable = false,
  mapOptions = {},
  fitBounds = true,
  height = '300px',
  className = '',
}) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const polylineRef = useRef(null);
  const scriptId = 'google-maps-js-api';

  // Helper: load Google Maps JS API script once
  useEffect(() => {
    if (!apiKey) {
      console.error('GoogleMapLineMap: apiKey prop is required.');
      return;
    }

    const existing = document.getElementById(scriptId);
    if (window.google && window.google.maps) {
      // already loaded
      initMap();
      return;
    }

    if (existing) {
      // script is being loaded elsewhere; wait for it
      existing.addEventListener('load', initMap);
      return () => existing.removeEventListener('load', initMap);
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', initMap);
    script.addEventListener('error', (e) => console.error('Google Maps script failed to load', e));
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', initMap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // Initialize map and polyline
  function initMap() {
    if (!containerRef.current) return;

    if (!window.google || !window.google.maps) {
      console.error('Google Maps JS API not available.');
      return;
    }

    // map center logic
    const center = initialCenter
      ? initialCenter
      : path && path.length
        ? path[0]
        : { lat: 0, lng: 0 };

    const map = new window.google.maps.Map(containerRef.current, {
      center,
      zoom,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'auto',
      ...mapOptions,
    });

    mapRef.current = map;

    // create polyline
    const poly = new window.google.maps.Polyline({
      path: path || [],
      strokeColor,
      strokeOpacity,
      strokeWeight,
      editable,
      draggable,
      map,
    });

    polylineRef.current = poly;

    if (fitBounds && path && path.length) {
      fitMapToPath(map, path);
    }

    // keep polyline in sync if user edits (when editable=true)
    if (editable) {
      window.google.maps.event.addListener(poly.getPath(), 'set_at', () => {
        // we don't emit events by default; user can pass callbacks via mapOptions
      });
      window.google.maps.event.addListener(poly.getPath(), 'insert_at', () => { });
      window.google.maps.event.addListener(poly.getPath(), 'remove_at', () => { });
    }
  }

  // Fit map to bounds enclosing the path
  function fitMapToPath(map, path) {
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((p) => bounds.extend(p));
    map.fitBounds(bounds);
  }

  // Update polyline when props change
  useEffect(() => {
    const poly = polylineRef.current;
    const map = mapRef.current;
    if (!poly || !map) return;

    poly.setOptions({ strokeColor, strokeOpacity, strokeWeight, editable, draggable });
    poly.setPath(path || []);

    if (fitBounds && path && path.length) {
      fitMapToPath(map, path);
    } else if (initialCenter) {
      map.setCenter(initialCenter);
      map.setZoom(zoom);
    }
  }, [path, strokeColor, strokeOpacity, strokeWeight, editable, draggable, fitBounds, initialCenter, zoom]);

  // cleanup when unmount
  useEffect(() => {
    return () => {
      try {
        if (polylineRef.current) {
          polylineRef.current.setMap(null);
          polylineRef.current = null;
        }
        if (mapRef.current) {
          // remove maps listeners
          window.google && window.google.maps && window.google.maps.event.clearInstanceListeners(mapRef.current);
          mapRef.current = null;
        }
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        className={`rounded-2xl shadow-sm overflow-hidden border p-0 ${height ? '' : ''}`}
        style={{ width: '100%', height }}
      />
      {/* small helper: show controls / legend when map is not loaded */}
      {!window.google && (
        <div className="text-sm text-gray-500 mt-2">Loading Google Maps...</div>
      )}
    </div>
  );
}

GoogleMapLineMap.propTypes = {
  apiKey: PropTypes.string.isRequired,
  path: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  initialCenter: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  zoom: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  editable: PropTypes.bool,
  draggable: PropTypes.bool,
  mapOptions: PropTypes.object,
  fitBounds: PropTypes.bool,
  height: PropTypes.string,
  className: PropTypes.string,
};
