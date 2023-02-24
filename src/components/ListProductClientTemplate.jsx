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
      <div className="p-4">
        <PageTitle title={title} />
      </div>

      <Button onClick={goToNew} block={1}>
        <InvoiceIcon />
        <span className="inline-block ml-2 capitalize"> New {title} </span>
      </Button>
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
