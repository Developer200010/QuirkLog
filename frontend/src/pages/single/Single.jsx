import React, { useEffect, useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Single() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [singlePostData, setSinglePostData] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/post/" + path);
      console.log(res.data);
      setSinglePostData(res.data);
    };
    getPost();
  }, [path]);

  return (
    <div className="flex w-full flex-col items-center px-4 md:px-16 py-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="w-full md:w-3/4 lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <SinglePost data={singlePostData} />
        </div>
      </div>
    </div>
  );
}
