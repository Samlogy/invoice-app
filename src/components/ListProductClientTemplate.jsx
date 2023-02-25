import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./Common/PageTitle";
import ProductTable from "./Product/ProductTable";
import ClientTable from "./Clients/ClientTable";
import Button from "./Button/Button";
import InvoiceIcon from "./Icons/InvoiceIcon";

export default function TemplateProductClient({ title }) {
  const navigate = useNavigate();

  const goToNew = useCallback(() => {
    navigate(`/${title}/new`);
  }, [navigate, title]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
        <div className="p-4">
          <PageTitle title={title} />
        </div>

        <div className="p-4">
          <Button addStyle="flex ml-auto w-[10rem] mb-4 capitalize" onClick={goToNew}>
            <InvoiceIcon />
            Add {title}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          {title === "products" ? (
            <ProductTable showAdvanceSearch />
          ) : (
            <ClientTable showAdvanceSearch />
          )}
        </div>
      </div>
    </div>
  );
}
