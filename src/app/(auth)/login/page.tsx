"use client";
import { useFormik } from "formik";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { login } from "@/store/features/user.slice";
import { useAppDispatch } from "@/store/user.hooks";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "At least 8 characters At least one uppercase letter At least one lowercase letter At least one number At least one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values))
        .then((res) => {
          if (res.payload.message === "success") {
            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    },
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #e3f2fd 0%, #1976d2 100%)", // Softer blue gradient for a calming, professional look
          p: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 2,
              color: "#0d47a1", // Deeper blue for better contrast and sophistication
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PersonIcon
              sx={{ mx: 1, fontSize: "32px", my: 1, color: "#1976d2" }}
            />{" "}
            {/* Icon color matches accent */}
            Login
          </Typography>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1976d2", // Label color on focus
                },
              }}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                * {formik.errors.email}
              </Typography>
            )}

            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1976d2",
                },
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                * {formik.errors.password}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{ textAlign: "right", color: "#616161", mt: -1 }} // Slightly darker gray for better readability
            >
              <Link
                href="/forgot-password"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Link>
            </Typography>

            <Button
              variant="contained"
              type="submit"
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)", // Consistent blue gradient
                boxShadow: "0 4px 15px rgba(25, 118, 210, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #0b3d91 100%)", // Darker on hover
                  boxShadow: "0 6px 20px rgba(25, 118, 210, 0.6)",
                },
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "#616161" }}
            >
              Don't have an account?{" "}
              <a
                href="/signup"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign up
              </a>
            </Typography>
          </form>
        </Paper>
      </Box>
    </>
  );
}
