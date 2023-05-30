/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Footer from "./home-comp/Footer";
import Header from "./home-comp/Header";
import { useParams } from "react-router-dom";
import { SimilarProducts } from "./shop/SimilarProduct";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { addToCart } from "../../redux/actions/cartAction";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { ProductImage } from "./shop/ProductImg";
import { useNavigate } from "react-router-dom";
import "toasted-notes/src/styles.css";
import { Spinner2 } from "../layouts/Spinner";
import { getProducts } from "../../redux/actions/ProductAction";
import Axios from "../../config/config";
import { formatNumber } from "../../services/helper";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@material-tailwind/react";
import { AddProductReview } from "./shop/AddProductReview";
import dayjs from "dayjs";

export default function ProductDetail() {
  // eslint-disable-next-line
  const products = useSelector((state) => state.products.products);
  const [cartNum, setCartNum] = useState(1);
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [prodNum, setProductNum] = useState(false);
  const [review, setReview] = useState([])
  const [postReview, setPostReview] = useState(false)

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const url = `/product/${itemId}`;
      const res = await Axios.get(url, config);
      const data = res.data;
      setItem(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProductReview = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const url = `/review/product/get-review?productId=${itemId}`;
      const res = await Axios.get(url, config);
      setReview(res.data);
    } catch (error) {
      
    }
  };

  const navigate = useNavigate();
  const [itemAdded, setItemAdded] = useState(false); // eslint-disable-next-line
  const [similarProducts, setSimilarProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);

  const addItemToCart = (item, cartNum) => {
    dispatch(addToCart(item, cartNum));
    setItemAdded(true);
  };

  useEffect(() => {
    fetchProduct();
    fetchProductReview()
  }, [itemId]);
  useEffect(() => {
    dispatch(getProducts());
    if (item != null) {
      setMaxQuantity(item.remaining);
      const similar = products
        .filter((where) => where?.category.id === item.category?.id)
        .filter((prod) => prod?.id != item?.id);
      setSimilarProducts(similar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, !loading]);

  useEffect(() => {
    if (itemAdded) {
      setTimeout(function () {
        setItemAdded(false);
      }, 4000);
    }
    if (prodNum) {
      setTimeout(function () {
        setProductNum(false);
      }, 4000);
    }
    if (show) {
      setTimeout(function () {
        setShow(false);
      }, 4000);
    } // eslint-disable-next-line
  }, [addItemToCart, show]);

  return (
    <div>
      <div className="font-primary">
        <Header />
        <div className="bg-shop bg-cover bg-center text-white h-40 lg:h-80  flex items-center">
          <div className="box">
            <p className="lg:text-4xl text-2xl fw-700 mb-2">Products</p>
            <p>Buy top quality building materials for your project</p>
          </div>
        </div>
        {loading || !item ? (
          <Spinner2 />
        ) : (
          <div>
            <div className="section">
              <div className="box">
                <div className=" w-full">
                  <div className="lg:flex items-center justify-between lg:pt-10">
                    <div className="lg:w-6/12 overflow-hidden bg-light shadow-md p-4">
                      <ProductImage item={item} />
                    </div>
                    <div className="lg:pl-8 mt-4 lg:w-6/12 lg:mt-0 relative">
                      <p className="lg:text-3xl text-lg fw-600">{item.name}</p>
                      <p className="fw-600 py-2 text-gray-600">
                        <span className="pr-2 ">Product Category :</span>
                        {item.category.name}
                      </p>
                      <div className="flex items-center">
                        <div className="hidden lg:block">
                          <ReactStars edit={false} value={review?.star} size={35} />
                        </div>
                        <div className="lg:hidden">
                          <ReactStars edit={false} value={review?.star} size={25} />
                        </div>
                        <p className="text-gray-500 pl-3">({review && review?.reviews?.length} Reviews)</p>
                      </div>
                      <p className="lg:text-2xl fs-700 fw-600 py-2 text-secondary">
                        NGN {formatNumber(item.price)}
                      </p>
                      <div className="relative flex">
                        <div className="mt-2 flex items-end fs-500 lg:fs-600">
                          <div>
                            <p className="fw-600 text-gray-600 mb-2">
                              Quantity
                            </p>
                            <input
                              type="number"
                              min={0}
                              max={maxQuantity}
                              value={cartNum}
                              onChange={(e) => setCartNum(e.target.value)}
                              className="w-16 px-1 lg:px-2 rounded py-1 lg:py-2 border border-black"
                            />
                          </div>
                          <div className="">
                            {user?.profile?.userType === "professional" ||
                            user?.profile?.userType === "vendor" ? (
                              <button
                                className="btn-primary ml-7 px-4 lg:px-8 "
                                onClick={() => setShow(true)}
                              >
                                Add To Cart
                              </button>
                            ) : item.remaining < 1 ? (
                              <button
                                className="btn-primary ml-7 px-4 lg:px-8 "
                                onClick={() => setProductNum(true)}
                              >
                                Out of Stock
                              </button>
                            ) : item.remaining < cartNum ? (
                              <button
                                className="btn-primary ml-7 px-4 lg:px-8 "
                                onClick={() => setProductNum(true)}
                              >
                                Add To Cart
                              </button>
                            ) : (
                              <button
                                className="btn-primary ml-7 px-4 lg:px-8 "
                                onClick={() => addItemToCart(item, cartNum)}
                              >
                                Add To Cart
                              </button>
                            )}
                            {show && (
                              <Alert
                                dismissible={{
                                  onClose: () => setShow(false),
                                }}
                                color="red"
                                className="absolute w-72 fs-400 fw-500"
                              >
                                Please sign up / switch to client to access
                              </Alert>
                            )}
                            {prodNum && (
                              <Alert
                                dismissible={{
                                  onClose: () => setShow(false),
                                }}
                                color="red"
                                className="absolute w-72 fs-400 fw-500"
                              >
                                Selected Quantity is not availbale
                              </Alert>
                            )}
                            {itemAdded && (
                              <div className="absolute lg:fs-400 fs-300 fw-600 px-2 text-center w-40 border lg:right-0 xl:right-1/4 lg:bottom-0 -bottom-3/4 py-1 bg-secondary rounded text-gray-100 scale-ani">
                                <p>Added to Cart</p>
                                <p
                                  onClick={() => {
                                    navigate("/carts");
                                  }}
                                  className="underline cursor-pointer"
                                >
                                  Click to view
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="fw-500 text-gray-500">
                          Remaining Quantity:{" "}
                          <span className="text-lg text-gray-600">
                            {maxQuantity}
                          </span>
                        </p>
                        <p className="mt-2 lg:mt-2 flex fw-500 text-primary fs-300 lg:fs-500">
                          <span className="text-lg lg:text-xl pr-2 mt-1">
                            <BsFillInfoCircleFill />
                          </span>
                          <span>
                            Delivery is effecient and fast to every part of
                            Nigeria. (same day delivery is location based)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="box">
                <div>
                  <Tabs>
                    <TabList className="flex fs-300 lg:fs-600">
                      <Tab>Product Description</Tab>
                      <Tab>Reviews</Tab>
                    </TabList>
                    <TabPanel>
                      <div className="mt-6 lg:px-6 fs-400 lg:fs-600">
                        {item.description}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="pt-6 lg:px-6 fs-400 lg:fs-600">
                        {user && <button className="mb-6 px-4 py-1 bg-secondary text-white rounded" onClick={() => setPostReview(true)}>Leave a review</button>}
                        {review &&  !review?.reviews?.length && <p>No Review Yet</p>}
                        {
                          review &&  !!review?.reviews?.length && review?.reviews?.map((item,index) => (
                            <div className="flex items-center border-b py-4 lg:gap-x-5" key={index}>
                                <div>
                                    <p>{`${item.client.fname} ${item.client.lname} `}</p>
                                    <ReactStars edit={false} value={item.star} size={25} />
                                </div>
                                <div>
                                    <p>{dayjs(item.createdAt).format('DD/MM/YYYY')}</p>
                                    <p className="mt-4">{item.review}</p>
                                </div>
                            </div>
                          ))
                        }
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="box">
                <div>
                  {similarProducts?.length > 0 ? (
                    <>
                      <p className="fw-600 lg:text-2xl py-6">
                        Similar Products
                      </p>
                      <SimilarProducts products={similarProducts} />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
      {
        postReview && (
            <AddProductReview closeModal={() => setPostReview(false)} productId={itemId} fetchReview={fetchProductReview}/>
        )
      }
    </div>
  );
}
