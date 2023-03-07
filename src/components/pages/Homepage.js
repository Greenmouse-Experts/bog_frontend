import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./home-comp/Header";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im"
import { BsArrowRight, BsBag } from "react-icons/bs";
import Faqs from "./home-comp/Faqs";
import Footer from "./home-comp/Footer";
import ProfSlides, { ProfSlidesSm } from "./home-comp/ProfSlides";
import BlogSlides, { BlogSlidesSm } from "./home-comp/BlogSlide";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faPlay } from "@fortawesome/free-solid-svg-icons";
import { ReviewSlide, ReviewSlideSm } from "./home-comp/AboutSlides";
import toast from 'react-hot-toast';
import Axios from "../../config/config";
import Spinner from "../layouts/Spinner";
import { HomepageBlog } from "./Blog/HomepageBlog";

// const Text = ({children}) => {
//     return <div className="text">{children}</div>;
// }

export default function Homepage() {

    const [showVideo, setShowVideo] = useState(false)

    gsap.registerPlugin(ScrollTrigger);
    const intro = useRef();
    const intro1 = useRef();
    const hero = useRef();
    const hazzle = useRef();
    const blog = useRef();
    const news = useRef();
    // const into = useRef();
    // const into = gsap.utils.selector(intro);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let tl = gsap.timeline();
            // tl.from(into("text"), { y:10, opacity:0, duration:0.7, delay: .5, ease:"" ,stagger: 0.2,});
            tl.from(intro1.current, { opacity: 0, scale: 0, ease: "back", duration: 0.5, delay: 1, })


        },);


        return () => ctx.revert();
    }, []);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // gsap.from(hero.current, {
            //     y: -520, ease: "bounce", duration: 2, delay: 1.5, opacity: 0, onComplete() {
            //         ScrollTrigger.refresh(true);
            //     }
            // })

            gsap.from(hazzle.current, {
                scale: .6,
                duration: 2,
                ease: "elastic",
                delay: .1,
                scrollTrigger: {
                    trigger: hazzle.current,
                    toggleActions: "restart none none none"
                }
            },);
            const bl = gsap.timeline();
            bl.to(news.current, { yPercent: -52, });

            ScrollTrigger.create({
                animation: bl,
                trigger: blog.current,
                pin: true,
                pinSpacing: true,
                toggleActions: "restart none none none",
                start: "center center",
                scrub: true,
                invalidateOnRefresh: true,

            })
        }, hero);
        ScrollTrigger.refresh(true)
        return () => ctx.revert();
    }, []);

    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    const getReviews = async () => {
        try {
            setLoading(true);
            const res = await Axios.get('/testimony/get-hompage-testimonies');
            setLoading(false);
            if (res.success === true) {
                setReviews(res.data)
            }

        } catch (error) {
            setLoading(false);
            toast.error(
                error?.response?.data?.message || error.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: '#BD362F', color: 'white' },
                }
            );
        }
    }
    console.log(reviews)
    useEffect(() => {
        getReviews();
    }, []);





    return (
        <div className="font-primary">
            <Header />
            {/* hero banner */}
            <div className="bg-hero">
                <div className="box">
                    <div className="lg:flex flex-row-reverse items-center py-1 pb-6 lg:py-6">
                        {/* <div className="lg:w-6/12 relative z-0">
                            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1669564220/BOG/hero_1_1_hcpq4u.png" alt="hero" className="lg:w-10/12 lg:float-right animate-pulse" ref={hero} />
                            <img src={require("../assets/images/hero1.png")} alt="hero1" className="absolute lg:w-28 w-20 hero1" />
                            <img src={require("../assets/images/hero2.png")} alt="hero2" className="absolute lg:w-28 w-20 hero2" />
                            <img src={require("../assets/images/hero3.png")} alt="hero3" className="absolute lg:w-28 w-20 hero3" />
                            <img src={require("../assets/images/hero4.png")} alt="hero4" className="absolute lg:w-28 w-20 hero4" />
                        </div> */}
                        <div className='lg:w-6/12 relative hidden lg:block overflow-hidden h-01'>
                            <div className='sphere overflow-hidden'>
                                <div className='w-16 h-8 circle dots'>
                                    <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678109146/BOG/hero1_twfxri.png' alt='hero1' />
                                </div>
                                <div className='w-16 h-8 circle dots2'>
                                    <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678109146/BOG/hero3_w2h66q.png' alt='hero1' />
                                </div>
                                <div className='w-16 h-8 circle dots3'>
                                    <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678109146/BOG/hero1_twfxri.png' alt='hero1' />
                                </div>
                                <div className='w-16 h-8 circle dots4'>
                                    <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678109146/BOG/hero4_ebkb4v.png' alt='hero1' />
                                </div>
                                <div className='w-16 h-8 circle dots5'>
                                    <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678109146/BOG/hero2_gsfuqg.png' alt='hero1' />
                                </div>
                                <div className='w-16 h-8 circle dots6'>
                                    <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678109146/BOG/hero3_w2h66q.png' alt='hero1' />
                                </div>
                            </div>
                            <div className='w-full h-full absolute moving-stripes overflow-hidden '>
                                <svg
                                    className='absolute paths dash1'
                                    viewBox="0 0 1100 1100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M334.326 882.433C286.784 840.832 249.565 788.747 225.608 730.292C201.651 671.837 191.612 608.613 196.284 545.613C200.956 482.612 220.21 421.56 252.528 367.279C284.845 312.997 329.339 266.972 382.497 232.838C435.656 198.704 496.022 177.396 558.828 170.597C621.635 163.798 685.162 171.694 744.393 193.661C803.625 215.629 856.938 251.066 900.123 297.174C943.307 343.282 975.181 398.799 993.227 459.34" stroke="orange" stroke-width="3"></path>
                                    <path d="M1004.79 648.64C1013.37 664.833 1015.93 679.803 1012.64 693.203C1009.34 706.602 1000.18 718.513 985.151 728.551C955.073 748.642 902.782 760.368 833.826 762.389C764.893 764.409 681.994 756.653 594.053 739.949C506.113 723.245 416.474 698.228 334.785 667.593C253.093 636.957 182.462 601.867 130.485 566.107C104.497 548.227 83.6757 530.526 68.4327 513.478C53.1864 496.426 43.5431 480.052 39.8701 464.829C36.2015 449.624 38.5536 435.84 46.684 423.775C54.8252 411.694 68.7879 401.296 88.4086 392.947C127.656 376.246 187.89 368.446 262.665 370.429" stroke="blue" stroke-width="3"></path>
                                    <path d="M744.537 203.285C799.611 142.519 849.675 104 888.524 92.3818C907.933 86.5773 924.054 87.6324 936.552 95.1925C949.055 102.756 958.037 116.891 963.03 137.469C973.02 178.646 966.532 243.539 944.284 324.159C922.042 404.757 885.047 497.461 837.876 590.785C790.707 684.108 735.44 773.941 678.925 849.156C622.405 924.378 567.139 981.646 519.979 1013.9C496.398 1030.02 475.396 1039.52 457.537 1042.34C439.696 1045.16 425.016 1041.31 413.989 1030.79C402.942 1020.24 395.739 1003.16 392.55 980.179C389.362 957.207 390.194 928.403 395.163 894.489" stroke="#050505" stroke-width="3"></path>
                                    <path d="M838.407 907.01C820.956 952.118 791.357 980.223 752.688 988.55C713.993 996.883 667.503 985.135 617.98 954.392C568.464 923.652 517.759 875.063 471.093 813.609C424.428 752.157 383.499 680.076 352.52 604.785C321.541 529.492 301.636 453.721 294.846 385.27C288.056 316.813 294.634 258.189 313.854 215.404C333.065 172.639 364.201 147.259 404.047 141.774C443.925 136.285 491.182 150.907 540.967 184.251" stroke="gray" stroke-width="3"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="lg:w-6/12 py-24 text-white">
                            <p className="lg:text-4xl relative lg:leading-snug text-2xl fw-600" ref={intro}>
                                Providing products and services to intending structure owners across borders.
                            </p>
                            <div ref={intro1}>
                                <p className="my-7" >A platform where people can monitor and manage their projects without being encumbered by time and distance.</p>
                                <div>
                                    <Link to="/">
                                        <button className="rounded-xl bg-secondary">
                                            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670504238/BOG/appstore_dvsria.png" alt="appstore" className="w-24 lg:w-32" />
                                        </button>
                                    </Link>
                                    <Link to="/">
                                        <button className="rounded-xl bg-secondary ml-6">
                                            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670504241/BOG/playstore_twyw75.png" alt="appstore" className="w-24 lg:w-32" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* start and monitor */}
            <div className="box">
                <div className="section">
                    <div>
                        <p className="lg:w-6/12 m-auto text-center lg:text-3xl text-2xl fw-600">Start, monitor and complete your project hazzle free in one app</p>
                    </div>
                    <div className="lg:flex justify-between mt-16" id="hassle" ref={hazzle}>
                        <div className="text-center lg:w-2/12 px-4">
                            <img src={require("../assets/images/calculator.png")} alt="calculator" className="lg:w-20 w-16 m-auto mb-6" />
                            <p>Price/Cost calculator</p>
                        </div>
                        <div className="text-center mt-6 lg:mt-0 lg:w-2/12 px-4">
                            <img src={require("../assets/images/tv.png")} alt="tv" className="lg:w-20 w-16 m-auto mb-6" />
                            <p className="w-8/12 lg:w-full m-auto">In app meetings and reviews</p>
                        </div>
                        <div className="text-center mt-6 lg:mt-0 lg:w-2/12 px-4">
                            <img src={require("../assets/images/prof.png")} alt="providers" className="lg:w-20 w-16 m-auto mb-6" />
                            <p className="w-8/12 lg:w-full m-auto">Find expert construction workers</p>
                        </div>
                        <div className="text-center mt-6 lg:mt-0 lg:w-2/12 px-4">
                            <img src={require("../assets/images/tractor.png")} alt="tractor" className="lg:w-20 w-16 m-auto mb-6" />
                            <p className="w-8/12 lg:w-full m-auto">Shop for construction materials</p>
                        </div>
                        <div className="text-center mt-6 lg:mt-0 lg:w-2/12 px-4">
                            <img src={require("../assets/images/call.png")} alt="call" className="lg:w-20 w-16 m-auto mb-6" />
                            <p>Quality customer care</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* online market place */}
            <div className="bg-ash">
                <div className="box">
                    <div className="section">
                        <div className="flex">
                            <div className="lg:w-2/12 w-1/12 flex justify-center">
                                <ImQuotesLeft className="text-primary lg:text-6xl text-3xl" />
                            </div>
                            <div className="lg:w-8/12 w-10/12 ">
                                <p className="lg:text-3xl text-lg fw-400 py-8 text-center">
                                    BOG is an online marketplace which intends to provide a platform for individuals interested in owning structures in Nigeria/Africa achieve their aim.
                                </p>
                            </div>
                            <div className="lg:w-2/12 w-1/12 flex justify-center self-end">
                                <ImQuotesRight className="text-primary lg:text-6xl text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* video section */}
            <div className="section">
                <div className="box">
                    <div className="text-center mb-6">
                        <p className="text-2xl lg:text-4xl fw-600">How It Works</p>
                    </div>
                    <div className="lg:w-10/12 m-auto relative h-video lg:my-16 xl:mb-24">
                        <video loop playsInline muted className="absolute z-0 w-full h-full left-0 top-0 rounded-lg">
                            <source src="https://res.cloudinary.com/greenmouse-tech/video/upload/v1668779475/BOG/BOGVideo_nmtany.mp4" />

                        </video>
                        <div className="absolute bg-white xl:left-50 lg:left-45 circle left-40 z-20 top-50 flex items-center">
                            {/* <div className="lg:w-20 w-10 h-1 bg-gray-400"></div> */}
                            <div className="lg:w-20 lg:h-20 w-10 h-10 bg-blue-500 circle center-item " onClick={() => { setShowVideo(true) }}>
                                <FontAwesomeIcon icon={faPlay} className="lg:text-3xl text-white" />
                            </div>
                        </div>
                    </div>
                    {showVideo && (
                        <div className="center-item scale-ani bg-op top-0 left-0 z-40 fixed h-screen w-full">
                            <div className="box">
                                <p className="lg:w-9/12 mx-auto" onClick={() => { setShowVideo(false) }}><FontAwesomeIcon icon={faArrowLeftLong} className="text-2xl text-black" /></p>
                                <video controls autoPlay className="lg:w-9/12 mx-auto">
                                    <source src="https://res.cloudinary.com/greenmouse-tech/video/upload/v1668779475/BOG/BOGVideo_nmtany.mp4" />
                                </video>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            {/* shop on bog */}
            <div className="section bg-primary">
                <div className="box">
                    <div>
                        <div className="text-white">
                            <p className="lg:text-4xl text-2xl fw-600 mb-3">Shop on BOG</p>
                            <p>Purchase quality products for your construction project</p>
                        </div>
                        <div className="lg:grid-4 justify-between mt-12">
                            <div className="bg-white w-11/12 lg:w-full m-auto">
                                <div className="">
                                    <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1669565021/BOG/sand_1_qhuy8e.png" alt="sand" className="w-full h-72" />
                                </div>
                                <div className="flex items-center py-4 pl-4"><BsBag /><p className="pl-2">Shop for Sand</p></div>
                            </div>
                            <div className="mt-6 lg:mt-0 w-11/12 lg:w-full m-auto bg-white">
                                <div className="w-full bg-primary">
                                    <img src={require("../assets/images/steels.png")} alt="steel" className="w-full h-72" />
                                </div>
                                <div className="flex items-center py-4 pl-4"><BsBag /><p className="pl-2">Shop for Steel</p></div>
                            </div>
                            <div className=" mt-6 lg:mt-0 w-11/12 lg:w-full m-auto bg-white">
                                <div className="">
                                    <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1669565034/BOG/granite_1_ml5wb2.png" alt="steel" className="w-full h-72" />
                                </div>
                                <div className="flex items-center py-4 pl-4"><BsBag /><p className="pl-2">Shop for Granite</p></div>
                            </div>
                            <div className=" mt-6 lg:mt-0 w-11/12 lg:w-full m-auto bg-white">
                                <div className="">
                                    <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1669565035/BOG/cement_1_mvstfy.png" alt="steel" className="w-full h-72" />
                                </div>
                                <div className="flex items-center py-4 pl-4"><BsBag /><p className="pl-2">Shop for Cement</p></div>
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/shop"><button className="px-8 lg:px-12 lg:py-3 py-2 rounded text-white bg-secondary">Shop Materials</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* hire experts */}
            <div className="section">
                <div className="box">
                    <div>
                        <div>
                            <p className="text-xl lg:text-3xl m-auto text-center lg:w-6/12 fw-500 mb-4 ">Hire Expert Construction workers to get the work done.</p>
                            <p className="text-center m-auto lg:w-6/12">Find the qualified construction workers you need from our global network of over 12 thousand experienced professionals.</p>
                        </div>
                    </div>
                    <div className="mt-12 lg:block hidden">
                        <ProfSlides />
                    </div>
                    <div className="mt-12 lg:hidden">
                        <ProfSlidesSm />
                    </div>
                </div>
            </div>
            {/* provide service */}
            <div className="section bg-light">
                <div className="box">
                    <div>
                        <div>
                            <p className="text-xl lg:text-3xl m-auto text-center lg:w-6/12 w-10/12 fw-600 mb-4 ">Are you looking to provide Services or Goods on BOG?</p>
                            <p className="text-center m-auto lg:w-5/12 w-10/12">Sign up as a professional service provider or, a vendor today and get more jobs.</p>
                        </div>
                        <div className="mt-12 lg:grid-2 justify-around">
                            <div className="bg-secondary-op h-64 rounded-lg px-6 pt-8">
                                <p className="text-lg fw-600">Sign Up as a Service Partner</p>
                                <p className="mt-5 mb-7">Setup your account as a service partner and start rendering services to clients fast and easy </p>
                                <Link to="/signup/profession"><button className="text-white px-4 py-2 rounded-lg flex items-center fw-600 bg-secondary"><span className="pr-3">Sign Up</span> <BsArrowRight /></button></Link>
                            </div>
                            <div className="mt-6 bg-primary-op lg:mt-0 rounded-lg p-8">
                                <p className="text-lg fw-600">Sign Up as a Product Partner</p>
                                <p className="mt-5 mb-7">Setup your account as a product partner and start selling your products fast and easy </p>
                                <Link to="/signup/supply"><button className="text-white px-4 py-2 rounded-lg  flex bg-primary items-center fw-600"><span className="pr-3">Sign Up</span> <BsArrowRight /></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* updated with blogs */}
            <div className="section bg-tertiary " ref={blog} >
                <div className="box">
                    <div className="hidden lg:block h-blog overflow-hidden w-full"  >
                        <div className="flex"   >
                            <div className="mt-6 w-3/12 text-white pr-6">
                                <p className="lg:text-3xl ">Stay updated with our blog posts</p>
                                <p className="my-6">Stay engaged with the latest news and insights from BOG</p>
                                <Link to="/blog">
                                    <button className="mt-6 px-6 py-2 btn-primary">
                                        See All Blog Post
                                    </button>
                                </Link>
                            </div>
                            <div className="w-9/12" ref={news}>
                                <HomepageBlog/>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:">
                        <div className="mt-6 w-4/12 text-white mt-24 pr-6">
                            <p className="lg:text-3xl ">Stay updated with our blog posts</p>
                            <p className="my-6">Stay engaged with the latest news and insights from BOG</p>
                            <button className="mt-6 px-6 py-2 btn-primary">
                                See All Blog Post
                            </button>
                        </div>
                        <div className="w-8/12">
                            <BlogSlides />
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <div className=" mb-6 text-white">
                            <p className="lg:text-3xl text-xl fw-600">Stay updated with our blog posts</p>
                            <p className="my-6">Stay engaged with the latest news and insights from BOG</p>

                        </div>
                        <BlogSlidesSm />
                        <div className="mt-6">
                            <Link to="/blog">
                                <button className="mt-3 px-6 py-2 btn-primary">
                                    See All Blog Post
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* what our client says */}
            <div className="section bg-light">
                <div className="box">
                    <div>
                        <div className="lg:text-2xl text-xl fw-600 lg:w-4/12">
                            <p>See what our Clients and Patners have to say about us </p>
                        </div>
                        <div className="mt-12 hidden lg:block">
                            {
                                loading ? <Spinner /> :
                                    <ReviewSlide reviews={reviews} />
                            }
                        </div>
                        <div className="mt-12 lg:hidden">
                            {
                                loading? <Spinner/> : <ReviewSlideSm reviews={reviews} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* bringing community together */}
            <div className="section">
                <div className="box">
                    <div className="lg:flex flex-row-reverse bg-primary rounded-xl justify-center lg:p-10  items-center">
                        <div className="lg:w-6/12 lg:py-10">
                            <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1678204435/BOG/mockuper-removebg-preview_n3gg9g.png' alt="build" className="w-full" />
                        </div>
                        <div className="lg:w-6/12 mt-6 text-white lg:mt-0 ">
                            <p className="text-xl fw-600 lg:text-4xl fw-500">
                                Bringing together a community of service partners, product partners
                                and clients.
                            </p>
                            <p className="my-3">An online marketplace which intends to provide a platform for individuals interested in owning structures in Nigeria/Africa achieve their aim.</p>
                            <Link to="/login"><button className="btn bg-white hover:scale-110 duration-200 text-primary fw-600 px-6 mt-6">Become A Partner</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* why bog */}
            <div className="section bg-light">
                <div className="box">
                    <div>
                        <div className="text-center">
                            <p className="lg:text-2xl text-xl fw-700">Why BOG? Because we deliver the best.</p>
                            <p className="mt-2 lg:w-10/12 mx-auto">No more compromising or missed opportunities with BOG by your side. With our hassle-free application, this time tomorrow you could have access to the products and services you need. It’s just what we do.</p>
                        </div>
                        <div className="lg:grid-3 justify-between mt-12">
                            <div className="text-center">
                                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670510807/BOG/development-plan_1_fyoa8d.png" alt="support" className="w-36 mx-auto mb-4" />
                                <p className="fw-700 text-xl">Flexibility</p>
                                <p>Fast application and navigation, and delivery is possible within 24 hours of order.</p>
                            </div>
                            <div className="text-center lg:mt-0 mt-7">
                                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670510807/BOG/it-department_1_1_km7eu8.png" alt="support" className="w-36 mx-auto mb-4" />
                                <p className="fw-700 text-xl">Support</p>
                                <p>A dedicated Customer Care Service will get to know you and your service need and provide a personalised solution.</p>
                            </div>
                            <div className="text-center mt-7 lg:mt-0">
                                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670515982/BOG/flexibility_1_1_ivqqdd.png" alt="support" className="w-36 mx-auto mb-4" />
                                <p className="fw-700 text-xl">Confidence</p>
                                <p>Join thousands of individuals who patronizes BOG and experience smooth and standard services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* faqs */}
            <div className="section" >
                <div className="box">
                    <div>
                        <div>
                            <p className="text-xl lg:text-3xl fw-600 text-center">Frequently Asked Questions</p>
                        </div>
                        <div className="lg:w-8/12 mt-12 m-auto">
                            <Faqs />
                        </div>
                        <div className="text-center lg:w-8/12 mt-12 mx-auto ">
                            <Link to="/faqs"><button className="btn-primary lg:px-10 px-4 rounded fs-500">See All FAQs</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* promote app */}
            <div className="section">
                <div className="box">
                    <div className="bg-app bg-cover lg:flex flex-row-reverse lg:h-96 items-center justify-center rounded-xl text-white px-6">
                        <div className="lg:w-6/12 lg:flex justify-end">
                            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670844720/BOG/Group_47497_xksedr.png" alt="app" className="relative left-8 lg:left-1/4" />
                        </div>
                        <div className="lg:w-5/12 xl:w-4/12 lg:py-10 relative -top-6 lg:top-0 lg:text-left text-center">
                            <p className="lg:text-4xl fw-600 text-lg">Let's Build On The Go</p>
                            <p className="fw-500 fs-500 pt-12">BOG is available on iOS, Andriod and Web.</p>
                            <p className="fw-500 fs-500 pt-2">Open an account today</p>
                            <div className="mt-6 lg:mt-12">
                                <Link to="/">
                                    <button className="rounded-xl bg-secondary">
                                        <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670844719/BOG/Frame_466445_v7lxvt.png" alt="appstore" className="w-24 lg:w-36" />
                                    </button>
                                </Link>
                                <Link to="/">
                                    <button className="rounded-xl bg-secondary ml-6">
                                        <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1670844719/BOG/Frame_466443_nlsg5u.png" alt="appstore" className="w-24 lg:w-36" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div>
                <Footer />
            </div>
        </div>
    )

}