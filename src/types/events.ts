
export type Event = {
  id: string;
  title: string;
  type: 'hearing' | 'meeting' | 'deadline' | 'other';
  startTime: string;
  endTime: string;
  location?: string;
  client?: string;
  caseNumber?: string;
  notes?: string;
};
