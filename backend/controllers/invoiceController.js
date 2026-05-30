const Invoice = require("../models/Invoice");

const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getInvoices = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const query = {};

    if (req.query.financialYear) {
      query.financialYear = req.query.financialYear;
    }

    if (req.query.invoiceNumber) {
      query.invoiceNumber = Number(req.query.invoiceNumber);
    }

    if (req.query.startDate && req.query.endDate) {
      query.invoiceDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const invoices = await Invoice.find(query)
      .populate("createdBy", "username email role")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ invoiceDate: -1 });

    const total = await Invoice.countDocuments(query);

    res.json({
      success: true,
      total,
      page,
      invoices
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      invoice
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {

    await Invoice.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Invoice deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice
};
