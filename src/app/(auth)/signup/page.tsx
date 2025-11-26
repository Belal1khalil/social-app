"use client";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { useAppDispatch } from "@/store/user.hooks";
import { signup } from "@/store/features/user.slice";
import { useRouter } from "next/navigation";

export default function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = object({
    name: string()
      .required("name is required")
      .min(3, "name must be at least 3 char")
      .max(25, "Name can not be more than 25 char"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "At least 8 characters At least one uppercase letter At least one lowercase letter At least one number At least one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf([ref("password")]),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signup(values))
        .then((res) => {
          if (res.payload.message === "success") {
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
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
            {/* Icon color matches accent */}
            Create Account
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
              type="text"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
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
            {formik.touched.name && formik.errors.name && (
              <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                * {formik.errors.name}
              </Typography>
            )}

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
                  color: "#1976d2",
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

            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Confirm Password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
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
            {formik.touched.rePassword && formik.errors.rePassword && (
              <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                * {formik.errors.rePassword}
              </Typography>
            )}
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              label="Date of Birth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
              name="dateOfBirth"
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
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                * Date of Birth required
              </Typography>
            )}

            <TextField
              fullWidth
              variant="outlined"
              select
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="gender"
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
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            {formik.touched.gender && formik.errors.gender && (
              <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                * gender is Required
              </Typography>
            )}

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
              Sign up
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "#616161" }}
            >
              Have already an account ?
              <a
                href="/login"
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
