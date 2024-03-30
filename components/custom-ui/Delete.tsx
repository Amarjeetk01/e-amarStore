"use client";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

type CustomUserType = {
  clerkId: string;
  role: string;
};

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<CustomUserType | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: "GET",
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log("[users_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  const handleDelete = async () => {
    console.log(`Deleting ${item} with ID ${id}`);
    try {
      if (user && user.role !== 'admin') {
        toast.error("You are not authorized to delete or update.");
      } else {
        setLoading(true);
        const res = await fetch(`/api/${item}s/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setLoading(false);
          window.location.href = `/${item}s`;
          toast.success(`${item} deleted`);
        } else {
          setLoading(false);
          toast.error(`Failed to delete ${item}.`);
        }
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-1 text-white h-10 w-12 flex items-center justify-center rounded-md">
        <Trash className="h-4 w-4" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-1 text-white"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
