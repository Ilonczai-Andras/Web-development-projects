import { useQuery } from '@tanstack/react-query';

export interface Reminder {
  id: number;
  title: string;
  description?: string;
  reminder_date: string;
  user_id: string;
  created_at: string;
}

const getReminders = async (): Promise<Reminder[]> => {
  const response = await fetch('/api/reminders');

  if (!response.ok) {
    throw new Error('Failed to fetch reminders');
  }

  return response.json();
};

export const useGetReminders = () => {
  return useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
  });
};
