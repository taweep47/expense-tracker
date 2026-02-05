export const normalizeCategory = (category) =>
  category?.toString().trim().toLowerCase() || "other"
