"use client"
import Loading from "@/app/loading";
import PostCard from "@/components/PostCard/PostCard";
import { getPostDetails } from "@/store/features/posts.slice";
import { useAppDispatch, useAppSelector } from "@/store/user.hooks";
import React, { use, useEffect } from "react";

export default function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = use(params);


  const dispatch = useAppDispatch()

 let {postdetails} =   useAppSelector((store)=>store.PostsReducer)

  useEffect(()=>{
   dispatch(getPostDetails(postId))
  } , [])

  return <>
    {postdetails ? <PostCard showAllComments ={true} postInfo={postdetails} key={postdetails._id}/>: <Loading/> }
  </>
}
