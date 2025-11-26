"use client";
import PostCard from "@/components/PostCard/PostCard";
import { getPosts } from "@/store/features/posts.slice";
import { useAppDispatch, useAppSelector } from "@/store/user.hooks";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "./loading";
import CommentCard from "@/components/CommentCard/CommentCard";

export default function pge({}) {
  const { posts } = useAppSelector((store) => store.PostsReducer);

  const dispactch = useAppDispatch();

  useEffect(() => {
    dispactch(getPosts());
  }, []);

  return (
    <>
      <section>
        <Grid container>
          <Grid size={{ xs: 0, lg: 3 }}></Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 2, mx: "auto" }}>
            {posts ? (
              posts.map((post) => <PostCard showAllComments={false} key={post._id} postInfo={post} />)
            ) : (
              <Loading />
            )}
           
          </Grid>
          <Grid size={{ md: 3 }}></Grid>
        </Grid>
      </section>
    </>
  );
}
