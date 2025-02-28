import React from "react";
import CustomerList from "./components/CustomerList";
import "./styles/index.css";

function App() {
  return (
    <div>
      <h1 className="container" style={{textAlign:'center',margin: '20px auto 20px'}}>Shopify Müşteri Uygulaması</h1>
      <CustomerList />
    </div>
  );
}

export default App;