import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
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
import { MapPinIcon, PlusIcon } from "@heroicons/react/24/solid";

// Fix marker icon issue
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

export function CompanyRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    createdAt: "",
    email: "",
    branches: "",
    latitude: "",
    longitude: "",
    radius: "",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    additionalInfo: "",
    hasBranch: "No", // default to "No"
    branchLatitude: "",
    branchLongitude: "",
    branchRadius: "",
  });

  const [branchLocations, setBranchLocations] = useState([
    { latitude: "", longitude: "", radius: "" },
  ]);

  const addBranchLocation = () => {
    setBranchLocations([...branchLocations, { latitude: "", longitude: "", radius: "" }]);
  };


  const steps = ["Company", "Details", "Contact", "Location", "Branch Info"];
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSignUp = (e) => {
    e.preventDefault();

    if (validateStep()) {
      console.log("Final form data:", formData); // optional for debug
      navigate("/dashboard/home");
    }
  };

  const validateStep = () => {
    if (step === 4) {
      const { latitude, longitude, radius } = formData;
      if (!latitude || !longitude || !radius) {
        alert("Please select your office location and enter a valid radius.");
        return false;
      }
    }

    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
            <Textarea
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              label="Branches"
              value={formData.branches}
              onChange={(e) => handleChange("branches", e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Input
              label="Contact Person First Name"
              value={formData.contactPersonFirstName}
              onChange={(e) =>
                handleChange("contactPersonFirstName", e.target.value)
              }
            />
            <Input
              label="Contact Person Last Name"
              value={formData.contactPersonLastName}
              onChange={(e) =>
                handleChange("contactPersonLastName", e.target.value)
              }
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">

            <Input
              label="Radius (m)"
              type="number"
              min="0"
              value={formData.radius}
              onChange={(e) => handleChange("radius", e.target.value)}
            />

            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <Typography variant="h6" className="text-blue-800">
                Select or Search Your Office Location
              </Typography>
            </div>

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
                    handleChange("latitude", lat.toFixed(6));
                    handleChange("longitude", lng.toFixed(6));
                  }}
                />
                <LocationMarker
                  onSelect={({ lat, lng }) => {
                    handleChange("latitude", lat.toFixed(6));
                    handleChange("longitude", lng.toFixed(6));
                  }}
                />
                {formData.latitude && formData.longitude && (
                  <>
                    <Marker position={[formData.latitude, formData.longitude]} />
                    {formData.radius && (
                      <Circle
                        center={[formData.latitude, formData.longitude]}
                        radius={parseFloat(formData.radius)} // already in meters
                        pathOptions={{ color: "blue", fillColor: "#60A5FA", fillOpacity: 0.3 }}
                      />
                    )}
                  </>
                )}
              </MapContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Latitude"
                value={formData.latitude}
                readOnly
                className="bg-gray-50"
              />
              <Input
                label="Longitude"
                value={formData.longitude}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
        );
      case 5:
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
                    className=""
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

                    <Typography variant="paragraph" className="text-blue-700 font-medium mt-3">
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

                    <div className="grid grid-cols-2 gap-4 mt-3">
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
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col-reverse md:flex-row min-h-screen">
      <div
        className="hidden md:block md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/img/flat-lay-back-school-concept-with-copy-space.jpg')",
        }}
      />
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-tr from-white to-gray-100 p-4">
        <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-10 bg-white rounded-xl shadow-lg">
          <div className="flex justify-center mb-6">
            <img src="/img/logo.png" alt="Logo" className="h-16 w-auto" />
          </div>
          <div className="text-center mb-6 space-y-1">
            <Typography
              variant="h2"
              className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900"
            >
              Company Registration
            </Typography>
            <div className="flex justify-center items-center space-x-2 text-sm sm:text-base">
              <Typography className="text-gray-600 font-medium">
                Step
              </Typography>
              <Typography className="text-blue-700 font-bold">
                {step}
              </Typography>
              <Typography className="text-gray-600 font-medium">
                of {steps.length}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between flex-wrap sm:flex-nowrap gap-3 sm:gap-4 mb-4">
            {steps.map((label, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[50px] flex-1">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold transition-colors ${step > idx + 1
                    ? "bg-green-500 text-white"
                    : step === idx + 1
                      ? "bg-blue-900 text-white animate-pulse"
                      : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {idx + 1}
                </div>
                <Typography
                  variant="small"
                  className="mt-1 text-gray-600 text-xs sm:text-sm text-center"
                >
                  {label}
                </Typography>
              </div>
            ))}
          </div>
          <form className="space-y-5">
            {renderStep()}
            <div className="flex flex-col sm:flex-row justify-between mt-2">
              {step > 1 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  className="mb-3 sm:mb-0 w-full sm:w-auto"
                >
                  Back
                </Button>
              )}
              {step < steps.length ? (
                <Button
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-blue-900 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSignUp}
                  // disabled={
                  //   !formData.longitude ||
                  //   (formData.hasBranch === "Yes" && (!formData.branchLatitude || !formData.branchLongitude))
                  // }
                  className="w-full sm:w-auto bg-green-600 text-white"
                >
                  Sign Up
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CompanyRegistration;
