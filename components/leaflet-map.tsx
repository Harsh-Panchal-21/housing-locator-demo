'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Property } from '@/lib/mock-data'

interface LeafletMapProps {
  properties: Property[]
  selectedProperty: Property | null
  hoveredProperty: string | null
  center: [number, number]
  zoom: number
  onPropertySelect: (property: Property) => void
  onPropertyHover: (propertyId: string | null) => void
}

export function LeafletMap({
  properties,
  selectedProperty,
  hoveredProperty,
  center,
  zoom,
  onPropertySelect,
  onPropertyHover,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = L.map(containerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: false,
    })

    // Use a clean, light tile layer that matches our sky blue theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update center and zoom
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, zoom, {
        duration: 0.8,
      })
    }
  }, [center, zoom])

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    // Add new markers
    properties.forEach((property) => {
      const isSelected = selectedProperty?.id === property.id
      const isHovered = hoveredProperty === property.id
      
      // Determine marker color based on property status
      let markerColor = '#3b82f6' // Default blue
      if (property.status === 'available') {
        markerColor = '#22c55e' // Green for available
      } else if (property.waitlistOpen) {
        markerColor = '#0ea5e9' // Sky blue for waitlist
      }
      if (property.accessibilityFeatures.length > 0) {
        markerColor = '#6366f1' // Indigo for accessible
      }

      // Create custom icon
      const iconSize = isSelected ? 44 : isHovered ? 40 : 36
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: ${iconSize}px;
            height: ${iconSize}px;
            background: ${isSelected ? '#0c4a6e' : markerColor};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            cursor: pointer;
            transition: all 0.2s ease;
            transform: ${isSelected ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)'};
          ">
            <span style="
              color: white;
              font-size: ${isSelected ? '12px' : '10px'};
              font-weight: bold;
              text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            ">$${Math.round(property.rent / 100)}k</span>
          </div>
          ${isSelected ? `
            <div style="
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 10px solid #0c4a6e;
            "></div>
          ` : ''}
        `,
        iconSize: [iconSize, iconSize + (isSelected ? 10 : 0)],
        iconAnchor: [iconSize / 2, isSelected ? iconSize + 10 : iconSize / 2],
      })

      const marker = L.marker([property.lat, property.lng], { icon })
        .addTo(mapRef.current!)
        .on('click', () => onPropertySelect(property))
        .on('mouseover', () => onPropertyHover(property.id))
        .on('mouseout', () => onPropertyHover(null))

      // Add popup with property info
      marker.bindPopup(`
        <div style="min-width: 200px; padding: 8px;">
          <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #1e293b;">${property.title}</h3>
          <p style="color: #64748b; font-size: 12px; margin-bottom: 8px;">${property.address}, ${property.city}</p>
          <div style="display: flex; gap: 12px; font-size: 12px; color: #475569; margin-bottom: 8px;">
            <span>${property.bedrooms === 0 ? 'Studio' : property.bedrooms + ' bed'}</span>
            <span>${property.bathrooms} bath</span>
          </div>
          <div style="font-size: 18px; font-weight: bold; color: #0ea5e9;">$${property.rent}/mo</div>
        </div>
      `, {
        closeButton: false,
        className: 'custom-popup',
      })

      markersRef.current.set(property.id, marker)
    })
  }, [properties, selectedProperty, hoveredProperty, onPropertySelect, onPropertyHover])

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          border: 1px solid #e2e8f0;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: 1px solid #e2e8f0;
          border-top: none;
          border-left: none;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
      <div ref={containerRef} className="h-full w-full" />
    </>
  )
}
