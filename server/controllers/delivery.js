const Delivery = require("../models/Delivery");
const { msgFunction } = require("../utils/msgFunction");
const { CONFIG } = require("../constants/config");
const mongoose = require("mongoose");
const ManufacturingUnit = require("../models/ManufacturingUnit");
const Warehouse = require("../models/Warehouse");
const Order = require("../models/Order");
const { uploadPdfToCloudinary } = require("../utils/pdfUploader");
const multer = require("multer");
const { DistanceBWAddress } = require("../GeolocationAPI/api");
const { getCarbonEmissionDetails } = require("../UlipAPI/carbonEmissionapi");
const {getCoordinates} = require('../GeolocationAPI/comman')

exports.generateRoutesForDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Step 1: Input Validation
    if (!orderId) {
      return res
        .status(401)
        .json(msgFunction(false, "Please provide the orderId"));
    }

    // Step 2: Fetch Order Details
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json(msgFunction(false, "Order not found."));
    }

    // Extract manufacturerId and warehouseId
    const { manufacturerId, warehouseId } = order;

    // Step 3: Retrieve Manufacturing Unit and Warehouse Details
    const manufacturingUnit = await ManufacturingUnit.findById(manufacturerId);
    if (!manufacturingUnit) {
      return res
        .status(404)
        .json(msgFunction(false, "Manufacturing unit not found."));
    }

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json(msgFunction(false, "Warehouse not found."));
    }

    // Step 4: Extract Pickup and Dropoff Locations
    const pickupLocation = {
      name: manufacturingUnit?.companyName,
      address: manufacturingUnit?.companyAddress,
      contactPerson: manufacturingUnit?.contactPerson,
      contactNumber: manufacturingUnit?.contactNumber,
    };

    const dropoffLocation = {
      name: warehouse?.warehouseName,
      address: warehouse?.warehouseAddress,
      contactPerson: warehouse.contactPerson,
      contactNumber: warehouse.contactNumber,
    };

    // distance btw to location
    const distance = await DistanceBWAddress(
      pickupLocation.address,
      dropoffLocation.address
    );

    // carbon emission details 
    const carbonEmissionObject = await getCarbonEmissionDetails(distance);

    const resposeObj = {
      sourceAddress: pickupLocation,
      destinationAddress: dropoffLocation,
      distance: distance,
      routeObj: {
        ...carbonEmissionObject
      }
    }



    // cost for this traveling





    // time required for this routes
    // by train , by road , by truck
    // kab tak delivery chhaiye
    // fuel price



  } catch {

  }
};


exports.realTimeTrackingOfDelivery = async (req, res) => {
  try {
      const { deliveryId } = req.body;

      const deliveryObj = await Delivery.findOne({ uniqueDeliveryId: deliveryId });

      if (!deliveryObj) {
          return res.status(404).json({ message: "Delivery not found" });
      }

      const deliveryRoutes = deliveryObj.deliveryRoutes.map(route => ({
          step: route.step,
          from: route.from,
          to: route.to,
          transportMode: route.by,
          distance: route.distance,
          expectedTime: route.expectedTime,
          cost: route.cost,
          remarks: route.remarks,
          status: route.status
      }));

      const ongoingRoute = deliveryRoutes.find(route => route.status === "Ongoing");

      let routeDetails = null;
      if (ongoingRoute) {
          const fromCoordinatesResponse = await getCoordinates(ongoingRoute.from);
          const toCoordinatesResponse = await getCoordinates(ongoingRoute.to);

          if (fromCoordinatesResponse.success && toCoordinatesResponse.success) {
              routeDetails = await getRoute(fromCoordinatesResponse.data, toCoordinatesResponse.data);
          } else {
              return res.status(400).json({
                  message: "Unable to fetch coordinates for the ongoing route."
              });
          }
      }

      return res.status(200).json({
          deliveryId: deliveryObj.uniqueDeliveryId,
          currentLocation: deliveryObj.currentLocation,
          status: deliveryObj.status,
          routes: deliveryRoutes,
          ongoingStep: ongoingRoute || null,
          routeDetails: routeDetails?.data || null
      });
  } catch (error) {
      console.error("Error tracking delivery:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};




exports.FetchDelivery = async (req, res) => {
  try {
    const { id: userId, account_type: accountType } = req.user;
    const { id: storeId } = req.store;
    const { delivery_id: deliveryId } = req.params;

    if (!userId) {
      return res
        .status(401)
        .json(msgFunction(false, "You are not authenticated!"));
    }

    if (deliveryId && !mongoose.Types.ObjectId.isValid(deliveryId)) {
      return res
        .status(400)
        .json(
          msgFunction(
            false,
            "Incorrect delivery ID. Please provide a valid ID."
          )
        );
    }

    let query = {};

    if (accountType === CONFIG.ACCOUNT_TYPE.DRIVER) {
      query.assignedDriver = userId;
    } else if (
      accountType === CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER ||
      accountType === CONFIG.ACCOUNT_TYPE.STORE
    ) {
      if (!storeId) {
        return res
          .status(400)
          .json(
            msgFunction(false, "Your Store is Not Found! Please log in again.")
          );
      }

      query =
        accountType === CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER
          ? { DistributionCenterId: storeId }
          : { storeId: storeId };
    } else {
      return res
        .status(403)
        .json(msgFunction(false, "You are not permitted to fetch deliveries!"));
    }

    if (deliveryId) {
      query._id = deliveryId;
    }

    const deliveries = await Delivery.find(query);

    if (!deliveries || deliveries.length === 0) {
      return res
        .status(404)
        .json(msgFunction(false, "No Delivery Items are found!"));
    }

    return res.json({
      success: true,
      data: deliveries,
    });
  } catch (error) {
    console.error("Error in FetchDelivery:", error);
    return res
      .status(500)
      .json(
        msgFunction(
          false,
          "An error occurred while fetching the delivery.",
          error.message
        )
      );
  }
};




/**
 * @url : api/v1/delivery/create
 *
 * purpose : create delivery for particular order
 */
// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Temporary upload directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return cb(new Error("Only PDF files are allowed."), false);
    }
    cb(null, true);
  },
}).single("invoicePdf"); // Expect 'invoicePdf' as the key for the file upload

