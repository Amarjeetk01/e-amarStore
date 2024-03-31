"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/custom-ui/Loader";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orders/OrderColumn";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderColumnType[]>([]);


  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log("[ordersAdmin_GET]", err);
    }finally{
      setLoading(false)
    }
  };
  
  useEffect(() => {

    getOrders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Orders</p>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={orders} searchKey="title" />
    </div>
  );
};

export default Orders;
