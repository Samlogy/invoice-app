import React, { useCallback, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
import ImageUpload from "../components/Common/ImageUpload";
import PageTitle from "../components/Common/PageTitle";
import { getCompanyData, updateCompanyData } from "../store/companySlice";
import { useAppContext } from "../context/AppContext";
import {
  defaultInputStyle,
  defaultInputInvalidStyle,
  defaultInputLargeStyle,
  defaultInputLargeInvalidStyle,
  defaultSkeletonLargeStyle,
  defaultSkeletonNormalStyle,
} from "../constants/defaultStyles";

const emptyForm = {
  id: "",
  avatar: "",
  name: "",
  email: "",
  mobile: "",
  address: "",
  website: ""
};

export default function Profile() {
  const dispatch = useDispatch();
  const company = useSelector(getCompanyData);
  const { initLoading: isInitLoading } = useAppContext();
  const [isTouched, setIsTouched] = useState(false);
  const [companyForm, setCompanyForm] = useState(emptyForm);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );

  const onChangeImage = useCallback((str) => {
    setCompanyForm((prev) => ({ ...prev, avatar: str }));
  }, []);

  const handlerCompanyValue = useCallback((event, keyName) => {
    const value = event.target.value;
    setCompanyForm((prev) => ({ ...prev, [keyName]: value }));
  }, []);

  const submitHandler = useCallback(() => {
    setIsTouched(true);

    const isValid = Object.keys(validForm).every((key) => validForm[key]);

    if (!isValid) {
      toast.error("Invalid Company Form!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    toast.success("Wow so easy to Update!", {
      position: "bottom-center",
      autoClose: 2000,
    });

    dispatch(updateCompanyData(companyForm));
  }, [companyForm, dispatch, validForm]);

  const imageUploadClasses = useMemo(() => {
    const defaultStyle = "rounded-xl ";

    if (isTouched && !companyForm?.avatar) return defaultStyle + " border-dashed border-2 border-red-400 ";
    if (!companyForm?.avatar) return defaultStyle + " border-dashed border-2 border-indigo-400 ";
    return defaultStyle;
  }, [companyForm, isTouched]);

  useEffect(() => {
    if (company) setCompanyForm(company);
  }, [company]);

  useEffect(() => {
    setValidForm((prev) => ({
      id: true,
      avatar: companyForm?.avatar ? true : false,
      name: companyForm?.name ? true : false,
      email: companyForm?.email ? true : false,
      mobile: companyForm?.mobile ? true : false,
      website: companyForm?.website ? true : false,
      address: companyForm?.address ? true : false,
    }));
  }, [companyForm]);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-around w-full">
      <div className="bg-white rounded-xl p-4 m-4 w-full lg:w-1/3">
        <div className="p-4">
          <PageTitle title={"Preview"} />
          <div className="flex flex-col mt-4">
            <div className="flex w-full justify-between">
              <div className={"mb-4"}>
                {companyForm?.avatar ? (
                  <img
                    className={"object-cover h-14 w-14 rounded-lg"}
                    src={companyForm?.avatar}
                    alt="upload_image"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
              <span className="font-medium text-sm"> {!companyForm?.avatar ? 'Your Company Image' : ""} </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold mb-4"> Name: </span>
              <span className="font-medium text-sm"> {companyForm?.name || 'Your Company Name'} </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold mb-4"> Email: </span>
              <span className="font-medium text-sm"> {companyForm?.email || 'Your Company Email'} </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold mb-4"> Mobile: </span>
              <span className="font-medium text-sm"> {companyForm?.mobile || 'Your Company Mobile'} </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold mb-4"> Address: </span>
              <span className="font-medium text-sm"> {companyForm?.address || 'Your Company Address'} </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold mb-4"> Website: </span>
              <span className="font-medium text-sm"> {companyForm?.website || 'Your Company Website'} </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 m-4 w-full lg:w-1/2">
        <div className="p-4">
          <PageTitle title={"Profile"} />
        </div>
        <div className="flex mt-2">
          {isInitLoading ? (
            <Skeleton className="skeleton-input-radius skeleton-avatar border-dashed border-2" />
          ) : (
            <ImageUpload
              onChangeImage={onChangeImage}
              keyName="QuickEditImageUpload"
              className={imageUploadClasses}
              url={companyForm?.avatar}
            />
          )}

          <div className="flex-1 pl-3">
            {isInitLoading ? (
              <Skeleton className={defaultSkeletonLargeStyle} />
            ) : (
              <input
                value={companyForm?.name}
                placeholder="Company Name"
                className={
                  !validForm.name && isTouched
                    ? defaultInputLargeInvalidStyle
                    : defaultInputLargeStyle
                }
                onChange={(e) => handlerCompanyValue(e, "name")}
                disabled={isInitLoading}
              />
            )}
          </div>
        </div>

        <div className="flex mt-2">
          <div className="flex-1">
            {isInitLoading ? (
              <Skeleton className={defaultSkeletonNormalStyle} />
            ) : (
              <input
                value={companyForm?.address}
                placeholder="Company Address"
                className={
                  !validForm.address && isTouched
                    ? defaultInputInvalidStyle
                    : defaultInputStyle
                }
                onChange={(e) => handlerCompanyValue(e, "address")}
                disabled={isInitLoading}
              />
            )}
          </div>
        </div>

        <>
          <div className="flex mt-2">
            <div className="flex-1">
              {isInitLoading ? (
                <Skeleton className={defaultSkeletonNormalStyle} />
              ) : (
                <input
                  value={companyForm?.email}
                  placeholder="Company Email"
                  className={
                    !validForm.email && isTouched
                      ? defaultInputInvalidStyle
                      : defaultInputStyle
                  }
                  onChange={(e) => handlerCompanyValue(e, "email")}
                  disabled={isInitLoading}
                />
              )}
            </div>
          </div>
          <div className="flex mt-2">
            <div className="flex-1">
              {isInitLoading ? (
                <Skeleton className={defaultSkeletonNormalStyle} />
              ) : (
                <input
                  value={companyForm?.mobile}
                  placeholder="Company Phone"
                  className={
                    !validForm.mobile && isTouched
                      ? defaultInputInvalidStyle
                      : defaultInputStyle
                  }
                  onChange={(e) => handlerCompanyValue(e, "mobile")}
                  disabled={isInitLoading}
                />
              )}
            </div>
          </div>
          <div className="flex mt-2">
            <div className="flex-1">
              {isInitLoading ? (
                <Skeleton className={defaultSkeletonNormalStyle} />
              ) : (
                <input
                  value={companyForm?.website}
                  placeholder="Company Website"
                  className={
                    !validForm.website && isTouched
                      ? defaultInputInvalidStyle
                      : defaultInputStyle
                  }
                  onChange={(e) => handlerCompanyValue(e, "website")}
                  disabled={isInitLoading}
                />
              )}
            </div>
          </div>
        </>

        <div className="mt-3">
          <Button onClick={submitHandler} block={1}>
            <span className="inline-block ml-2"> Submit </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
