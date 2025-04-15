export interface Reminder {
    id: number;
    user_id: number;
    application_id: number | null;
    title: string;
    description?: string;
    remind_at: string;
    is_sent: boolean;
    created_at: string;
    updated_at: string;
  }
  
  // Új Reminder létrehozásához:
  export type ReminderCreateInput = {
    application_id: number | null;
    title: string;
    description?: string;
    remind_at: string;
    is_sent: boolean;
  };
  
  // Frissítéshez:
  export interface ReminderUpdateInput {
    id: number;
    data: Partial<Omit<ReminderCreateInput, "application_id">>;
  }
  