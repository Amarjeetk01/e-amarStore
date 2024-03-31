"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SuccessfulPayment = () => {
  const { user } = useUser();
  const router = useRouter();
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const routerRef = useRef(router);

  useEffect(() => {
    const isTokenValid = async () => {
      try {
        const res = await fetch("/api/payment-success", {
          method: "POST",
          body: JSON.stringify({ token }),
        });
        if (res.ok) {
          setTokenIsValid(true);
        }
      } catch (err) {
        console.error("[cart-clear]", err);
        routerRef.current.push("/");
      }
    };
    if (user && token) {
      isTokenValid();
    }
  }, [user, token]);

  return (
    user &&
    tokenIsValid && (
      <div className="h-screen flex flex-col justify-center items-center gap-5">
        <p className="text-heading4-bold text-red-1">Successful Payment</p>
        <p>Thank you for your purchase</p>
        <Link href="/"className="p-4 border text-base-bold hover:bg-black hover:text-white rounded-md shadow-md">
            CONTINUE TO SHOPPING   
        </Link>
      </div>
    )
  );
};

export default SuccessfulPayment;
