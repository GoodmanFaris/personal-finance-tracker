"use client";

import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Summary", href: "/summary" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

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
                  width: 72,
                  height: 72,
                  display: "grid",
                  placeItems: "center",
                  position: "relative", // 🔥 OVO FALI
                  overflow: "hidden", // dobro je dodati
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
            {/* Dark/Light toggle (placeholder) */}
            <Tooltip title="Theme (soon)">
              <IconButton
                onClick={() => {}}
                sx={{
                  color: "#fff",
                  borderRadius: 2,
                  transition: "transform 150ms ease, background 150ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.10)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <DarkModeOutlinedIcon />
              </IconButton>
            </Tooltip>

            {/* Profile icon/avatar */}
            <Tooltip title="Profile">
              <IconButton
                component={NextLink}
                href="/profile"
                sx={{
                  p: 0.5,
                  borderRadius: 2,
                  transition: "transform 150ms ease",
                  "&:hover": { transform: "translateY(-1px)" },
                }}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: "rgb(var(--color-secondary))",
                    color: "#fff",
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.30)",
                  }}
                >
                  O
                </Avatar>
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
            color: "rgb(var(--color-text-dark))",
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
          sx={{
            mt: "auto",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgb(var(--color-secondary))",
              color: "#fff",
              fontWeight: 800,
            }}
          >
            O
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              Profile
            </Typography>
            <Typography sx={{ opacity: 0.75, fontSize: 13 }}>
              Go to /profile
            </Typography>
          </Box>
          <IconButton
            onClick={() => {}}
            sx={{
              borderRadius: 2,
              bgcolor: "rgba(var(--color-primary), 0.08)",
              "&:hover": { bgcolor: "rgba(var(--color-primary), 0.14)" },
            }}
          >
            <DarkModeOutlinedIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
