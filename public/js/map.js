// // This file is used to initialize the map on the page

// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//     container: "map",
//     center: listing.geometry.coordinates,
//     zoom: 9,
// });


//  // Create a default Marker and add it to the map.
//   const marker1 = new mapboxgl.Marker({ color: 'red'})
//     .setLngLat(listing.geometry.coordinates)
//     .setPopup( 
//         new mapboxgl.Popup({ offset: 25 }) // add popups
//         .setHTML( `<h3>${listing.title}</h3> <p>Exact location will be provided after booking!</p>`) // sets a popup on marker
//     ) 
//     .addTo(map);



/* ========================================
   MODERN MAPBOX INTEGRATION - UPDATED MAP.JS
   ======================================== */

// Initialize map with access token
mapboxgl.accessToken = mapToken;

// Create map with modern configuration
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v12', // Modern street style
    center: listing.geometry.coordinates,
    zoom: 12,
    pitch: 0, // 3D tilt (0-60)
    bearing: 0, // Rotation
    antialias: true, // Smooth edges
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    touchZoomRotate: true,
    preserveDrawingBuffer: true,
    touchPitch: true
});

// Add navigation controls with modern styling
const nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
    visualizePitch: true
});
map.addControl(nav, 'top-right');

// Add fullscreen control
const fullscreen = new mapboxgl.FullscreenControl();
map.addControl(fullscreen, 'top-right');

// Add geolocate control (user location)
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
});
map.addControl(geolocate, 'top-right');

// ========== CUSTOM MARKER WITH MODERN STYLING ==========

// Create custom marker element
const markerElement = document.createElement('div');
markerElement.className = 'custom-marker';
markerElement.style.cssText = `
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #fe424d, #e63946);
    border: 4px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 20px rgba(254, 66, 77, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

// Add icon inside marker
const markerIcon = document.createElement('i');
markerIcon.className = 'fas fa-home';
markerIcon.style.cssText = `
    color: white;
    font-size: 20px;
    transform: rotate(45deg);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;
markerElement.appendChild(markerIcon);

// Add pulse effect
const pulseRing = document.createElement('div');
pulseRing.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 50% 0;
    border: 2px solid #fe424d;
    animation: pulse 2s ease-out infinite;
    pointer-events: none;
`;
markerElement.appendChild(pulseRing);

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(pulseStyle);

// Marker hover effects
markerElement.addEventListener('mouseenter', () => {
    markerElement.style.transform = 'rotate(-45deg) scale(1.2)';
    markerElement.style.boxShadow = '0 6px 30px rgba(254, 66, 77, 0.7)';
});

markerElement.addEventListener('mouseleave', () => {
    markerElement.style.transform = 'rotate(-45deg) scale(1)';
    markerElement.style.boxShadow = '0 4px 20px rgba(254, 66, 77, 0.5)';
});

// ========== MODERN POPUP STYLING ==========

// Create popup HTML with modern design
const popupHTML = `
    <div class="modern-map-popup">
        <div class="popup-header">
            <h4>${listing.title}</h4>
        </div>
        <div class="popup-content">
            <p><i class="fas fa-map-marker-alt"></i> Exact location provided after booking</p>
        </div>
        <div class="popup-footer">
            <a href="#" class="popup-view-btn">View Details →</a>
        </div>
    </div>
