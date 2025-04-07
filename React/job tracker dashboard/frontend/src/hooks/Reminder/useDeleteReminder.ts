import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteReminder = async (id: number) => {
  const response = await fetch(`/api/reminders/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete reminder');
  }

  return response.json();
};

export const useDeleteReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
};
