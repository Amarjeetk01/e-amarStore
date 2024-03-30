'use client'
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom-ui/Loader";
import { useFetchUser } from "@/lib/hook/useFetchUser";
import { useState } from "react";
import toast from "react-hot-toast";

type CustomUserType = {
  clerkId: string;
  role: string;
};

const CreateCollection = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useFetchUser();

  return loading ? (
    <Loader />
  ) : (
    <div>
      {user && user.role !== 'admin' ? (
        <>
           {toast.error("You are not authorized to delete or update.")}
        </>
      ) : (
        <CollectionForm />
      )}
    </div>
  );
};

export default CreateCollection;
