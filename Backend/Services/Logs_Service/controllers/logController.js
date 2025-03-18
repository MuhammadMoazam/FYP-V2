const Log = require("../models/Log");

const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    console.log("🚀 ------------------------------🚀")
    console.log("🚀 ~ getAllLogs ~ error:", error)
    console.log("🚀 ------------------------------🚀")
    res.status(500).json({ message: "Error fetching logs", error });
  }
};

const log = async (req, res) => {
  try {
    const log = new Log({
      user: req.body.user,
      action: req.body.action,
      collection: req.body.collection,
      document_affected: req.body.document_affected,
      previous_data: req.body.previous_data,
    });
    await log.save();

    res.status(200).json(log);
  } catch (error) {
    console.log("🚀 -----------------------------🚀")
    console.log("🚀 ~ createLog ~ error:", error)
    console.log("🚀 -----------------------------🚀")
    res.status(500).json({ message: "Error logging action", error });
  }
};

module.exports = { getAllLogs, log };