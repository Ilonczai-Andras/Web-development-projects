import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Reminder {
  title: string;
  description?: string;
  reminder_date: Date;
}

const createReminder = async (data: Reminder) => {
  const response = await fetch('/api/reminders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create reminder');
  }

  return response.json();
};

export const useCreateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};
