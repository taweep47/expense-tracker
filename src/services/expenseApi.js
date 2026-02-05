const API_URL = "http://localhost:3001/expenses"


// แสดงข้อมูล
export const getExpenses = async () => {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to fetch expenses")
  return res.json()
}

// เพิ่มข้อมูล
export const addExpense = async (expense) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  })
  return res.json()
}

// แก้ไขข้อมูล
export const updateExpense = async (id, expense) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  })
  return res.json()
}

// ลบข้อมูล
export const deleteExpense = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" })
}
