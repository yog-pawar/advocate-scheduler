
import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Case = {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  court: string;
  nextHearing: string | null;
  status: 'active' | 'closed' | 'pending';
};

const mockCases: Case[] = [
  { 
    id: '1', 
    caseNumber: 'SC-2023-781', 
    title: 'Smith vs. State', 
    client: 'John Smith', 
    court: 'Supreme Court',
    nextHearing: '2023-05-25T10:30:00Z',
    status: 'active'
  },
  { 
    id: '2', 
    caseNumber: 'HC-2023-456', 
    title: 'Johnson Family Dispute', 
    client: 'Robert Johnson', 
    court: 'High Court',
    nextHearing: null,
    status: 'closed'
  },
  { 
    id: '3', 
    caseNumber: 'DC-2023-567', 
    title: 'Martinez vs. City Corporation', 
    client: 'Elena Martinez', 
    court: 'District Court',
    nextHearing: '2023-05-26T09:00:00Z',
    status: 'active'
  },
  { 
    id: '4', 
    caseNumber: 'FC-2023-239', 
    title: 'Parker Divorce Proceedings', 
    client: 'Jennifer Parker', 
    court: 'Family Court',
    nextHearing: '2023-06-02T14:00:00Z',
    status: 'active'
  },
  { 
    id: '5', 
    caseNumber: 'TC-2023-781', 
    title: 'Hughes Trademark Dispute', 
    client: 'Thomas Hughes', 
    court: 'Commercial Court',
    nextHearing: null,
    status: 'pending'
  },
  { 
    id: '6', 
    caseNumber: 'CC-2023-112', 
    title: 'Wilson Property Dispute', 
    client: 'James Wilson', 
    court: 'Civil Court',
    nextHearing: '2023-05-24T11:00:00Z',
    status: 'active'
  },
];

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCases = mockCases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.court.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No hearing scheduled';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif font-semibold text-advocate">
            Case Management
          </h1>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            New Case
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Case Number</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Title</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Client</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Court</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Next Hearing</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr 
                    key={caseItem.id} 
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4 font-mono text-sm">{caseItem.caseNumber}</td>
                    <td className="py-4 px-4 font-medium">{caseItem.title}</td>
                    <td className="py-4 px-4">{caseItem.client}</td>
                    <td className="py-4 px-4">{caseItem.court}</td>
                    <td className="py-4 px-4 text-sm">
                      {formatDate(caseItem.nextHearing)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Case</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Hearing</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Close Case</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {filteredCases.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      No cases found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cases;
