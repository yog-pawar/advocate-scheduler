
import { format } from 'date-fns';
import { CalendarClock, FileText, MapPin, User, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/events';
import { cn } from '@/lib/utils';

type EventDetailsModalProps = {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
};

const EventDetailsModal = ({ event, isOpen, onClose }: EventDetailsModalProps) => {
  if (!event) return null;

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing':
        return 'bg-red-100 text-red-700';
      case 'meeting':
        return 'bg-blue-100 text-blue-700';
      case 'deadline':
        return 'bg-amber-100 text-amber-700';
      case 'other':
      default:
        return 'bg-purple-100 text-purple-700';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'hearing':
        return 'Court Hearing';
      case 'meeting':
        return 'Client Meeting';
      case 'deadline':
        return 'Case Deadline';
      case 'other':
      default:
        return 'Other Event';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-xl font-serif">{event.title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <span 
              className={cn(
                "text-sm px-3 py-1 rounded-full",
                getEventTypeColor(event.type)
              )}
            >
              {getEventTypeLabel(event.type)}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <CalendarClock className="h-5 w-5 mr-3 text-advocate" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-muted-foreground">
                  {format(new Date(event.startTime), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-muted-foreground">
                  {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                </p>
              </div>
            </div>
            
            {event.location && (
              <div className="flex">
                <MapPin className="h-5 w-5 mr-3 text-advocate" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
            )}
            
            {event.client && (
              <div className="flex">
                <User className="h-5 w-5 mr-3 text-advocate" />
                <div>
                  <p className="font-medium">Client</p>
                  <p className="text-muted-foreground">{event.client}</p>
                </div>
              </div>
            )}
            
            {event.caseNumber && (
              <div className="flex">
                <FileText className="h-5 w-5 mr-3 text-advocate" />
                <div>
                  <p className="font-medium">Case Number</p>
                  <p className="text-muted-foreground">{event.caseNumber}</p>
                </div>
              </div>
            )}
            
            {event.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Notes</p>
                <p className="text-muted-foreground whitespace-pre-line">{event.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
