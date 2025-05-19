import React, { useState } from "react";

const TrackingForm = ({ onTrack }) => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTrack(trackingNumber);
    setTrackingNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter tracking number"
        className="input input-bordered w-full rounded-lg focus:outline-none"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-neutral rounded-lg">
        Track
      </button>
    </form>
  );
};

export default TrackingForm;
