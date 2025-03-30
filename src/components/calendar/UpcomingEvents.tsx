
import { format } from 'date-fns';
import { CalendarClock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/types/events';

type UpcomingEventsProps = {
  events: Event[];
  onEventClick: (event: Event) => void;
};

const UpcomingEvents = ({ events, onEventClick }: UpcomingEventsProps) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'deadline':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'other':
      default:
        return 'bg-purple-100 text-purple-700 border-purple-300';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'hearing':
        return 'Hearing';
      case 'meeting':
        return 'Meeting';
      case 'deadline':
        return 'Deadline';
      case 'other':
      default:
        return 'Other';
    }
  };

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
      <h2 className="text-lg font-semibold font-serif mb-4 text-advocate">Upcoming Events</h2>
      
      <div className="space-y-4">
        {sortedEvents.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No upcoming events</p>
        ) : (
          sortedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{event.title}</h3>
                <span 
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    getEventTypeColor(event.type)
                  )}
                >
                  {getEventTypeLabel(event.type)}
                </span>
              </div>
              
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  <span>
                    {format(new Date(event.startTime), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  <span>
                    {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.client && (
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    <span>{event.client}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
