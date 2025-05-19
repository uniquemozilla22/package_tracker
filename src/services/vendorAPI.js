// src/services/vendorAPI.js
import axios from "axios";

// Mock geolocations for demo
const VENDOR_LOCATIONS = {
  FedEx: { lat: 37.7749, lng: -122.4194 },
  UPS: { lat: 34.0522, lng: -118.2437 },
  DHL: { lat: 40.7128, lng: -74.006 },
  USPS: { lat: 41.8781, lng: -87.6298 },
};

/**
 * Normalized tracking function
 * @param {string} vendor - shipping provider
 * @param {string} trackingNumber - user's input
 * @returns {Promise<{lat: number, lng: number, status: string}>}
 */
export async function fetchTrackingInfo(vendor, trackingNumber) {
  try {
    switch (vendor) {
      case "FedEx":
        return await fetchFedEx(trackingNumber);
      case "UPS":
        return await fetchUPS(trackingNumber);
      case "DHL":
        return await fetchDHL(trackingNumber);
      case "USPS":
        return await fetchUSPS(trackingNumber);
      default:
        throw new Error("Unknown vendor");
    }
  } catch (error) {
    console.error(`[Tracking Error]: ${error.message}`);
    return {
      lat: 0,
      lng: 0,
      status: "Tracking failed",
    };
  }
}

// Mock API functions — replace with real APIs
async function fetchFedEx(trackingNumber) {
  return {
    lat: VENDOR_LOCATIONS.FedEx.lat,
    lng: VENDOR_LOCATIONS.FedEx.lng,
    status: `FedEx tracking #${trackingNumber} is in transit`,
  };
}

async function fetchUPS(trackingNumber) {
  return {
    lat: VENDOR_LOCATIONS.UPS.lat,
    lng: VENDOR_LOCATIONS.UPS.lng,
    status: `UPS tracking #${trackingNumber} is arriving soon`,
  };
}

async function fetchDHL(trackingNumber) {
  return {
    lat: VENDOR_LOCATIONS.DHL.lat,
    lng: VENDOR_LOCATIONS.DHL.lng,
    status: `DHL tracking #${trackingNumber} cleared customs`,
  };
}

async function fetchUSPS(trackingNumber) {
  return {
    lat: VENDOR_LOCATIONS.USPS.lat,
    lng: VENDOR_LOCATIONS.USPS.lng,
    status: `USPS tracking #${trackingNumber} is out for delivery`,
  };
}
