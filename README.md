# Transpectra - Real-Time Logistics and Supply Chain Management Solution

## Introduction  
Transpectra is a comprehensive logistics and supply chain management platform designed to streamline warehouse and manufacturer operations. The system integrates real-time inventory tracking, advanced forecasting models, route optimization, and yard management to enhance efficiency, reduce costs, and provide transparency throughout the supply chain.

---

## Key Features  
- **Real-Time Inventory Monitoring**: Warehouses can monitor stock levels and receive just-in-time reordering alerts powered by Time Series and LSTM models.  
- **Manufacturer Coordination**: A dashboard for manufacturers to manage product requests, select items to supply, and generate invoices efficiently.  
- **Route Optimization**: Offers manufacturers the top three delivery routes, minimizing cost and time while optimizing truckloads.  
- **Live Delivery Tracking**: ULIP API integration provides real-time updates and transparency for shipments.  
- **QR Code Verification**: Deliveries are confirmed upon scanning a QR code at the destination.  
- **Yard Management**: Optimizes truck operations in warehouse yards, reducing delays in loading and unloading.  

---

## Architecture Diagram  
![Architecture Diagram](https://github.com/user-attachments/assets/f92cfb39-bc80-48d6-9e72-2819f4359bc1)

---

## Use Case Diagram  
![Use Case Diagram](https://github.com/user-attachments/assets/4c2f81d7-cfa6-4768-adb8-4e8126befbdf)

---

## Route Optimization  

Transpectra's route optimization minimizes transportation costs and delivery times by:  Providing manufacturers with the top three delivery route options for each shipment, the system evaluates each route based on transportation cost, carbon emissions, and delivery time. This enables manufacturers to make informed, sustainable, and economical choices by selecting a route that aligns with their priorities, whether reducing costs, minimizing environmental impact, or ensuring faster delivery. 

**Route Optimization Diagram**  
![Route Optimization Diagram](https://github.com/user-attachments/assets/099a1ec8-a007-47df-b3ac-b029af0c48ef)

---

## Screenshots of the Frontend  
| <img width="902" alt="image" src="https://github.com/user-attachments/assets/3acd7ca2-8c73-4418-b5d5-843b9f375349"> | <img width="892" alt="image" src="https://github.com/user-attachments/assets/28db47e8-32e4-46e8-b660-03033fccdc06">|
|------------------------------------------------------------|------------------------------------------------------------|
|<img width="896" alt="image" src="https://github.com/user-attachments/assets/9970906d-249a-4e04-b8d4-4370e6ac92ee">| ![image4](https://github.com/user-attachments/assets/014fbd4b-7767-4c09-9f2b-92fa7c1ff248)|
| ![image3](https://github.com/user-attachments/assets/485fdb20-0791-441c-aea2-ada86b23657c)| ![image4](https://github.com/user-attachments/assets/699ceeec-e81b-4f91-8ba3-2c72aed327f3)|
| ![image5](https://github.com/user-attachments/assets/9829893a-fd07-467e-80d7-fae8e6a052ee)|![image6](https://github.com/user-attachments/assets/10fe2646-bd82-4347-9d56-a1a2c9ca9747)|
| ![image9](https://github.com/user-attachments/assets/d2e06893-8c0b-4fa8-84bd-4f3ef82d7954)| ![image7](https://github.com/user-attachments/assets/3397475b-e737-4195-bd7c-4c1dab05c5b0)|
| ![image8](https://github.com/user-attachments/assets/6c782ff1-cd93-45ec-84ce-28ec200007cc)|![image10](https://github.com/user-attachments/assets/233198da-0eab-4598-a1a2-f547c875fcfb)|
| ![image11](https://github.com/user-attachments/assets/7d68c53a-10a8-4ee0-9bd5-39f196b9046d)| ![image12](https://github.com/user-attachments/assets/daee9a96-e140-49f5-9dc5-812c9832d2ee)|
| ![image13](https://github.com/user-attachments/assets/155f1753-c1de-46ce-bb88-40c5406144b6)|

---

## Tech Stack  
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Machine Learning**: Python, TensorFlow  
- **Cloud Storage**: Cloudinary  
- **API Integration**: ULIP APIs, REST APIs  
- **Deployment**: Vercel, Render  
- **Authentication**: JWT  
- **Visualization**: Chart.js
- **AI Models**: Facebook-Prophet, Gemini-1.5-pro, LSTM
- **ULIP APIs Required**: Vahan API, Saarthi API, DGFT API, IIMB API, NICDC API, E-way Bill API, Digilocker API

---

## Deployed Link  
Access the live platform [here](https://transpectra.vercel.app/).  

---

## How to Set Up the Project  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/username/transpectra.git
   cd transpectra
   ```

2. **Install the dependencies**  
   ```bash
   npm install
   cd server && npm install
   cd ../webclient && npm install
   ```
 3.**Set Up Environment Variables**

 4.**Start the Application**
   ```bash
   cd server
    npm run dev
    cd ../webclient 
    npm start
   ```
    
## Future Development
- **Retailer Integration**: Expanding the system to automate operations between warehouses and retailers, completing the full supply chain cycle.
- **Yard Management System Integration**: Integrating Yard management system to fully automate the system.
