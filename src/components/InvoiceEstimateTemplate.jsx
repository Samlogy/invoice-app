import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";
import PageTitle from "./Common/PageTitle";
import InvoiceIcon from "./Icons/InvoiceIcon";
import InvoiceTable from "./Invoice/InvoiceTable";

export default function InvoiceEstimateTemplate({ title }) {
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
          <Button size="sm" block={1} onClick={goToNew}>
            {title}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full px-4 mb-4 sm:mb-1">
          {title === "invoices" ? (
            <InvoiceTable showAdvanceSearch />
          ) : (
            <InvoiceTable showAdvanceSearch />
          )}
        </div>
      </div>
    </div>
  );
}
