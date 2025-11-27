"use client";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarMonthIcon,
  Wc as WcIcon,
  Cake as CakeIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

import { useAppSelector } from "./../../store/user.hooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { object, string } from "yup";
import Loading from "@/app/loading";
export default function page() {
  const [user, setUser] = useState(null);
  const { token } = useAppSelector((store) => store.userReducer);
  const [showPasswordFrom, setShowPasswordForm] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function getuserData() {
    try {
      const options = {
        url: "https://linked-posts.routemisr.com/users/profile-data",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function changePassword(values) {
    try {
      const options = {
        url: "https://linked-posts.routemisr.com/users/change-password",
        method: "PATCH",
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        toast.success("Password Updated Successfully");
      }
    } catch (error) {
      toast.error("Failed to update password");
      console.error(error);
    }
  }

  const validationSchema = object({
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "At least 8 characters At least one uppercase letter At least one lowercase letter At least one number At least one special character"
      ),
    newPassword: string().required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changePassword(values);
    },
  });

  useEffect(() => {
    getuserData();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#e3f2fd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90vw",
          maxWidth: 1000,
          height: "90vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "auto",
          borderRadius: 4,
        }}
      >
        {/* Avatar Section */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#bbdefb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Avatar
            src={""}
            alt={"user.name"}
            sx={{
              width: 200,
              height: 200,
              border: "5px solid #1976d2",
            }}
          />

          <input type="file" accept="image/*" style={{ display: "none" }} />

          <Button variant="outlined" startIcon={<UploadIcon />} sx={{ mt: 2 }}>
            Upload Photo
          </Button>
        </Box>

        {/* Info Section */}
        <Box
          sx={{
            flex: 2,
            backgroundColor: "#fff",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            userProfile:
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {user?.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon fontSize="small" />
            <Typography>{user?.email}</Typography>
          </Stack>

          {user?.phone && (
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon fontSize="small" />
              <Typography>{"user.phone"}</Typography>
            </Stack>
          )}

          {user?.gender && (
            <Stack direction="row" spacing={1} alignItems="center">
              <WcIcon fontSize="small" />
              <Typography>{user.gender}</Typography>
            </Stack>
          )}

          {user?.dateOfBirth && (
            <Stack direction="row" spacing={1} alignItems="center">
              <CakeIcon fontSize="small" />
              <Typography>{user.dateOfBirth}</Typography>
            </Stack>
          )}

          <Button variant="contained" sx={{ width: "75%", mx: "auto" }}>
            <Link href={`/userposts/${user?._id}`}>View posts</Link>
          </Button>
          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CalendarMonthIcon sx={{ mr: 1 }} fontSize="small" />
            Joined: {new Date(user?.createdAt).toLocaleDateString()}
          </Typography>

          <Button
            variant="contained"
            onClick={() => setShowPasswordForm(!showPasswordFrom)}
          >
            {showPasswordFrom ? "Cancel" : "Change Password"}
          </Button>

          <Collapse in={showPasswordFrom}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2} mt={2}>
                <TextField
                  type="password"
                  label="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography variant="p" sx={{ color: "red" }}>
                    * {formik.errors.password}
                  </Typography>
                )}
                <TextField
                  type="password"
                  label="New Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="newPassword"
                  value={formik.values.newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <Typography variant="p" sx={{ color: "red" }}>
                    * {formik.errors.newPassword}
                  </Typography>
                )}
                <Button variant="contained" type="submit">
                  Submit Change
                </Button>
              </Stack>
            </form>
          </Collapse>
        </Box>
      </Paper>
    </Box>
  );
}
