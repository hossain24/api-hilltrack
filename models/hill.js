const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// create hill Schema and model
const HillSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  color: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Hill = mongoose.model("hill", HillSchema);

module.exports = Hill;
