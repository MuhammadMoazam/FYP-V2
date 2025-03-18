const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const logSchema = new Schema({
  action: {
    type: String,
    required: true,
    enum: ["create", "update", "delete"] // Restrict to valid actions
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  collection_affected: {
    type: String,
    required: true
  },
  document_affected: {
    type: Schema.Types.ObjectId,
    required: true
  },
  previous_data: { // Store old data for rollback
    type: Schema.Types.Mixed,
    default: null
  },
  at: {
    type: Date,
    default: Date.now
  }
});


module.exports = model("Logs", logSchema);
