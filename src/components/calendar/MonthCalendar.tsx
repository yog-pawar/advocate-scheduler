
import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CalendarEvent from './CalendarEvent';
import { Event } from '@/types/events';

type MonthCalendarProps = {
  events: Event[];
  onEventClick: (event: Event) => void;
};

const MonthCalendar = ({ events, onEventClick }: MonthCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() && 
        eventDate.getMonth() === date.getMonth() && 
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-semibold text-advocate">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={previousMonth}
            className="text-advocate"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentMonth(new Date())} 
            className="text-advocate"
          >
            Today
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            className="text-advocate"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="calendar-grid mb-2">
        {dayNames.map((day) => (
          <div 
            key={day} 
            className="text-center py-2 font-medium text-muted-foreground text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {daysInMonth.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          
          return (
            <div
              key={index}
              className={cn(
                "calendar-day p-1 border",
                isToday(day) ? "bg-advocate/5 border-advocate" : "border-border",
                !isSameMonth(day, currentMonth) && "opacity-50"
              )}
            >
              <div className="flex items-center justify-between p-1">
                <span 
                  className={cn(
                    "text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full",
                    isToday(day) && "bg-advocate text-white"
                  )}
                >
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="calendar-day-content px-1 pt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <CalendarEvent 
                    key={event.id} 
                    event={event} 
                    onClick={() => onEventClick(event)} 
                  />
                ))}
                
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground px-1 py-0.5">
                    + {dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalendar;
