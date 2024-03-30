"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom-ui/ImageUpload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom-ui/Delete";
import Loader from "../custom-ui/Loader";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500),
  image: z.string(),
});

interface CollectionFormsProps{
  initialData?:CollectionType | null;
}
type CustomUserType = {
  clerkId: string;
  role: string;
};

const CollectionForm: React.FC<CollectionFormsProps> = ({initialData}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user && user.role !== 'admin') {
      toast.error("You are not authorized to delete or update.");
    } else {
      try {
        setLoading(true);
        const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections";
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
        });
        if (res.ok) {
          setLoading(false);
          toast.success(`Collection ${initialData ? "updated" : "created"} `);
          window.location.href = "/admin/collections";
          router.push('/admin/collections');
        } else {
          setLoading(false);
          toast.error(`Failed to ${initialData ? "update" : "create"} collection.`);
        }
      } catch (err) {
        setLoading(false);
        console.error("[collection_POST]", err);
        toast.error("Something went wrong! Please try again.");
      }
    }
  };
  
  
  return (
    <>{
      loading?(<Loader/>):(
    <div className="p-10">
         {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id} item="collection"/>
        </div>
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
                
                  <div className="flex gap-4">
                  {field.value && (
                    <Button type="submit" className="bg-blue-1 text-white">
                      Submit
                    </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => router.push("/admin/collections")}
                      className="bg-red-1 text-white"
                    >
                      Discard
                    </Button>
                  </div>
                
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
    )
  }
    </>
  );
};

export default CollectionForm;
