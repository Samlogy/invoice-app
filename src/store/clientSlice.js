import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { CLIENTS_KEY, CLIENT_FORM_KEY } from "../constants/localKeys";
import { saveSingleLocalData } from "../utils/storage";

const initialState = {
  openClientSelector: false,
  selectedClient: null,
  data: [],
  newForm: {
    id: nanoid(),
    image: "",
    name: "",
    email: "",
    createdAt: "",
    address: "",
    editedAt: "",
    mobileNo: "",
  },
  editedID: null,
  deletedID: null,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addNewClient: (state, action) => {
      const newDatas = [...state.data, action.payload];
      state.data = newDatas;
      saveSingleLocalData(CLIENTS_KEY, newDatas);

      const reNewForm = {
        id: nanoid(),
        image: "",
        name: "",
        email: "",
        createdAt: "",
        editedAt: "",
        mobileNo: "",
        address: "",
      };

      state.newForm = { ...reNewForm };
      saveSingleLocalData(CLIENT_FORM_KEY, reNewForm);
    },

    updateNewClientForm: (state, action) => {
      state.newForm = { ...action.payload };
      saveSingleLocalData(CLIENT_FORM_KEY, {
        ...state.newForm,
        editedAt: new Date().toLocaleDateString(),
      });
    },

    updateNewClientFormField: (state, action) => {
      state.newForm[action.payload.key] = action.payload.value;
      saveSingleLocalData(CLIENT_FORM_KEY, {
        ...state.newForm,
        editedAt: new Date().toLocaleDateString(),
      });
    },

    setAllClients: (state, action) => {
      state.data = action.payload;
    },

    setDeleteId: (state, action) => {
      state.deletedID = action.payload;
    },

    setEditedId: (state, action) => {
      state.editedID = action.payload;
    },

    onConfirmDeletedClient: (state, action) => {
      const newDatas = state.data.filter(
        (client) => client.id !== state.deletedID
      );
      state.data = newDatas;
      state.deletedID = null;
      saveSingleLocalData(CLIENTS_KEY, newDatas);
    },

    onConfirmEditClient: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (client) => client.id === state.editedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.editedID = null;
      saveSingleLocalData(CLIENTS_KEY, [...state.data]);
    },

    setOpenClientSelector: (state, action) => {
      state.openClientSelector = action.payload;
      if (!action.payload) {
        state.selectedClient = null;
      }
    },

    setClientSelector: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (client) => client.id === action.payload
      );
      if (isFindIndex !== -1) {
        state.selectedClient = state.data[isFindIndex];
      }
    },
  },
});

export const {
  addNewClient,
  updateNewClientForm,
  updateNewClientFormField,
  setAllClients,
  setDeleteId,
  setEditedId,
  onConfirmDeletedClient,
  onConfirmEditClient,
  setOpenClientSelector,
  setClientSelector,
} = clientsSlice.actions;

export const getAllClientsSelector = (state) => state.clients.data;

export const getClientNewForm = (state) => state.clients.newForm;

export const getDeletedClientForm = (state) => state.clients.deletedID;

export const getEditedIdForm = (state) => state.clients.editedID;

export const getIsOpenClientSelector = (state) =>
  state.clients.openClientSelector;

export const getSelectedClient = (state) => state.clients.selectedClient;

export default clientsSlice.reducer;
