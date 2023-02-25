import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  defaultSkeletonLargeStyle,
  defaultSkeletonNormalStyle,
} from "../../constants/defaultStyles";
import {
  addNewProduct,
  getProductNewForm,
  updateNewProductFormField,
} from "../../store/productSlice";

const emptyForm = {
  id: "",
  image: "",
  productID: "",
  name: "",
  amount: 0,
  quantity: 0
};

function AddProduct() {
  const dispatch = useDispatch();
  const productNewForm = useSelector(getProductNewForm);
  const { initLoading: isInitLoading } = useAppContext();

  const [isTouched, setIsTouched] = useState(false);
  const [productForm, setProductForm] = useState(emptyForm);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );

  const onChangeImage = useCallback(
    (str) => {
      setProductForm((prev) => ({ ...prev, image: str }));
      dispatch(updateNewProductFormField({ key: "image", value: str }));
    },
    [dispatch]
  );

  const handlerProductValue = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setProductForm((prev) => {
        return { ...prev, [keyName]: value };
      });

      dispatch(updateNewProductFormField({ key: keyName, value }));
    },
    [dispatch]
  );

  const submitHandler = useCallback(() => {
    setIsTouched(true);

    const isValid = Object.keys(validForm).every((key) => validForm[key]);

    if (!isValid) {
      toast.error("Invalid Product Form!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }

    toast.success("Wow so easy to Update!", {
      position: "bottom-center",
      autoClose: 2000,
    });

    dispatch(addNewProduct({ ...productForm, id: nanoid(), createdAt: new Date().toISOString(), editedAt: "" }));
    setIsTouched(false);
  }, [productForm, dispatch, validForm]);

  const imageUploadClasses = useMemo(() => {
    const defaultStyle = "rounded-xl ";

    if (!productForm?.image) {
      return defaultStyle + " border-dashed border-2 border-indigo-400 ";
    }

    return defaultStyle;
  }, [productForm]);

  useEffect(() => {
    setValidForm((prev) => ({
      id: true,
      image: true,
      name: productForm?.name?.trim() ? true : false,
      amount: productForm?.amount <= 0 ? false : true,
    }));
  }, [productForm]);

  useEffect(() => {
    if (productNewForm) {
      setProductForm(productNewForm);
    }
  }, [productNewForm]);

   const navigate = useNavigate();
   function onClickBack() {
    navigate(-1);
  }
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="p-4">
        <PageTitle title={"Product"} />
      </div>
    
    <Button addStyle="flex mr-auto w-[10rem] mb-4" onClick={onClickBack}>
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
      <div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/5 mr-auto pl-4 pr-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1">
            <div className="flex mt-2">
              {isInitLoading ? (
                <Skeleton className="skeleton-input-radius skeleton-image border-dashed border-2" />
              ) : (
                <ImageUpload
                  keyName="QuickEditImageUpload"
                  className={imageUploadClasses}
                  url={productForm?.image}
                  onChangeImage={onChangeImage}
                />
              )}

              <div className="flex-1 pl-3">
                {isInitLoading ? (
                  <Skeleton className={defaultSkeletonLargeStyle} />
                ) : (
                  <div>
                    <input
                      autoComplete="nope"
                      value={productForm?.productID}
                      placeholder="Product ID"
                      className={defaultInputLargeStyle}
                      onChange={(e) => handlerProductValue(e, "productID")}
                      disabled={isInitLoading}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2">
              <div className="font-title text-sm text-default-color">
                Product Name
              </div>
              <div className="flex">
                <div className="flex-1">
                  {isInitLoading ? (
                    <Skeleton className={defaultSkeletonNormalStyle} />
                  ) : (
                    <input
                      autoComplete="nope"
                      placeholder="Product Name"
                      type="text"
                      className={
                        !validForm.name && isTouched
                          ? defaultInputInvalidStyle
                          : defaultInputStyle
                      }
                      disabled={isInitLoading}
                      value={productForm?.name}
                      onChange={(e) => handlerProductValue(e, "name")}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-title text-sm text-default-color">
                Product Amount
              </div>
              <div className="flex">
                <div className="flex-1">
                  {isInitLoading ? (
                    <Skeleton className={defaultSkeletonNormalStyle} />
                  ) : (
                    <input
                      autoComplete="nope"
                      placeholder="Amount"
                      type="number"
                      className={
                        !validForm.amount && isTouched
                          ? defaultInputInvalidStyle
                          : defaultInputStyle
                      }
                      disabled={isInitLoading}
                      value={productForm?.amount}
                      onChange={(e) => handlerProductValue(e, "amount")}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-title text-sm text-default-color">
                Product Quantity
              </div>
              <div className="flex">
                <div className="flex-1">
                  {isInitLoading ? (
                    <Skeleton className={defaultSkeletonNormalStyle} />
                  ) : (
                    <input
                      autoComplete="nope"
                      placeholder="Quantity"
                      type="tel"
                      className={
                        !validForm.quantity && isTouched
                          ? defaultInputInvalidStyle
                          : defaultInputStyle
                      }
                      disabled={isInitLoading}
                      value={productForm?.quantity}
                      onChange={(e) => handlerProductValue(e, "quantity")}
                    />
                  )}
                </div>
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
    </div>
  );
}

export default AddProduct;
