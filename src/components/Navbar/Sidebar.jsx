import { motion } from "framer-motion";
import React, { useCallback, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { getCompanyData } from "../../store/companySlice";
import { getAllLocalData, removeAllData } from "../../utils/storage";
import Button from "../Button/Button";
import ClientPlusIcon from "../Icons/ClientPlusIcon";
import HomeIcon from "../Icons/HomeIcon";
import InvoiceIcon from "../Icons/InvoiceIcon";
import ProductIcon from "../Icons/ProductIcon";
import InvoiceNavbarLoading from "../Loading/InvoiceNavbarLoading";
import {
  CLIENTS_KEY,
  CLIENT_FORM_KEY,
  COMPANY_KEY,
  DEFAULT_INVOICE_BG,
  DEFAULT_INVOICE_COLOR,
  INVOICES_KEY,
  INVOICE_DETAILS,
  INVOICE_FORM_KEY,
  PRODUCTS_KEY,
  PRODUCT_FORM_KEY,
} from "../../constants/localKeys";

const NAV_DATA = [
  {
    title: "Home",
    link: "/",
    Icon: HomeIcon,
  },
  {
    title: "Clients",
    link: "clients",
    Icon: ClientPlusIcon,
  },
  {
    title: "Products",
    link: "products",
    Icon: ProductIcon,
  },
  {
    title: "Invoices",
    link: "invoices",
    Icon: InvoiceIcon,
  },
  {
    title: "Profile",
    link: "profile",
    Icon: ClientPlusIcon,
  },
];

const navDefaultClasses =
  "fixed inset-0 duration-200 transform lg:opacity-100 z-10 w-72 bg-white h-screen p-3";

const navItemDefaultClasses = "block px-4 py-2 rounded-md flex flex-1";

export default function Sidebar() {
  const { showNavbar, initLoading, toggleNavbar } = useAppContext();
  const company = useSelector(getCompanyData);

  const onClickNavbar = useCallback(() => {
    const width = window.innerWidth;

    if (width <= 767 && showNavbar) {
      toggleNavbar();
    }
  }, [showNavbar, toggleNavbar]);

  const clearData = async () => {
    removeAllData();
  };
  const importData = (e) => {
    const file = e.target.files[0];
    let allowedExtensions = /(json)$/i;
    const isValid = allowedExtensions.exec(file.type);

    if (!isValid) {
      alert("Not Valid File Format !");
      e.target.value = null;
      return;
    }
    // read file content
    // separate each object data + associate a key with object
    // save each object + key in indexDB
  };
  const exportData = async () => {
    const exportName = "business-app-db";
    let appData = await getAllLocalData([
      CLIENTS_KEY,
      CLIENT_FORM_KEY,
      COMPANY_KEY,
      DEFAULT_INVOICE_BG,
      DEFAULT_INVOICE_COLOR,
      INVOICES_KEY,
      INVOICE_DETAILS,
      INVOICE_FORM_KEY,
      PRODUCTS_KEY,
      PRODUCT_FORM_KEY,
    ]);

    const dataStr = JSON.stringify({ ...appData });

    console.log("str: ", dataStr);
    // const a =
    //   "data:text/json;charset=utf-8," +
    //   encodeURIComponent(dataStr);

    // const downloadAnchorNode = document.createElement("a");
    // downloadAnchorNode.setAttribute("href", dataStr);
    // downloadAnchorNode.setAttribute("download", exportName + ".json");
    // document.body.appendChild(downloadAnchorNode); // required for firefox
    // downloadAnchorNode.click();
    // downloadAnchorNode.remove();
  };

  const inputRef = useRef(null);
  const onClickImport = () => inputRef?.current?.click();

  return (
    <>
      <nav
        className={
          showNavbar
            ? navDefaultClasses + " translate-x-0 ease-in"
            : navDefaultClasses + " -translate-x-full ease-out"
        }
      >
        <div className="flex justify-between">
          <motion.span
            className="font-bold font-title text-2xl sm:text-2xl p-2 flex justify-center items-center"
            initial={{
              translateX: -300,
            }}
            animate={{
              translateX: showNavbar ? -40 : -300,
              color: "#0066FF",
            }}
            transition={{
              type: "spring",
              damping: 18,
            }}
          >
            <span className="nav-loading">
              <InvoiceNavbarLoading loop />
            </span>
            Business App
          </motion.span>
        </div>

        {initLoading && <Skeleton className="px-4 py-5 rounded-md" />}
        {!!company?.avatar && !initLoading && (
          <motion.span
            className={
              navItemDefaultClasses + " bg-gray-50 flex items-center px-3"
            }
          >
            <img
              className={"object-cover h-10 w-10 rounded-lg"}
              src={company?.avatar}
              alt="upload_image"
            />
            <span className="flex-1 pl-2 font-title rounded-r py-1 border-r-4 border-indigo-400 flex items-center whitespace-nowrap text-ellipsis overflow-hidden ">
              {company?.name}
            </span>
          </motion.span>
        )}
        <ul className="mt-4">
          {NAV_DATA.map(({ title, link, Icon }) => (
            <li key={title} className="mb-2">
              <NavLink
                to={link}
                className={" rounded-md side-link"}
                onClick={onClickNavbar}
              >
                {({ isActive }) => (
                  <motion.span
                    key={`${title}_nav_item`}
                    className={
                      isActive
                        ? navItemDefaultClasses + " primary-self-text "
                        : navItemDefaultClasses + " text-default-color "
                    }
                    whileHover={{
                      color: "rgb(0, 102, 255)",
                      backgroundColor: "rgba(0, 102, 255, 0.1)",
                      translateX: isActive ? 0 : 4,
                      transition: {
                        backgroundColor: {
                          type: "spring",
                          damping: 18,
                        },
                      },
                    }}
                    whileTap={{ scale: isActive ? 1 : 0.9 }}
                  >
                    <Icon className="h-6 w-6 mr-4" />
                    {title}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <hr />
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          onChange={importData}
        />
        <Button
          onClick={clearData}
          size="sm"
          addStyle="mb-4 mt-4"
          block
          outlined
        >
          <span className="inline-block ml-2"> Clear Data </span>
        </Button>
        <Button
          onClick={onClickImport}
          size="sm"
          addStyle="mb-4"
          block
          outlined
        >
          <span className="inline-block ml-2"> Import Data </span>
        </Button>
        <Button onClick={exportData} size="sm" addStyle="mb-4" block outlined>
          <span className="inline-block ml-2"> Export Data </span>
        </Button>
      </nav>
    </>
  );
}
