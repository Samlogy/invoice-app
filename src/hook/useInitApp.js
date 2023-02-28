import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  CLIENTS_KEY,
  CLIENT_FORM_KEY,
  COMPANY_KEY,
  DEFAULT_INVOICE_BG,
  DEFAULT_INVOICE_COLOR,
  INVOICES_KEY,
  // APP_CONTEXT,
  INVOICE_DETAILS,
  INVOICE_FORM_KEY,
  PRODUCTS_KEY,
  PRODUCT_FORM_KEY,
} from "../constants/localKeys";
import { useAppContext } from "../context/AppContext";
import { setAllClients, updateNewClientForm } from "../store/clientSlice";
import { updateCompanyData } from "../store/companySlice";
import {
  setAllInvoice,
  setAllInvoiceDetailList,
  updateNewInvoiceForm,
} from "../store/invoiceSlice";
import { setAllProducts, updateNewProductForm } from "../store/productSlice";
import { getAllLocalData } from "../utils/storage";

const useInitApp = () => {
  const dispatch = useDispatch();
  const { setInitLoading } = useAppContext();

  const initialSetData = useCallback(async () => {
    try {
      const [
        companyData,
        clientNewForm,
        clients,
        productNewForm,
        products,
        invoices,
        invoiceDetailList,
        invoiceNewForm,
        defaultColor,
        defaultBackground,
      ] = getAllLocalData([
        COMPANY_KEY,
        CLIENTS_KEY,
        CLIENT_FORM_KEY,
        PRODUCTS_KEY,
        PRODUCT_FORM_KEY,
        INVOICES_KEY,
        INVOICE_DETAILS,
        INVOICE_FORM_KEY,
        DEFAULT_INVOICE_BG,
        DEFAULT_INVOICE_COLOR,
      ]);

      if (companyData) {
        dispatch(updateCompanyData(companyData));
      }

      if (clientNewForm) {
        dispatch(updateNewClientForm(clientNewForm));
      }

      if (clients) {
        dispatch(setAllClients(clients));
      }

      if (productNewForm) {
        dispatch(updateNewProductForm(productNewForm));
      }

      if (products) {
        dispatch(setAllProducts(products));
      }

      if (invoiceNewForm) {
        dispatch(updateNewInvoiceForm(invoiceNewForm));
      }

      if (invoices) {
        dispatch(setAllInvoice(invoices));
      }

      if (invoiceDetailList) {
        dispatch(setAllInvoiceDetailList(invoiceDetailList));
      }

      if (defaultColor) {
      }

      if (defaultBackground) {
      }
    } catch (e) {
      console.log(e);
    } finally {
      setInitLoading(false);
    }
  }, [dispatch, setInitLoading]);

  return {
    initialSetData,
  };
};

export default useInitApp;
