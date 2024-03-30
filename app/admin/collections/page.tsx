"use client"

import { columns } from "@/components/collections/CollectionColumns"
import { DataTable } from "@/components/custom-ui/DataTable"
import Loader from "@/components/custom-ui/Loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Collections = () => {
    const [loading,setLoading]=useState(true)
    const [collections,setCollection]=useState([])
    const router =useRouter();

    const getCollection=async()=>{
        try{
            const res= await fetch('/api/collections',{
                method:"GET",
            })
            const data=await res.json();
            setCollection(data)
        }catch(err){
            console.log("[collections_GET]",err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getCollection()
    },[])
    // console.log("collections",collections)
  return (
    loading ? (
      <Loader />
    ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/admin/collections/new")}>
          <Plus className="h-4 w-4 mr-1" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
        <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  )
  );
}

export default Collections