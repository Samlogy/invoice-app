import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";
import PageTitle from "./Common/PageTitle";
import IncomeTable from "./income/IncomeTable";

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
            {title}
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
