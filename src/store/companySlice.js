import { createSlice } from "@reduxjs/toolkit";
import { COMPANY_KEY } from "../constants/localKeys";
import { saveSingleLocalData } from "../utils/storage";

const initialState = {
  data: {
    id: "companyID",
    avatar: "",
    name: "",
    email: "",
    mobile: "",
    address: "",
    website: "",
  },
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateCompanyData: (state, action) => {
      try {
        const { avatar, address, name, email, mobile, website } =
          action.payload;
        state.data.avatar = avatar ? avatar : "";
        state.data.address = address ? address : "";
        state.data.name = name ? name : "";
        state.data.email = email ? email : "";
        state.data.mobile = mobile ? mobile : "";
        state.data.website = website ? website : "";
        saveSingleLocalData(COMPANY_KEY, action.payload);
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export const { updateCompanyData } = companySlice.actions;

export const getCompanyData = (state) => state.company.data;

export default companySlice.reducer;
