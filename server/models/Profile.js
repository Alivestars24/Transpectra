const mongoose = require("mongoose");
const {CONFIG} = require('../constants/config')


const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: {
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        postalCode: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
    },
    vehicleDetails: {
        make: {
            type: String, 
            trim: true,
        },
        model: {
            type: String,
            trim: true
        },
        capacity: {
            type: Number,
        },
        licenseNumber: {
            type: "String",
            unique: true,
            trim: true
        }
    },
    experienceYears: {
        type: Number,
    }
});

// // Pre-save middleware to validate vehicleDetails based on accountType
// profileSchema.pre('save', async function (next) {
//     if (!this.isModified('userId')) return next();

//     const User = mongoose.model('User');  // Access the User model
//     const user = await User.findById(this.userId);

//     if (!user) {
//         return next(new Error('User not found'));
//     }

//     // If the user is a Driver, ensure vehicleDetails are provided
//     if (user.accountType === CONFIG.ACCOUNT_TYPE.DRIVER) {
//         if (!this.vehicleDetails || !this.vehicleDetails.make || !this.vehicleDetails.model || !this.vehicleDetails.licenseNumber) {
//             return next(new Error('Vehicle details are required for Drivers'));
//         }
//     }

//     next();
// });

module.exports = mongoose.model("Profile", profileSchema);