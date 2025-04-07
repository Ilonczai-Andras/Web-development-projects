import ReminderList from "../Reminder/ReminderList";
import ReminderForm from "../Reminder/ReminderForm";

const ReminderView = () => {
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Emlékeztetők kezelése</h2>
      <ReminderForm />
      <ReminderList />
    </div>
  );
};

export default ReminderView;
