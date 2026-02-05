import { Trash2, X } from "lucide-react"

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete expense?",
  description = "This action cannot be undone.",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600">
            <Trash2 size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
