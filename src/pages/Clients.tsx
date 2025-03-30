
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

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  caseCount: number;
  status: 'active' | 'inactive' | 'pending';
};

const mockClients: Client[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', phone: '(555) 123-4567', caseCount: 2, status: 'active' },
  { id: '2', name: 'Sarah Brown', email: 'sarah.brown@example.com', phone: '(555) 987-6543', caseCount: 1, status: 'active' },
  { id: '3', name: 'James Wilson', email: 'james.wilson@example.com', phone: '(555) 456-7890', caseCount: 3, status: 'active' },
  { id: '4', name: 'Elena Martinez', email: 'elena.martinez@example.com', phone: '(555) 789-0123', caseCount: 1, status: 'active' },
  { id: '5', name: 'Thomas Hughes', email: 'thomas.hughes@example.com', phone: '(555) 234-5678', caseCount: 1, status: 'pending' },
  { id: '6', name: 'Michael Anderson', email: 'michael.anderson@example.com', phone: '(555) 321-0987', caseCount: 0, status: 'inactive' },
  { id: '7', name: 'Jennifer Parker', email: 'jennifer.parker@example.com', phone: '(555) 876-5432', caseCount: 2, status: 'active' },
  { id: '8', name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '(555) 654-3210', caseCount: 1, status: 'active' },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif font-semibold text-advocate">
            Clients
          </h1>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            New Client
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
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
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Phone</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Cases</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 px-4 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr 
                    key={client.id} 
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">{client.name}</td>
                    <td className="py-4 px-4">{client.email}</td>
                    <td className="py-4 px-4">{client.phone}</td>
                    <td className="py-4 px-4">{client.caseCount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
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
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No clients found matching your search.
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

export default Clients;
