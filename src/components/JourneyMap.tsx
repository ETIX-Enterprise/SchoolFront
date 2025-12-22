// JourneyMap.tsx
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Journey } from "./app";
import {  PinIcon } from "lucide-react";
import Lottie from "lottie-react";
import data from "../assets/lottie/bus.json"
import location from "/Icona/location.png"

interface Props {
  journeys: Journey[];
  selectedJourney?: Journey | null;
  onSelect: (journey: Journey) => void;
}

export function JourneyMap({ journeys, selectedJourney, onSelect }: Props) {
  // create one FeatureCollection for performance (all routes)
const routesFeature = {
  type: "FeatureCollection" as const,
  features: (selectedJourney ? [selectedJourney] : journeys).map((j) => ({
    type: "Feature" as const,
    properties: { id: j.id },
    geometry: {
      type: "LineString" as const,
      coordinates: [j.fromCoords, j.destinationCoords],
    },
  })),
};


  return (
    <div className="w-full h-full">
      <Map
        initialViewState={{
          longitude: 30.0619,
          latitude: -1.9441,
          zoom: 8.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
      >
        {/* Single source with many routes */}
        <Source type="geojson" data={routesFeature}>
<Layer
  id="routes-line"
  type="line"
  paint={{
    "line-color": "#2563EB",
    "line-width": selectedJourney ? 5 : 2,
    "line-opacity": 0.9,
  }}
/>
        </Source>

        {/* Markers: bus at "from" and destination pin at "destination" */}
        {journeys.map((j) => (
          <div key={j.id}>
            {/* Bus marker */}
<Marker
  longitude={(j.currentCoords ?? j.fromCoords)[0]}
  latitude={(j.currentCoords ?? j.fromCoords)[1]}
  anchor="center"
  onClick={(ev) => {
    ev.originalEvent.stopPropagation();
    onSelect(j);
  }}
>

              <div className={`cursor-pointer relative transform ${selectedJourney?.id === j.id ? "scale-125" : ""}`}>
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping" />
                <Lottie  animationData={data} className={`w-[40px] h-[40px]`}  loop={true} />
              </div>
            </Marker>

            {/* Destination pin */}
            <Marker
              longitude={j.destinationCoords[0]}
              latitude={j.destinationCoords[1]}
              anchor="bottom"
              onClick={(ev) => {
                ev.originalEvent.stopPropagation();
                onSelect(j);
              }}
            >
              <div className={`cursor-pointer drop-shadow-lg ${selectedJourney?.id === j.id ? "scale-110" : ""}`}>
                <img src={location} className={`w-7 h-7 `} alt="" />
              </div>
            </Marker>
          </div>
        ))}
      </Map>
    </div>
  );
}
