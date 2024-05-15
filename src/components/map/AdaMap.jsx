"use client";

import { MapContainer, Marker, TileLayer, Tooltip, Popup, LayersControl, LayerGroup, Circle, FeatureGroup, Rectangle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useState } from "react"
import L from "leaflet"

export default function AdaMap() {
  const [selectedFloor, setSelectedFloor] = useState("PRIMERA PLANTA");
  const [selectedSpace, setSelectedSpace] = useState(null);

  /*Replace with actual data
  const spaces = [
    { id: "Laboratorio 1.02", type: "Laboratorio", details: "Some details..." },
  ];

  const selectSpace = (space) => {
    setSelectedSpace(space);
  };

  var map = L.map("mapid", {
    center: [41.68351342770779, -0.8886556704770172],
    zoom: 19,
    maxZoom: 20,
    maxNativeZoom: 19,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 21,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var planta0 = L.tileLayer.wms(
    "http://localhost:8080/geoserver/proyecto/wms",
    {
      layers: "proyecto:espacios_eina_planta0",
      format: "image/png",
      transparent: true,
    }
  );

  var planta1 = L.tileLayer.wms(
    "http://localhost:8080/geoserver/proyecto/wms",
    {
      layers: "proyecto:espacios_eina_planta1",
      format: "image/png",
      transparent: true,
    }
  );

  var planta2 = L.tileLayer.wms(
    "http://localhost:8080/geoserver/proyecto/wms",
    {
      layers: "proyecto:espacios_eina_planta2",
      format: "image/png",
      transparent: true,
    }
  );

  var planta3 = L.tileLayer.wms(
    "http://localhost:8080/geoserver/proyecto/wms",
    {
      layers: "proyecto:espacios_eina_planta3",
      format: "image/png",
      transparent: true,
    }
  );

  var planta4 = L.tileLayer.wms(
    "http://localhost:8080/geoserver/proyecto/wms",
    {
      layers: "proyecto:espacios_eina_planta4",
      format: "image/png",
      transparent: true,
    }
  );

  var basePlantas = {
    "Planta 0": planta0,
    "Planta 1": planta1,
    "Planta 2": planta2,
    "Planta 3": planta3,
    "Planta 4": planta4,
  };

  L.control.layers(basePlantas).addTo(map);*/

  return (
    <div>
      <MapContainer center={[41.68351342770779, -0.8886556704770172]} zoom={20} scrollWheelZoom={false}
        style={{ height: "88vh", width: "100%" }}>
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={[41.68351342770779, -0.8886556704770172]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle
                center={[41.68351342770779, -0.8886556704770172]}
                pathOptions={{ fillColor: 'blue' }}
                radius={200}
              />
              <Circle
                center={[41.68351342770779, -0.8886556704770172]}
                pathOptions={{ fillColor: 'red' }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[41.68351342770779, -0.8886556704770172]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[41.68351342770779, -0.8886556704770172]} radius={200} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
