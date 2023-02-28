import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/Common/PageTitle";
import Widgets from "../components/Dashboard/Widgets";
import InvoiceIcon from "../components/Icons/InvoiceIcon";
import Button from "../components/Button/Button";
import ClientTable from "../components/Clients/ClientTable";
import InvoiceTable from "../components/Invoice/InvoiceTable";
import ProductTable from "../components/Product/ProductTable";

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

  const TABLES = [
    {
      icon: <InvoiceIcon />,
      button: "New Invoice",
      title: "Invoices",
      link: goToNewInvoice,
      table: <InvoiceTable />,
    },
    {
      icon: <InvoiceIcon />,
      button: "New Client",
      title: "Clients",
      link: goToNewClients,
      table: <ClientTable />,
    },
    {
      icon: <InvoiceIcon />,
      button: "New Product",
      title: "Products",
      link: goToNewProduct,
      table: <ProductTable />,
    },
  ];

  return (
    <div>
      <div className="p-4">
        <PageTitle title="Dashboard" />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          <Widgets />

          {TABLES.map((item) => (
            <div key={item?.title} className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <PageTitle title={item?.title} />
                <Button onClick={item?.link} addStyle="flex w-[10rem]">
                  {item?.icon}
                  <span className="inline-block ml-2"> {item?.button} </span>
                </Button>
              </div>
              <div className="mt-1">{item?.table}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
