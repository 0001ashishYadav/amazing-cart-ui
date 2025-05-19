"use client";

import { apiClient, getProductDetails } from "@/utils/apiClient";
import { paiseToRupee } from "@/utils/calculation";
import { Award, Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [variant, setVariant] = useState({});
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);

  const { slug } = useParams();

  const addToCart = async () => {
    try {
      const data = await apiClient.addToCart({
        variant_id: variant.variant_id,
      });
      console.log(data);

      if (data.error) {
        alert(data.message);

        return;
      }

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductDeatils = async (slug) => {
    setLoading(true);
    try {
      const data = await apiClient.getProductBySlug(slug);
      console.log(data);
      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setProductDetails(data);
      setVariant(data.variants[0]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDeatils(slug);
  }, [slug]);

  return (
    <section className="md:h-[80vh] md:bg-gray-200 max-w-7xl flex items-center flex-col md:flex-row mx-auto md:my-8">
      {/* left sec */}

      {productDetails.image_urls ? (
        <div className="h-[100%] md:w-[50%] md:p-5 flex flex-col justify-center">
          {loading ? (
            <div className="h-[80%] md:rounded-4xl bg-gray-300 animate-pulse rounded mb-2"></div>
          ) : (
            <img
              className="h-[80%] md:rounded-4xl"
              src={productDetails.image_urls[selectedImage]}
              alt="product img"
            />
          )}

          <div className="flex items-center gap-2 h-[20%] w-[95%] mx-auto">
            {productDetails.image_urls.map((img, ind) => (
              <img
                key={ind}
                className={`md:h-[80px] h-[30px] md:w-[80px] w-[40px] border-2 ${
                  selectedImage === ind
                    ? " border-red-700"
                    : "  border-gray-300"
                }`}
                src={img}
                alt="product_img"
                onClick={() => setSelectedImage(ind)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>No Image Available</div>
      )}

      {/* right sec */}

      <div className="md:w-[50%] h-[100%] p-5 md:pt-28">
        <p className="text-2xl font-bold">{productDetails.name}</p>

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

        <div className="flex items-end gap-2">
          {/* <span className="text-red-700 text-3xl">-40%</span> */}
          {productDetails.variants && (
            <div className="my-5">
              <h3 className="text-xl font-semibold my-2">Varients</h3>
              {productDetails.variants.map((varient, index) => (
                <div key={index} className="border border-gray-100 p-3">
                  <h3>{varient.name}</h3>
                  <p>{paiseToRupee(varient.price)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <p className="flex gap-2 my-3">
          <Award className="text-green-500" />
          <span className="text-gray-400">2 Year Warranty</span>
        </p> */}

        <div className="flex flex-col gap-2 md:w-[40%]">
          <button
            onClick={addToCart}
            className="px-16 py-2 rounded-full font-semibold border-2 border-gray-800"
          >
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
