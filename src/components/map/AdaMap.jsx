import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function AdaMap() {
  const { BaseLayer, Overlay } = LayersControl;
  const [activeLayer, setActiveLayer] = useState("Planta 0");
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const mapRef = useRef(null);

  const handleLayerChange = (layerName) => {
    if (activeLayer === layerName) return;
    setActiveLayer(layerName);
    setGeoJsonData(null);
  };

  useEffect(() => {

    if (activeLayer) {
      fetchGeoData(activeLayer);
    }
  }, [activeLayer]);

  const fetchGeoData = (layerName) => {
    const layerIndex = layerName.split(' ')[1];
    const url = `http://localhost:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:espacios_eina_planta${layerIndex}&outputFormat=application/json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setGeoJsonData(data);
        //console.log(`GeoData for ${layerName}:`, data);
      })
      .catch(error => {
        console.error(`Error fetching GeoData for ${layerName}:`, error);
      });
  };

  /*const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        console.log('Feature properties:', feature.properties);
        setSelectedFeature(feature.properties.idEspacio);
      }
    });
  };*/

  const createPopupContent = (properties) => {
    return `<h1>Nombre: ${properties.Nombre}</h1>
            <p>Id espacio: ${properties.idEspacio}</p>
            <p>Edificio: ${properties.EDIFICIO}</p>
            <p>Categoría: ${properties.tipoEspacioDefecto}</p>
            <p>Tamaño: ${properties.tamano} m²</p>`;
  };

  const onEachFeature = (feature, layer) => {
    const map = useMap();
    // Vincular un popup al layer y abrirlo en el click
    layer.on({
      click: () => {
        console.log('Feature properties:', feature.properties);
        setSelectedFeature(feature.properties.idEspacio);
        // Crea el contenido del popup basado en las propiedades del feature
        var popupContent = createPopupContent(feature.properties);
        // Crea y abre el popup en el mapa
        var popup = L.popup()
          .setLatLng(layer.getBounds().getCenter())
          .setContent(popupContent)
          .openOn(map);

      }
    });
  };

  const featureStyle = (feature) => {
    if (selectedFeature === feature.properties.idEspacio) {
      return {
        weight: 2,
        color: '#134778',
        fillColor: '#134778',
        fillOpacity: 0.5
      };
    } else {
      switch (feature.properties.tipoEspacioDefecto) {
        case 'AULA': return { color: "#ff0000", fillColor: "#ff0000", weight: 2, fillOpacity: 0.5 };
        case 'SEMINARIO': return { color: "#00ff00", fillColor: "#00ff00", weight: 2, fillOpacity: 0.5 };
        case 'LABORATORIO': return { color: "#0000ff", fillColor: "#0000ff", weight: 2, fillOpacity: 0.5 };
        case 'DESPACHO': return { color: "#ffff00", fillColor: "#ffff00", weight: 2, fillOpacity: 0.5 };
        case 'SALA_COMUN': return { color: "#ff00ff", fillColor: "#ff00ff", weight: 2, fillOpacity: 0.5 };
        default: return { weight: 0, fillOpacity: 0 };
      }
    }
  };

  return (
    <div>
      <MapContainer center={[41.68351342770779, -0.8886556704770172]} zoom={19} maxZoom={21} scrollWheelZoom={false}
        style={{ height: "88vh", width: "100%" }}>
        <TileLayer
          maxZoom={21}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          {["Planta 0", "Planta 1", "Planta 2", "Planta 3", "Planta 4"].map((planta, index) => (
            <Overlay
              key={index}
              name={`Planta ${index}`}
              checked={activeLayer === `Planta ${index}`}
            >
              <WMSTileLayer
                url=""
                layers={`proyecto:espacios_eina_planta${index}`}
                format="image/png"
                transparent={true}
                maxZoom={21}
                eventHandlers={{
                  add: () => handleLayerChange(`Planta ${index}`),
                }}
              />
            </Overlay>
          ))}
        </LayersControl>
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            onEachFeature={(feature, layer) => {
              onEachFeature(feature, layer);
            }}
            style={featureStyle}
          />
        )}

        {/*geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            onEachFeature={onEachFeature}
            style={featureStyle}
          />
        )*/}
      </MapContainer>
    </div>
  );
}
