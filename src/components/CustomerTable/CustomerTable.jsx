import axios from "axios";
import { useEffect, useState } from "react";
import CustomerGraph from "./CustomerGraph";

export default function CustomerTable() {
  let [customersData, setCustomersData] = useState([]);
  let [transactionData, setTransactionData] = useState([]);
  let [searchedData, setSearchedData] = useState([]);
  let [show , setShow] = useState()

  useEffect(() => {
    let getData = async () => {
        let customersResponse = await axios.get("http://localhost:3001/customers");
        setCustomersData(customersResponse.data);
        let transactionsResponse = await axios.get("http://localhost:3001/transactions");
        setTransactionData(transactionsResponse.data);
        setSearchedData(transactionsResponse.data);
    };
    getData();
  }, []);

  function displayProduct(data) {
    return data.map((transaction, index) => {
      let customer = customersData.find((customer) => Number(customer.id) === Number(transaction.customer_id));
      return (
        <tr key={index} onClick={()=>setShow(transaction.customer_id)}>
          <td>{transaction.id}</td>
          <td>{customer.name}</td>
          <td>{transaction.date}</td>
          <td>{transaction.amount}</td>
        </tr>
      );
    });
  }
  let handleName = (e) => {
    let searchName = e.target.value.toLowerCase();
    let filteredCustomer = transactionData.filter((transaction) => {
      let customer = customersData.find((customer) => Number(customer.id) === Number(transaction.customer_id));
      return customer && customer.name.toLowerCase().includes(searchName);
    });
    setSearchedData(filteredCustomer);
  };
  let handleAmount = (e) => {
    let searchName = e.target.value.toString()
    let filteredAmount = transactionData.filter((transaction) => {
      return transaction && transaction.amount.toString().includes(searchName)
    });
    setSearchedData(filteredAmount);
  };

  return (
    <>
      <div className="container text-start">
        <label htmlFor="nameInputSearch">Search by name</label>
        <input
          type="text"
          className="form-control"
          id="nameInputSearch"
          onChange={handleName}
        />
        <label htmlFor="amountInputSearch" className="mt-3">Search by amount</label>
        <input type="number" id="amountInputSearch" onChange={handleAmount} className="form-control mb-3" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody id="displayCustomers">
            {displayProduct(searchedData)}
          </tbody>
        </table>
        {show != null &&  <CustomerGraph slectedTransaction={show} data={searchedData} customer={customersData}/>
        
        }
      </div>
    </>
  );
}
