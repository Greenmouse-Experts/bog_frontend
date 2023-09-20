/* eslint-disable react-hooks/exhaustive-deps */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Footer from "./home-comp/Footer";
import Header from "./home-comp/Header";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { RiEqualizerLine } from 'react-icons/ri';
// import AllProducts from "./shop/AllProducts";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getProducts } from '../../redux/actions/ProductAction';
import CategoryList, { MobileCategory } from "./shop/CategoryList";
import Spinner from '../layouts/Spinner';
import { ProductItems } from "./shop/AllprodPag";

export default function Shop() {
    const dispatch = useDispatch();
    const [all, setAll] = useState(true)
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(null);
    const [filter, setFilter] = useState("Filter")
    const [productCategory, setProductCategory] = useState([]);
    const [searchCategory, setSearchCategory] = useState([]);
    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.products.categories);
    const loading = useSelector((state) => state.products.isLoading);
    const [ofset, setOfset] = useState(0)

    function ShowAll() {
        setAll(true);
        setShow(false);
        setActive(null)
    }

    const activeState = {
        color: "white",
        backgroundColor: "#3F79AD",
        borderRadius: "5px",
        paddingLeft: "5px",
    }

    const showCategories = (catId) => {
        const categorys = products.filter(where => where?.category?.id === catId);
        setProductCategory(categorys)
        setShow(true);
        setAll(false);
        setActive(catId)
        setOfset(0)
    }

    // filter functions
    // function handleFilterChange(event) {
    //     setFilter(event.target.value);
    // }

    const lowestPrice = (catId) => {
        if (!show) {
            const lowestPrice = products.sort((a, b) => a.price.localeCompare(b.price, undefined, { numeric: true }));
            setProductCategory(lowestPrice)
            setShow(true);
            setAll(false);
            setFilter('Lowest Price')
        } else {
            const lowestPrice = productCategory.sort((a, b) => a.price.localeCompare(b.price, undefined, { numeric: true }));
            setProductCategory(lowestPrice)
            setShow(true);
            setAll(false);
            setActive(catId)
            setFilter('Lowest Price')
        }
    }
    const highestPrice = (catId) => {
        if (!show) {
            const highestPrice = products.sort((a, b) => b.price.localeCompare(a.price, undefined, { numeric: true }));
            setProductCategory(highestPrice)
            setAll(true);
            setFilter('Highest Price')
        } else {
            const highestPrice = productCategory.sort((a, b) => b.price.localeCompare(a.price, undefined, { numeric: true }));
            setProductCategory(highestPrice)
            setShow(true);
            setAll(false);
            setActive(catId)
            setFilter('Highest Price')
        }
    }
    const latestProd = (catId) => {
        if (!show) {
            const highestPrice = products.sort((a, b) => b.createdAt.localeCompare(a.createdAt, undefined, { numeric: true }));
            setProductCategory(highestPrice)
            setAll(true);
            setFilter('Latest Products')
        } else {
            const highestPrice = productCategory.sort((a, b) => b.createdAt.localeCompare(a.createdAt, undefined, { numeric: true }));
            setProductCategory(highestPrice)
            setShow(true);
            setAll(false);
            setActive(catId)
            setFilter('Latest Products')
        }
    }
    const ratingSet = (catId) => {
        const highestPrice = productCategory.sort((a, b) => a.rating.localeCompare(b.rating, undefined, { numeric: true }));
        setProductCategory(highestPrice)
        setShow(true);
        setAll(false);
        setActive(catId)
    }

    // filter by price
    const filterBySearch = (event) => {
        if (all) {
            const results = products.filter(product => {
                if (event.target.value !== "") {
                    return product.name.toLowerCase().includes(event.target.value.toLowerCase())
                } else {
                    return products
                }
            })
            setProductCategory(results);
            setShow(true);
        } else {
            
            if(searchCategory.length === 0){
                setSearchCategory(productCategory)
                setActive(productCategory.id)
            }

            const results = searchCategory.filter(product => {
                if (event.target.value !== "") {
                    return product.name.toLowerCase().includes(event.target.value.toLowerCase())
                } else {
                    return searchCategory
                }
            })
            setProductCategory(results)
            
            // setActive(catId)
        }
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, []);


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
                <div className="section">
                    <div className="box">
                        <div>
                            <p className="text-2xl fw-600 mb-5">Search Products</p>
                            <div className="lg:flex items-center justify-between">
                                <div className=" relative border lg:w-4/12 border-gray-500 rounded  text-gray-600 hidden lg:block">
                                    <input id="search-box" placeholder="Search Blog Post" onChange={filterBySearch} className=" lg:w-11/12 bg-white h-10 px-2  rounded text-sm focus:outline-none" />
                                    <button type="submit" className="absolute bg-tertiary right-0 top-0 py-2 px-4 rounded-r">
                                        <FontAwesomeIcon icon={faSearch} className="text-white" />
                                    </button>
                                </div>
                                <div className="lg:w-4/12 lg:flex lg:justify-end">
                                    <div className="bg-gray-100 mb-4 lg:hidden lg:w-5/12 lg:pr-4 pr-2 rounded-md ring-1">
                                        <select className="py-2 lg:px-6 rounded-md w-full  bg-light focus:outline-none lg:fw-600 fs-500 pl-2 " onChange={e => { e.target.value === "all" ? ShowAll() : showCategories(e.target.value) }}>
                                            <option value="all">All Products</option>
                                            {categories.filter(where => where.totalProducts !== 0).map(category => {
                                                return (
                                                    <MobileCategory
                                                        key={category.id}
                                                        category={category}
                                                        // clickHandler={showCategories}
                                                        active={active}
                                                        activeState={activeState}
                                                    />
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="lg:ml-6">
                                        <Menu placement="bottom-end">
                                            <MenuHandler>
                                                <Button variant="outlined" className="border-0 bg-light rounded text-black flex items-center">{filter} <span className="pl-6"><RiEqualizerLine /></span> </Button>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem onClick={latestProd}>Latest Product</MenuItem>
                                                <MenuItem onClick={lowestPrice}>Lowest Price</MenuItem>
                                                <MenuItem onClick={highestPrice}>Higest Price</MenuItem>
                                                <MenuItem onClick={ratingSet}>Rating</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-36">
                    <div className="box">
                        <div className="lg:flex justify-between">
                            <div className="bg-light hidden lg:block lg:pl-12 pl-2  px-4 pt-6 pb-48 w-3/12 rounded">
                                <p className="fw-600 lg:text-xl fs-300 md:fs-400 pt-4">Categories</p>
                                <p className="border-2 border-black w-4/12 mb-4 bg-black"></p>
                                <ul className="md:fs-400 fw-500 fs-300 lg:fs-600">
                                    <li className="py-2 cursor-pointer" style={all ? activeState : undefined} onClick={ShowAll} >All Products</li>
                                    <div>
                                        {categories.filter(where => where.totalProducts !== 0).map(category => {
                                            return (
                                                <CategoryList
                                                    key={category.id}
                                                    category={category}
                                                    clickHandler={showCategories}
                                                    active={active}
                                                    activeState={activeState}
                                                />
                                            )
                                        })}
                                    </div>

                                </ul>
                            </div>
                            <div className="w-full lg:pl-3 lg:pl-0 lg:w-8/12">

                                {
                                    loading ? <Spinner /> :
                                        <div>
                                            {/* <AllProducts products={show ? productCategory : products} /> */}
                                            <ProductItems itemsPerPage={9} products={show ? productCategory : products} ofset={ofset}/>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}