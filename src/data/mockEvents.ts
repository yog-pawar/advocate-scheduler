
import { Event } from '@/types/events';
import { addDays, addHours, setHours, setMinutes, subDays } from 'date-fns';

const today = new Date();
const tomorrow = addDays(today, 1);
const yesterday = subDays(today, 1);
const nextWeek = addDays(today, 7);

// Helper function to set time for a given date
const setTime = (date: Date, hours: number, minutes: number) => {
  return setMinutes(setHours(date, hours), minutes);
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Smith vs. State',
    type: 'hearing',
    startTime: setTime(tomorrow, 10, 30).toISOString(),
    endTime: setTime(tomorrow, 12, 0).toISOString(),
    location: 'Supreme Court, Room 304',
    client: 'John Smith',
    caseNumber: 'SC-2023-781',
    notes: 'Final hearing for the case. Review evidence documents and witness statements before the hearing.',
  },
  {
    id: '2',
    title: 'Meeting with James Wilson',
    type: 'meeting',
    startTime: setTime(addDays(today, 2), 14, 0).toISOString(),
    endTime: setTime(addDays(today, 2), 15, 0).toISOString(),
    location: 'Office',
    client: 'James Wilson',
    notes: 'Initial consultation regarding property dispute. Bring property law reference documents.',
  },
  {
    id: '3',
    title: 'Document Submission',
    type: 'deadline',
    startTime: setTime(addDays(today, 3), 17, 0).toISOString(),
    endTime: setTime(addDays(today, 3), 17, 30).toISOString(),
    caseNumber: 'HC-2023-456',
    notes: 'Last date to submit the revised affidavit for the Johnson case.',
  },
  {
    id: '4',
    title: 'Conference Call with Legal Team',
    type: 'meeting',
    startTime: setTime(today, 11, 0).toISOString(),
    endTime: setTime(today, 12, 0).toISOString(),
    location: 'Virtual (Zoom)',
    notes: 'Discuss strategy for upcoming corporate case.',
  },
  {
    id: '5',
    title: 'Client Intake - Sarah Brown',
    type: 'meeting',
    startTime: setTime(today, 15, 30).toISOString(),
    endTime: setTime(today, 16, 30).toISOString(),
    location: 'Office',
    client: 'Sarah Brown',
    notes: 'New client consultation regarding divorce proceedings.',
  },
  {
    id: '6',
    title: 'Appeal Filing',
    type: 'deadline',
    startTime: setTime(addDays(today, 5), 16, 0).toISOString(),
    endTime: setTime(addDays(today, 5), 16, 30).toISOString(),
    caseNumber: 'AC-2023-112',
    notes: 'Final date to file appeal for the Peterson case.',
  },
  {
    id: '7',
    title: 'Martinez vs. City Corporation',
    type: 'hearing',
    startTime: setTime(addDays(today, 4), 9, 0).toISOString(),
    endTime: setTime(addDays(today, 4), 11, 0).toISOString(),
    location: 'District Court, Room 201',
    client: 'Elena Martinez',
    caseNumber: 'DC-2023-567',
    notes: 'Evidence presentation phase. Bring all supporting documents.',
  },
  {
    id: '8',
    title: 'Bar Association Meeting',
    type: 'other',
    startTime: setTime(addDays(today, 10), 18, 0).toISOString(),
    endTime: setTime(addDays(today, 10), 20, 0).toISOString(),
    location: 'City Law Club',
    notes: 'Quarterly meeting of the local bar association.',
  },
  {
    id: '9',
    title: 'Legal Research',
    type: 'other',
    startTime: setTime(yesterday, 14, 0).toISOString(),
    endTime: setTime(yesterday, 17, 0).toISOString(),
    notes: 'Allocated time for property law research for the Wilson case.',
  },
  {
    id: '10',
    title: 'Hughes Consultation',
    type: 'meeting',
    startTime: setTime(nextWeek, 10, 0).toISOString(),
    endTime: setTime(nextWeek, 11, 0).toISOString(),
    location: 'Office',
    client: 'Thomas Hughes',
    notes: 'Follow-up meeting regarding trademark dispute.',
  },
];
