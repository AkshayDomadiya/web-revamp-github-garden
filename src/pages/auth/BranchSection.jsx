import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Button, Input, Typography } from "@material-tailwind/react";
import { MapPinIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
    MapContainer,
    TileLayer,
    Marker,
    Circle,
    useMapEvents,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import * as LEsri from "esri-leaflet"; // for featureLayer()
import * as ELG from "esri-leaflet-geocoder"; // for geosearch()
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng);
        },
    });
    return null;
}

function SearchBox({ onSelect }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const searchControl = ELG.geosearch().addTo(map);
        const results = L.layerGroup().addTo(map);

        searchControl.on("results", function (data) {
            results.clearLayers();
            if (data.results.length > 0) {
                const { latlng } = data.results[0];
                results.addLayer(L.marker(latlng));
                map.setView(latlng, 14);
                onSelect(latlng); // sends selected coordinates to parent
            }
        });

        return () => {
            map.removeControl(searchControl);
            map.removeLayer(results);
        };
    }, [map, onSelect]);

    return null;
}

export function BranchSection({
    formData,
    handleChange,
    addBranchLocation,
    branchLocations,
    setBranchLocations,
}) {
    return (
        <div className="space-y-6">
            <Typography variant="h6" className="text-blue-900">Do you have a branch?</Typography>
            <div className="flex space-x-4">
                <Button
                    variant={formData.hasBranch === "Yes" ? "filled" : "outlined"}
                    color="green"
                    onClick={() => handleChange("hasBranch", "Yes")}
                >
                    Yes
                </Button>
                <Button
                    variant={formData.hasBranch === "No" ? "filled" : "outlined"}
                    color="red"
                    onClick={() => handleChange("hasBranch", "No")}
                >
                    No
                </Button>
            </div>

            {formData.hasBranch === "Yes" && (
                <>
                    {branchLocations.map((branch, index) => (
                        <div
                            key={index}
                            className="space-y-4 p-4 rounded-xl border border-blue-200 bg-blue-50"
                        >
                            <Typography variant="h6" className="text-blue-800">
                                Branch Location {index + 1}
                            </Typography>

                            <Input
                                label="Branch Radius (m)"
                                type="number"
                                min="0"
                                value={branch.radius}
                                onChange={(e) => {
                                    const updated = [...branchLocations];
                                    updated[index].radius = e.target.value;
                                    setBranchLocations(updated);
                                }}
                            />

                            <Typography variant="paragraph" className="text-blue-700 font-medium">
                                Select Branch Location
                            </Typography>

                            <div className="rounded-xl overflow-hidden border border-blue-100 shadow-sm">
                                <MapContainer
                                    center={[20.5937, 78.9629]}
                                    zoom={4}
                                    style={{ height: "300px", width: "100%" }}
                                    className="rounded-xl"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <SearchBox
                                        onSelect={({ lat, lng }) => {
                                            const updated = [...branchLocations];
                                            updated[index].latitude = lat.toFixed(6);
                                            updated[index].longitude = lng.toFixed(6);
                                            setBranchLocations(updated);
                                        }}
                                    />
                                    <LocationMarker
                                        onSelect={({ lat, lng }) => {
                                            const updated = [...branchLocations];
                                            updated[index].latitude = lat.toFixed(6);
                                            updated[index].longitude = lng.toFixed(6);
                                            setBranchLocations(updated);
                                        }}
                                    />
                                    {branch.latitude && branch.longitude && (
                                        <>
                                            <Marker position={[branch.latitude, branch.longitude]} />
                                            {branch.radius && (
                                                <Circle
                                                    center={[branch.latitude, branch.longitude]}
                                                    radius={parseFloat(branch.radius)}
                                                    pathOptions={{ color: "green", fillColor: "#4ADE80", fillOpacity: 0.3 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </MapContainer>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Latitude"
                                    value={branch.latitude}
                                    readOnly
                                    className="bg-gray-50"
                                />
                                <Input
                                    label="Longitude"
                                    value={branch.longitude}
                                    readOnly
                                    className="bg-gray-50"
                                />
                            </div>
                        </div>
                    ))}

                    <Button
                        variant="outlined"
                        color="blue"
                        className="flex items-center gap-2"
                        onClick={addBranchLocation}
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Another Branch
                    </Button>
                </>
            )}
        </div>
    );
}
