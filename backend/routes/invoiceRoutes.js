const express = require("express");

const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice
} = require("../controllers/invoiceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createInvoice);

router.get("/", protect, getInvoices);

router.put("/:id", protect, updateInvoice);

router.delete("/:id", protect, deleteInvoice);

module.exports = router;
