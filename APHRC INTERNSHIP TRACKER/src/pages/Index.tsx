import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InternProfile } from "@/components/InternProfile";
import { WeeklySummary } from "@/components/WeeklySummary";
import { DocumentUpload } from "@/components/DocumentUpload";
import { FeedbackForm } from "@/components/FeedbackForm";
import { SupervisorDashboard } from "@/components/SupervisorDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState("profile");
  const [userRole, setUserRole] = useState<'intern' | 'supervisor'>('intern');

  const renderContent = () => {
    if (userRole === 'supervisor') {
      switch (currentView) {
        case 'dashboard':
          return <SupervisorDashboard />;
        case 'interns':
          return <SupervisorDashboard />;
        case 'reports':
          return <div className="text-center py-12"><h3 className="text-lg font-medium">Reports coming soon...</h3></div>;
        case 'feedback-review':
          return <div className="text-center py-12"><h3 className="text-lg font-medium">Feedback review coming soon...</h3></div>;
        default:
          return <SupervisorDashboard />;
      }
    } else {
      switch (currentView) {
        case 'profile':
          return <InternProfile />;
        case 'weekly-summary':
          return <WeeklySummary />;
        case 'documents':
          return <DocumentUpload />;
        case 'feedback':
          return <FeedbackForm />;
        default:
          return <InternProfile />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Role Switch for Demo */}
      <div className="fixed top-4 right-4 z-50 bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo Mode:</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setUserRole('intern');
              setCurrentView('profile');
            }}
            className={`px-3 py-1 text-xs rounded ${
              userRole === 'intern' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Intern View
          </button>
          <button
            onClick={() => {
              setUserRole('supervisor');
              setCurrentView('dashboard');
            }}
            className={`px-3 py-1 text-xs rounded ${
              userRole === 'supervisor' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Supervisor View
          </button>
        </div>
      </div>

      <DashboardLayout
        currentView={currentView}
        userRole={userRole}
        onViewChange={setCurrentView}
      >
        {renderContent()}
      </DashboardLayout>
    </div>
  );
};

export default Index;
