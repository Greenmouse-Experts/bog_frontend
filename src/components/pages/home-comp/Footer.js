import React from "react";
import { FaLocationArrow  } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer(){

    return (
        <div>
            <div className="pt-24 pb-12 font-primary bg-footer bg-100 bg-bottom text-white">
                <div className="box">
                    <div className="lg:flex justify-between">
                        <div className="lg:w-3/12">
                            <img src={require("../../assets/images/BOOG 1.png")} alt="whiteLogo" className="lg:w-10/12 w-8/12 relative -top-10 lg:top-0"/>
                        </div>
                        <div className="lg:w-2/12 mt-6 lg:mt-0">
                            <p className="fw-600 mb-3">QUICK LINKS</p>
                            <ul>
                                <li className="py-1"><Link to="/">Home</Link></li>
                                <li className="py-1"><Link to="/about" className="cursor-pointer">About</Link></li>
                                <li className="py-1"><Link to="/faqs" className="cursor-pointer">FAQs</Link></li>
                                <li className="py-1"><Link to="/contact" className="cursor-pointer">Contact Us</Link></li>
                                <li className="py-1"><Link to="/blog" className="cursor-pointer">Blog</Link></li>
                            </ul>
                        </div>
                        <div className="lg:w-2/12 mt-10 lg:mt-0">
                            <p className="fw-600 mb-3">SERVICES</p>
                            <ul>
                                <li className="py-1"><Link to="/services" className="cursor-pointer">Find A Service Partner</Link></li>
                                <li className="py-1"><Link to="/shop" className="cursor-pointer">Shop for Products</Link></li>
                                <li className="py-1"><Link to="/become-partner" className="cursor-pointer">Become A Partner</Link></li>
                                <li className="py-1"><Link to="/login" className="cursor-pointer">Sign In</Link></li>
                                <li className="py-1"><Link to="/signup" className="cursor-pointer">Sign Up</Link></li>
                            </ul>
                        </div>
                        <div className="lg:w-3/12 mt-10 lg:mt-0">
                            <p className="fw-600 lg:mb-6 mb-3">STAY UPDATED</p>
                            <div className="flex border-1 ">
                                <input type="text" placeholder="Enter your email" className="w-10/12 px-2 text-black fs-500 border-0" />
                                <div className="bg-secondary w-2/12 pl-3 py-2">
                                    <FaLocationArrow className="lg:text-xl"/>
                                </div>
                            </div>
                            <ul className="lg:mt-4 mt-8 flex">
                                <li><a href="https://www.instagram.com/build_on_the_go/" target="_blank" rel="noopener noreferrer"><img src={require("../../assets/images/insta.png")} alt="insta" /></a></li>
                                <li className="pl-3"><a href="https://twitter.com/BogLimited44612" target="_blank" rel="noopener noreferrer"><img src={require("../../assets/images/twitter.png")} alt="twitter" /></a></li>
                                <li className="pl-3"><a href="https://www.linkedin.com/company/build-on-the-go/" target="_blank" rel="noopener noreferrer"><img src={require("../../assets/images/linkedn.png")} alt="linkedn" /></a></li>
                                <li className="pl-3"><a href="https://www.facebook.com/profile.php?id=100091812647846" target="_blank" rel="noopener noreferrer"><img src={require("../../assets/images/facebook.png")} alt="facebook" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:my-8 my-12 bg-white h-0.5"></div>
                    <div className="lg:flex justify-between">
                        <div className="text-center">
                            Copyright &copy; {new Date().getFullYear()}{' '} BOG. All Rights Reserved
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <ul className="flex justify-center text-center fs-300 md:fs-600 lg:text-end">
                                <li className="pr-2"><Link to="/terms">Terms & Conditions</Link></li>
                                <li className="px-2 border-l"><Link to="/privacy">Privacy Policy</Link></li>
                                <li className="pl-2 border-l"><Link to="/return">Return Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}