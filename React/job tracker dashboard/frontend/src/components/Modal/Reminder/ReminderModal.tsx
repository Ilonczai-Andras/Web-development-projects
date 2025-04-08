import Modal from "../Modal";
import { useState, useEffect } from "react";
import useUpdateReminder from "../../../hooks/Reminder/useUpdateReminder";
import { Reminder } from "../../../hooks/Reminder/useGetReminders";
import toast from "react-hot-toast";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder: Reminder | null;
}

const formatDateForInput = (value: string): string => {
  const date = new Date(value);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

const ReminderModal = ({ isOpen, onClose, reminder }: ReminderModalProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    application_id: 0,
    title: "",
    description: "",
    remind_at: "",
    is_sent: false,
  });

  const updateReminder = useUpdateReminder();

  useEffect(() => {
    if (reminder) {
      const { id, application_id, title, description, remind_at, is_sent } =
        reminder;

      setFormData({
        id,
        application_id,
        title: title || "",
        description: description || "",
        remind_at: formatDateForInput(remind_at),
        is_sent,
      });
    }
  }, [reminder]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminder) return;

    try {
      await updateReminder.mutateAsync(formData);
      toast.success("Application succesfully updated!");
    } catch (error) {
      console.error("Failed to update application", error);
      toast.error("Failed to update application");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4 text-white">Editing a reminder</h2>
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
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <input
          name="remind_at"
          type="datetime-local"
          value={formData.remind_at}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Save
        </button>
      </form>
    </Modal>
  );
};

export default ReminderModal;
