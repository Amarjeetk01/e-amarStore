"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  CircleUserRound,
  LogIn,
  Menu,
  Search,
  ShoppingCart,
  View,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import useFetchCart from "@/lib/hook/useFetchQuantity";

interface NavbarProps {
  quantity: number;
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const {quantity}=useFetchCart()
  const handleClickNav = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string
  ) => {
    if (url === "/") {
      router.push(url);
    } else {
      router.push(user ? url : "/sign-in");
    }
    setDropdownMenu(false);
  };

  return (
    <>
      <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2 shadow-lg">
        <div
          onClick={() => router.push("/")}
          className="relative cursor-pointer"
        >
          <Image src="/logo.gif" alt="logo" width={100} height={30} />
        </div>

        <div className="grid grid-cols-6 gap-1 items-center justify-between text-base-bold max-lg:hidden">
          <Link
            href="/"
            className={`hover:text-red-1 ${
              pathname === "/" && "text-red-1"
            } col-start-1 col-end-2`}
          >
            Home
          </Link>
          <Link
            href={user ? "/wishlist" : "/sign-in"}
            className={`col-start-3 col-end-4 hover:text-red-1 ${
              pathname === "/wishlist" && "text-red-1"
            }`}
          >
            Wishlist
          </Link>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className={`col-start-5 col-end-6 hover:text-red-1 ${
              pathname === "/orders" && "text-red-1"
            }`}
          >
            Orders
          </Link>
        </div>

        <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
          <input
            className="outline-none max-sm:max-w-[120px]"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={query === ""}
            onClick={() => router.push(`/search/${query}`)}
          >
            <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
          </button>
        </div>

        <div className="relative flex gap-3 items-center">
          <Link
            href={user ? "/cart" : "/sign-in"}
            className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
          >
            <ShoppingCart />
            <p className="text-base-bold">Cart ({quantity})</p>
          </Link>
          <Link
            href={user ? "/admin" : "/sign-in"}
            className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-blue-300 hover:text-white max-md:hidden"
          >
            <View />
          </Link>

          <Menu
            className="cursor-pointer lg:hidden"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />

          {dropdownMenu && (
            <div className="absolute top-14 right-5 gap-1 flex flex-col px-3 py-3 w-36 bg-white shadow-2xl rounded-lg lg:hidden">
              <div
                className={`hover:bg-gray-400 cursor-pointer border p-2 rounded-md ${
                  pathname === "/" && "text-red-1"
                }`}
                onClick={(e) => handleClickNav(e, "/")}
              >
                Home
              </div>
              {user ? (
                <div className="gap-1 flex flex-col">
                  <div
                    onClick={(e) => handleClickNav(e, "/wishlist")}
                    className={`hover:bg-gray-400 cursor-pointer border p-2 rounded-md ${
                      pathname === "/wishlist" && "text-red-1"
                    }`}
                  >
                    Wishlist
                  </div>
                  <div
                    onClick={(e) => handleClickNav(e, "/orders")}
                    className={`hover:bg-gray-400 cursor-pointer border p-2 rounded-md ${
                      pathname === "/orders" && "text-red-1"
                    }`}
                  >
                    Orders
                  </div>
                  <div
                    onClick={(e) => handleClickNav(e, "/cart")}
                    className={` cursor-pointer border p-2 rounded-md hover:bg-black hover:text-white ${
                      pathname === "/cart" && "text-red-1"
                    }`}
                  >
                    <span className="flex flex-nowrap gap-1 items-center text-base-bold">
                      <ShoppingCart />
                      Cart ({quantity})
                    </span>
                  </div>
                </div>
              ) : (
                <Button
                  className="hover:bg-black hover:text-white border bg-blue-400"
                  onClick={() => router.push("/sign-in")}
                >
                  <span className="flex flex-nowrap gap-2">
                    <LogIn /> Sign-in
                  </span>
                </Button>
              )}
            </div>
          )}

          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in">
              <CircleUserRound />
            </Link>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Navbar;
