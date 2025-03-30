
import { cn } from '@/lib/utils';
import { Event } from '@/types/events';
import { format } from 'date-fns';

type CalendarEventProps = {
  event: Event;
  onClick: () => void;
};

const CalendarEvent = ({ event, onClick }: CalendarEventProps) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing':
        return 'bg-red-100 border-red-300 text-red-700';
      case 'meeting':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'deadline':
        return 'bg-amber-100 border-amber-300 text-amber-700';
      case 'other':
      default:
        return 'bg-purple-100 border-purple-300 text-purple-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'mb-1 px-1.5 py-0.5 text-xs rounded border cursor-pointer truncate',
        getEventTypeColor(event.type)
      )}
    >
      <div className="flex items-center">
        <span className="truncate">
          {format(new Date(event.startTime), 'h:mm a')} · {event.title}
        </span>
      </div>
    </div>
  );
};

export default CalendarEvent;
