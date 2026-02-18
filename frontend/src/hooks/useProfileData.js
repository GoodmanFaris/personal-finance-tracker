"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchMe, updateUser } from "../lib/user";
import { getTotalIncome, getTotalTransactions, getTotalExpenses, getSummaryBundle } from "../lib/summary";
import { getBalance } from "../lib/balance";
import { getTotalCategories } from "../lib/categories";

export default function useProfileData() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editValues, setEditValues] = useState({
    name: "",
    country: "BA",
    currency: "BAM",
  });

  const [usingFor, setUsingFor] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMe();
      setProfileData(data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllData = useCallback(async () => {
    const fromMonth = profileData?.created_at?.slice(0, 7);
    const toMonth = new Date().toISOString().slice(0, 7);
    if (!fromMonth) return;

    setError("");
    setLoading(true);

    

    try {
      const balance = await getBalance();
      setCurrentBalance(balance?.amount ?? 0);

      const summaryBundle = await getSummaryBundle(fromMonth, toMonth, 50);
      setTotalExpenses(summaryBundle?.totals?.expenses ?? 0);
      setTotalIncome(summaryBundle?.totals?.income ?? 0);
      setTotalTransactions(summaryBundle?.totals?.transactions ?? 0);
      const totalCategoriesData = await getTotalCategories();
      setTotalCategories(totalCategoriesData ?? 0);

      const createdAt = new Date(profileData.created_at);
      const now = new Date();
      const diffDays = Math.ceil(
        Math.abs(now - createdAt) / (1000 * 60 * 60 * 24),
      );
      console.log(summaryBundle);
      if (diffDays < 30) setUsingFor("less than a month");
      else if (diffDays < 365)
        setUsingFor(`${Math.floor(diffDays / 30)} month(s)`);
      else setUsingFor(`${Math.floor(diffDays / 365)} year(s)`);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, [profileData?.created_at]); 

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    if (profileData?.created_at) getAllData();
  }, [profileData?.created_at, getAllData]);

  const openEdit = useCallback(() => {
    setError("");
    setEditValues({
      name: profileData?.name || "",
      country: profileData?.country || "BA",
      currency: profileData?.currency || "BAM",
    });
    setIsEditOpen(true);
  }, [profileData]);

  const closeEdit = useCallback(() => {
    setError("");
    setIsEditOpen(false);
  }, []);

  const setEditField = useCallback((field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveEdit = useCallback(async () => {
    setUpdating(true);
    setError("");
    try {
      const updated = await updateUser(editValues);
      setProfileData(updated);
      setIsEditOpen(false);
      return true;
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to update profile");
      return false;
    } finally {
      setUpdating(false);
    }
  }, [editValues]);



  return {
    profileData,
    loading,
    updating,
    error,
    isEditOpen,
    editValues,
    openEdit,
    closeEdit,
    setEditField,
    saveEdit,
    fetchProfileData,
    getAllData,
    usingFor,
    totalIncome,
    totalExpenses,
    currentBalance,
    totalTransactions,
    totalCategories,
  };
}
