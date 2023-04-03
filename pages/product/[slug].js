import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProduct from "@/components/RelatedProduct";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { fetchDataFromApi } from "@/utils/api";
import { IoMdHeartEmpty } from "react-icons/io";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const p = product?.data[0]?.attributes;

  const notify = () => {
    toast.success("Product added to your cart.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-1 md:gap-[3.125rem] lg:gap-[6.25rem]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[31.25rem] lg:max-w-full mx-auto lg:mx-0 select-none">
            <ProductDetailsCarousel images={p.image.data} />
          </div>

          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2 mt-4 md:mt-0">
              {p.name}
            </div>

            <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP: &#8377;{p.price}
              </p>
              {p.original_price && (
                <>
                  <p className="text-base font-meduim line-through">
                    &#8377;{p.original_price}
                  </p>
                  <p className="ml-auto text-base font-meduim text-green-500">
                    {getDiscountedPricePercentage(p.original_price, p.price)}%
                    off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              {`(Also includes all aplicable duties)`}
            </div>

            <div className="mt-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>

                <div className="text-md font-semibold text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>

              <div id="sizesGrid" className="grid grid-cols-3 gap-2 mt-3">
                {p?.size?.data.map((item, index) => (
                  <div
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "bg-black/[0.1] cursor-not-allowed opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>

              {showError && (
                <div className="text-red-600 mt-1">
                  Size Selection is required
                </div>
              )}
            </div>

            <div className="mt-10">
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById("sizesGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    dispatch(
                      addToCart({
                        ...product?.data[0],
                        selectedSize,
                        oneQuantityPrice: p.price,
                      })
                    );
                    notify();
                  }
                }}
              >
                Add to cart
              </button>

              <button className="w-full py-4 rounded-full border border-black flex items-center justify-center gap-2 mb-10 text-lg font-medium transition-transform active:scale-95 hover:opacity-75">
                Add to Whishlist
                <IoMdHeartEmpty size={20} />
              </button>
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>

                <div className="text-md mb-5 markdown">
                  <ReactMarkdown>{p.description}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedProduct products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );

  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
