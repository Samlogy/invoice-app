import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Routers,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import Dashboard from "./pages/home/Dashboard";
import Profile from "./pages/Profile";

import ClientList from "./pages/clients";
import AddClient from "./pages/clients/AddClient"

import ProductList from "./pages/products";
import AddProduct from "./pages/products/AddProduct";

import InvoiceList from "./pages/invoices";
import InvoiceDetails from "./pages/invoices/InvoiceDetails";

import PageLoading from "./components/Common/PageLoading";
import Container from "./components/Container/Container";

import ClientDeleteConfirm from "./components/Clients/ClientDeleteConfirm";
import ClientEditModal from "./components/Clients/ClientEditModal";
import ClientChooseModal from "./components/Clients/ClientChooseModal";

import ProductDeleteConfirm from "./components/Product/ProductDeleteConfirm";
import ProductEditModal from "./components/Product/ProductEditModal";
import ProductChoosenModal from "./components/Product/ProductChoosenModal";

import InvoiceSettingModal from "./components/Invoice/InvoiceSettingModal";
import InvoiceConfirmModal from "./components/Invoice/InvoiceConfirmModal";
import InvoiceDeleteConfirm from "./components/Invoice/InvoiceDeleteConfirm";

import useInitApp from "./hook/useInitApp";

export default function App() {
  const { initialSetData } = useInitApp();

  useEffect(() => {
    initialSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Routing />;
}

function Routing() {
  return (
    <Routers>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} exact />

          <Route path="/profile" element={<Profile />} exact />

          <Route path="clients">
            <Route path="" element={<ClientList />} exact />
            <Route path="new" element={<AddClient />} exact />
          </Route>

          <Route path="products">
            <Route path="" element={<ProductList />} exact />
            <Route path="new" element={<AddProduct />} exact />
          </Route>

          <Route path="invoices">
            <Route path="" element={<InvoiceList />} exact />
            <Route path=":id" element={<InvoiceDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      <ToastContainer />

      <ClientDeleteConfirm />
      <ClientEditModal />
      <ClientChooseModal />

      <ProductDeleteConfirm />
      <ProductEditModal />
      <ProductChoosenModal />

      <InvoiceSettingModal />
      <InvoiceConfirmModal />
      <InvoiceDeleteConfirm />

      <PageLoading />
    </Routers>
  );
}
