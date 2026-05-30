import { useEffect, useState } from "react";
import API from "../services/api";

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

  const token = localStorage.getItem("token");

  const fetchInvoices = async () => {

    let url = "/invoices?";

    if (searchInvoice) {
      url += `invoiceNumber=${searchInvoice}&`;
    }

    if (financialYearFilter) {
      url += `financialYear=${financialYearFilter}`;
    }

    const res = await API.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setInvoices(res.data.invoices);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const createInvoice = async () => {
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

      alert("Invoice Created");

      fetchInvoices();

      setForm({
        invoiceNumber: "",
        invoiceDate: "",
        invoiceAmount: "",
        financialYear: ""
      });

    } catch (err) {
      alert("Error creating invoice");
    }
  };

  const deleteInvoice = async (id) => {
    try {

      await API.delete(`/invoices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Invoice Deleted");

      fetchInvoices();

    } catch (err) {
      alert("Error deleting invoice");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoice Management</h2>

      <h3>Create Invoice</h3>

      <input
        placeholder="Invoice Number"
        value={form.invoiceNumber}
        onChange={(e) =>
          setForm({
            ...form,
            invoiceNumber: e.target.value
          })
        }
      />

      <input
        type="date"
        value={form.invoiceDate}
        onChange={(e) =>
          setForm({
            ...form,
            invoiceDate: e.target.value
          })
        }
      />

      <input
        placeholder="Amount"
        value={form.invoiceAmount}
        onChange={(e) =>
          setForm({
            ...form,
            invoiceAmount: e.target.value
          })
        }
      />

      <input
        placeholder="Financial Year"
        value={form.financialYear}
        onChange={(e) =>
          setForm({
            ...form,
            financialYear: e.target.value
          })
        }
      />

      <button onClick={createInvoice}>
        Create Invoice
      </button>

      <hr />

      <h3>Search / Filter</h3>

      <input
        placeholder="Search Invoice Number"
        value={searchInvoice}
        onChange={(e) => setSearchInvoice(e.target.value)}
      />

      <input
        placeholder="Financial Year"
        value={financialYearFilter}
        onChange={(e) =>
          setFinancialYearFilter(e.target.value)
        }
      />

      <button onClick={fetchInvoices}>
        Apply Filter
      </button>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Amount</th>
            <th>Financial Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.invoiceAmount}</td>
              <td>{invoice.financialYear}</td>
              <td>
                <button
                  onClick={() => deleteInvoice(invoice._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;
