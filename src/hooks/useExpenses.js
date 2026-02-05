import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { API_URL } from "../auth/authService";

const useExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // โหลด expenses ตาม user
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
        setExpenses(res.data);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // CREATE
  const createExpense = async (data) => {
    const res = await axios.post(`${API_URL}/expenses`, {
      ...data,
      userId: user.id
    });

    setExpenses((prev) => [...prev, res.data]);
  };

  // EDIT
  const editExpense = async (id, data) => {
    const res = await axios.patch(`${API_URL}/expenses/${id}`, data);

    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? res.data : e))
    );
  };

  // DELETE
  const removeExpense = async (id) => {
    await axios.delete(`${API_URL}/expenses/${id}`);

    setExpenses((prev) => prev.filter((e) => e.id !== id));
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
