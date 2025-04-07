import { useState } from "react";

const ReminderForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reminder_date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Saját fetch hívás (API hívás placeholder)
    fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("Emlékeztető mentve!");
        setFormData({ title: "", description: "", reminder_date: "" });
      })
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Cím"
        value={formData.title}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded text-black"
        required
      />

      <textarea
        name="description"
        placeholder="Leírás (opcionális)"
        value={formData.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded text-black"
      />

      <input
        name="reminder_date"
        type="datetime-local"
        value={formData.reminder_date}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded text-black"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Emlékeztető mentése
      </button>
    </form>
  );
};

export default ReminderForm;
