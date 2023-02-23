import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/Common/PageTitle";
import DashboardWidgets from "../components/Dashboard/DashboardWidgets";
import InvoiceIcon from "../components/Icons/InvoiceIcon";
import Button from "../components/Button/Button";
import ClientTable from "../components/Clients/ClientTable";
import InvoiceTable from "../components/Invoice/InvoiceTable";

export default function DashboardScreen() {
  const navigate = useNavigate();

  const goToNewInvoice = useCallback(() => {
    navigate("/invoices/new");
  }, [navigate]);
  const goToNewEstimate = useCallback(() => {
    navigate("/estimates/new");
  }, [navigate]);
  const goToNewExpense = useCallback(() => {
    navigate("/expenses/new");
  }, [navigate]);
  const goToNewIncome = useCallback(() => {
    navigate("/incomes/new");
  }, [navigate]);

  return (
    <div>
      <div className="p-4">
        <PageTitle title="Dashboard" />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          <DashboardWidgets />

          <Button onClick={goToNewInvoice} block={1}>
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Invoice </span>
          </Button>
          <div className="mt-1">
            <InvoiceTable />
          </div>

          <Button onClick={goToNewEstimate} block={1}>
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Estimate </span>
          </Button>
          <div className="mt-4">
            <ClientTable />
          </div>

          <Button onClick={goToNewExpense} block={1}>
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Expense </span>
          </Button>
          <div className="mt-4">
            <ClientTable />
          </div>

          <Button onClick={goToNewIncome} block={1}>
            <InvoiceIcon />
            <span className="inline-block ml-2"> New Income </span>
          </Button>
          <div className="mt-4">
            <ClientTable />
          </div>
        </div>

        {/* <div className="w-full lg:w-2/6 pl-4 pr-4 sm:pl-4 sm:pr-2">
          <div>
            <Button onClick={goToNewInvoice} block={1}>
              <InvoiceIcon />
              <span className="inline-block ml-2"> Add New Invoice </span>
            </Button>
          </div>

          <QuickEditCompany isShowDetail={false} />
          <div className="mt-4">
            <QuickAddClient />
          </div>
        </div> */}
      </div>
    </div>
  );
}
