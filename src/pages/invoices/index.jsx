// import React from "react";
// import InvoiceEstimateTemplate from "../../components/InvoiceEstimateTemplate";

// export default function InvoiceListScreen() {
//   return <InvoiceEstimateTemplate title="invoices" />;
// }

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PageTitle from "../../components/Common/PageTitle";
import InvoiceIcon from "../../components/Icons/InvoiceIcon";
import InvoiceTable from "../../components/Invoice/InvoiceTable";

export default function InvoiceEstimateTemplate() {
  const navigate = useNavigate();

  const goToNew = useCallback(() => {
    navigate(`/invoices/new`);
  }, [navigate]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
        <div className="p-4">
          <PageTitle title="Invoices / Estimates" />
        </div>
        <Button onClick={goToNew} addStyle="flex w-[10rem]">
          <InvoiceIcon />
          <span className="inline-block ml-2"> Create </span>
        </Button>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full px-4 mb-4 sm:mb-1">
          <InvoiceTable showAdvanceSearch />
        </div>
      </div>
    </div>
  );
}
