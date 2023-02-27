import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import {
  defaultTdStyle,
  defaultTdActionStyle,
  defaultTdWrapperStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultSearchStyle,
} from "../../constants/defaultStyles";
import ReactPaginate from "react-paginate";
import { getAllInvoiceSelector, setDeleteId } from "../../store/invoiceSlice";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import InvoiceIcon from "../Icons/InvoiceIcon";
import { useAppContext } from "../../context/AppContext";
import EmptyBar from "../Common/EmptyBar";

// Example items, to simulate fetching from another resources.
const itemsPerPage = 10;
const emptySearchForm = {
  invoiceNo: "",
  clientName: "",
  createdAt: "",
  dueDate: "",
  amount: "",
  statusName: "",
  docType: "",
};

export default function InvoiceTable({ showAdvanceSearch = false }) {
  const { initLoading } = useAppContext();
  const dispatch = useDispatch();
  const allInvoices = useSelector(getAllInvoiceSelector);
  const navigate = useNavigate();

  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const invoices = useMemo(() => {
    let filterData = allInvoices.length > 0 ? [...allInvoices].reverse() : [];
    if (searchForm?.invoiceNo?.trim()) {
      filterData = filterData.filter((invoice) =>
        invoice?.invoiceNo.includes(searchForm?.invoiceNo)
      );
    }

    if (searchForm?.clientName) {
      filterData = filterData.filter((invoice) =>
        invoice?.clientName
          .toLowerCase()
          .includes(searchForm?.clientName.toLowerCase())
      );
    }

    if (searchForm?.amount?.trim()) {
      filterData = filterData.filter(
        (invoice) => invoice?.totalAmount === Number(searchForm?.amount)
      );
    }

    if (searchForm?.createdAt) {
      filterData = filterData.filter(
        (invoice) =>
          new Date(invoice?.createdDate).toLocaleDateString() ===
          new Date(searchForm?.createdAt).toLocaleDateString()
      );
    }

    if (searchForm?.dueDate) {
      filterData = filterData.filter(
        (invoice) =>
          new Date(invoice?.dueDate).toLocaleDateString() ===
          new Date(searchForm?.dueDate).toLocaleDateString()
      );
    }

    if (searchForm?.statusName) {
      filterData = filterData.filter(
        (invoice) =>
          invoice?.statusName.toLowerCase() ===
          searchForm?.statusName.toLowerCase()
      );
    }

    if (searchForm?.docType) {
      filterData = filterData.filter(
        (invoice) =>
          invoice?.docType.toLowerCase() === searchForm?.docType.toLowerCase()
      );
    }

    return filterData;
  }, [allInvoices, searchForm]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % invoices.length;
    setItemOffset(newOffset);
  };

  const handleDelete = useCallback(
    (item) => dispatch(setDeleteId(item.id)),
    [dispatch]
  );

  const handleEdit = useCallback(
    (item) => navigate("/invoices/" + item.id),
    [navigate]
  );

  const handlerSearchValue = useCallback((e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => {
      return { ...prev, [name]: value };
    });

    setItemOffset(0);
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(invoices.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(invoices.length / itemsPerPage));
  }, [invoices, itemOffset]);

  const columns = ["invoice #", "client name", "status", "amount", "type"];
  const data = [
    {
      id: "BenuPtgcfyXN39f2fLF7T",
      invoiceNo: "",
      statusIndex: "1",
      statusName: "Draft",
      totalAmount: 1200,
      dueDate: "2023-02-27T10:44:52.409Z",
      createdDate: "2023-02-27T10:45:19.612Z",
      docType: "estimate",
      clientName: "est",
    },
  ];
  const title = "Invoice";
  const advancedSearch = [
    {
      icon: <InvoiceIcon className="h-6 w-6 text-gray-400" />,
      type: "text",
      placeholder: "Invoice No",
      onChange: handlerSearchValue,
      value: searchForm?.invoiceNo,
      name: "invoiceNo",
    },
    {
      icon: <InvoiceIcon className="h-6 w-6 text-gray-400" />,
      type: "text",
      placeholder: "Client Name",
      onChange: handlerSearchValue,
      value: searchForm?.clientName,
      name: "clientName",
    },
    {
      icon: <InvoiceIcon className="h-6 w-6 text-gray-400" />,
      type: "text",
      placeholder: "Amount",
      onChange: handlerSearchValue,
      value: searchForm?.amount,
      name: "amount",
    },
    {
      icon: <InvoiceIcon className="h-6 w-6 text-gray-400" />,
      type: "date",
      placeholder: "Created At",
      onChange: handlerSearchValue,
      value: searchForm?.createdAt,
      name: "createdAt",
    },
    {
      icon: <InvoiceIcon className="h-6 w-6 text-gray-400" />,
      type: "date",
      placeholder: "Due date",
      onChange: handlerSearchValue,
      value: searchForm?.dueDate,
      name: "dueDate",
    },
  ];

  return (
    <>
      {showAdvanceSearch === true && (
        <div className="bg-white rounded-xl px-3 py-3 mb-3">
          <div className="font-title mb-2">Advanced Search</div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
            {advancedSearch.map((item, idx) => (
              <div
                key={idx}
                className="mb-2 lg:mb-0 sm:text-left text-default-color flex flex-row flex-wrap flex-1 gap-3 font-title px-2"
              >
                <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center">
                  {item?.icon}
                </div>
                <input
                  autoComplete="nope"
                  type={item?.type}
                  value={item?.value}
                  placeholder={item?.placeholder}
                  className={defaultSearchStyle}
                  onChange={item?.onChange}
                  name={item?.name}
                />                
              </div>
            ))}
            <div className="mb-2 lg:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2 min-w-[12rem] max-w-[13rem]">
                  <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center">
                    <InvoiceIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <select
                    placeholder="Invoice status"
                    className={`${defaultSearchStyle} bg-white`}
                    onChange={handlerSearchValue}
                    value={searchForm?.statusName}
                    name="statusName"
                  >
                    <option> Status </option>
                    <option value="draft">Draft</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="mb-2 lg:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2 min-w-[12rem] max-w-[13rem]">
                  <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center">
                    <InvoiceIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <select
                    placeholder="Invoice status"
                    className={`${defaultSearchStyle} bg-white`}
                    onChange={handlerSearchValue}
                    value={searchForm?.docType}
                    name="docType"
                  >
                    <option> Type </option>
                    <option value="invoice">Invoice</option>
                    <option value="estimate">Estimate</option>
                  </select>
                </div>
          </div>
        </div>
      )}

      <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3 ">
        <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
          {columns.map((item) => (
            <div className="sm:text-left text-default-color font-title flex-1 uppercase">
              {item}
            </div>
          ))}
          <div className="sm:text-left text-default-color font-title sm:w-11 uppercase">
            Action
          </div>
        </div>

        <div>
          {currentItems &&
            currentItems.map((invoice) => (
              <div className={defaultTdWrapperStyle} key={invoice?.id}>
                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Invoice Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {invoice?.invoiceNo}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Client Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {invoice?.clientName}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Status</div>
                  <div className={defaultTdContent}>
                    <span
                      className={
                        "whitespace-nowrap text-ellipsis overflow-hidden px-3 rounded-xl  py-1 " +
                        (invoice?.statusIndex === "2"
                          ? "bg-red-100 text-red-400"
                          : invoice?.statusIndex === "3"
                          ? "bg-green-200 text-green-600"
                          : "bg-gray-100 text-gray-600 ")
                      }
                    >
                      {invoice?.statusName}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Status</div>
                  <div className={defaultTdContent + " "}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden ">
                      <NumberFormat
                        value={invoice?.totalAmount}
                        className=""
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value, props) => (
                          <span {...props}>{value}</span>
                        )}
                      />
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Type</div>
                  <div className={defaultTdContent + " "}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden uppercase">
                      {invoice?.docType}
                    </span>
                  </div>
                </div>

                <div className={defaultTdActionStyle}>
                  <div className={defaultTdContentTitleStyle}>Action</div>
                  <div className={defaultTdContent}>
                    <Menu
                      menuButton={
                        <MenuButton>
                          <div className="bg-gray-50 px-2 rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </div>
                        </MenuButton>
                      }
                      transition
                    >
                      <MenuItem onClick={() => handleEdit(invoice)}>
                        Detail
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(invoice)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}

          {invoices.length <= 0 && !initLoading && <EmptyBar title={title} />}

          {invoices.length > 0 && (
            <ReactPaginate
              className="inline-flex items-center -space-x-px mt-2"
              previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              nextLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              pageLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              breakLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              nextLabel={">"}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
    </>
  );
}
