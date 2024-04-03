import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Singlepage() {
  const location = useLocation();
  const blog = location.state.blog;
  const blogId = blog.id;
  const baseurl = 'http://127.0.0.1:8000';
  const axiosInstance = axios.create({
    baseURL: baseurl,
  });
  const [blogDetails, setBlogDetails] = useState(null);

  const getBlogDetails = async () => {
    try {
      const res = await axiosInstance.get(`api/all_blog/${blogId}`);
      if (res.status === 200) {
        console.log(res.data);
        setBlogDetails(res.data);
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  return (
    <>
      <div>
        <div className="hero min-h-screen bg-black">
          <div className="hero-content flex flex-col md:flex-row lg:flex-row">
            <img
              src=""
              className="w-96 md:w-full lg:w-6/12 h-auto"
              alt="car"
            />
            <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4 md:w-full lg:w-2/3">
              <div className="w-full md:w-1/2 lg:w-1/2">
                <h1 className="text-5xl mb-4 font-bold text-white">
                  {blogDetails && blogDetails.title}
                </h1>
                <h1 className="text-5xl mb-4 font-bold text-white">
                 
                  {blogDetails && `$${blogDetails.price}/day`}
                </h1>
                <h1 className="text-2xl font-bold text-white">
                  Owner name: John Doe {/* Static owner name */}
                </h1>
                <h1 className="text-2xl font-bold text-white">
                  Location: 
                  {/* Display blog location if available */}
                  {blogDetails && blogDetails.location}
                </h1>
                <p className="py-6 text-slate-600">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Singlepage;
