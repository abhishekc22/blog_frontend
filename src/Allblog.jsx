import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Allblog() {
  const [allblog, setAllblog] = useState([]);
  const navigate = useNavigate();
  const baseurl = "http://127.0.0.1:8000";
  const axiosInstance = axios.create({
    baseURL: baseurl,
  });

  const getAllBlogs = async () => {
    try {
      const res = await axiosInstance.get(`api/all_blog/`);
      if (res.status === 200) {
        console.log(res.data);
        setAllblog(res.data);
      }
    } catch (error) {
      console.error("Error fetching all blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
        <div className="container p-6 mx-auto space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {allblog.map((blog, index) => (
              <article key={index} className="flex flex-col dark:bg-gray-50">
                <div className="flex flex-col flex-1 p-6">
                  <a
                    href="#"
                    className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
                  >
                    {blog.category.name}
                  </a>
                  <h3
                    className="flex-1 py-2 text-lg font-semibold leading-snug"
                    onClick={() => {
                        navigate("/singlepage", {
                          state: { blog: blog }
                        });
                      }}
                  >
                    {blog.title}
                  </h3>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>{blog.content}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Allblog;
