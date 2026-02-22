"use client";

import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Summary", href: "/summary" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = (resolvedTheme || theme) === "dark";
  const toggleDrawer = (v) => () => setOpen(v);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgb(var(--color-primary))",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, md: 3 },
            display: "flex",
            gap: 2,
          }}
        >
          {/* LEFT: Logo slot */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 160,
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 180ms ease",
                  "&:hover": { transform: "rotate(-3deg) scale(1.02)" },
                }}
              >
                <Image
                  src="/logo.png"
                  alt="BudgetFlo Logo"
                  fill
                  style={{ objectFit: "contain", padding: "1px" }}
                />
              </Box>

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  display: { xs: "none", sm: "block" },
                }}
              >
                BudgetFlo
              </Typography>
            </Box>
          </Box>

          {/* CENTER: Links (desktop) */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 1,
            }}
          >
            {navLinks.map((l) => (
              <Button
                key={l.href}
                component={NextLink}
                href={l.href}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 1.5,
                  borderRadius: 2,
                  position: "relative",
                  transition: "transform 150ms ease, background 150ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.10)",
                    transform: "translateY(-1px)",
                  },
                  // animirani underline
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 6,
                    height: 2,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.95)",
                    transform: "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 180ms ease",
                  },
                  "&:hover::after": { transform: "scaleX(1)" },
                }}
              >
                {l.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT: Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {mounted ? (
              <Tooltip title={isDark ? "Light mode" : "Dark mode"}>
                <IconButton
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  sx={{
                    color: "#fff",
                    borderRadius: 2,
                    transition: "transform 150ms ease, background 150ms ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.10)",
                      transform: "translateY(-1px)",
                    },
                  }}
                  aria-label={isDark ? "Light mode" : "Dark mode"}
                >
                  {isDark ? (
                    <LightModeOutlinedIcon />
                  ) : (
                    <DarkModeOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            ) : (
              // placeholder da layout ne "skače"
              <IconButton
                disabled
                sx={{
                  color: "#fff",
                  borderRadius: 2,
                  opacity: 0.7,
                }}
                aria-label="Theme"
              >
                <DarkModeOutlinedIcon />
              </IconButton>
            )}

            {/* Profile icon/avatar */}
            <Tooltip title="Profile">
              <IconButton
                component={NextLink}
                href="/profile"
                sx={{
                  color: "#fff",
                  borderRadius: 2,
                  transition: "transform 150ms ease",
                  "&:hover": { transform: "translateY(-1px)" },
                }}
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>

            {/* Burger (mobile) */}
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "#fff",
                borderRadius: 2,
                ml: 0.5,
                transition: "transform 150ms ease, background 150ms ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.10)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: "rgb(var(--color-background))",
            color: "rgb(var(--color-text-reverse))",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "12px",
                bgcolor: "rgb(var(--color-primary))",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 10px 30px rgba(var(--color-shadow), 0.25)",
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>
                BF
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800 }}>Menu</Typography>
          </Box>

          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              borderRadius: 2,
              transition: "transform 150ms ease",
              "&:hover": { transform: "rotate(6deg)" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ p: 1 }}>
          {navLinks.map((l) => (
            <ListItemButton
              key={l.href}
              component={NextLink}
              href={l.href}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 2,
                my: 0.5,
                overflow: "hidden",
                position: "relative",
                transition: "transform 150ms ease, background 150ms ease",
                "&:hover": {
                  bgcolor: "rgba(var(--color-primary), 0.10)",
                  transform: "translateX(4px)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 8,
                  bottom: 8,
                  width: 4,
                  borderRadius: 999,
                  background: "rgb(var(--color-accent))",
                  transform: "scaleY(0)",
                  transformOrigin: "center",
                  transition: "transform 180ms ease",
                },
                "&:hover::before": { transform: "scaleY(1)" },
              }}
            >
              <ListItemText
                primary={l.label}
                primaryTypographyProps={{ fontWeight: 700 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box
          component={NextLink}
          href="/profile"
          onClick={toggleDrawer(false)}
          sx={{
            mt: "auto",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "inherit",
            borderRadius: 2,
            transition: "background 150ms ease, transform 150ms ease",
            "&:hover": {
              bgcolor: "rgba(var(--color-primary), 0.08)",
              transform: "translateX(2px)",
            },
          }}
        >
            <IconButton
              component={NextLink}
              href="/profile"
              sx={{
                color: "rgb(var(--color-text-reverse))",
                borderRadius: 2,
                transition: "transform 150ms ease",
                "&:hover": { transform: "translateY(-1px)" },
              }}
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />
            </IconButton>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              Profile
            </Typography>
            <Typography sx={{ opacity: 0.75, fontSize: 13 }}>
              Go to profile
            </Typography>
          </Box>

          <span style={{ opacity: 0.5 }}>→</span>
        </Box>
      </Drawer>
    </>
  );
}
