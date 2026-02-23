"use client";

import { useState } from "react";
import useLandingData from "../../../src/hooks/useLandingData";
import { getCurrencySymbol } from "../../utils/HelpersValues";
import Image from "next/image";


import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
} from "@mui/material";

export default function LandingQuickPanel() {
  const { user, categories, createTransactionWithPayload, loadingUser } =
    useLandingData();

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currencySymbol = getCurrencySymbol(user?.currency || "BAM");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !categoryId) return;

    setSubmitting(true);

    const success = await createTransactionWithPayload({
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      description,
      category_id: Number(categoryId),
    });

    if (success) {
      setAmount("");
      setDescription("");
      setCategoryId("");
    }

    setSubmitting(false);
  };

  if (loadingUser) {
    return (
      <Box
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: 1100,
          px: 2,
          py: 3,
          color: "rgba(255,255,255,0.7)",
          fontSize: 14,
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Split background 40 / 60 (LEFT blue, RIGHT green) */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: -10 }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: { xs: "100%", md: "40%" },
            height: "150%",
            backgroundColor: "rgb(var(--color-primary))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: { xs: "0%", md: "60%" }, // 🔥 responsive
            backgroundColor: "rgb(var(--color-secondary))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.10)",
          }}
        />
      </Box>

      {/* Soft glow shapes */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: -10,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 520,
            height: 520,
            borderRadius: "999px",
            filter: "blur(64px)",
            opacity: 0.3,
            backgroundColor: "rgb(var(--color-accent))",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: "999px",
            filter: "blur(64px)",
            opacity: 0.25,
            backgroundColor: "rgba(255,255,255,0.20)",
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: 1200,
          px: { xs: 2, sm: 3 },
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
          {/* LEFT (blue side) */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              color: "white",
              maxWidth: { md: 420 },
              textShadow: "0 1px 12px rgba(0,0,0,0.25)",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  backdropFilter: "blur(10px)",
                  display: "grid",
                  placeItems: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="BudgetFlo Logo"
                  fill
                  style={{ objectFit: "contain", padding: "1px" }}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                  BudgetFlo
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: "rgba(255,255,255,0.70)" }}
                >
                  Personal finance tracker
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h3"
              sx={{
                mt: 3,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                fontSize: { xs: 34, sm: 44 },
              }}
            >
              Hello, {user?.name?.split(" ")[0] || "User"}
              <Box component="span" sx={{ ml: 1, opacity: 0.85 }}>
                👋
              </Box>
              <Box
                component="span"
                sx={{
                  display: "block",
                  mt: 1,
                  fontSize: { xs: 18, sm: 20 },
                  fontWeight: 600,
                  opacity: 0.85,
                }}
              >
                Add a transaction in seconds.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                fontSize: { xs: 14, sm: 16 },
                color: "rgba(255,255,255,0.80)",
                lineHeight: 1.7,
              }}
            >
              Stay in control of your spending. Track income and expenses
              instantly with a clean and distraction-free interface.
            </Typography>

            <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip
                size="small"
                label="Minimal"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.25)",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
                variant="outlined"
              />
              <Chip
                size="small"
                label="Fast"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.25)",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
                variant="outlined"
              />
              <Chip
                size="small"
                label="Open-source"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.25)",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
                variant="outlined"
              />
            </Box>
          </Grid>

          {/* RIGHT (green side) */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Box sx={{ width: "120%", maxWidth: 920 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: { xs: 2.5, sm: 3 },
                  border: "1px solid rgba(255,255,255,0.28)",
                  backgroundColor: "rgb(var(--color-category))",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 24px 70px rgba(var(--color-shadow), 0.25)",
                  position: "relative",
                  overflow: "hidden",
                  ml: { xs: 0, md: 8 },
                  mb: { xs: 4, md: 0 },
                }}
              >
                {/* Soft glass glow behind card */}
                <Box
                  sx={{
                    pointerEvents: "none",
                    position: "absolute",
                    inset: -40,
                    filter: "blur(48px)",
                    opacity: 0.4,
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)",
                  }}
                />

                {/* Header row */}
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 22, sm: 28 },
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "rgb(var(--color-text-reverse2))",
                      }}
                    >
                      Quick Add
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: { xs: 13, sm: 15 },
                        color: "rgb(var(--color-text-reverse))",
                      }}
                    >
                      Don't have much time? Quickly add a transaction below.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: { xs: "none", sm: "inline-flex" },
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: "rgb(var(--color-accent))",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "rgb(var(--color-text-reverse2))",
                      }}
                    >
                      Logged in
                    </Typography>
                  </Box>
                </Box>

                {/* Form */}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ position: "relative", mt: 3, display: "grid", gap: 2 }}
                >
                  <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputProps={{ step: "0.01" }}
                    placeholder="0.00"
                    fullWidth
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "rgb(var(--color-text-reverse2))",
                            }}
                          >
                            {currencySymbol}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgb(var(--color-category))",

                        "& .MuiInputBase-input": {
                          color: "rgb(var(--color-text-reverse2))",
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-text-reverse2) / 0.25)",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-text-reverse2) / 0.5)",
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-accent))",
                          borderWidth: "2px",
                        },
                      },

                      "& .MuiInputLabel-root": {
                        color: "rgb(var(--color-text-reverse))",
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgb(var(--color-text-reverse2))",
                      },
                    }}
                  />

                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgb(var(--color-category))",

                        "& .MuiInputBase-input": {
                          color: "rgb(var(--color-text-reverse2))",
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-text-reverse2) / 0.25)",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-text-reverse2) / 0.5)",
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-accent))",
                          borderWidth: "2px",
                        },
                      },

                      "& .MuiInputLabel-root": {
                        color: "rgb(var(--color-text-reverse))",
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgb(var(--color-text-reverse2))",
                      },
                    }}
                  >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      label="Category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Select category</em>
                      </MenuItem>
                      {categories?.map((cat) => (
                        <MenuItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 12,
                        color: "rgb(var(--color-text-reverse))",
                      }}
                    >
                      Tip: choose the category first, then add amount.
                    </Typography>
                  </FormControl>

                  <TextField
                    label="Description (optional)"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Coffee"
                    fullWidth
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgb(var(--color-category))",

                        "& .MuiInputBase-input": {
                          color: "rgb(var(--color-text-reverse2))",
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-text-reverse2) / 0.25)",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-text-reverse2) / 0.5)",
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(var(--color-accent))",
                          borderWidth: "2px",
                        },
                      },

                      "& .MuiInputLabel-root": {
                        color: "rgb(var(--color-text-reverse))",
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgb(var(--color-text-reverse2))",
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={submitting}
                    fullWidth
                    sx={{
                      mt: 0.5,
                      py: 1.25,
                      borderRadius: 3,
                      fontWeight: 900,
                      textTransform: "none",
                      color: "#ffffff",
                      background: "rgba(24 122 214 / 0.70)",
                      boxShadow: "0 18px 65px rgba(0,0,0,0.28)",
                      overflow: "hidden",
                      position: "relative",
                      "&:hover": {
                        filter: "brightness(1.10)",
                      },
                      "&:disabled": {
                        opacity: 0.6,
                        color: "rgb(var(--color-shadow))",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-35%",
                        width: "45%",
                        height: "100%",
                        transform: "skewX(-18deg)",
                        background: "rgb(var(--color-accent))",
                        opacity: 20,
                        transition: "all 220ms ease",
                      },
                      "&:hover::after": {
                        opacity: 1,
                        left: "120%",
                      },
                    }}
                  >
                    {submitting ? "Adding..." : "Add Transaction"}
                  </Button>

                  {/* Footer */}
                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          backgroundColor: "rgb(24 122 214)",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "rgb(var(--color-text-reverse))",
                        }}
                      >
                        Minimal UI
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          backgroundColor: "rgb(var(--color-thirdary))",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "rgb(var(--color-text-reverse))",
                        }}
                      >
                        Fast add
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* subtle bottom fade */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 96,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,0,0,0))",
        }}
      />
    </Box>
  );
}
