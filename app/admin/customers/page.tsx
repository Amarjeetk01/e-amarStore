"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/custom-ui/Loader";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/customers/CustomersColumn";
import { useUser } from "@clerk/nextjs";

const Orders = () => {
  const {user}=useUser()
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  const getCustomers = async () => {
    try {
      const res = await fetch("/api/customers", {
        method: "GET",
      });
      const data = await res.json();
      setCustomers(data);
      setLoading(false);
    } catch (err) {
      console.log("[customersPage_GET]", err);
    }finally{
      setLoading(false)
    }
  };
  
  useEffect(() => {

    if(user){
      getCustomers();
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Customers</p>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={customers} searchKey="title" />
    </div>
  );
};

export default Orders;
