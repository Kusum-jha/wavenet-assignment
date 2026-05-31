import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ManagementPages.css";

function Invoices() {

  const [invoices, setInvoices] = useState([]);

  const [searchInvoice, setSearchInvoice] = useState("");
  const [financialYearFilter, setFinancialYearFilter] = useState("");

  const [form, setForm] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    invoiceAmount: "",
    financialYear: ""
  });

  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  const token = localStorage.getItem("token");

  const fetchInvoices = async () => {

    let url = "/invoices?";

    if (searchInvoice) {
      url += `invoiceNumber=${searchInvoice}&`;
    }

    if (financialYearFilter) {
      url += `financialYear=${financialYearFilter}`;
    }

    try {
      const res = await API.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setInvoices(res.data.invoices);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const createInvoice = async () => {
    setCreateError("");
    setCreateSuccess("");

    if (!form.invoiceNumber || !form.invoiceDate || !form.invoiceAmount || !form.financialYear) {
      setCreateError("All fields are required");
      return;
    }

    try {

      await API.post(
        "/invoices",
        {
          invoiceNumber: Number(form.invoiceNumber),
          invoiceDate: form.invoiceDate,
          invoiceAmount: Number(form.invoiceAmount),
          financialYear: form.financialYear
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCreateSuccess("Invoice created successfully!");

      fetchInvoices();

      setForm({
        invoiceNumber: "",
        invoiceDate: "",
        invoiceAmount: "",
        financialYear: ""
      });

      setTimeout(() => setCreateSuccess(""), 3000);

    } catch (err) {
      setCreateError(err.response?.data?.message || "Error creating invoice");
    }
  };

  const deleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) {
      return;
    }

    try {

      await API.delete(`/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchInvoices();

    } catch (err) {
      alert("Error deleting invoice");
    }
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Invoice Management</h1>
        <p>Create, search, and manage your invoices</p>
      </div>

      <div className="management-content">
        {/* Create Invoice Section */}
        <div className="management-card">
          <h2>Create New Invoice</h2>
          
          {createError && <div className="error-message">{createError}</div>}
          {createSuccess && <div className="success-message">{createSuccess}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                id="invoiceNumber"
                type="number"
                placeholder="Enter invoice number"
                value={form.invoiceNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    invoiceNumber: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                id="invoiceDate"
                type="date"
                value={form.invoiceDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    invoiceDate: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="invoiceAmount">Amount</label>
              <input
                id="invoiceAmount"
                type="number"
                placeholder="Enter amount"
                value={form.invoiceAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    invoiceAmount: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="financialYear">Financial Year</label>
              <input
                id="financialYear"
                type="text"
                placeholder="e.g., 2024-2025"
                value={form.financialYear}
                onChange={(e) =>
                  setForm({
                    ...form,
                    financialYear: e.target.value
                  })
                }
              />
            </div>
          </div>

          <button onClick={createInvoice} className="btn-primary">
            Create Invoice
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="management-card">
          <h2>Search & Filter Invoices</h2>

          <div className="filter-grid">
            <div className="form-group">
              <label htmlFor="searchInvoice">Search by Invoice Number</label>
              <input
                id="searchInvoice"
                type="text"
                placeholder="Search invoices..."
                value={searchInvoice}
                onChange={(e) => setSearchInvoice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="financialYearFilter">Filter by Financial Year</label>
              <input
                id="financialYearFilter"
                type="text"
                placeholder="e.g., 2024-2025"
                value={financialYearFilter}
                onChange={(e) =>
                  setFinancialYearFilter(e.target.value)
                }
              />
            </div>
          </div>

          <button onClick={fetchInvoices} className="btn-secondary">
            Apply Filters
          </button>

          {invoices.length > 0 && (
            <div className="result-count">
              Found {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Invoices Table Section */}
        <div className="management-card">
          <h2>All Invoices</h2>

          {invoices.length === 0 ? (
            <div className="no-data">No invoices found</div>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Financial Year</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td><strong>#{invoice.invoiceNumber}</strong></td>
                      <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                      <td className="amount">₹{invoice.invoiceAmount.toLocaleString()}</td>
                      <td>{invoice.financialYear}</td>
                      <td>
                        <button
                          onClick={() => deleteInvoice(invoice._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
