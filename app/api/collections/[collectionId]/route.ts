import Collection from "@/lib/models/collections";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET =async (req:NextRequest,{params}:{params:{collectionId:string}})=>{
    try{
        
        await connectToDB()
        const collection= await Collection.findById(params.collectionId).sort({ createdAt: "desc" })
        .populate({ path: "products", model: Product })
          .select(" -__v");
        if(!collection){
            return new NextResponse(JSON.stringify({message:"Collection not found"}), { status: 404 });
        }
        return NextResponse.json(collection,{status:200})

    } catch(err){
        console.log("[colllectionId_DELETE]",err);
        return new NextResponse("Internal Error",{status:500})
    }
}

export const POST =async (req:NextRequest,{params}:{params:{collectionId:string}})=>{
    try{
        const{userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        await connectToDB()
        let collection=await Collection.findById(params.collectionId)
        if(!collection){
            return new NextResponse("Collection not found",{status:404})

        }
        const {title,description,image}=await req.json()
        if(!title ||!image){
            return new NextResponse("Tilte and Image are required",{status:500})

        }
        collection=await Collection.findByIdAndUpdate(params.collectionId,{title,description,image},{new:true})
        await collection.save()

        return NextResponse.json(collection,{status:200})

    } catch(err){
        console.log("[colllectionId_DELETE]",err);
        return new NextResponse("Internal Error",{status:500})
    }
}

export const DELETE =async (req:NextRequest,{params}:{params:{collectionId:string}})=>{
    try{
        const{userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        await connectToDB()
        await Collection.findByIdAndDelete(params.collectionId)
        await Product.updateMany(
            { collections: params.collectionId },
            { $pull: { collections: params.collectionId } }
          );
        return new NextResponse("Collection is deleted",{status:200})

    } catch(err){
        console.log("[colllectionId_DELETE]",err);
        return new NextResponse("Internal Error",{status:500})
    }
}