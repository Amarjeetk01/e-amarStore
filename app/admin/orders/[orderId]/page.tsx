"use client";

import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";
import { columns } from "@/components/orders/OrderItemsColumn";
import { useEffect, useState } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  
  const getOrderDetails = async () => {
    try {
      const res = await fetch(`/api/orders/${params.orderId}`);
      const { orderDetails, customer } = await res.json();
      setOrderDetails(orderDetails);
      setCustomer(customer);
      setLoading(false);
    } catch (err) {
      console.log("[orderId_GET]", err);
    }
  };
  useEffect(() => {
    getOrderDetails();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col p-10 gap-5">
        <p className="text-base-bold">
          Order ID:{" "}
          <span className="text-base-medium">{orderDetails?._id}</span>
        </p>
        <p className="text-base-bold">
          Customer name:{" "}
          <span className="text-base-medium">{customer?.name}</span>
        </p>
        <p className="text-base-bold">
          Shipping address:{" "}
          <span className="text-base-medium">
            {orderDetails?.shippingAddress.street},{" "}
            {orderDetails?.shippingAddress.city},{" "}
            {orderDetails?.shippingAddress.state},{" "}
            {orderDetails?.shippingAddress.postalCode},{" "}
            {orderDetails?.shippingAddress.country}
          </span>
        </p>
        <p className="text-base-bold">
          Total Paid:{" "}
          <span className="text-base-medium">${orderDetails?.totalAmount}</span>
        </p>
        <p className="text-base-bold">
          Shipping rate ID:{" "}
          <span className="text-base-medium">{orderDetails?.shippingRate}</span>
        </p>
        <DataTable
          columns={columns}
          data={orderDetails?.products}
          searchKey="product"
        />
      </div>
    </>
  );
};

export default OrderDetails;
