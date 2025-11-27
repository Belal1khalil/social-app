"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import ChatIcon from "@mui/icons-material/Chat";

import { Post } from "./../../types/posts.types";
import Image from "next/image";
import CommentCard from "../CommentCard/CommentCard";
import {
  Box,
  Button,
  Divider,
  TextField,
  Tooltip,
  Badge,
  Chip,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/user.hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { getPostDetails, getuserposts } from "@/store/features/posts.slice";
import { useRef } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function UserCardPost({
  postInfo,
  showAllComments = false,
}: {
  postInfo: Post;
  showAllComments?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");
  const { token } = useAppSelector((store) => store.userReducer);
  const userposts  = useAppSelector((store) => store.PostsReducer.userposts);
   const commentRef = useRef<HTMLInputElement>(null);
     const dispatch = useAppDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


async function deletePost(id:string) {
   
     try {
       const options = {
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        method:"DELETE",
        headers:{
         token,
        }
      }
      const {data} = await axios.request(options)
      if(data.message === "success") {
        toast.success("post Deleted Successfully")
        userposts
         
      }
     } catch (error) {
      console.log(error)
     } 
    }

  async function createComment() {
    const content = commentRef.current?.value || "";
    
     
  if (!content) {
    toast.error("Comment cannot be empty.");
    return;
  }

     try {
       const options= {
        url:"https://linked-posts.routemisr.com/comments",
       method:"POST",
       headers:{
        token,
       },
       data:{
        content,
        post:postInfo._id
       }
    }
    const {data} = await axios.request(options)
   
    if(data.message === "success") {
      toast.success(" Comment created successfully")
      dispatch(getPostDetails(postInfo._id))
      if (commentRef.current) {
        commentRef.current.value = "";
      }
    }

     } catch (error) {
      console.log(error)
     }
   }

  

  return (
    <Card
      sx={{
        width: { xs: "100%", md: "85%" },
        maxWidth: 960,
        mx: "auto",
        mt: 2.5,
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
        bgcolor: "background.paper",
    
      }}
      elevation={3}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader
          avatar={
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <Image
                src={postInfo.user?.photo || "/assests/imgs/user.png"}
                width={52}
                height={52}
                alt={`${postInfo.user?.name} Profile Image`}
                style={{ objectFit: "cover" }}
                priority={false}
              />
            </Box>
          }
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {postInfo.user?.name}
              </Typography>
            </Box>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              {new Date(postInfo.createdAt).toLocaleString()}
            </Typography>
          }
        />
        <Button
          onClick={()=>{
            deletePost(postInfo._id)
          }}
          sx={{ color: "red", mx: 2 }}
          variant="outlined"
        >
          Delete
        </Button>
      </Box>

      {postInfo.image && (
        <CardMedia
          component="div"
          sx={{
            height: { xs: 180, md: 360 },
            position: "relative",
            bgcolor: "grey.100",
          }}
        >
          <Image
            src={postInfo.image}
            alt="Post media"
            fill
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            sizes="(max-width: 600px) 100vw, 900px"
          />
        </CardMedia>
      )}

      <CardContent sx={{ pt: 2, pb: 1.25 }}>
        <Typography
          variant="body1"
          sx={{
            color: "text.primary",
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            mb: 1.25,
          }}
        >
          {postInfo.body}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {postInfo.comments?.length ?? 0} comments
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardActions
        sx={{ px: 2, display: "flex", justifyContent: "space-between" }}
      >
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>

        <Tooltip title="Comments">
          <IconButton aria-label="comments" onClick={handleExpandClick}>
            <ChatIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ p: 2 }}>
          {postInfo.comments.length > 0 &&
            !showAllComments &&
            postInfo.comments
              .slice(0, 3)
              .map((comment) => (
                <CommentCard commentInfo={comment} key={comment._id} />
              ))}

          {postInfo.comments.length > 1 &&
            showAllComments &&
            postInfo.comments.map((comment) => (
              <CommentCard commentInfo={comment} key={comment._id} />
            ))}

          {!showAllComments && postInfo.comments.length > 0 && (
            <Button fullWidth variant="contained">
              <Link href={`/post/${postInfo._id}`}>show All comments</Link>
            </Button>
          )}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            <Avatar
              src={postInfo.user?.photo || "/assests/imgs/user.png"}
              alt="you"
              sx={{ width: 40, height: 40 }}
            />

            <TextField
              multiline
              minRows={2}
              fullWidth
              placeholder="Write a thoughtful comment..."
              value={commentText}
              inputRef={commentRef}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "background.paper",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                createComment()
                setCommentText("");
              }}
              sx={{ alignSelf: "flex-end", height: 40 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
}
