import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./Common/PageTitle";
import IncomeTable from "./income/IncomeTable"
import Button from "./Button/Button";
import InvoiceIcon from "./Icons/InvoiceIcon";

export default function IncomeExpenseListTemplate({ title }) {
  const navigate = useNavigate();

  const goToNew = useCallback(() => {
    navigate(`/${title}/new`);
  }, [navigate, title]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap p-4">
        <div className="sm:mr-4">
          <PageTitle title={title} />
        </div>
        <div className="flex-1">
          <Button onClick={goToNew} block={1} size="md">
            <InvoiceIcon />
            <span className="inline-block ml-2"> Add New {title} </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          {title === "incomes" ? (
            <IncomeTable  showAdvanceSearch />
          ) : (
            <IncomeTable  showAdvanceSearch />
          )}
        </div>
      </div>
    </div>
  );
}
