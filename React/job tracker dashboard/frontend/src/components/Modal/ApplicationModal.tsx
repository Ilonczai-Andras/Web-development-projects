import Modal from "./Modal";
import { useState } from "react";
import useCreateApplication, {
  ApplicationData,
} from "../../hooks/Application/useCreateApplication";
import { toast } from "react-hot-toast";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ isOpen, onClose }: ApplicationModalProps) => {
  const [formData, setFormData] = useState<ApplicationData>({
    title: "",
    description: "",
    company: "",
    status: "todo",
    link: "",
    deadline: "",
  });

  const createApplication = useCreateApplication();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createApplication.mutate(formData, {
      onSuccess: () => {
        toast.success("Application successfully saved!");
        onClose();
      },
      onError: (err) => {
        toast.success("❌ An error occurred when saving your application.");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4 ">New Application</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <input
          name="company"
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
          required
        >
          <option value="" disabled hidden>
            Select status
          </option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="interview">Interview</option>
          <option value="done">Done</option>
        </select>

        <input
          name="link"
          type="url"
          placeholder="Link (https://example.com)"
          value={formData.link}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <input
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={createApplication.isPending}
        >
          {createApplication.isPending ? "Mentés..." : "Save Application"}
        </button>
        {createApplication.isError && (
          <p className="text-red-600 mt-2 text-sm">
            ⚠ Hiba történt a jelentkezés mentésekor. Próbáld újra!
          </p>
        )}
      </form>
    </Modal>
  );
};

export default ApplicationModal;
