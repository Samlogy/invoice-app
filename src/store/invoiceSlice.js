import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
  DEFAULT_INVOICE_BG,
  DEFAULT_INVOICE_COLOR,
  INVOICES_KEY,
  INVOICE_DETAILS,
  INVOICE_FORM_KEY,
} from "../constants/localKeys";
import colorData from "../shared/colorData.json";
import imageData from "../shared/imageData.json";
import { saveSingleLocalData } from "../utils/storage";

const initialState = {
  isConfirmModal: false,
  isConfirm: false,
  settingOpen: false,
  defaultColor: colorData[0],
  defaultBgImage: imageData[0],
  colors: colorData,
  images: imageData,
  data: [],
  detailList: [],
  deletedID: null,
  currentEditedID: null,
  lang: "en",
  newForm: {
    id: nanoid(),
    invoiceNo: "",
    statusIndex: "1",
    statusName: "Draft",
    docType: "invoice",
    totalAmount: 1200,
    color: colorData[0],
    backgroundImage: imageData[0],
    dueDate: new Date().toLocaleDateString(),
    createdDate: new Date().toLocaleDateString(),
    currencyUnit: "$",
    clientDetail: {
      id: nanoid(),
      image: "",
      name: "",
      email: "",
      createdAt: "",
      editedAt: "",
      mobileNo: "",
    },
    products: [
      {
        id: nanoid(),
        image: "",
        productID: "",
        name: "",
        amount: 1200,
        quantity: 1,
        createdAt: new Date().toLocaleDateString(),
      },
    ],
    taxes: [],
  },
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setAllInvoice: (state, action) => {
      state.data = [...action.payload];
    },

    setAllInvoiceDetailList: (state, action) => {
      state.detailList = [...action.payload];
    },

    setNewInvoices: (state, action) => {
      const { payload } = action;

      const id = nanoid();

      const {
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientDetail,
        docType,
      } = payload;

      const newInvoice = {
        id,
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        docType,
        clientName: clientDetail?.name,
      };

      const updateState = [...state.data, newInvoice];
      state.data = updateState;
      saveSingleLocalData(INVOICES_KEY, updateState);

      const newDetailList = [...state.detailList, { ...payload, id }];
      state.detailList = newDetailList;
      saveSingleLocalData(INVOICE_DETAILS, newDetailList);
    },

    setDefaultColor: (state, action) => {
      const newColor = action.payload;
      state.defaultColor = newColor;
      saveSingleLocalData(DEFAULT_INVOICE_COLOR, newColor);
    },

    setDefaultBackground: (state, action) => {
      const newBackground = action.payload;
      state.defaultBgImage = newBackground;
      saveSingleLocalData(DEFAULT_INVOICE_BG, newBackground);
    },

    setDeleteId: (state, action) => {
      state.deletedID = action.payload;
    },

    setEditedId: (state, action) => {
      state.currentEditedID = action.payload;
    },

    onConfirmDeletedInvoice: (state, action) => {
      const newDatas = state.data.filter(
        (invoice) => invoice.id !== state.deletedID
      );
      state.data = newDatas;

      const newDetails = state.detailList.filter(
        (invoice) => invoice.id !== state.deletedID
      );

      state.deletedID = null;
      saveSingleLocalData(INVOICES_KEY, newDatas);
      saveSingleLocalData(INVOICE_DETAILS, newDetails);
    },

    onConfirmEditInvoice: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (product) => product.id === state.currentEditedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.currentEditedID = null;
      saveSingleLocalData(INVOICES_KEY, [...state.data]);
    },

    updateNewInvoiceFormField: (state, action) => {
      state.newForm[action.payload.key] = action.payload.value;
      const newForm = { ...state.newForm };
      saveSingleLocalData(
        INVOICE_FORM_KEY,
        JSON.parse(JSON.stringify(newForm))
      );
    },

    updateNewInvoiceForm: (state, action) => {
      state.newForm = { ...action.payload };
      saveSingleLocalData(INVOICE_FORM_KEY, { ...state.newForm });
    },

    updateExisitingInvoiceForm: (state, action) => {
      const {
        id,
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientDetail,
      } = action.payload;

      const findIndexOfList = state.data.findIndex(
        (product) => product.id === id
      );

      const newInvoice = {
        id,
        invoiceNo,
        statusIndex,
        statusName,
        totalAmount,
        dueDate,
        createdDate,
        clientName: clientDetail?.name,
      };

      if (findIndexOfList !== -1) {
        state.data[findIndexOfList] = { ...newInvoice };
      }
      const findIndexOfDetail = state.detailList.findIndex(
        (product) => product.id === id
      );

      if (findIndexOfDetail !== -1) {
        state.detailList[findIndexOfDetail] = { ...action.payload };
      }

      saveSingleLocalData(INVOICES_KEY, [...state.data]);
      saveSingleLocalData(INVOICE_DETAILS, [...state.detailList]);
    },

    setSettingModalOpen: (state, action) => {
      state.settingOpen = action.payload;
    },

    setConfirmModalOpen: (state, action) => {
      state.isConfirmModal = action.payload;
    },

    setIsConfirm: (state, action) => {
      state.isConfirm = action.payload;
    },

    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setDocType: (state, action) => {
      state.newForm.docType = action.payload;
    },
  },
});

export const {
  setAllInvoice,
  setAllInvoiceDetailList,
  setNewInvoices,
  setDefaultColor,
  setDefaultBackground,
  setDeleteId,
  setEditedId,
  setSettingModalOpen,
  setConfirmModalOpen,
  setIsConfirm,
  onConfirmDeletedInvoice,
  onConfirmEditInvoice,
  updateNewInvoiceForm,
  updateNewInvoiceFormField,
  updateExisitingInvoiceForm,
  setLang,
  setDocType,
} = invoiceSlice.actions;

export const getAllInvoiceSelector = (state) => state.invoices.data;

export const getAllColorSelector = (state) => state.invoices.colors;

export const getAllImageSelector = (state) => state.invoices.images;

export const getCurrentBGImage = (state) => state.invoices.defaultBgImage;

export const getCurrentColor = (state) => state.invoices.defaultColor;

export const getAllInvoiceDetailSelector = (state) => state.invoices.detailList;

export const getInvoiceDetailByID = (id) => (state) =>
  state.invoices.detailList.find((detail) => detail.id === id);

export const getDeletedInvoiceForm = (state) => state.invoices.deletedID;

export const getInvoiceNewForm = (state) => state.invoices.newForm;

export const getInvoiceSettingModal = (state) => state.invoices.settingOpen;

export const getIsInvoiceConfirmModal = (state) =>
  state.invoices.isConfirmModal;

export const getIsConfirm = (state) => state.invoices.isConfirm;

export const getLang = (state) => state.invoices.lang;
export const getDocType = (state) => state.invoices.newForm.docType;

export const getTotalBalance = (state) =>
  state.invoices.data.reduce((prev, next) => {
    return prev + (next.totalAmount || 0);
  }, 0);

export default invoiceSlice.reducer;
