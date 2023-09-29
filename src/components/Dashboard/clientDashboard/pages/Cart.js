 /* eslint-disable */
import { Breadcrumbs } from "@material-tailwind/react";
// import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "./CartItems";
import { Loader } from "../../../layouts/Spinner";
import React, { useState, useEffect } from "react";
import { FaShoppingBasket, FaTimes } from 'react-icons/fa'
import { CartModal } from "../../../pages/cart/CartModal";
import Swal from "sweetalert2";
import { calculatePercentage } from "../../../../services/helper";

export default function Cart() {
    const carts = useSelector((state) => state.cart.cart);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const[cartForm, setCartForm] = useState(false)
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate()

  const CloseModal = () => {
    setCartForm(false)
  }
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
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let totalAmount = 0;
    carts.forEach(cart => {
        totalAmount += cart.price * cart.quantity
    });
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


    if (loading) {
        return (
            <center>
                <Loader />
            </center>
        );
    }



    return (
        <div>
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4 flex items-center justify-between">
                    <div className="">
                    <p className="text-2xl fw-600">My Cart</p>
                    <p className="fs-400 text-gray-600 mt-2">Manage products on your cart.</p>
                    <Breadcrumbs className="bg-white pl-0 mt-4">
                        <Link to="/" className="opacity-60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </Link>
                        <Link to="/dashboard" className="opacity-60">
                            <span>Dashboard</span>
                        </Link>
                        <Link to="" className="">
                            <span>Cart</span>
                        </Link>
                    </Breadcrumbs>
                    </div>
                    <div>
            <Link to={'/shop'} className="flex gap-x-3 bg-secondary text-white fw-600 px-5 py-2 rounded-lg hover:scale-105 duration-100"><FaShoppingBasket className="text-2xl"/>Shop Now</Link>
          </div>
                </div>
                <div className="p-5">
                    <div className="lg:grid-74">
                        <div className="bg-white px-4 lg:px-8 py-6 rounded-md">
                            <p className="text-lg fw-600">Cart Products {carts.length}</p>
                            <div className="lg:fs-500 fs-400">
                                {carts.length > 0 ? carts.map((item, index) => {
                                    return (
                                        <CartItems key={index} item={item} />
                                    )
                                }) : <h3 className="mt-3">No Item in cart</h3>
                                }
                            </div>
                        </div>
                        {
                            totalAmount > 0 ?
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
                                            <p>
                                              Subtotal
                                            </p>
                                            <p className="text-end">NGN {formatNumber(totalAmount)}</p>
                                          </div>
                                          {/* <div className="fw-600 mt-3 flex justify-between">
                                            <p>
                                              Estimated Delivery Cost
                                            </p>
                                            <p>TBD</p>
                                          </div> */}
                                          <div className="fw-600 mt-3 flex justify-between">
                                            <p>
                                              Estimated Sales Tax
                                            </p>
                                            <p>7.5%</p>
                                          </div>
                                          <form >
                                            
                                            <div className="fw-600 my-4">
                                              <div className="flex justify-between my-4">
                                                <p>TOTAL COST</p>
                                                <p>NGN {formatNumber(calculatePercentage(totalAmount, 7.5))}</p>
                                              </div>
                                                <button
                                                    type="button"
                                                    onClick={checkAdress}
                                                    className="w-full cursor-pointer text-center btn bg-primary text-white"
                                                  >
                                                    PROCEED TO CHECKOUT
                                                </button>
                                            </div>
                                          </form>
                  
                                        </div>
                                      </div>
                                    </div>
                                : null
                        }
                    </div>
                </div>
            </div>
            {
                cartForm && (
                    <div className="bg-op fixed z-50 top-0 h-screen w-full flex justify-center items-center"  onClick={CloseModal}>
                        <div className="max-h-103 p-4 lg:p-7 bg-white w-11/12 lg:w-6/12 relative overflow-y-scroll " onClick={(e) => e.stopPropagation()}>
                        <FaTimes className="text-2xl cursor-pointer absolute top-4 right-5" onClick={CloseModal} />
                        <CartModal CloseModal={CloseModal} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}