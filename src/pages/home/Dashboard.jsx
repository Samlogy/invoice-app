import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import DashboardWidgets from "../../components/Dashboard/DashboardWidgets";
import InvoiceIcon from "../../components/Icons/InvoiceIcon";
import Button from "../../components/Button/Button";
import ClientTable from "../../components/Clients/ClientTable";
import InvoiceTable from "../../components/Invoice/InvoiceTable";
import ProductTable from "../../components/Product/ProductTable";

export default function Dashboard() {
  const navigate = useNavigate();

  const goToNewInvoice = useCallback(() => {
    navigate("/invoices/new");
  }, [navigate]);
  const goToNewProduct = useCallback(() => {
    navigate("/products/new");
  }, [navigate]);
  const goToNewClients = useCallback(() => {
    navigate("/clients/new");
  }, [navigate]);
  // const goToNewIncome = useCallback(() => {
  //   navigate("/incomes/new");
  // }, [navigate]);
  // const goToNewExpense = useCallback(() => {
  //   navigate("/expenses/new");
  // }, [navigate]);

  return (
    <div>
      <div className="p-4">
        <PageTitle title="Dashboard" />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          <DashboardWidgets />

          <Button onClick={goToNewInvoice} addStyle="flex ml-auto w-[10rem] mb-4">
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Invoice </span>
          </Button>
          <div className="mt-1">
            <InvoiceTable />
          </div>

          <Button onClick={goToNewProduct} addStyle="flex ml-auto w-[10rem] mb-4">
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Product </span>
          </Button>
          <div className="mt-4">
            <ProductTable />
          </div>

          <Button onClick={goToNewClients} addStyle="flex ml-auto w-[10rem] mb-4">
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Client </span>
          </Button>
          <div className="mt-4">
            <ClientTable />
          </div>

          {/* <Button onClick={goToNewIncome} block={1}>
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Income </span>
          </Button>
          <div className="mt-4">
            <ClientTable />
            income table
          </div> */}

          {/* <Button onClick={goToNewExpense} block={1}>
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Expense </span>
          </Button>
          <div className="mt-4">
            <ClientTable />
            expense table
          </div> */}
        </div>
      </div>
    </div>
  );
}
