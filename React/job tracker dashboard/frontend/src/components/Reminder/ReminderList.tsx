import { useReminders } from "../../hooks/Reminder/useGetReminders";
import { Spinner } from "../Spinner";

const ReminderList = () => {
  const { data: reminders = [], isLoading, error } = useReminders();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center text-red-600 py-4">
        ⚠ An error occurred when loading data. Please try again later.
      </div>
    );

  return (
    <div>
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="border rounded p-4 mb-2 flex justify-between items-start bg-gray-900"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">{reminder.title}</h3>
            <p className="text-white">{reminder.description}</p>
            <p className="text-sm text-white">
              Reminder date: {new Date(reminder.remind_at).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end ml-4">
            <button className="m-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
              Delete
            </button>
            <button className="m-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReminderList;