exports.CreateDelivery = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const {
        orderId,
        uniqueOrderId,
        warehouseId,
        ManufactureId,
        selectedProducts,
        estimatedDeliveryTime,
      } = req.body;

      // Validate required fields
      if (
        !orderId ||
        !uniqueOrderId ||
        !warehouseId ||
        !ManufactureId ||
        !selectedProducts ||
        !estimatedDeliveryTime ||
        !req.file // Validate that the PDF file is uploaded
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields.",
        });
      }

      // Parse and validate the products array
      const parsedProducts = JSON.parse(selectedProducts);
      if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Selected products must be a non-empty array.",
        });
      }

      const isProductValid = parsedProducts.every(
        (product) =>
          product.productName &&
          typeof product.productName === "string" &&
          product.quantity &&
          typeof product.quantity === "number" &&
          product.specifications &&
          typeof product.specifications === "string" &&
          product.unitCost &&
          typeof product.unitCost === "number" &&
          product._id &&
          typeof product._id === "string"
      );

      if (!isProductValid) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product structure. Each product must have 'productName' (string), 'quantity' (number), 'specifications' (string), 'unitCost' (number), and '_id' (string).",
        });
      }

      // Fetch Manufacturing Unit and Warehouse details
      const manufacturingUnit = await ManufacturingUnit.findById(ManufactureId);
      if (!manufacturingUnit) {
        return res.status(404).json({
          success: false,
          message: "Manufacturing unit not found.",
        });
      }

      const warehouse = await Warehouse.findById(warehouseId);
      if (!warehouse) {
        return res.status(404).json({
          success: false,
          message: "Warehouse not found.",
        });
      }

      // Extract pickup and dropoff locations
      const pickupLocation = {
        address: manufacturingUnit.address,
        contactPerson: manufacturingUnit.contactPerson,
        contactNumber: manufacturingUnit.contactNumber,
      };

      const dropoffLocation = {
        address: warehouse.address,
        contactPerson: warehouse.contactPerson,
        contactNumber: warehouse.contactNumber,
      };

      // Upload the PDF to Cloudinary
      const uploadedPdf = await uploadPdfToCloudinary(
        req.file.path,
        "invoices"
      );
      if (!uploadedPdf || !uploadedPdf.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload PDF to Cloudinary.",
        });
      }

      // Create a new delivery document
      const newDelivery = new Delivery({
        orderId,
        uniqueOrderId,
        warehouseId,
        ManufactureId,
        pickupLocation,
        dropoffLocation,
        products: parsedProducts,
        packageDetails: {
          weight: `${parsedProducts.length * 10}kg`,
          dimensions: "Varied",
          fragile: false,
          description: "Delivery of selected products",
        },
        invoicePdf: uploadedPdf.secure_url,
        estimatedDeliveryTime,
        createdAt: new Date(),
        status: "Pending",
      });

      // Save the delivery to the database
      const savedDelivery = await newDelivery.save();

      // Update the corresponding order's deliveries array and status
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          $push: { deliveries: savedDelivery._id },
          orderStatus: "Processing",
        },
        { new: true } // Return the updated document
      );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found. Could not associate delivery.",
        });
      }

      // Respond with success
      return res.status(200).json({
        success: true,
        message:
          "Delivery created, associated with the order, and order status updated to 'Processing' successfully.",
        data: savedDelivery,
      });
    } catch (error) {
      console.error("Error creating delivery:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  });
};
