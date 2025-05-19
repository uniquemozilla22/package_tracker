import React, { useState } from "react";
import TrackingForm from "./components/TrackingForm";
import MapView from "./components/MapView";
import { fetchTrackingInfo } from "./services/vendorAPI";

export default function App() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [animate, setAnimate] = useState(false);
  const [history, setHistory] = useState([]);
  const [vendor, setVendor] = useState("FedEx");

  const handleTrack = async (trackingNumber) => {
    setAnimate(true);
    try {
      const data = await fetchTrackingInfo(vendor, trackingNumber);
      const timestamp = new Date().toLocaleString();

      setLocation({ lat: data.lat, lng: data.lng });
      setStatus(data.status);
      setHistory((prev) => [
        { trackingNumber, vendor, status: data.status, timestamp },
        ...prev,
      ]);
    } catch (err) {
      setStatus("Error fetching tracking info");
    }
    setAnimate(false);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <h1 className="text-4xl font-semibold mb-6">TrackIt</h1>

      {/* Vendor Selector */}
      <div className="w-full max-w-md mb-4">
        <label className="label">
          <span className="label-text">Select Shipping Vendor</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        >
          <option>FedEx</option>
          <option>UPS</option>
          <option>DHL</option>
          <option>USPS</option>
        </select>
      </div>

      <div className="w-full max-w-md mb-4">
        <TrackingForm onTrack={handleTrack} />
      </div>

      {status && (
        <div className="text-sm text-gray-500 mb-4 transition-opacity duration-300">
          📦 {status}
        </div>
      )}

      {location && (
        <div className="w-full max-w-3xl rounded-xl overflow-hidden mb-6">
          <MapView location={location} />
        </div>
      )}

      {/* History Dashboard */}
      {history.length > 0 && (
        <div className="w-full max-w-3xl mb-10">
          <h2 className="text-xl font-bold mb-2">📜 Tracking History</h2>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-base-200 rounded-box"
              >
                <input type="checkbox" />
                <div className="collapse-title font-medium">
                  {item.trackingNumber} — {item.vendor}
                </div>
                <div className="collapse-content text-sm">
                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>
                  <p>
                    <strong>Tracked on:</strong> {item.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {animate && (
        <div className="absolute text-5xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping text-accent">
          📦
        </div>
      )}
    </div>
  );
}
