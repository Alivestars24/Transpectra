import React from 'react';
import './TrackDelivery.css'; // Optional CSS for custom styles
import mapImage from '../../../assets/Images/map2.png'; // Import your map image

const TrackDelivery = () => {
  
  return (
    <div className="track-delivery-container">
      <h2 className='text-2xl font-inter font-bold pb-2 '>Live Delivery Tracking</h2>
      
      {/* Map Section */}
      <div className="map-section">
        <img src={mapImage} alt="Live Driver Location" className="mx-auto" />
        <p className="live-location-text">Parcel is currently near Pune, en route to Mumbai</p>
      </div>
      
      {/* Delivery Route Tracking */}
      <div className="tracking-checklist">
        {/* Checkpoint 1 - Ship */}
        <div className="checkpoint">
          <div className="checkpoint-status done">
            <span>✔</span>
          </div>
          <div className="checkpoint-details">
            <h4>Step 1: Shipped from Nanded Station to Pune Station</h4>
            <p>Shipment was transported via the train "Panvel Express".</p>
            <small>Landed at Pune Station on 18th December 2024.</small>
          </div>
        </div>
        
        <div className="vertical-line"></div>
        
        {/* Checkpoint 2 - Rail */}
        <div className="checkpoint">
          <div className="checkpoint-status done">
            <span>✔</span>
          </div>
          <div className="checkpoint-details">
            <h4>Step 2: Transported by Road from Pune to Surat</h4>
            <p>The shipment was loaded on Truck going via Mumbai.</p>
            <small>Arrived at Mumbai on 18th December 2024.</small>
          </div>
        </div>
        
        <div className="vertical-line"></div>
        
        {/* Checkpoint 3 - Truck */}
        <div className="checkpoint">
          <div className="checkpoint-status in-progress">
            <span>⏳</span>
          </div>
          <div className="checkpoint-details">
            <h4>Step 3: Transported by Truck to Gujrat Super Warehouse</h4>
            <p>The shipment is currently being transported by truck from Mumbai to Surat.</p>
            <small>Expected delivery to warehouse on 19th December 2024.</small>
          </div>
        </div>
      </div>
      
      {/* Add more checkpoints or details if needed */}
    </div>
  );
};

export default TrackDelivery;
