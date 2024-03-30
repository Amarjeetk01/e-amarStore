import User from "@/lib/models/user";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req:NextRequest)=>{
    try{

        const{userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const user = await User.findOne({ clerkId: userId });
        if(!user){
            return new NextResponse("User not found",{status:404})

        }
        const {productId}=await req.json()
        if(!productId){
            return new NextResponse("Product Id required",productId)

        }
        const isLiked=user.wishlist.includes(productId)
       if(isLiked){
        user.wishlist=user.wishlist.filter((id:string)=>id!==productId)
       }else{
        user.wishlist.push(productId)
       }
       await user.save()
       return NextResponse.json(user,{status:200})
    }catch(err){
        console.log("[whilist_POST",err)
        return new NextResponse("Internal Error", { status: 500 });
    }
}