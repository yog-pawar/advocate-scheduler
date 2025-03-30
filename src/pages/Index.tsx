
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MonthCalendar from '@/components/calendar/MonthCalendar';
import UpcomingEvents from '@/components/calendar/UpcomingEvents';
import EventDetailsModal from '@/components/calendar/EventDetailsModal';
import { mockEvents } from '@/data/mockEvents';
import { Event } from '@/types/events';

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get upcoming events (next 5 days)
  const upcomingEvents = mockEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5);
    
    return eventDate >= today && eventDate <= fiveDaysLater;
  });

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-advocate mb-2">
            Welcome, John
          </h1>
          <p className="text-muted-foreground">
            Here's your schedule and upcoming events
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthCalendar 
              events={mockEvents} 
              onEventClick={handleEventClick} 
            />
          </div>
          <div>
            <UpcomingEvents 
              events={upcomingEvents} 
              onEventClick={handleEventClick} 
            />
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

export default Index;
