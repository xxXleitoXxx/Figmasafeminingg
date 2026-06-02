Design and build a complete, fully interactive web application called **SafeMining VR** — a multi-company VR training management platform for the mining industry. Generate ALL screens and flows in a single output. Every screen must be interactive with working navigation between pages.

---

## DESIGN SYSTEM

**Typography:** Inter (all weights). Headlines: Inter Bold 32–24px. Body: Inter Regular 16px. Labels: Inter Medium 14px. Captions: Inter Regular 12px.

**Color Palette:**
- Primary: #1A365D (dark navy) — main actions, headers, active states
- Secondary: #F97316 (orange) — CTAs, highlights, progress indicators, badges
- Tertiary: #334155 (slate) — secondary text, sidebar backgrounds, subheaders
- Neutral: #F9FAFB (light gray) — page backgrounds, cards
- White: #FFFFFF — card surfaces, input backgrounds
- Error: #EF4444 | Success: #22C55E | Warning: #EAB308
- Text-primary: #0F172A | Text-secondary: #64748B | Border: #E2E8F0

**Buttons:**
- Primary: bg #1A365D, text white, rounded-lg, hover bg #2D4A7A
- Secondary: bg #F97316, text white, rounded-lg, hover bg #EA6C0A
- Inverted: bg white, text #1A365D, border #1A365D
- Outlined: border #E2E8F0, text #334155, bg transparent, hover bg #F9FAFB
- Destructive: bg #EF4444, text white

**Cards:** bg white, border #E2E8F0, border-radius 12px, shadow sm (0 1px 3px rgba(0,0,0,0.08))

**Inputs:** border #E2E8F0, bg white, rounded-lg, focus ring #1A365D 2px, placeholder text #94A3B8

**Status Badges:** pill shape, 6px padding horizontal
- Pending: bg #FEF9C3, text #854D0E
- Active: bg #DCFCE7, text #166534
- Approved: bg #D1FAE5, text #065F46
- Rejected: bg #FEE2E2, text #991B1B
- Draft: bg #F1F5F9, text #475569
- Closed: bg #E5E7EB, text #374151

**Sidebar navigation:** bg #1A365D, active item bg rgba(255,255,255,0.12), text white, icon + label layout, 240px wide.

---

## APPLICATION STRUCTURE & ROLES

The app has 4 roles, each with their own navigation and screens:

1. **System Administrator (AdminSys)** — platform-wide management
2. **Company Administrator (AdminEmp)** — manages one company's users, programs, reports
3. **Company Coordinator** — manages programs, assigns training, views reports
4. **Employee / Trainee** — accesses assigned training, takes exams, gets certificates

---

## SCREENS TO GENERATE

### 🔐 AUTHENTICATION (shared)

