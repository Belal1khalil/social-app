import { Comment } from "@/types/posts.types";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import palceholderImage from "../../assests/imgs/user.png";
import { useAppDispatch, useAppSelector } from "@/store/user.hooks";
import { toast } from "react-toastify";
import { getPostDetails } from "@/store/features/posts.slice";
import axios from "axios";

export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
  const { token } = useAppSelector((store) => store.userReducer);
  

  function handleimagePath(path: string | undefined) {
    // always return a string to keep Avatar src happy
    if (!path || path.includes("undefined")) {
      return palceholderImage.src ?? "";
    } else {
      return path;
    }
  }

  async function deleteComment(id: string) {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/comments/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      
      if (data.message === "success") {
        toast.success(" Comment deleted successfully");
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "visible",
        p: 1.25,
        mb: 1.5,
        transition: "transform 150ms ease, box-shadow 150ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(13,47,161,0.12)",
        },
        background: "#fff",
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="flex-start">
        <Avatar
          alt={commentInfo.commentCreator.name}
          src={handleimagePath(commentInfo.commentCreator.photo)}
          sx={{
            width: 48,
            height: 48,
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        />

        <CardContent sx={{ py: 0, px: 0, width: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack spacing={0}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#0d47a1" }}
              >
                {commentInfo.commentCreator.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#0d47a1" }}
              >
                {new Date(commentInfo.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>

            <Button
              onClick={() => {
                deleteComment(commentInfo._id);
              }}
              variant="outlined"
              sx={{ color: "red" }}
            >
              Delete
            </Button>
          </Stack>

          <Box
            sx={{
              mt: 1.25,
              background: "linear-gradient(180deg, #f7fbff 0%, #f1f6ff 100%)",
              borderRadius: 2,
              p: 1.75,
              color: "text.primary",
              boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.02)",
              border: "1px solid rgba(13,47,161,0.06)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}
            >
              {commentInfo.content}
            </Typography>
          </Box>
        </CardContent>
      </Stack>
    </Card>
  );
}
