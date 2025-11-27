"use client"
import Loading from "@/app/loading";
import UserCardPost from "@/components/UserCardPost/UserCardPost";
import { getuserposts } from "@/store/features/posts.slice";
import { useAppDispatch, useAppSelector } from "@/store/user.hooks";
import { Post } from "@/types/posts.types";
import { Box, Typography } from "@mui/material";
import  { use, useEffect } from "react";

export default  function page({
  params
}: {
  params: Promise<{ userId: string }>;
}) {


  const dispatch = useAppDispatch();
  const { userposts } = useAppSelector((store) => store.PostsReducer);
  const { userId } = use(params);
  useEffect(() => {
    dispatch(getuserposts(userId));
  }, [userposts]);

  return (
    <>
     <Box sx={{bgcolor:"" , width:"100%" , height:"100vh"}  }>
         {userposts === null ? (
        <Loading />
      ) : userposts.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            color: "text.secondary",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            No Posts Yet
          </Typography>
          <Typography variant="body1">
            You haven’t shared anything yet. Start by creating your first post!
          </Typography>
          <Typography fontSize="40px">📝</Typography>
        </Box>
      ) : (
        userposts?.map((post: Post) => (
          <UserCardPost  postInfo={post} key={post._id} />
        ))
      )}
     </Box>
    </>
  );
}
