import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Download,
  Search,
  Filter,
  Eye
} from "lucide-react";

interface InternData {
  id: string;
  name: string;
  unit: string;
  supervisor: string;
  status: 'ongoing' | 'completed' | 'voluntary-termination' | 'involuntary-termination';
  startDate: string;
  expectedEndDate: string;
  agreementIssued: boolean;
  contractIssued: boolean;
  feedbackSubmitted: boolean;
  weeklySubmissions: number;
  lastSubmission: string;
}

export function SupervisorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");

  const [internsData] = useState<InternData[]>([
    {
      id: "1",
      name: "John Doe",
      unit: "Research",
      supervisor: "Dr. Smith",
      status: "ongoing",
      startDate: "2024-01-15",
      expectedEndDate: "2024-06-15",
      agreementIssued: true,
      contractIssued: true,
      feedbackSubmitted: false,
      weeklySubmissions: 3,
      lastSubmission: "2024-01-19"
    },
    {
      id: "2",
      name: "Jane Smith",
      unit: "IT",
      supervisor: "Ms. Davis",
      status: "ongoing",
      startDate: "2024-01-08",
      expectedEndDate: "2024-05-08",
      agreementIssued: true,
      contractIssued: false,
      feedbackSubmitted: false,
      weeklySubmissions: 4,
      lastSubmission: "2024-01-22"
    },
    {
      id: "3",
      name: "Mike Johnson",
      unit: "Finance",
      supervisor: "Dr. Jones",
      status: "completed",
      startDate: "2023-09-01",
      expectedEndDate: "2024-01-01",
      agreementIssued: true,
      contractIssued: true,
      feedbackSubmitted: true,
      weeklySubmissions: 16,
      lastSubmission: "2023-12-29"
    }
  ]);

  const filteredInterns = internsData.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || intern.status === statusFilter;
    const matchesUnit = unitFilter === "all" || intern.unit.toLowerCase() === unitFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesUnit;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'ongoing': { variant: 'default' as const, label: 'Ongoing' },
      'completed': { variant: 'secondary' as const, label: 'Completed' },
      'voluntary-termination': { variant: 'destructive' as const, label: 'Voluntary Term.' },
      'involuntary-termination': { variant: 'destructive' as const, label: 'Involuntary Term.' }
    };
    
    const config = variants[status as keyof typeof variants] || variants.ongoing;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const DocumentStatusIcon = ({ issued }: { issued: boolean }) => 
    issued ? (
      <CheckCircle className="h-4 w-4 text-success" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    );

  const stats = {
    totalInterns: internsData.length,
    ongoingInterns: internsData.filter(i => i.status === 'ongoing').length,
    completedInterns: internsData.filter(i => i.status === 'completed').length,
    pendingDocuments: internsData.filter(i => !i.agreementIssued || !i.contractIssued).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Supervisor Dashboard</h2>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalInterns}</p>
                <p className="text-sm text-muted-foreground">Total Interns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.ongoingInterns}</p>
                <p className="text-sm text-muted-foreground">Ongoing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completedInterns}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <XCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pendingDocuments}</p>
                <p className="text-sm text-muted-foreground">Pending Docs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or supervisor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="voluntary-termination">Voluntary Term.</SelectItem>
                <SelectItem value="involuntary-termination">Involuntary Term.</SelectItem>
              </SelectContent>
            </Select>
            <Select value={unitFilter} onValueChange={setUnitFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Interns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Interns Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-foreground">Unit</th>
                  <th className="text-left p-3 font-medium text-foreground">Supervisor</th>
                  <th className="text-left p-3 font-medium text-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-foreground">Documents</th>
                  <th className="text-left p-3 font-medium text-foreground">Weekly Reports</th>
                  <th className="text-left p-3 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.map((intern) => (
                  <tr key={intern.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-foreground">{intern.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(intern.startDate).toLocaleDateString()} - {new Date(intern.expectedEndDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 text-foreground">{intern.unit}</td>
                    <td className="p-3 text-foreground">{intern.supervisor}</td>
                    <td className="p-3">{getStatusBadge(intern.status)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1" title="Agreement">
                          <span className="text-xs text-muted-foreground">A:</span>
                          <DocumentStatusIcon issued={intern.agreementIssued} />
                        </div>
                        <div className="flex items-center gap-1" title="Contract">
                          <span className="text-xs text-muted-foreground">C:</span>
                          <DocumentStatusIcon issued={intern.contractIssued} />
                        </div>
                        <div className="flex items-center gap-1" title="Feedback">
                          <span className="text-xs text-muted-foreground">F:</span>
                          <DocumentStatusIcon issued={intern.feedbackSubmitted} />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <p className="font-medium text-foreground">{intern.weeklySubmissions} submitted</p>
                        <p className="text-muted-foreground">
                          Last: {new Date(intern.lastSubmission).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}