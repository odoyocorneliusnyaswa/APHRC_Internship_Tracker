# APHRC_Internship_Tracker
# Internship Tracker Dashboard

![Dashboard Preview](https://via.placeholder.com/800x400?text=APHRC+Internship+Tracker+Dashboard) *(Replace with actual screenshot)*

A secure, role-based web application for tracking intern progress, document submissions, and feedback at [APHRC](https://www.aphrc.org). Interns can log weekly summaries, upload documents, and provide feedback, while supervisors monitor progress with admin privileges.

## Key Features

### User Roles & Access
- **Interns** can:
  - Submit weekly work summaries
  - Upload internship documents
  - Update their profile information
  - Provide feedback about their experience
- **Supervisors (Admin)** can:
  - View all intern data
  - Monitor submission statuses
  - Generate reports
  - Manage document approvals

### Core Functionalities
- **Profile Management**:
  - Personal details
  - Education background
  - Internship timeline (start/end dates)
  - Status tracking (Ongoing/Completed/Terminated)
- **Document Tracking**:
  - Visual indicators for agreement/contract status
  - Feedback form submission tracking
  - Brown presentation link storage
- **Weekly Logs**:
  - Task documentation
  - Challenges faced
  - Skills developed
  - Future goals
- **Feedback System**:
  - Anonymous/non-anonymous options
  - Experience ratings
  - Suggestions for improvement

## Technology Stack

### Frontend
- React.js (TypeScript)
- Material-UI or Ant Design for UI components
- Chart.js for data visualization

### Backend
- Node.js with Express
- ORM: Prisma or Sequelize

### Database
- PostgreSQL (relational data)
- Firebase Storage (for documents)

### Authentication
- OAuth 2.0 (Google/Microsoft)
- JWT for API authorization

### Hosting
- Frontend: Vercel/Netlify
- Backend: AWS Elastic Beanstalk
- Database: AWS RDS

## Installation

### Prerequisites
- Node.js v16+
- PostgreSQL 12+
- Yarn/NPM

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/internship-tracker.git
   cd internship-tracker
