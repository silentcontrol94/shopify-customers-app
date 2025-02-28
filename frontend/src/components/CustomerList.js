import React, { useState, useCallback, useEffect } from "react";
import { fetchCustomers } from "../services/api";
import "../styles/index.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2024-01-01T00:00:00Z');
  const [filterDate, setFilterDate] = useState(selectedDate);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const loadCustomers = useCallback(async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers(filterDate);
        setCustomers(data);
      } catch (error) {
        console.error("Müşteri verileri yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
  }, [filterDate]);

  useEffect(() => {
      loadCustomers();
  }, [filterDate]);

  const handleFilter = () => {
      setFilterDate(selectedDate);
  };

    return (
      <div className="container">
        <h2>Shopify Müşterileri</h2>

        <div className="filter-container">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <button onClick={handleFilter} disabled={loading}>
            {loading ? "Yükleniyor..." : "Filtrele"}
          </button>
        </div>

        {loading && <div className="loading-container"><div className="spinner"></div></div>}

        {!loading && customers.length > 0 && (
          <div className="table-container">
          <table className="customer-table">
              <thead>
                  <tr>
                      <th>İsim</th>
                      <th>E-posta</th>
                      <th>Güncellenme Tarihi</th>
                  </tr>
              </thead>
              <tbody>
                  {customers.map((customer) => (
                      <tr key={customer.id}>
                          <td>{customer.firstName} {customer.lastName}</td>
                          <td>{customer.email}</td>
                          <td>{new Date(customer.updatedAt).toLocaleString()}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
        )}

        {!loading && customers.length === 0 && <p className="no-customers">Hiç müşteri bulunamadı.</p>}
      </div>
    );
};

export default CustomerList;
