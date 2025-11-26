import {
  Box,
  Button,
  Paper,
  Avatar,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "@/store/user.hooks";
import { ref } from "yup";
import axios from "axios";
import { toast } from "react-toastify";

export default function PostForm() {
  const { token } = useAppSelector((store) => store.userReducer);

  const contentPostRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function addPost() {
    const content = contentPostRef.current?.value || "";
    const file = fileRef.current?.files?.[0];

    const postData = new FormData();
    postData.append("body", content);
    if (file) {
      postData.append("image", file);
    }

    const options = {
      url: "https://linked-posts.routemisr.com/posts",
      method: "POST",
      headers: {
        token,
      },
      data: postData,
    };
    const { data } = await axios.request(options);
    if (data.message === "success") {
      toast.success("Post Shared Successfully");
    }
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "85%" },
        mx: "auto",
        px: { xs: 2, sm: 0 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: 3,
          background: "linear-gradient(180deg, #ffffffcc, #f3f8ffcc)",
          boxShadow: "0 12px 40px rgba(13,47,161,0.08)",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2 }}
          alignItems="flex-start"
          sx={{ mb: 1 }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Box sx={{ mb: { xs: 1, sm: 0 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, fontSize: { xs: 15, sm: 16 } }}
                >
                  What's new?
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Share an update, photo, or idea with your network
                </Typography>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Public
              </Typography>
            </Stack>

            <TextField
              fullWidth
              multiline
              minRows={4}
              inputRef={contentPostRef}
              placeholder="Write something interesting..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "#fff",
                  border: "1px solid rgba(13,47,161,0.06)",
                },
                "& .MuiInputBase-input": { fontSize: 15 },
              }}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
              spacing={1.5}
              sx={{ mt: 2 }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <VisuallyHiddenInput
                    type="file"
                    onChange={() => {}}
                    ref={fileRef}
                    multiple
                  />
                  <IconButton
                    component="span"
                    size="small"
                    sx={{
                      bgcolor: "rgba(25,118,210,0.06)",
                      color: "primary.main",
                      borderRadius: 1.5,
                      p: 1.05,
                      "&:hover": { bgcolor: "rgba(25,118,210,0.12)" },
                    }}
                  >
                    <CloudUploadIcon
                      sx={{ fontSize: { xs: 18, sm: 20 }, mr: 2 }}
                    />
                    Upload
                  </IconButton>
                </label>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="contained"
                  onClick={addPost}
                  endIcon={<SendIcon />}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 2, sm: 2.5 },
                    py: { xs: 0.8, sm: 1 },
                    textTransform: "capitalize",
                    fontWeight: 700,
                    width: { xs: "100%", sm: "auto" },
                    alignSelf: "flex-end",
                    background:
                      "linear-gradient(135deg,#1976d2 0%, #0d47a1 100%)",
                    boxShadow: "0 6px 20px rgba(25,118,210,0.18)",
                    "&:hover": {
                      boxShadow: "0 8px 28px rgba(25,118,210,0.22)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    Post
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    Post
                  </Box>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
// ...existing code...
