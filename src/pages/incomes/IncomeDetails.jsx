/* eslint-disable no-useless-escape */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import Button from "../../components/Button/Button";
import ImageUpload from "../../components/Common/ImageUpload";
import PageTitle from "../../components/Common/PageTitle";
import { useAppContext } from "../../context/AppContext";
import {
  defaultInputStyle,
  defaultInputInvalidStyle,
  defaultInputLargeStyle,
  defaultInputLargeInvalidStyle,
  defaultSkeletonLargeStyle,
  defaultSkeletonNormalStyle,
} from "../../constants/defaultStyles";
import {
  addNewClient,
  getClientNewForm,
  updateNewClientFormField,
} from "../../store/clientSlice";
import { useNavigate } from "react-router-dom";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const emptyForm = {
  id: "",
  name: "",
  description: "",
  price: "",
  createdAt: new Date(),
  editedAt: ""
};

export default function AddIncome({ editForm }) {
  const dispatch = useDispatch();
  const clientNewForm = useSelector(getClientNewForm);
  const { initLoading: isInitLoading } = useAppContext();

  const [isTouched, setIsTouched] = useState(false);
  const [incomeForm, setIncomeForm] = useState(emptyForm);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );

  const handlerClientValue = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setIncomeForm((prev) => {
        return { ...prev, [keyName]: value };
      });

      dispatch(updateNewClientFormField({ key: keyName, value }));
    },
    [dispatch]
  );

  const submitHandler = useCallback(() => {
    setIsTouched(true);

    const isValid = Object.keys(validForm).every((key) => validForm[key]);

    if (!isValid) {
      toast.error("Invalid Client Form!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    toast.success("Wow so easy to Update!", {
      position: "bottom-center",
      autoClose: 2000,
    });

    dispatch(addNewClient({ ...incomeForm, id: nanoid() }));
    setIsTouched(false);
  }, [incomeForm, dispatch, validForm]);

  useEffect(() => {
    setValidForm((prev) => ({
      id: true,
      description: incomeForm?.description ? true : false,
      name: incomeForm?.name ? true : false,
      createdAt:incomeForm?.createdAt ? true : false,
      price: incomeForm?.price ? true : false,
    }));
  }, [incomeForm]);

  useEffect(() => {
    if (clientNewForm) {
      setIncomeForm(clientNewForm);
    }
  }, [clientNewForm]);

  const navigate = useNavigate();
  const onClickBack = () => navigate(-1);

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
        <div className="p-4">
          <PageTitle title={"Income"} />
        </div>

        <div className="p-4">
          <Button size="sm" block={1} onClick={onClickBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={"M15 19l-7-7 7-7"}
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/5 pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
          <div className="flex mt-2">
            <div className="flex-1">
              {isInitLoading ? (
                <Skeleton className={defaultSkeletonLargeStyle} />
              ) : (
                <div>
                  <input
                    autoComplete="nope"
                    value={incomeForm.name}
                    placeholder="Income Name"
                    className={
                      !validForm.name && isTouched
                        ? defaultInputLargeInvalidStyle
                        : defaultInputLargeStyle
                    }
                    onChange={(e) => handlerClientValue(e, "name")}
                    disabled={isInitLoading}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex mt-2">
            <div className="flex-1">
              {isInitLoading ? (
                <Skeleton className={defaultSkeletonNormalStyle} />
              ) : (
                <textarea
                  autoComplete="nope"
                  placeholder="Description"
                  className={
                    !validForm.description && isTouched
                      ? defaultInputInvalidStyle
                      : defaultInputStyle
                  }
                  disabled={isInitLoading}
                  value={incomeForm.description}
                  onChange={(e) => handlerClientValue(e, "description")}
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
                  type="tel"
                  autoComplete="nope"
                  placeholder="Price"
                  className={
                    !validForm.price && isTouched
                      ? defaultInputInvalidStyle
                      : defaultInputStyle
                  }
                  disabled={isInitLoading}
                  value={incomeForm.price}
                  onChange={(e) => handlerClientValue(e, "price")}
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
                  type="date"
                  autoComplete="nope"
                  placeholder="createdAt"
                  className={
                    !validForm.createdAt && isTouched
                      ? defaultInputInvalidStyle
                      : defaultInputStyle
                  }
                  disabled={isInitLoading}
                  value={incomeForm.createdAt}
                  onChange={(e) => handlerClientValue(e, "createdAt")}
                />
              )}
            </div>
          </div>

          <div className="mt-3">
            <Button onClick={submitHandler} block={1}>
              <span className="inline-block ml-2"> Submit </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
