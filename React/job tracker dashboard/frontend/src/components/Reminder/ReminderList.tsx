import { useEffect, useState } from "react";

const ReminderList = () => {
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/reminders")
      .then((res) => res.json())
      .then((data) => setReminders(data))
  }, []);

  const deleteReminder = (id: number) => {
    fetch(`/api/reminders/${id}`, { method: "DELETE" })
      .then(() => {
        setReminders(reminders.filter((r) => r.id !== id));
      })
      .catch(() => alert("Törlés sikertelen!"));
  };

  return (
    <div>
      {reminders.map((reminder) => (
        <div key={reminder.id} className="border rounded p-4 mb-2">
          <h3 className="text-lg font-semibold">{reminder.title}</h3>
          <p>{reminder.description}</p>
          <p className="text-sm text-gray-500">
            Emlékeztető dátuma:{" "}
            {new Date(reminder.reminder_date).toLocaleString()}
          </p>
          <button
            onClick={() => deleteReminder(reminder.id)}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Törlés
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReminderList;
