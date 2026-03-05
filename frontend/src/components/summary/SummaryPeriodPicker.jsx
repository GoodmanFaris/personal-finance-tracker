"use client";

import { useState } from "react";
import useAIData from "../../hooks/useAIData";
import AIModal from "../../components/summary/AIModal"; 

import { useMemo, useCallback } from "react";
import { Box, Slider, Typography, Chip } from "@mui/material";
import useProfileData from "../../hooks/useProfileData";

import { Sparkles } from "lucide-react";

function ymToIndex(ym) {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function indexToYm(idx) {
  const y = Math.floor(idx / 12);
  const m = (idx % 12) + 1;
  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}`;
}

function formatYm(ym) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function SummaryPeriodPicker({
  startMonth,
  endMonth,
  onChangeStart,
  onChangeEnd,
}) {
  const { profileData, loading } = useProfileData();

  const [aiOpen, setAiOpen] = useState(false);

  const {
    data,
    loading: aiLoading,
    error,
  } = useAIData(startMonth, endMonth, aiOpen);

  const createdAt = profileData?.created_at?.slice(0, 7) || "1970-01";
  const currentDate = new Date().toISOString().slice(0, 7);

  const minIdx = useMemo(() => ymToIndex(createdAt), [createdAt]);
  const maxIdx = useMemo(() => ymToIndex(currentDate), [currentDate]);

  const value = useMemo(() => {
    const s = startMonth ? ymToIndex(startMonth) : minIdx;
    const e = endMonth ? ymToIndex(endMonth) : maxIdx;
    return [
      Math.max(minIdx, Math.min(s, maxIdx)),
      Math.max(minIdx, Math.min(e, maxIdx)),
    ];
  }, [startMonth, endMonth, minIdx, maxIdx]);

  const handleChange = useCallback(
    (_, newValue) => {
      if (!Array.isArray(newValue)) return;
      const [s, e] = newValue;
      onChangeStart(indexToYm(s));
      onChangeEnd(indexToYm(e));
    },
    [onChangeStart, onChangeEnd],
  );

  const ready = !loading && Boolean(profileData?.created_at);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        borderRadius: 2,
        p: { xs: 2.5, sm: 3 },
        color: "white",
        background: "rgb(var(--color-primary))",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
        position: "relative",
        overflow: "hidden",
        opacity: ready ? 1 : 0.85,
        mt: 8,
      }}
    >
      {/* glow */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          top: -120,
          left: -120,
          width: 340,
          height: 340,
          borderRadius: 999,
          filter: "blur(60px)",
          opacity: 0.25,
          background: "rgb(var(--color-secondary))",
        }}
      />

      <Box sx={{ position: "relative" }}>
        <Typography
          sx={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em" }}
        >
          Summary Period
        </Typography>
        <Typography
          sx={{ mt: 0.5, fontSize: 13, color: "rgba(255,255,255,0.80)" }}
        >
          Drag the ends to select the month range. Data updates automatically.
        </Typography>

        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip
            label={`From: ${ready ? formatYm(indexToYm(value[0])) : "Loading..."}`}
            sx={{
              bgcolor: "rgba(255,255,255,0.14)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.18)",
              fontWeight: 700,
            }}
          />
          <Chip
            label={`To: ${ready ? formatYm(indexToYm(value[1])) : "Loading..."}`}
            sx={{
              bgcolor: "rgba(255,255,255,0.14)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.18)",
              fontWeight: 700,
            }}
          />
        </Box>

        <Box sx={{ mt: 2.5, px: 1 }}>
          <Slider
            value={minIdx === maxIdx ? [minIdx, maxIdx] : value}
            min={minIdx}
            max={maxIdx}
            step={1}
            onChange={handleChange}
            valueLabelDisplay="off"
            disableSwap
            disabled={!ready} // ✅ disable dok nije spremno
            sx={{
              color: "rgb(var(--color-secondary))",
              height: 10,
              "& .MuiSlider-rail": {
                opacity: 1,
                backgroundColor: "rgba(255,255,255,0.22)",
              },
              "& .MuiSlider-track": {
                border: "none",
                backgroundColor: "rgb(var(--color-secondary))",
              },
              "& .MuiSlider-thumb": {
                width: 22,
                height: 22,
                backgroundColor: "rgb(var(--color-secondary))",
                border: "3px solid rgba(255,255,255,0.85)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              },
            }}
          />

          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
              {ready ? formatYm(createdAt) : "—"}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
              {formatYm(currentDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 5,
        }}
      >
        <button
          onClick={() => setAiOpen(true)}
          disabled={!ready || !startMonth || !endMonth}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold text-white shadow-lg transition hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
            boxShadow: "0 12px 40px rgba(124,58,237,0.35)",
          }}
          type="button"
        >
          <Sparkles size={16} />
          AI Summary
        </button>
      </Box>
      <AIModal
        open={aiOpen}
        insight={data?.insight}
        loading={aiLoading}
        error={error}
        onClose={() => setAiOpen(false)}
      />
    </Box>
  );
}