**Screen AUTH-01: Login**
- Centered card on navy gradient bg (#1A365D → #334155)
- SafeMining VR logo top (white icon of hard hat + VR headset, bold white text)
- Subtitle: "Mining Safety Training Platform"
- Email input + Password input with show/hide toggle
- "Sign In" primary button (full width)
- "Forgot your password?" link below button
- On click Sign In → navigate to correct dashboard based on role (use a role selector dropdown below the form labeled "Demo: Select role" with options: System Admin, Company Admin, Coordinator, Employee)
- Clean, professional, dark-themed card with subtle border glow

**Screen AUTH-02: Forgot Password**
- Same background as login
- Back arrow + "Reset Password" title
- Email input
- "Send Reset Link" primary button
- Success state: green check icon + "Check your email" message

---

### 🛡️ SYSTEM ADMINISTRATOR

**Sidebar items:** Dashboard, Companies, Users (AdminEmp), Simulations, Roles, Reports, Configuration

**Screen ADMIN-01: System Dashboard (I2)**
- Top header: "SafeMining VR" logo left, user avatar + name right, notification bell
- KPI cards row (4 cards): Active Companies (number, icon building), Total Simulations Executed (number, icon play), Active Users (number, icon users), Programs in Progress (number, icon clipboard)
- Chart section: "Simulation Executions - Last 30 Days" (line chart, primary color), "Sessions by Company" (horizontal bar chart, secondary color)
- "Most Executed Simulations" table: rank, name, category, executions, approval rate, status badge
- "Recent Activity" feed on the right: timestamped log items

**Screen ADMIN-02: Companies List (F1)**
- Page title "Companies" + "New Company" primary button top right
- Search input + filter by status (All/Active/Inactive) + date range filter
- Table: Logo placeholder, Company Name, Trade Name, CUIT, Contact Email, Status badge (Active/Inactive), Assigned Admins count, Registration Date, Actions (eye icon, edit icon, toggle active/inactive icon)
- Empty state if no companies
- Pagination at bottom

**Screen ADMIN-03: Company Detail / Create-Edit (F1)**
- Breadcrumb: Companies > [Company Name]
- Two-column layout: left form, right summary panel
- Form fields: Razón Social*, Trade Name*, CUIT*, Contact Email*, Status toggle
- Section "Assigned Company Administrators": list of assigned admins with avatar + name + email + remove button; "Assign Administrator" secondary button opens an inline dropdown search
- "Save Changes" primary button + "Cancel" outlined button
- Right panel: creation date, last modified, active users count, programs count

**Screen ADMIN-04: System Users - AdminEmp List (T2)**
- Title "Company Administrators" + "New Admin" primary button
- Table: Name, Email, Company, Status, Created At, Actions (edit, activate/deactivate)
- Filter by status and company

**Screen ADMIN-05: Create/Edit System User**
- Drawer or modal overlay
- Fields: First Name, Last Name, Email, Assigned Company (dropdown), Status toggle
- Save + Cancel buttons

**Screen ADMIN-06: VR Simulations Catalog (F2)**
- Title "VR Simulations" + "New Simulation" primary button
- Filter bar: search by name, filter by category (Fire Evacuation / Energy Lockout / Confined Spaces / General), difficulty (Basic/Intermediate/Advanced), status
- Grid of simulation cards (3 columns): card shows thumbnail placeholder (gradient with category icon), name, category pill, difficulty badge, duration "~12 min", version "v1.2", status badge, 3-dot menu (edit, manage metrics, deactivate)

**Screen ADMIN-07: Create/Edit Simulation (F2)**
- Full page form: Name*, Description, Category (select), Difficulty (select), Duration Estimate, Version, Unity Scene ID / Asset Bundle URL, Status
- Section "Evaluation Metrics": table with columns — Metric Name, Description, Default Weight (%), Default Approval Threshold, actions (edit inline, delete row)
- "Add Metric" button (add a new row inline). Weight sum must display live running total "Total Weight: 100/100" with green check or red warning
- Save + Cancel

**Screen ADMIN-08: Global Roles (T2)**
- Title "System Roles" + "New Role" primary button
- Two tabs: "Base Roles" | "Additional Roles"
- Base roles table: Name, Description, Permissions count, Status, Edit button (can edit permissions but not name)
- Additional roles table: Name, Description, Permissions count, Active Users, Status, Actions
- Click a role → expand inline to show atomic permission checkboxes grouped by module (Users, Companies, Simulations, Programs, Reports, Configuration)

**Screen ADMIN-09: Global Reports (I1)**
- Title "Global Reports"
- Filter bar: date range picker, company dropdown, simulation category
- Summary stats row: Total sessions, Approval rate %, Active companies, Certificates issued
- "Simulation Executions" area chart (full width)
- "Performance by Company" data table: Company, Sessions, Approved, Rejected, Approval Rate %, Avg Attempts
- "Export CSV" + "Export PDF" buttons top right of table

**Screen ADMIN-10: Configuration & Parameters (I3)**
- Title "System Configuration"
- Tabs: General | Security | Evaluation Defaults | Notifications | Certificate Template
- **General tab:** Platform name, Issuing entity, Logo upload, Contact email — Save button
- **Security tab:** JWT expiry web (hours input), JWT expiry VR (hours input), Login block attempts (number), Block duration minutes — Save button
- **Evaluation Defaults tab:** Default approval threshold (slider 0–100, displays number), note "Applied when coordinator doesn't override"
- **Notifications tab:** Notification window for expiry (days input); toggle switches for each notification type (Program assignment, Approval, Rejection, Expiry warning, Certificate issued); editable subject + body for each notification type with dynamic variables shown as chips (#employee_name, #program_name, #deadline)
- **Certificate Template tab:** Text intro textarea, visible fields checkboxes (Employee, Company, Program, Date), Digital signature text, Footer text — Preview button opens modal showing certificate preview

---

### 🏢 COMPANY ADMINISTRATOR

**Sidebar items:** Dashboard, Users, Roles, Programs, Simulations, Reports, My Profile

**Screen CEMP-01: Company Dashboard (I2)**
- Company name in header + company logo placeholder
- KPI row: Active Users, Active Programs, Completion Rate %, Certificates Issued
- "Programs Overview" bar chart: one bar per program showing % completion
- "Simulation Failure Rate" horizontal bars (top 5 problematic simulations in orange)
- "Recent Assignments" list: employee name, program, assigned date, status pill
- "Pending Actions" sidebar widget: employees with expiring programs (countdown chips)

**Screen CEMP-02: Users List (T2)**
- Title "Users" + "New User" primary button
- Tabs: "All" | "Coordinators" | "Employees"
- Table: Avatar+Name, Email, Role badge, Status, Registration Date, Last Activity, Actions (edit, activate/deactivate, assign role)
- Bulk select checkbox column + "Bulk Assign Role" action
- Filter: role, status, date range

**Screen CEMP-03: Create/Edit User (T2)**
- Drawer panel from right
- Fields: First Name*, Last Name*, Email*, Role (dropdown showing standard roles + custom company roles), Status toggle
- On Create: note "Welcome email will be sent automatically"
- Save + Cancel

**Screen CEMP-04: Company Roles (T2)**
- Title "Company Roles"
- Two sections: "Standard Roles" (read-only, with eye icon to view permissions) | "Custom Roles" (editable)
- "New Custom Role" button
- Custom role card: name, description, user count, edit button, deactivate button (disabled if users assigned with warning tooltip)
- Create/edit modal: role name, description, permission checkboxes grouped by feature area (view_reports, assign_program, create_user_employee, etc.)

**Screen CEMP-05: Programs List (F3)**
- Title "Training Programs" + "New Program" + "Clone Program" buttons
- Filter: status (Draft/Active/Closed), date range
- Program cards grid (2 columns): card shows name, status badge, creation date, coordinator assigned, "X simulations + Y exams", enrolled employees count, completion %, dates range, actions (edit if draft, assign, view progress, close, clone)

**Screen CEMP-06: Create/Edit Program (F3)**
- Multi-step form with step indicator at top: 1.Basic Info → 2.Content → 3.Settings → 4.Review
- **Step 1 Basic Info:** Name*, Description, Start Date*, End Date, Status
- **Step 2 Content:** Left panel "Available Content" (VR Simulations tab + Exams tab, each searchable/filterable cards); Right panel "Program Structure" (sortable drag list); each added item shows: type icon (VR/Exam), name, Required/Optional toggle, Max Attempts input, for simulations: "Configure Metrics" expandable showing metric weight sliders summing to 100 and threshold input
- **Step 3 Settings:** Assign to Coordinators (multi-select search), Assign to Employees now toggle (optional), Notification settings toggles
- **Step 4 Review:** read-only summary of all steps, "Activate Program" primary button or "Save as Draft" outlined

**Screen CEMP-07: Assign Program to Employees (F4)**
- Modal or dedicated page
- Program name in header
- "Individual Assignment" tab + "Bulk Assignment" tab
- Individual: searchable employee list with checkboxes, avatar+name+role, show already-assigned badge
- Bulk: "Select All Active Employees" toggle, filter by role, count selected
- Preview count: "X employees will be assigned to [Program Name]"
- "Assign" primary button + confirmation modal

**Screen CEMP-08: Employee Progress View (F4)**
- Breadcrumb: Programs > [Program] > Employee Progress
- Table: Employee name, Status (Not Started/In Progress/Completed/Failed), Progress bar (%), VR sessions count, Exams taken, Last activity, Certificate (download icon if approved), Actions (revoke, add attempt)
- Click row → expand inline showing each simulation/exam with individual status, attempts, best score, last attempt date

**Screen CEMP-09: Company Reports (I1)**
- Same layout as admin reports but scoped to company (no company filter)
- Tabs: "By Employee" | "By Program" | "By Simulation"
- Each tab has its own table and chart
- Export CSV + PDF buttons

---

### 📋 COORDINATOR

**Sidebar items:** Dashboard, My Programs, Simulations, Employees, Exams, Reports, My Profile

**Screen COORD-01: Coordinator Dashboard (I2)**
- Similar to AdminEmp dashboard but scoped to assigned programs only
- "My Programs" widget: list with status pills and completion bars
- "Employees Requiring Attention" widget: people close to failing or with expiring deadlines

**Screen COORD-02: My Programs (F3)**
- Same as CEMP-05 but showing only programs assigned to or created by this coordinator
- Can create, edit (if draft), assign to employees, view progress

**Screen COORD-03: Exam Management (F5)**
- Title "Theoretical Exams" + "New Exam" button
- Two tabs: "Exams" | "Question Bank"
- **Exams tab:** table with name, question count, attempts allowed, used in X programs, status, actions (edit, deactivate, view results)
- **Question Bank tab:** table with question text preview, category/topic, options count, used in X exams, actions (edit, delete if no attempts)
- "New Question" button opens drawer: question text textarea, 2–5 answer options (add/remove option rows), radio to mark correct answer, category input

**Screen COORD-04: Create/Edit Exam (F5)**
- Drawer or full page
- Exam name*, Description
- Question selection: searchable list of Question Bank items with checkboxes; selected questions appear in right panel (reorderable)
- "Question Order: Fixed / Random" toggle
- Save + Cancel

**Screen COORD-05: Assign Program Page (F4)**
- Same as CEMP-07

**Screen COORD-06: Employee Progress (F4)**
- Same as CEMP-08

**Screen COORD-07: Reports (I1)**
- Scoped reports (no company filter)
- By Employee + By Program tabs

---

### 👷 EMPLOYEE / TRAINEE

**Sidebar items:** My Training, My Certificates, My Profile

**Screen EMP-01: Employee Dashboard / My Training (F4)**
- Greeting: "Welcome back, [Name]" with avatar
- "Your Programs" section: program cards showing name, status badge, progress bar, deadline countdown chip (orange if < 7 days), "Continue" or "Start" button
- Quick stats: Completed programs, Pending simulations, Certificates earned

**Screen EMP-02: Program Detail (F4 + F5)**
- Breadcrumb: My Training > [Program Name]
- Program header: name, description, status, dates, coordinator name
- Progress indicator: circular donut chart showing overall % completion
- Content list (ordered): each item is a row showing:
  - Icon: VR headset (simulation) or document (exam)
  - Name + type label
  - Status badge: Pending / In Progress / Approved / Failed / Locked (if previous required not done)
  - Attempts: "2 / 3 attempts used"
  - Best score (if attempted): score badge
  - Action button: "Launch VR" (primary, for simulations) or "Take Exam" (secondary, for exams); disabled if locked or attempts exhausted
- "Your Certificate" panel at bottom: locked (greyscale lock icon) until all mandatory items approved, then shows green checkmark + "Download Certificate" button

**Screen EMP-03: Exam Interface (F5)**
- Full-screen focus mode (hide sidebar)
- Top bar: exam name, time started, question counter "Question 3 of 10", progress bar (orange fill)
- Question card: large card with question number, question text (large readable font), 4 option buttons (outlined, on select → fill with primary color white text)
- Navigation: "Previous" outlined button + "Next" primary button; on last question "Submit Exam" secondary (orange) button
- Cannot submit without answering all (show warning if tries)

**Screen EMP-04: Exam Results (F5)**
- Results card on neutral background
- Big score circle: score number / 100, color-coded (green if passed, red if failed)
- Status: "APPROVED ✓" (green) or "NOT APPROVED ✗" (red)
- "Attempts remaining: 1" info line
- Per-question breakdown: list showing question text + selected answer + correct/incorrect icon (only show correct answers if no attempts remaining)
- "Return to Program" button + "Retry Exam" button (if attempts remain)

**Screen EMP-05: My Certificates (F4)**
- Title "My Certificates"
- Grid of certificate cards: program name, company, completion date, "Download PDF" button (secondary), "Share" icon button
- Each card has a decorative border in primary color with SafeMining VR branding and orange accent
- Empty state: illustration + "Complete a training program to earn your first certificate"

**Screen EMP-06: My Profile (T2)**
- Two columns: left profile info, right security
- Left: avatar upload circle, First Name, Last Name, Email (read-only), Company (read-only), Role (read-only badge)
- Right: "Change Password" section with current password, new password, confirm new password fields + "Update Password" button
- "Save Profile" primary button

---

## NAVIGATION & INTERACTIVITY REQUIREMENTS

1. **Role switcher on login** → navigates to correct home dashboard
2. **Sidebar:** active state highlighted in rgba(255,255,255,0.12) with left orange border accent, hover state on items
3. **All tables:** row hover highlight (#F8FAFC), sortable column headers with sort icons
4. **All modals/drawers:** overlay with backdrop, close X button, Escape key conceptually closes
5. **Program creation multi-step:** step indicator shows completed (checkmark), current (filled circle), upcoming (outline circle); back/next navigation between steps
6. **Exam interface:** clicking an answer option visually selects it; next button advances question counter and progress bar
7. **Dashboard charts:** hover tooltip style (white card, shadow, metric value)
8. **KPI cards:** number in large bold, label below, icon right-aligned, subtle trend indicator arrow
9. **Status badge clicks** on tables should open filter pre-applied to that status
10. **"New Company", "New User", "New Program"** buttons open the respective create screen or drawer
11. **Breadcrumbs** are clickable and navigate back
12. **Notification bell** in header shows unread count badge (orange dot); click opens dropdown of 5 recent notifications

---

## VISUAL STYLE DETAILS

- Page backgrounds: #F9FAFB
- Content area padding: 32px
- Sidebar width: 240px
- Top header height: 64px, bg white, border-bottom #E2E8F0
- Section headings within pages: Inter SemiBold 18px, #0F172A
- Card inner padding: 24px
- Form section dividers: subtle 1px border + section label in Inter SemiBold 13px uppercase #94A3B8
- All empty states: centered illustration placeholder (SVG abstract shape in primary+secondary colors) + heading + subtext + optional CTA button
- Loading states: skeleton screens with animated shimmer in #E2E8F0/#F1F5F9
- Success toasts: bottom-right position, green bg, white text, auto-dismiss
- Error toasts: red bg variant

---

## COMPONENT INVENTORY (use consistently throughout)

- PageHeader: title (H1 28px bold) + optional subtitle + right-side action buttons
- StatCard: icon, value, label, optional trend chip
- DataTable: with search, filters, sortable headers, row actions, pagination, bulk select
- FormDrawer: right-side panel 480px, title, content, footer with Save+Cancel
- ConfirmModal: centered modal, warning icon, title, description, destructive + cancel buttons
- StepIndicator: horizontal stepper
- ProgressBar: thin bar with orange fill on gray track
- ScoreCircle: SVG donut circle with score number inside
- NotificationDropdown: header dropdown list
- EmptyState: illustration + text + CTA

---

Generate all screens with full fidelity to this design system. Every screen should be a separate Figma frame at 1440×900px desktop viewport. Group frames by role section. Make the prototype fully interactive with connections between all described navigation flows. Use auto-layout throughout for responsive component behavior.