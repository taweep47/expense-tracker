const ExpenseModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm
  flex items-center justify-center z-50"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md
    p-6 shadow-xl"
      >
        {children}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
