"use client";

import { apiClient, getProductDetails } from "@/utils/apiClient";
import { Award, Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [productDetails, setProductDetails] = useState({});

  const { slug } = useParams();
  const fetchProductDeatils = async (slug) => {
    try {
      const data = await apiClient.getProductBySlug(slug);
      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }
      // console.log(data);
      setProductDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDeatils(slug);
  }, [slug]);

  const [bCurrentImg, setBcurrentImg] = useState(
    "https://m.media-amazon.com/images/I/81sNxLVmxOL._SX679_.jpg"
  );
  const [proImg, setProImg] = useState([
    {
      proNo: "1",
      img: "https://m.media-amazon.com/images/I/81sNxLVmxOL._SX679_.jpg",
      isActive: true,
    },
    {
      proNo: "2",
      img: "https://m.media-amazon.com/images/I/91bdQ0IjRVL._SX679_.jpg",
      isActive: false,
    },
    {
      proNo: "3",
      img: "https://m.media-amazon.com/images/I/81xOR1hyQvL._SX679_.jpg",
      isActive: false,
    },
    {
      proNo: "4",
      img: "https://m.media-amazon.com/images/I/81yZAFl5YLL._SX679_.jpg",
      isActive: false,
    },
    {
      proNo: "5",
      img: "https://m.media-amazon.com/images/I/81x2AIh7D9L._SX679_.jpg",
      isActive: false,
    },
  ]);

  function currentImg(id) {
    setProImg((pre) =>
      pre.map((ele) =>
        ele.proNo == id
          ? { ...ele, isActive: true }
          : { ...ele, isActive: false }
      )
    );

    proImg.map((ele) => {
      if (ele.proNo === id) setBcurrentImg(ele.img);
    });
  }

  return (
    <section className="md:h-[80vh] max-w-7xl flex items-center flex-col md:flex-row mx-auto md:my-8">
      {/* left sec */}

      <div className="h-[100%] md:w-[50%] md:p-5 flex flex-col justify-center">
        {}
        <img className="h-[80%]" src={bCurrentImg} alt="product img" />

        <div className="flex justify-between items-center h-[20%] w-[95%] mx-auto">
          {proImg.map((pro, ind) => (
            <img
              key={pro.proNo}
              className={`md:h-[80px] h-[30px] md:w-[80px] w-[40px] ${
                pro.isActive ? "border-2 border-red-700" : "border-none"
              }`}
              src={pro.img}
              alt="product_img"
              onClick={() => currentImg(pro.proNo)}
            />
          ))}
        </div>
      </div>

      {/* right sec */}

      <div className="md:w-[50%] h-[100%] p-5 md:pt-28">
        <p className="text-2xl font-bold">
          Samsung 1 Ton 3 Star Digital Inverter Split AC
        </p>

        <div className="flex flex-col md:flex-row gap-4 my-3">
          <div className="flex gap-3 ">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <span className="text-lg text-gray-400 font-light">
            ( 150 reviews )
          </span>
        </div>

        <p className="flex items-end gap-2">
          <span className="text-red-700 text-3xl">-40%</span>
          <span className="text-lg font-semibold">₹ 31,990</span>
        </p>

        <p className="flex gap-2 my-3">
          <Award className="text-green-500" />
          <span className="text-gray-400">2 Year Warranty</span>
        </p>

        <div className="flex flex-col gap-2 md:w-[40%]">
          <button className="px-16 py-2 rounded-full font-semibold border-2 border-gray-800">
            Add to Cart
          </button>
          <button className="px-16 py-2 rounded-full font-semibold border-2 border-gray-800">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
