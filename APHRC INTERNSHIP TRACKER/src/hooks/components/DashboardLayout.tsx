import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, 
  FileText, 
  Upload, 
  MessageSquare, 
  BarChart3,
  Menu,
  X
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  userRole: 'intern' | 'supervisor';
  onViewChange: (view: string) => void;
}

export function DashboardLayout({ children, currentView, userRole, onViewChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const internMenuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'weekly-summary', label: 'Weekly Summary', icon: FileText },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  const supervisorMenuItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'interns', label: 'Manage Interns', icon: User },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'feedback-review', label: 'Review Feedback', icon: MessageSquare },
  ];

  const menuItems = userRole === 'supervisor' ? supervisorMenuItems : internMenuItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">APHRC Internship Tracker</h1>
                <p className="text-sm text-muted-foreground">
                  {userRole === 'supervisor' ? 'Supervisor Dashboard' : 'Intern Portal'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">
                {userRole === 'supervisor' ? 'Supervisor' : 'Intern'}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static top-0 left-0 z-40 w-64 h-full bg-card border-r border-border transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 pt-20 md:pt-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onViewChange(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}