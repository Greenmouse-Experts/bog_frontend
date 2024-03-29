import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  clearCart,
  deleteItem,
} from "../../redux/actions/cartAction";
// import CartItem from './CartItem';
import Footer from "./home-comp/Footer";
import Header from "./home-comp/Header";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { SuccessAlertWithRedirection } from "../../services/endpoint";
import toast from "react-hot-toast";
import Spinner from "../layouts/Spinner";
import Axios from "../../config/config";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import Swal from "sweetalert2";
import { CartModal } from "./cart/CartModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { calculatePercentage, getPercentage } from "../../services/helper";

// const baseURL = process.env.REACT_APP_IMAGE_URL;

export const Cart = () => {
  const [cartForm, setCartForm] = useState(false);

  const CloseModal = () => {
    setCartForm(false);
  };

  const AuhtCheck = () => {
    Swal.fire({
      title: " ",
      imageUrl:
        "https://uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/authentication-icon.png",
      imageWidth: "75px",
      //text: 'Please Sign Up or Login to order for products. Thank You!',
      html: 'Please <a href="/signup" style=" color: red; "> Sign Up </a> or <a href="/login" style=" color: red; ">Login</a> to order for products. Thank You!',
      buttonsStyling: "false",
      denyButtonText: "Sign Up",
      confirmButtonText: "Login",
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonColor: "rgba(254, 0, 56, 1)",
      confirmButtonColor: "#3F79AD",
      denyButtonColor: "#ec8b20",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      } else if (result.isDenied) {
        navigate("/signup");
      }
    });
  };
  const FillAdress = () => {
    Swal.fire({
      title: "",
      imageUrl:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1685457317/BOG/info_djndzm.webp",
      imageWidth: "75px",
      text: "To continue, kindly complete the mandatory address fields on your dashboard.",
      confirmButtonText: "Continue",
      confirmButtonColor: "#3F79AD",
    }).then((result) => {
        navigate("/dashboard/settings");
    });
  };
  const checkAdress = () => {
    if(auth.user.address && auth.user.state){
      setCartForm(true)
    }else FillAdress()
  }
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  let totalAmount = 0;
  carts.forEach((cart) => {
    totalAmount += cart.price * cart.quantity;
  });

  const form = useFormik({
    initialValues: {
      city: "",
      state: "",
      country: "",
      postal_code: "",
      address: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
    },
  }); // eslint-disable-next-line
  // const { city, state, country, postal_code, address, contact_name, contact_email, contact_phone } = form.values;
  const value = form.values;
  let productsArray = carts.map((option) => {
    let prodInfo = {};
    prodInfo.productId = `${option.id}`;
    prodInfo.quantity = option.quantity;
    return prodInfo;
  });

  useEffect(() => {
    setProducts(productsArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gotoLink = (orderId) => {
    navigate("/ordersuccess", {
      state: {
        orderId,
      },
    });
  };

  const sendOrder = async (payment) => {
    try {
      setLoading(true);
      const payload = {
        products: products,
        shippingAddress: {
          city: value.city,
          state: value.state,
          country: value.country,
          postal_code: value.postal_code,
          address: value.address,
          contact_name: value.contact_name,
          contact_email: value.contact_email,
          contact_phone: value.contact_phone,
        },
        paymentInfo: {
          reference: payment.reference,
          amount: totalAmount,
        },
        discount: 0,
        deliveryFee: 0,
        totalAmount: totalAmount,
      };
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const res = await Axios.post("/orders/submit-order", payload, config);
      const orderId = res.order.id;
      setLoading(false);
      SuccessAlertWithRedirection("Order in Progress!", gotoLink(orderId));
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
        return;
      }
      toast.error(error.response.data.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const handlePaystackSuccessAction = (reference) => {
    sendOrder(reference);
    dispatch(clearCart());
  };
  const handlePaystackCloseAction = () => {
    console.log("incorrect transaction");
  };

  const config = {
    reference: "TR-" + new Date().getTime().toString(),
    email: auth?.user?.email,
    amount: totalAmount,
    publicKey: process.env.REACT_APP_PAYSTACK_API_KEY,
  };
  // eslint-disable-next-line
  const componentProps = {
    ...config,
    // text: 'Paystack Button Implementation',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };
  const addMore = (item) => {
   if(item.quantity < item.max_qty){
    dispatch(incrementQuantity(item))
   }else {
    toast.error("Maximum Quantity reached", {
      duration: 6000,
      position: "top-center",
      style: { background: "#BD362F", color: "white" },
    });
  }
  }
  const reduceQuan = (item) => {
    if(item.quantity > item.min_qty){
     dispatch(decrementQuantity(item))
    }else {
      toast.error("Minimum Quantity reached", {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
   }
  if (loading) {
    return (
      <center>
        <Spinner />
      </center>
    );
  }
  return (
    <div className="cart__left">
      <div>
        <Header />
        <div className="section">
          <div className="box">
            <div>
              <p className="mb-10 lg:text-3xl text-xl fw-600">My Cart</p>
              <div className="lg:grid-83 relative">
                <div className="relative">
                  <div>
                    <div className="py-2 flex justify-between border-b-2 ">
                      <p className="">
                        <Link to="/shop">Continue Shopping</Link>
                      </p>
                      <p class="fw-600">
                        <span className="px-2">{carts.length}</span>Item(s)
                      </p>
                    </div>
                    <div className="mt-4">
                      {carts?.map((item) => {
                        return (
                          <div>
                            <div className="lg:flex mt-6 bg-light p-3 shadow rounded-xl items-center relative">
                              <div className="lg:w-3/12">
                                {/* <img src="https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png" alt="products" className="w-40 rounded-md h-20 lg:h-40" /> */}
                                <img
                                  src={item.image}
                                  alt="products"
                                  className="w-32 lg:w-40 border rounded-md h-32 lg:h-36"
                                />
                              </div>
                              <div className="lg:w-6/12">
                                <p className="fw-500">{item.name}</p>
                                <p className="h-12 overflow-y-scroll mt-4">
                                  {item.description}
                                </p>
                              </div>
                              <div className="lg:w-3/12 lg:ml-6">
                                <p>NGN {item.price * item.quantity}</p>
                                <div className="flex mt-2 fw-600">
                                  <button
                                    className="border border-gray-300 rounded px-2 mr-2"
                                    onClick={() =>
                                      reduceQuan(item)
                                    }
                                  >
                                    -
                                  </button>
                                  <p>{item.quantity}</p>
                                  <button
                                    className="border border-gray-300 rounded px-2 ml-2"
                                    onClick={() =>
                                      addMore(item)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="absolute top-5 right-12 text-red-500 cursor-pointer text-xl">
                                <MdDeleteOutline
                                  onClick={() => dispatch(deleteItem(item.id))}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {carts?.length === 0 ? null : (
                  <div className="relative mt-8 lg:mt-0 ">
                    <div className="rounded-md bg-blue-100 shadow-md py-5 px-3 lg:px-5 sticky top-24">
                      <div class="grid">
                        <p class="text-2xl fw-600">Order Summary</p>
                        <div className="py-5 border-y border-gray-400 mt-6">
                          <div className="fw-600 flex justify-between">
                            <p>
                              ITEMS <span className="px-2"></span>
                            </p>
                            <p>{carts.length}</p>
                          </div>
                        </div>
                        <div className="fw-600 mt-3 flex justify-between">
                          <p>Subtotal</p>
                          <p className="text-end">
                            NGN {formatNumber(totalAmount)}
                          </p>
                        </div>
                        {/* <div className="fw-600 mt-3 flex justify-between">
                          <p>Estimated Delivery Cost</p>
                          <p>TBD</p>
                        </div> */}
                        <div className="fw-600 mt-3 flex justify-between">
                          <p>Estimated Sales Tax (7.5%)</p>
                          <p>NGN {formatNumber(getPercentage(totalAmount, 7.5))}</p>
                        </div>
                        <form onSubmit={form.handleSubmit}>
                          <div className="fw-600 my-4">
                            <div className="flex justify-between my-4">
                              <p>TOTAL COST</p>
                              <p>NGN {formatNumber(calculatePercentage(totalAmount, 7.5))}</p>
                            </div>

                            {auth.isAuthenticated ? (
                              <p
                                onClick={checkAdress}
                                className="w-full cursor-pointer text-center btn bg-primary text-white"
                              >
                                PROCEED TO CHECKOUT
                              </p>
                            ) : (
                              <button
                                onClick={() => AuhtCheck()}
                                className="w-full btn bg-primary text-white"
                              >
                                CHECKOUT
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {cartForm && (
          <div
            className="bg-op fixed z-50 top-0 h-screen w-full flex justify-center items-center"
            onClick={CloseModal}
          >
            <div
              className="max-h-103 p-5 lg:p-10 bg-white w-11/12 lg:w-6/12 relative overflow-y-scroll "
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-2xl cursor-pointer absolute top-5 right-5"
                onClick={CloseModal}
              />
              <CartModal CloseModal={CloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
