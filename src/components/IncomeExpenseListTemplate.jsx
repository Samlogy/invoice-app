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
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
        <div className="p-4">
          <PageTitle title={title} />
        </div>

        <div className="p-4">
          <Button size="sm" block={1} onClick={goToNew}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={"M15 19l-7-7 7-7"}
              />
            </svg>
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
