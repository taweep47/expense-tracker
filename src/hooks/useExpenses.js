import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { API_URL } from "../auth/authService";

const useExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`${API_URL}/expenses?userId=${user.id}`)
      .then((res) => {
        // filter soft delete ที่ frontend
        const activeExpenses = res.data.filter(
          (e) => !e.deletedAt
        );

        setExpenses(activeExpenses);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // CREATE
  const createExpense = async (data) => {
    const now = new Date().toISOString();

    const res = await axios.post(`${API_URL}/expenses`, {
      ...data,
      userId: user.id,
      createdAt: now,
      updatedAt: now,
      deletedAt: null
    });

    setExpenses((prev) => [...prev, res.data]);
  };

  // EDIT
  const editExpense = async (id, data) => {
    const now = new Date().toISOString();

    const res = await axios.patch(`${API_URL}/expenses/${id}`, {
      ...data,
      updatedAt: now
    });

    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? res.data : e))
    );
  };

  // 🔥 SOFT DELETE
  const removeExpense = async (id) => {
    const now = new Date().toISOString();

    await axios.patch(`${API_URL}/expenses/${id}`, {
      deletedAt: now,
      updatedAt: now
    });

    // ลบออกจาก UI ทันที (optimistic update)
    setExpenses((prev) =>
      prev.filter((e) => e.id !== id)
    );
  };

  return {
    expenses,
    loading,
    createExpense,
    editExpense,
    removeExpense
  };
};

export default useExpenses;