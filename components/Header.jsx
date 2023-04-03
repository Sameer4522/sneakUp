import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  const handleNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[5rem]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbar);

    return () => window.removeEventListener("scroll", handleNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  return (
    <header
      className={`w-full h-[3.125rem] md:h-[5rem] bg-white flex items-center justify-between
      z-20 sticky top-0 transition-transform duration-300 ${show} select-none`}
    >
      <Wrapper className="h-[3.75rem] flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            className="w-[2.5rem] md:w-[3.75rem] ml-1"
            width={100}
            height={100}
            alt="Logo"
          />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MobileMenu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/*Icon start*/}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[1.1875rem] md:text-[1.5rem]" />
            <div className="h-[0.875rem] md:h-[1.125rem] min-w-[0.875rem] md:min-w-[1.125rem] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[0.625rem] md:text-[0.75rem] flex justify-center items-center px-[2px] md:px-[5px]">
              51
            </div>
          </div>

          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[0.9375rem] md:text-[1.25rem]" />
              {cartItems.length > 0 && (
                <div className="h-[0.875rem] md:h-[1.125rem] min-w-[0.875rem] md:min-w-[1.125rem] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[0.625rem] md:text-[0.75rem] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          {/*Icon end*/}

          {/* Mobile menu icon start*/}
          <div
            className="w-8 md:hidden h-8 md:h-12 rounded-full flex justify-center items-center
           hover:bg-black/[0.05] cursor-pointer relative -mr-2"
          >
            {!!mobileMenu ? (
              <VscChromeClose
                className="text-[1rem]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[1.25rem]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile menu icon end*/}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
