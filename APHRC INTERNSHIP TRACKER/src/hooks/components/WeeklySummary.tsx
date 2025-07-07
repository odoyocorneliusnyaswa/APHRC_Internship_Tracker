import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileUp, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeeklySummaryEntry {
  id: string;
  weekOf: string;
  tasksCompleted: string;
  challenges: string;
  skillsLearned: string;
  goalsNextWeek: string;
  files: string[];
  submittedAt: string;
}

export function WeeklySummary() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tasksCompleted: "",
    challenges: "",
    skillsLearned: "",
    goalsNextWeek: "",
  });

  const [previousSubmissions] = useState<WeeklySummaryEntry[]>([
    {
      id: "1",
      weekOf: "2024-01-08",
      tasksCompleted: "Completed data analysis for the public health survey project. Reviewed literature on maternal health interventions.",
      challenges: "Understanding some statistical methods was challenging, but received good support from the team.",
      skillsLearned: "Learned advanced Excel functions and basic R programming for data visualization.",
      goalsNextWeek: "Start working on the final report and prepare presentation slides.",
      files: ["data_analysis_week1.pdf"],
      submittedAt: "2024-01-12"
    },
    {
      id: "2",
      weekOf: "2024-01-15",
      tasksCompleted: "Worked on final report draft and created preliminary presentation slides.",
      challenges: "Formatting the report according to APHRC standards took longer than expected.",
      skillsLearned: "Improved technical writing skills and learned about APHRC's research methodology.",
      goalsNextWeek: "Finalize the report and practice presentation for next week's brown presentation.",
      files: ["report_draft_v1.pdf", "presentation_outline.pptx"],
      submittedAt: "2024-01-19"
    }
  ]);

  const getCurrentWeek = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Weekly Summary Submitted",
        description: "Your weekly summary has been successfully submitted.",
      });
      setFormData({
        tasksCompleted: "",
        challenges: "",
        skillsLearned: "",
        goalsNextWeek: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Weekly Work Summary</h2>
        <Badge variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Week of {formatDate(getCurrentWeek())}
        </Badge>
      </div>

      {/* Current Week Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Submit This Week's Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tasks">Tasks Completed This Week</Label>
            <Textarea
              id="tasks"
              placeholder="Describe the main tasks and activities you completed this week..."
              value={formData.tasksCompleted}
              onChange={(e) => setFormData({...formData, tasksCompleted: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="challenges">Challenges Faced</Label>
            <Textarea
              id="challenges"
              placeholder="What challenges did you encounter and how did you address them?"
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="skills">Skills Learned</Label>
            <Textarea
              id="skills"
              placeholder="What new skills, knowledge, or techniques did you learn this week?"
              value={formData.skillsLearned}
              onChange={(e) => setFormData({...formData, skillsLearned: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="goals">Goals for Next Week</Label>
            <Textarea
              id="goals"
              placeholder="What do you plan to accomplish next week?"
              value={formData.goalsNextWeek}
              onChange={(e) => setFormData({...formData, goalsNextWeek: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label>Upload Supporting Documents</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
              <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop files here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, DOCX, images up to 10MB
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Choose Files
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Save Draft</Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.tasksCompleted.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Summary"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {previousSubmissions.map((submission) => (
              <div key={submission.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      Week of {formatDate(submission.weekOf)}
                    </Badge>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Submitted {formatDate(submission.submittedAt)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Tasks Completed</h4>
                    <p className="text-muted-foreground">{submission.tasksCompleted}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Skills Learned</h4>
                    <p className="text-muted-foreground">{submission.skillsLearned}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Challenges</h4>
                    <p className="text-muted-foreground">{submission.challenges}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Next Week Goals</h4>
                    <p className="text-muted-foreground">{submission.goalsNextWeek}</p>
                  </div>
                </div>

                {submission.files.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-medium text-foreground mb-2">Attached Files</h4>
                    <div className="flex flex-wrap gap-2">
                      {submission.files.map((file, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer">
                          {file}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}