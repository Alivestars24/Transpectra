import React from 'react';
import './TrackDelivery.css'; // Optional CSS for custom styles
import mapImage from '../../../assets/Images/map1.png'; // Import your map image

const TrackDelivery = () => {
  return (
    <div className="track-delivery-container">
      <h2 className='text-2xl font-inter font-bold pb-2 '>Live Delivery Tracking</h2>
      
      {/* Map Section */}
      <div className="map-section">
        <img src={mapImage} alt="Live Driver Location" className="mx-auto" />
        <p className="live-location-text">Driver is currently near Panipat, en route to Gurgaon</p>
      </div>
      
      {/* Delivery Route Tracking */}
      <div className="tracking-checklist">
        {/* Checkpoint 1 - Ship */}
        <div className="checkpoint">
          <div className="checkpoint-status done">
            <span>✔</span>
          </div>
          <div className="checkpoint-details">
            <h4>Step 1: Shipped from Chennai Port to Mumbai Port</h4>
            <p>Shipment was transported via the vessel "MV Chennai Star".</p>
            <small>Landed at Mumbai Port on 12th October 2024.</small>
          </div>
        </div>
        
        <div className="vertical-line"></div>
        
        {/* Checkpoint 2 - Rail */}
        <div className="checkpoint">
          <div className="checkpoint-status done">
            <span>✔</span>
          </div>
          <div className="checkpoint-details">
            <h4>Step 2: Transported by Rail from Mumbai to Delhi</h4>
            <p>The shipment was loaded on Train 2024 "Mumbai Express" to Tughlakabad Rail Terminal, Delhi.</p>
            <small>Arrived at Tughlakabad Rail Terminal on 16th October 2024.</small>
          </div>
        </div>
        
        <div className="vertical-line"></div>
        
        {/* Checkpoint 3 - Truck */}
        <div className="checkpoint">
          <div className="checkpoint-status in-progress">
            <span>⏳</span>
          </div>
          <div className="checkpoint-details">
            <h4>Step 3: Transported by Truck to Bharat Logistics, Gurgaon</h4>
            <p>The shipment is currently being transported by truck from Delhi to Gurgaon.</p>
            <small>Expected delivery to warehouse on 20th October 2024.</small>
          </div>
        </div>
      </div>
      
      {/* Add more checkpoints or details if needed */}
    </div>
  );
};

export default TrackDelivery;
