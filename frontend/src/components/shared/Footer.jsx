"use client";

import NextLink from "next/link";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        bgcolor: "rgb(var(--color-primary))",
        color: "rgba(255,255,255,0.90)",
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 6 },
        borderTop: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr" },
          gap: 6,
        }}
      >
        {/* Brand */}
        <Box>
          <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
            BudgetFlo
          </Typography>
          <Typography
            sx={{ mt: 2, opacity: 0.75, fontSize: 14, maxWidth: 320 }}
          >
            Open-source personal finance tracker designed to help you stay in
            control of your income, expenses, and financial insights.
          </Typography>
        </Box>

        {/* Navigation */}
        <Box>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>Navigation</Typography>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/dashboard">Dashboard</FooterLink>
          <FooterLink href="/summary">Summary</FooterLink>
        </Box>

        {/* Company */}
        <Box>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>Company</Typography>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </Box>

        {/* Open Source */}
        <Box>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>Open Source</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              component="a"
              href="https://github.com/your-repo-link"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#fff",
                borderRadius: 2,
                transition: "background 150ms ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <GitHubIcon />
            </IconButton>

            <Typography sx={{ fontSize: 14, opacity: 0.8 }}>
              View on GitHub
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.12)" }} />

      {/* Bottom */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
          fontSize: 13,
          opacity: 0.7,
        }}
      >
        <Typography>© {year} BudgetFlo. All rights reserved.</Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
        </Box>
      </Box>
    </Box>
  );
}

function FooterLink({ href, children }) {
  return (
    <Typography
      component={NextLink}
      href={href}
      sx={{
        display: "block",
        mb: 1.2,
        fontSize: 14,
        color: "rgba(255,255,255,0.85)",
        textDecoration: "none",
        transition: "opacity 150ms ease",
        "&:hover": { opacity: 1 },
      }}
    >
      {children}
    </Typography>
  );
}
