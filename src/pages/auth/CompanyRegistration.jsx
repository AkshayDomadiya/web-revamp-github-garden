
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Textarea,
  Card,
  CardBody,
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
import * as ELG from "esri-leaflet-geocoder";
import { useNavigate } from "react-router-dom";
import { 
  MapPinIcon, 
  PlusIcon, 
  BuildingOfficeIcon,
  UserIcon,
  MapIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
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
        onSelect(latlng);
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
    email: "",
    branches: "",
    latitude: "",
    longitude: "",
    radius: "",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    hasBranch: "No",
  });

  const [branchLocations, setBranchLocations] = useState([
    { latitude: "", longitude: "", radius: "" },
  ]);

  const steps = [
    { number: 1, title: "Company Info", icon: BuildingOfficeIcon },
    { number: 2, title: "Contact Details", icon: UserIcon },
    { number: 3, title: "Personal Info", icon: UserIcon },
    { number: 4, title: "Location", icon: MapIcon },
    { number: 5, title: "Branch Setup", icon: MapPinIcon },
  ];

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
      console.log("Registration completed:", formData);
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

  const addBranchLocation = () => {
    setBranchLocations([...branchLocations, { latitude: "", longitude: "", radius: "" }]);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              size="lg"
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="focus:border-indigo-500"
            />
            <Textarea
              size="lg"
              label="Company Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="focus:border-indigo-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                size="lg"
                label="City"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="focus:border-indigo-500"
              />
              <Input
                size="lg"
                label="State"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="focus:border-indigo-500"
              />
            </div>
            <Input
              size="lg"
              label="Country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="focus:border-indigo-500"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Input
              size="lg"
              label="Company Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="focus:border-indigo-500"
            />
            <Input
              size="lg"
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="focus:border-indigo-500"
            />
            <Input
              size="lg"
              label="Number of Branches"
              value={formData.branches}
              onChange={(e) => handleChange("branches", e.target.value)}
              className="focus:border-indigo-500"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                size="lg"
                label="Contact Person First Name"
                value={formData.contactPersonFirstName}
                onChange={(e) => handleChange("contactPersonFirstName", e.target.value)}
                className="focus:border-indigo-500"
              />
              <Input
                size="lg"
                label="Contact Person Last Name"
                value={formData.contactPersonLastName}
                onChange={(e) => handleChange("contactPersonLastName", e.target.value)}
                className="focus:border-indigo-500"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapIcon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <Typography variant="h6" className="text-gray-800 font-semibold">
                Set Your Office Location
              </Typography>
              <Typography variant="small" className="text-gray-600">
                Click on the map or search to select your office location
              </Typography>
            </div>

            <Input
              size="lg"
              label="Allowed Radius (meters)"
              type="number"
              min="0"
              value={formData.radius}
              onChange={(e) => handleChange("radius", e.target.value)}
              className="focus:border-indigo-500"
            />

            <Card className="overflow-hidden border border-gray-200">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={4}
                style={{ height: "350px", width: "100%" }}
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
                        radius={parseFloat(formData.radius)}
                        pathOptions={{ color: "indigo", fillColor: "#6366f1", fillOpacity: 0.2 }}
                      />
                    )}
                  </>
                )}
              </MapContainer>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Input
                size="lg"
                label="Latitude"
                value={formData.latitude}
                readOnly
                className="bg-gray-50"
              />
              <Input
                size="lg"
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
            <div className="text-center mb-6">
              <Typography variant="h6" className="text-gray-800 font-semibold mb-4">
                Do you have additional branches?
              </Typography>
              <div className="flex justify-center gap-4">
                <Button
                  variant={formData.hasBranch === "Yes" ? "filled" : "outlined"}
                  color="green"
                  onClick={() => handleChange("hasBranch", "Yes")}
                  className="px-8"
                >
                  Yes
                </Button>
                <Button
                  variant={formData.hasBranch === "No" ? "filled" : "outlined"}
                  color="red"
                  onClick={() => handleChange("hasBranch", "No")}
                  className="px-8"
                >
                  No
                </Button>
              </div>
            </div>

            {formData.hasBranch === "Yes" && (
              <div className="space-y-8">
                {branchLocations.map((branch, index) => (
                  <Card key={index} className="p-6 border border-gray-200">
                    <Typography variant="h6" className="text-gray-800 mb-4">
                      Branch Location {index + 1}
                    </Typography>

                    <div className="mb-4">
                      <Input
                        size="lg"
                        label="Branch Radius (meters)"
                        type="number"
                        min="0"
                        value={branch.radius}
                        onChange={(e) => {
                          const updated = [...branchLocations];
                          updated[index].radius = e.target.value;
                          setBranchLocations(updated);
                        }}
                        className="focus:border-indigo-500"
                      />
                    </div>

                    <Card className="overflow-hidden border border-gray-200">
                      <MapContainer
                        center={[20.5937, 78.9629]}
                        zoom={4}
                        style={{ height: "300px", width: "100%" }}
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
                                pathOptions={{ color: "green", fillColor: "#22c55e", fillOpacity: 0.2 }}
                              />
                            )}
                          </>
                        )}
                      </MapContainer>
                    </Card>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input
                        size="lg"
                        label="Latitude"
                        value={branch.latitude}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Input
                        size="lg"
                        label="Longitude"
                        value={branch.longitude}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </Card>
                ))}

                <Button
                  variant="outlined"
                  color="indigo"
                  className="flex items-center gap-2 mx-auto"
                  onClick={addBranchLocation}
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Another Branch
                </Button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0">
          <CardBody className="p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <BuildingOfficeIcon className="w-10 h-10 text-white" />
              </div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Company Registration
              </Typography>
              <Typography className="text-gray-600">
                Set up your company profile and get started
              </Typography>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-8 overflow-x-auto pb-4">
              {steps.map((stepItem, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-0 flex-1">
                  <div className="flex items-center w-full">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold transition-all ${
                        step > idx + 1
                          ? "bg-green-500 text-white"
                          : step === idx + 1
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > idx + 1 ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : (
                        <stepItem.icon className="w-6 h-6" />
                      )}
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          step > idx + 1 ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <Typography
                    variant="small"
                    className={`mt-2 text-center font-medium ${
                      step === idx + 1 ? "text-indigo-600" : "text-gray-500"
                    }`}
                  >
                    {stepItem.title}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {step > 1 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  className="order-2 sm:order-1"
                >
                  Back
                </Button>
              )}
              <div className="flex-1"></div>
              {step < steps.length ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 order-1 sm:order-2"
                  size="lg"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 order-1 sm:order-2"
                  size="lg"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CompanyRegistration;
