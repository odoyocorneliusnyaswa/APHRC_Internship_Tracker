import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, ThumbsUp, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FeedbackForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    overallExperience: "",
    learningOpportunities: "",
    workEnvironment: "",
    supervisorSupport: "",
    skillsDeveloped: [],
    wouldRecommend: "",
    suggestions: "",
    additionalComments: "",
    anonymous: false
  });

  const experienceOptions = [
    { value: "excellent", label: "Excellent", description: "Exceeded expectations" },
    { value: "good", label: "Good", description: "Met expectations" },
    { value: "satisfactory", label: "Satisfactory", description: "Adequate experience" },
    { value: "needs-improvement", label: "Needs Improvement", description: "Below expectations" }
  ];

  const skillsOptions = [
    "Research & Analysis",
    "Data Collection",
    "Report Writing",
    "Presentation Skills",
    "Technical Skills",
    "Project Management",
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Leadership"
  ];

  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      setFeedbackData({
        ...feedbackData,
        skillsDeveloped: [...feedbackData.skillsDeveloped, skill]
      });
    } else {
      setFeedbackData({
        ...feedbackData,
        skillsDeveloped: feedbackData.skillsDeveloped.filter(s => s !== skill)
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your valuable feedback!",
      });
      setIsSubmitting(false);
      
      // Reset form
      setFeedbackData({
        overallExperience: "",
        learningOpportunities: "",
        workEnvironment: "",
        supervisorSupport: "",
        skillsDeveloped: [],
        wouldRecommend: "",
        suggestions: "",
        additionalComments: "",
        anonymous: false
      });
    }, 1000);
  };

  const RatingSection = ({ 
    title, 
    description, 
    value, 
    onChange 
  }: { 
    title: string; 
    description: string; 
    value: string; 
    onChange: (value: string) => void; 
  }) => (
    <div className="space-y-3">
      <div>
        <Label className="text-base font-medium">{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <RadioGroup value={value} onValueChange={onChange}>
        {experienceOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${title}-${option.value}`} />
            <Label htmlFor={`${title}-${option.value}`} className="cursor-pointer">
              <span className="font-medium">{option.label}</span>
              <span className="text-muted-foreground ml-2">- {option.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Internship Feedback</h2>
          <p className="text-muted-foreground">Help us improve the internship experience</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Experience Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RatingSection
            title="Overall Experience"
            description="How would you rate your overall internship experience at APHRC?"
            value={feedbackData.overallExperience}
            onChange={(value) => setFeedbackData({...feedbackData, overallExperience: value})}
          />

          <RatingSection
            title="Learning Opportunities"
            description="How well did the internship provide valuable learning opportunities?"
            value={feedbackData.learningOpportunities}
            onChange={(value) => setFeedbackData({...feedbackData, learningOpportunities: value})}
          />

          <RatingSection
            title="Work Environment"
            description="How would you describe the work environment and culture?"
            value={feedbackData.workEnvironment}
            onChange={(value) => setFeedbackData({...feedbackData, workEnvironment: value})}
          />

          <RatingSection
            title="Supervisor Support"
            description="How satisfied were you with the guidance and support from your supervisor?"
            value={feedbackData.supervisorSupport}
            onChange={(value) => setFeedbackData({...feedbackData, supervisorSupport: value})}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-base font-medium mb-3 block">
              Which skills did you develop or improve during your internship?
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillsOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={feedbackData.skillsDeveloped.includes(skill)}
                    onCheckedChange={(checked) => handleSkillToggle(skill, !!checked)}
                  />
                  <Label htmlFor={skill} className="text-sm cursor-pointer">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
            {feedbackData.skillsDeveloped.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground mb-2">Selected skills:</p>
                <div className="flex flex-wrap gap-2">
                  {feedbackData.skillsDeveloped.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Would you recommend APHRC internship program to other students?
            </Label>
            <RadioGroup 
              value={feedbackData.wouldRecommend} 
              onValueChange={(value) => setFeedbackData({...feedbackData, wouldRecommend: value})}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="definitely" id="definitely" />
                <Label htmlFor="definitely" className="cursor-pointer">
                  <ThumbsUp className="h-4 w-4 inline mr-2" />
                  Definitely would recommend
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="probably" id="probably" />
                <Label htmlFor="probably" className="cursor-pointer">
                  Probably would recommend
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maybe" id="maybe" />
                <Label htmlFor="maybe" className="cursor-pointer">
                  Maybe would recommend
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="probably-not" id="probably-not" />
                <Label htmlFor="probably-not" className="cursor-pointer">
                  Probably would not recommend
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="definitely-not" id="definitely-not" />
                <Label htmlFor="definitely-not" className="cursor-pointer">
                  Definitely would not recommend
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="suggestions">Suggestions for Improvement</Label>
            <Textarea
              id="suggestions"
              placeholder="What suggestions do you have to improve the internship program?"
              value={feedbackData.suggestions}
              onChange={(e) => setFeedbackData({...feedbackData, suggestions: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea
              id="comments"
              placeholder="Any other comments or experiences you'd like to share?"
              value={feedbackData.additionalComments}
              onChange={(e) => setFeedbackData({...feedbackData, additionalComments: e.target.value})}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
            <Checkbox
              id="anonymous"
              checked={feedbackData.anonymous}
              onCheckedChange={(checked) => setFeedbackData({...feedbackData, anonymous: !!checked})}
            />
            <Label htmlFor="anonymous" className="cursor-pointer">
              Submit this feedback anonymously
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Save Draft</Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !feedbackData.overallExperience}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}