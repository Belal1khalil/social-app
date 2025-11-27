"use client";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/user.hooks";
import { logout } from "@/store/features/user.slice";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const currentPath = usePathname();
  const { token } = useAppSelector((store) => store.userReducer);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <MenuItem
        onClick={handleMenuClose}
        sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
      >
        <Link href="/profile">profile</Link>
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
      >
        <Link onClick={logout} href="/login" style={{ color: "red" }}>
          logut
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Added Home and Login to mobile menu for better responsiveness */}
      <MenuItem
        component={Link}
        href="/"
        onClick={handleMobileMenuClose}
        sx={{
          "&:hover": { backgroundColor: "#e3f2fd" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton size="large" color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>

      <MenuItem
        onClick={handleProfileMenuOpen}
        sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
      >
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        component={Link}
        href="/login"
        onClick={() => {
          handleMobileMenuClose;
          logout;
        }}
        sx={{
          "&:hover": { backgroundColor: "#e3f2fd" },
          display: "flex",
          alignItems: "center",
          color: "red",
        }}
      >
        <IconButton size="large" color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #1976d2 0%, #0d47a1 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {/* App Name with Icon - Now displays on all screens for better branding */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: "flex", // Always show on all screens
              alignItems: "center",
              mr: { xs: 1, sm: 4 }, // Less margin on xs for space
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" }, // Smaller on mobile
            }}
          >
            {/* <HomeIcon sx={{ mr: 1, fontSize: { xs: 24, sm: 28 } }} /> */}
            Social App
          </Typography>

          {/* Menu Links as Buttons for Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button
              component={Link}
              href="/"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: currentPath === "/" ? 700 : 500,
                backgroundColor:
                  currentPath === "/" ? "rgba(255,255,255,0.2)" : "transparent",
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.2s ease",
                },
              }}
            >
              Home
            </Button>

            {!token && (
              <Button
                component={Link}
                href="/login"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: currentPath === "/login" ? 700 : 500,
                  backgroundColor:
                    currentPath === "/login"
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  borderRadius: 2,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Profile Icon */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.1)",
                  transition: "all 0.2s ease",
                },
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.1)",
                  transition: "all 0.2s ease",
                },
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render Menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