`;

// Add popup styles
const popupStyles = document.createElement('style');
popupStyles.textContent = `
    /* Modern Popup Container */
    .mapboxgl-popup-content {
        padding: 0;
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        min-width: 280px;
        max-width: 320px;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    .mapboxgl-popup-close-button {
        right: 12px;
        top: 12px;
        font-size: 22px;
        color: white;
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        backdrop-filter: blur(10px);
    }
    
    .mapboxgl-popup-close-button:hover {
        background: rgba(0, 0, 0, 0.4);
        transform: scale(1.1) rotate(90deg);
    }
    
    .mapboxgl-popup-tip {
        border-top-color: white;
    }
    
    /* Popup Header */
    .popup-header {
        background: linear-gradient(135deg, #fe424d, #e63946);
        color: white;
        padding: 1.25rem;
    }
    
    .popup-header h4 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 1.3;
    }
    
    /* Popup Content */
    .popup-content {
        padding: 1.25rem;
        background: white;
    }
    
    .popup-content p {
        margin: 0;
        color: #636e72;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        line-height: 1.5;
    }
    
    .popup-content i {
        color: #fe424d;
        font-size: 1rem;
    }
    
    /* Popup Footer */
    .popup-footer {
        padding: 1rem 1.25rem;
        background: #f8f9fa;
        border-top: 1px solid #e9ecef;
    }
    
    .popup-view-btn {
        color: #fe424d;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.95rem;
        display: inline-flex;
        align-items: center;
        transition: all 0.2s ease;
    }
    
    .popup-view-btn:hover {
        color: #e63946;
        transform: translateX(3px);
    }
    
    /* Popup Animation */
    @keyframes popupFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .mapboxgl-popup {
        animation: popupFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Custom Marker Styles */
    .custom-marker {
        cursor: pointer;
    }
`;
document.head.appendChild(popupStyles);

// ========== CREATE MARKER WITH POPUP ==========

const marker = new mapboxgl.Marker({
    element: markerElement,
    anchor: 'bottom',
    offset: [0, 0]
})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ 
            offset: 25,
            closeButton: true,
            closeOnClick: false,
            maxWidth: '320px',
            className: 'modern-popup'
        })
        .setHTML(popupHTML)
    )
    .addTo(map);

// Auto-open popup after a short delay
setTimeout(() => {
    marker.togglePopup();
}, 800);

// ========== ADD RADIUS CIRCLE AROUND LOCATION ==========

map.on('load', () => {
    // Add source for radius
    map.addSource('radius', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: listing.geometry.coordinates
            }
        }
    });
    
    // Add circle fill layer
    map.addLayer({
        id: 'radius-fill',
        type: 'circle',
        source: 'radius',
        paint: {
            'circle-radius': {
                stops: [
                    [0, 0],
                    [20, 50000]
                ],
                base: 2
            },
            'circle-color': '#fe424d',
            'circle-opacity': 0.15,
            'circle-blur': 0.5
        }
    });
    
    // Add circle border layer
    map.addLayer({
        id: 'radius-border',
        type: 'circle',
        source: 'radius',
        paint: {
            'circle-radius': {
                stops: [
                    [0, 0],
                    [20, 50000]
                ],
                base: 2
            },
            'circle-color': 'transparent',
            'circle-opacity': 1,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fe424d',
            'circle-stroke-opacity': 0.4
        }
    });
    
    // Animate circle pulsing effect
    let radius = 0;
    const animatePulse = () => {
        radius = (radius + 0.5) % 360;
        const opacity = 0.15 + (Math.sin(radius * Math.PI / 180) * 0.08);
        
        if (map.getLayer('radius-fill')) {
            map.setPaintProperty('radius-fill', 'circle-opacity', opacity);
        }
        
        requestAnimationFrame(animatePulse);
    };
    animatePulse();
});

// ========== SMOOTH ZOOM ANIMATION ==========

// Smooth zoom to marker on map load
map.on('load', () => {
    map.flyTo({
        center: listing.geometry.coordinates,
        zoom: 13,
        duration: 2000,
        essential: true,
        easing: (t) => t * (2 - t) // easeOutQuad
    });
});

// ========== MAP LOADING INDICATOR ==========

const mapLoadingStyle = document.createElement('style');
mapLoadingStyle.textContent = `
    #map {
        position: relative;
    }
    
    #map::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #fe424d;
        border-radius: 50%;
        animation: mapSpin 1s linear infinite;
        z-index: 10;
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    #map.loaded::before {
        opacity: 0;
        pointer-events: none;
    }
    
    @keyframes mapSpin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(mapLoadingStyle);

// Remove loading indicator when map loads
map.on('load', () => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.classList.add('loaded');
    }
});

// ========== RESPONSIVE MAP HANDLING ==========

// Resize map on window resize
window.addEventListener('resize', () => {
    map.resize();
});

// ========== OPTIONAL: ADD NEARBY POINTS OF INTEREST ==========

// Example POIs (uncomment and customize as needed)
/*
const nearbyPOIs = [
    { 
        name: 'Beach', 
        coordinates: [listing.geometry.coordinates[0] + 0.01, listing.geometry.coordinates[1] + 0.01], 
        icon: 'umbrella-beach',
        color: '#3b82f6'
    },
    { 
        name: 'Restaurant', 
        coordinates: [listing.geometry.coordinates[0] - 0.01, listing.geometry.coordinates[1] + 0.01], 
        icon: 'utensils',
        color: '#f59e0b'
    }
];

nearbyPOIs.forEach(poi => {
    const poiElement = document.createElement('div');
    poiElement.className = 'poi-marker';
    poiElement.innerHTML = `<i class="fas fa-${poi.icon}"></i>`;
    poiElement.style.cssText = `
        width: 40px;
        height: 40px;
        background: white;
        border: 2px solid ${poi.color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${poi.color};
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        transition: all 0.2s ease;
    `;
    
    poiElement.addEventListener('mouseenter', () => {
        poiElement.style.transform = 'scale(1.15)';
    });
    
    poiElement.addEventListener('mouseleave', () => {
        poiElement.style.transform = 'scale(1)';
    });
    
    new mapboxgl.Marker({ element: poiElement })
        .setLngLat(poi.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4 style="margin: 0; padding: 0.5rem; font-size: 1rem;">${poi.name}</h4>`)
        )
        .addTo(map);
});
*/

// ========== ERROR HANDLING ==========

map.on('error', (e) => {
    console.error('Map error:', e);
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #636e72; flex-direction: column; gap: 1rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #fe424d;"></i>
                <p style="margin: 0; font-size: 1rem; font-weight: 600;">Unable to load map</p>
                <p style="margin: 0; font-size: 0.9rem;">Please check your internet connection</p>
            </div>
        `;
    }
});

// ========== EXPORT FOR EXTERNAL USE ==========

window.propertyMap = map;
window.propertyMarker = marker;