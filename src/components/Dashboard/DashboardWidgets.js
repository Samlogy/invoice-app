import React from "react";
import LottieMoney from "../LotiIcon/LottieMoney";
// import LottieProduct from "../LotiIcon/LottieProduct";
// import LottieInvoice from "../LotiIcon/LottieInvoice";
// import LottiePersons from "../LotiIcon/LottiePersons";
import { useSelector } from "react-redux";
import { getAllClientsSelector } from "../../store/clientSlice";
import { getAllProductSelector } from "../../store/productSlice";
import {
  getAllInvoiceSelector,
  getTotalBalance,
} from "../../store/invoiceSlice";
import NumberFormat from "react-number-format";

function DashboardWidgets() {
  const clients = useSelector(getAllClientsSelector);
  const products = useSelector(getAllProductSelector);
  const allInvoices = useSelector(getAllInvoiceSelector);

  const totalBalance = useSelector(getTotalBalance);
  const expenses = 0;
  const incomes = 0;

  const OPTIONS = [
    {
      label: "Incomes",
      icon: <LottieMoney loop className="h-20" />,
      data: incomes,
    },
    {
      label: "Expenses",
      icon: <LottieMoney loop className="h-20" />,
      data: expenses,
    },
    {
      label: "Invoices",
      icon: <LottieMoney loop className="h-20" />,
      data: allInvoices?.length,
    },
    {
      label: "Products",
      icon: <LottieMoney loop className="h-20" />,
      data: products?.length,
    },
    {
      label: "Clients",
      icon: <LottieMoney loop className="h-20" />,
      data: clients?.length,
    },
    {
      label: "Total Balance",
      icon: <LottieMoney loop className="h-20" />,
      data: totalBalance,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap">
        {OPTIONS.map((item, idx) => (
          <div key={idx} className="w-full mb-3 md:w-1/2">
            <div className="p-4 bg-white rounded-xl md:mr-4 hover:shadow-sm">
              <div className="font-title"> {item?.label} </div>
              <div className="flex justify-between items-center">
                <div className="h-30">{item?.icon}</div>
                <div className="text-2xl mr-2">
                  <NumberFormat
                    value={item?.data}
                    className=""
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value, props) => (
                      <span {...props}>{value}</span>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardWidgets;
