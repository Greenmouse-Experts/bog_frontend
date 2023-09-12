/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from 'react-share';
import Axios from "../../config/config";
import { Loader } from "../layouts/Spinner";
import RelatedNews from "./Blog/RelatedNews";
import Footer from "./home-comp/Footer";
import Header from "./home-comp/Header";

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const d = new Date()
const year = d.getFullYear()
const monthName = months[d.getMonth()]
const dayName = days[d.getDay()] // Thu


export default function BlogPage() {
  const { blogId } = useParams();
  const [posts, setPosts] = useState([]);
  const [blog, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const currentURL = window.location.href;


  const fetchRelatedBlog = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const url = `/blog/get-category-blogs/${blog?.category[0].id}`;
      const res = await Axios.get(url, config);
      const data = res.data;
      const filteredPost = data.filter(where => where.id !== blogId).filter(where => where.isPublished);
      const postData = filteredPost.slice(0, 2)
      setPosts(postData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }


  const fetchBlogContent = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const url = `/blog/find/${blogId}`;
      const res = await Axios.get(url, config);
      const data = res.data;
      setBlogs(data)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (blogId) {
      fetchRelatedBlog();
    };
    fetchBlogContent()
  }, [blogId]);

  if (isLoading) {
    return <center>
      <Loader />
    </center>
  }


  return (
    <div>
      <div className="font-primary">
        <Header />
        <div className="section">
          <div className="box">
            <div className="w-full my-2">
              <Link to={'/blog'}>
                <p className="fs-400 flex items-center text-primary mt-4 font-bold"><span className="pl-2 pr-2"><BsArrowLeft /></span>Back</p>
                </Link>
            </div>
            <div className="lg:flex lg:mt-5">
              <div className="lg:w-2/12 bg-light hidden lg:block">
                <p className="fw-600 bg-primary py-2 pl-2 text-white">Related News</p>

                {
                  !isLoading && posts.length > 0 ? posts.map(post => (
                    <RelatedNews key={post.id} item={post} />
                  )) : null
                }
              </div>
              <div className="lg:w-8/12 lg:px-10">
                <div>
                  <p className="fw-800 text-xl lg:text-3xl">
                    {blog?.title}
                  </p>
                  <div className="lg:flex my-5">
                    <p>BoG</p>
                    <p>@Admin | {dayjs(blog?.createdAt).format(" HH:mmA  DD MMM, YYYY")}</p>
                  </div>
                  <div>
                    {
                      blog?.images.length > 0 ?
                        <img
                          src={blog?.images[0].image}
                          alt="blog1"
                          className="w-full rounded-md ar-32"
                        /> : null
                    }

                  </div>
                  <div className="mt-6 lg:mt-12">
                    <p>
                      {blog?.body}
                    </p>

                  </div>
                </div>
              </div>
              <div className="hidden lg:block w-2/12 bg-light px-4 py-12">
                <div className=" bg-white w-24 py-3 text-center shadow-lg rounded-lg mx-auto mb-12">
                    <p className="fw-600 text-primary">{dayName}</p>
                    <p className="text-3xl fw-600 text-secondary">{new Date().getDate()}</p>
                    <div className="flex justify-center fs-500 fw-500">
                      <p>{monthName}</p>
                      <p>-{year}</p>
                    </div>
                </div>
                <div>
                  <p className="fw-600">Socials</p>
                  <ul className="mt-6 fw-500 fs-500">
                    <li className="flex items-center cursor-pointer"><span className="text-xl pr-2 text-blue-500">
                      <FacebookShareButton
                        url={`${currentURL}`}
                        className='flex'
                      >
                        <FacebookIcon size={32} round /> <span className="font-primary text-sm my-1 ml-2" style={{color: '#000'}}>Facebook</span>
                      </FacebookShareButton>
                    </span></li>
                    <li className="flex items-center mt-3"><span className="text-xl pr-2 text-blue-800">
                      <TwitterShareButton
                        url={`${currentURL}`}
                        className='flex'
                      >
                        <TwitterIcon size={32} round />
                        <span className="font-primary text-sm my-1 ml-2" style={{ color: '#000' }}>Twitter</span>
                      </TwitterShareButton>
                    </span>
                    </li>
                    <li className="flex items-center mt-3"><span className="text-xl pr-2 text-orange-800">
                      <WhatsappShareButton
                        url={`${currentURL}`}
                        className='flex'
                      >
                        <WhatsappIcon size={32} round />
                        <span className="font-primary text-sm my-1 ml-2" style={{ color: '#000' }}>Whatsapp</span>
                      </WhatsappShareButton>
                    </span>
                    </li>
                    <li className="flex items-center mt-3"><span className="text-xl pr-2 text-orange-800">
                      <TelegramShareButton
                        url={`${currentURL}`}
                        className='flex'
                      >
                        <TelegramIcon size={32} round />
                        <span className="font-primary text-sm my-1 ml-2" style={{ color: '#000' }}>Telegram</span>
                      </TelegramShareButton>
                    </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
