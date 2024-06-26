import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./custom-ui/Loader";

const Collections = () => {
  const [loading,setLoading]=useState(true)
  const [collections,setCollections]=useState<any>(null)

  useEffect(()=>{
    const getCollection= async ()=>{
      try{
        const res=await fetch(`/api/collections`)
        if(!res.ok){
          throw new Error("Failed to fetch collections data");
        }
        const data= await res.json()
        setCollections(data)
      }catch(err){
        console.log("[collection_get]",err)
      }finally{
        setLoading(false)
      }
    }
    getCollection()
  },[])

  return loading?(<Loader/>): (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <Image
                key={collection._id}
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg cursor-pointer"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;