import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentStatus {
  internshipAgreement: boolean;
  contract: boolean;
  feedbackForm: boolean;
}

export function InternProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    education: "master",
    theme: "public-health",
    unit: "research",
    supervisor: "dr-smith",
    mode: "blended",
    year: "2024",
    startDate: "2024-01-15",
    expectedEndDate: "2024-06-15",
    actualEndDate: "",
    status: "ongoing",
    terminationReason: "",
    brownPresentationLink: ""
  });

  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    internshipAgreement: true,
    contract: true,
    feedbackForm: false
  });

  const educationOptions = [
    { value: "diploma", label: "Diploma" },
    { value: "bachelor", label: "Bachelor's" },
    { value: "master", label: "Master's" },
    { value: "phd", label: "PhD" },
    { value: "other", label: "Other" }
  ];

  const themeOptions = [
    { value: "public-health", label: "Public Health" },
    { value: "data-science", label: "Data Science" },
    { value: "finance", label: "Finance" },
    { value: "hr", label: "Human Resources" },
    { value: "it", label: "Information Technology" }
  ];

  const unitOptions = [
    { value: "research", label: "Research" },
    { value: "hr", label: "Human Resources" },
    { value: "it", label: "Information Technology" },
    { value: "finance", label: "Finance" },
    { value: "admin", label: "Administration" }
  ];

  const supervisorOptions = [
    { value: "dr-smith", label: "Dr. Smith" },
    { value: "dr-jones", label: "Dr. Jones" },
    { value: "prof-brown", label: "Prof. Brown" },
    { value: "ms-davis", label: "Ms. Davis" }
  ];

  const modeOptions = [
    { value: "physical", label: "Physical" },
    { value: "blended", label: "Blended" },
    { value: "virtual", label: "Virtual" }
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "voluntary-termination", label: "Voluntary Termination" },
    { value: "involuntary-termination", label: "Involuntary Termination" }
  ];

  const calculateDuration = () => {
    if (formData.startDate && formData.expectedEndDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.expectedEndDate);
      const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      return diffMonths;
    }
    return 0;
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your internship profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const DocumentStatusBadge = ({ status, label }: { status: boolean; label: string }) => (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {status ? (
          <>
            <CheckCircle className="h-5 w-5 text-success" />
            <Badge variant="secondary" className="bg-success/10 text-success">Issued</Badge>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-destructive" />
            <Badge variant="destructive">Pending</Badge>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal & Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="education">Highest Level of Education</Label>
                <Select 
                  value={formData.education} 
                  onValueChange={(value) => setFormData({...formData, education: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={formData.theme} 
                  onValueChange={(value) => setFormData({...formData, theme: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unit">Unit Joined</Label>
                <Select 
                  value={formData.unit} 
                  onValueChange={(value) => setFormData({...formData, unit: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="supervisor">Supervisor</Label>
                <Select 
                  value={formData.supervisor} 
                  onValueChange={(value) => setFormData({...formData, supervisor: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisorOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mode">Mode of Internship</Label>
                <Select 
                  value={formData.mode} 
                  onValueChange={(value) => setFormData({...formData, mode: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Status */}
        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DocumentStatusBadge 
              status={documentStatus.internshipAgreement} 
              label="Internship Agreement" 
            />
            <DocumentStatusBadge 
              status={documentStatus.contract} 
              label="Contract" 
            />
            <DocumentStatusBadge 
              status={documentStatus.feedbackForm} 
              label="Feedback Form" 
            />
          </CardContent>
        </Card>

        {/* Internship Timeline */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Internship Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="year">Year Started</Label>
                <Select 
                  value={formData.year} 
                  onValueChange={(value) => setFormData({...formData, year: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="expectedEndDate">Expected End Date</Label>
                <Input
                  id="expectedEndDate"
                  type="date"
                  value={formData.expectedEndDate}
                  onChange={(e) => setFormData({...formData, expectedEndDate: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <span className="text-sm font-medium">{calculateDuration()} months</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Internship Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({...formData, status: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brownPresentation">Brown Presentation Link</Label>
                <Input
                  id="brownPresentation"
                  value={formData.brownPresentationLink}
                  onChange={(e) => setFormData({...formData, brownPresentationLink: e.target.value})}
                  placeholder="https://..."
                  disabled={!isEditing}
                />
              </div>
            </div>

            {(formData.status.includes('termination')) && (
              <div className="mt-4">
                <Label htmlFor="terminationReason">Reason for Termination</Label>
                <Textarea
                  id="terminationReason"
                  value={formData.terminationReason}
                  onChange={(e) => setFormData({...formData, terminationReason: e.target.value})}
                  placeholder="Please provide details..."
                  disabled={!isEditing}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}