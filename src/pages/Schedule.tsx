
import { useState } from 'react';
import {
  format,
  isToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockEvents } from '@/data/mockEvents';
import { Event } from '@/types/events';
import EventDetailsModal from '@/components/calendar/EventDetailsModal';

const Schedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getEventsForDay = (date: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    }).sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing':
        return 'border-red-400 bg-red-50';
      case 'meeting':
        return 'border-blue-400 bg-blue-50';
      case 'deadline':
        return 'border-amber-400 bg-amber-50';
      case 'other':
      default:
        return 'border-purple-400 bg-purple-50';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-serif font-semibold text-advocate">
            Weekly Schedule
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={previousWeek}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" onClick={nextWeek}>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        <p className="text-lg font-medium text-advocate">
          {format(weekStart, 'MMMM d')} - {format(weekEnd, 'MMMM d, yyyy')}
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="grid grid-cols-7">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "border-b border-r last:border-r-0 py-2 text-center",
                  isToday(day) && "bg-advocate/5"
                )}
              >
                <p className="text-sm text-muted-foreground mb-1">
                  {format(day, 'EEE')}
                </p>
                <p
                  className={cn(
                    "text-lg font-medium inline-flex items-center justify-center w-10 h-10 rounded-full",
                    isToday(day) && "bg-advocate text-white"
                  )}
                >
                  {format(day, 'd')}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 divide-x min-h-[600px]">
            {weekDays.map((day, index) => {
              const dayEvents = getEventsForDay(day);
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "p-2 space-y-2",
                    isToday(day) && "bg-advocate/5"
                  )}
                >
                  {dayEvents.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-4">No events</p>
                  ) : (
                    dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={cn(
                          "p-2 rounded border-l-4 text-sm cursor-pointer hover:shadow-md transition-shadow",
                          getEventTypeColor(event.type)
                        )}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="font-medium">
                          {format(new Date(event.startTime), 'h:mm a')}
                        </div>
                        <div className="truncate">{event.title}</div>
                        {event.location && (
                          <div className="text-xs text-muted-foreground truncate">
                            {event.location}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <EventDetailsModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </Layout>
  );
};

export default Schedule;
