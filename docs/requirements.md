# The Toodle LMS — Updated Main Scope & Technical Decisions

Source: saved from the latest requirements shared on 2026-06-20 for future review.

## 1. Project Overview

The Toodle is a web-based Learning Management System for online learning, tutoring, and structured course delivery.

The MVP will support three roles only:

```txt
SUPER_ADMIN
TEACHER
STUDENT
```

The system will allow:

* Super Admin to manage teachers, students, courses, enrollments, subscriptions, payment approvals, and reports.
* Teachers to manage lessons for their assigned courses and monitor enrolled student progress.
* Students to access assigned courses, complete lessons, monitor progress, manage subscriptions, and upload payment proof.

The platform will be subscription-based. Individual course purchases are not part of the MVP.

---

# 2. Final Monetization Model

## Subscription-Based Access Only

The Toodle MVP uses a subscription model only.

Students do not purchase individual courses.

A student can access a course only when all of the following are true:

```txt
1. The student has an ACTIVE subscription.
2. The student is enrolled in that course by Super Admin.
3. The course is PUBLISHED.
```

## Course Pricing

Remove individual course pricing from the MVP.

The Course model must not include:

```txt
Course checkout
Individual course payment
Course purchase history
Per-course payment status
```

The `duration` field remains in the Course model, but it is informational only.

Examples:

```txt
4 Weeks
8 Weeks
12 Lessons
Beginner Level
```

## Student Enrollment

A subscription does not automatically enroll a student in all courses.

Super Admin must manually enroll students into suitable courses.

Example:

```txt
Student has active Monthly Plan
→ Super Admin enrolls student in English Basics
→ Student can access English Basics

Student is not enrolled in Mathematics
→ Student cannot access Mathematics even with an active subscription
```

Future phase only:

```txt
Per-course purchases
Course bundles
Multiple course access packages
```

---

# 3. User Roles and Permissions

## 3.1 Super Admin

Super Admin has complete system access.

Permissions:

```txt
Manage teachers
Manage students
Create/edit/archive/publish courses
Assign teachers to courses
Create/edit/reorder lessons
Enroll students in courses
Manage membership plans
Review payment proof uploads
Approve/reject payments
Manage subscriptions
View all reports
Manage platform settings
```

Super Admin route group:

```txt
/super-admin/*
```

---

## 3.2 Teacher

Teacher manages assigned learning content only.

Permissions:

```txt
View assigned courses
Create/edit lessons for assigned courses
Upload lesson files and materials
View students enrolled in assigned courses
View progress for assigned course students
Update lesson publishing status
```

Teachers cannot:

```txt
Manage payments
Approve payments
Manage subscriptions
Create users
Manage all students
Access unrelated courses
Access Super Admin area
```

Teacher route group:

```txt
/teacher/*
```

---

## 3.3 Student

Student can access assigned learning content.

Permissions:

```txt
Register account
Login
View enrolled courses
Open lessons
Complete lessons
Track progress
View subscription status
Select membership plan
Upload payment proof
View payment history
View profile
```

Students cannot:

```txt
View other students
Create courses
Manage lessons
Approve payments
Access Teacher or Super Admin routes
```

Student route group:

```txt
/student/*
```

---

# 4. Final Route Architecture

All Super Admin pages must stay under `/super-admin/*`.

## Public Routes

```txt
/
/courses
/classes
/about-us
/blog
/contact-us
/login
/register
/forgot-password
/reset-password
```

## Super Admin Routes

```txt
/super-admin/dashboard

/super-admin/teachers
/super-admin/teachers/create
/super-admin/teachers/[id]

/super-admin/students
/super-admin/students/create
/super-admin/students/[id]

/super-admin/courses
/super-admin/courses/create
/super-admin/courses/[id]
/super-admin/courses/[id]/edit
/super-admin/courses/[id]/lessons

/super-admin/enrollments
/super-admin/memberships
/super-admin/payments
/super-admin/payments/[id]
/super-admin/subscriptions
/super-admin/reports
/super-admin/settings
/super-admin/profile
```

## Teacher Routes

```txt
/teacher/dashboard
/teacher/courses
/teacher/courses/[id]
/teacher/courses/[id]/lessons
/teacher/courses/[id]/lessons/create
/teacher/courses/[id]/lessons/[lessonId]/edit
/teacher/students
/teacher/progress
/teacher/profile
```

## Student Routes

```txt
/student/dashboard
/student/courses
/student/courses/[id]
/student/courses/[id]/lessons/[lessonId]
/student/progress
/student/payments
/student/subscription
/student/profile
```

Do not create these top-level protected routes:

```txt
/teachers
/students
/payments
/reports
/settings
```

---

# 5. Authentication and Password Reset

## Authentication Stack

Use:

```txt
Next.js App Router
Auth.js v5
Credentials Provider
Prisma
PostgreSQL
bcrypt
JWT session strategy
HTTP-only secure cookies
```

Do not use a separate custom JWT authentication system outside Auth.js.

## Registration

Only students can register publicly.

Registration fields:

```txt
Full Name
Email
Phone Number
Password
Confirm Password
```

Default role:

```txt
STUDENT
```

Teachers are created by Super Admin.

Super Admin is created through seed data only.

## Password Reset

Password reset is included in the MVP as a real functional feature.

Use:

```txt
Resend for transactional email
Secure reset tokens
30-minute token expiry
One-time token usage
```

Flow:

```txt
1. User opens Forgot Password page.
2. User enters email address.
3. System creates secure reset token.
4. Token is saved in hashed format.
5. Reset email is sent through Resend.
6. User opens reset link.
7. User sets a new password.
8. Token is invalidated after successful reset.
```

Required routes:

```txt
/forgot-password
/reset-password?token=...
```

---

# 6. Backend Architecture

Use this fixed implementation pattern:

```txt
Next.js App Router
TypeScript
Prisma ORM
PostgreSQL
Auth.js v5
Zod validation
Route Handlers for writes and business operations
React Server Components for data reads
```

## Data Reads

Use React Server Components for:

```txt
Dashboards
Tables
Course pages
Student progress pages
Reports
Membership plan pages
```

## Data Writes

Use Route Handlers for:

```txt
Create
Update
Delete
Approve
Reject
Upload
Enrollment
Lesson completion
Subscription activation
```

Examples:

```txt
POST /api/courses
PATCH /api/courses/[id]
DELETE /api/courses/[id]

POST /api/payments
POST /api/payments/[id]/approve
POST /api/payments/[id]/reject
```

Do not use Server Actions for critical business operations in the MVP.

Every Route Handler must:

```txt
1. Validate data using Zod.
2. Check authenticated session.
3. Check role and ownership permission.
4. Use Prisma transaction where required.
5. Return structured success or error response.
```

---

# 7. Payment and Subscription System

## Payment Model

The MVP uses manual payment proof upload.

Supported payment methods:

```txt
JazzCash
Easypaisa
Bank Transfer
Card Payment
Other
```

Students select a membership plan and upload payment proof.

Super Admin manually approves or rejects the payment.

## Payment Proof Upload

Payment proof must support:

```txt
JPEG
PNG
WEBP
PDF
```

Maximum file size:

```txt
10 MB
```

Store:

```txt
proofUrl
proofFileName
proofMimeType
proofFileSize
```

Display behavior:

```txt
Image proof: show image preview.
PDF proof: show PDF file card with preview/download action.
```

## Payment Flow

```txt
1. Student opens Subscription page.
2. Student selects an active membership plan.
3. Student sees payment instructions.
4. Student enters transaction reference if available.
5. Student uploads proof file.
6. Payment status becomes PENDING.
7. Super Admin reviews payment.
8. Super Admin approves or rejects it.
9. If approved, subscription becomes ACTIVE.
10. If rejected, student can upload new proof.
```

## Historical Payment Snapshot

Payment records must retain plan details at the time payment was submitted.

Store these fields in Payment:

```txt
planNameSnapshot
planDurationSnapshot
planPriceSnapshot
currency
amount
```

Use:

```txt
PKR
```

as the MVP currency.

Do not rely on current MembershipPlan values for historical payment records.

---

# 8. Subscription Logic

Subscription fields:

```txt
Student ID
Plan ID
Status
Start Date
End Date
Created Date
```

Statuses:

```txt
PENDING
ACTIVE
EXPIRED
CANCELLED
```

When Super Admin approves payment:

```txt
1. Mark payment as APPROVED.
2. Store approval date.
3. Create subscription.
4. Set start date to approval date.
5. Set end date based on selected plan duration.
6. Mark subscription as ACTIVE.
```

Course access condition:

```txt
Student must have ACTIVE subscription
AND active enrollment
AND published course
```

If subscription expires:

```txt
Show subscription expired notice
Restrict lesson access
Redirect student to /student/subscription
```

---

# 9. Course and Enrollment Scope

## Course Fields

```txt
Title
Slug
Description
Category
Level
Thumbnail
Duration
Assigned Teacher
Status
Created Date
```

Course statuses:

```txt
DRAFT
PUBLISHED
ARCHIVED
```

Do not include course price in the MVP.

## Enrollment

Super Admin controls enrollment.

Enrollment fields:

```txt
Student
Course
Status
Created Date
```

Enrollment statuses:

```txt
ACTIVE
COMPLETED
CANCELLED
EXPIRED
```

Teachers can view students enrolled in their assigned courses.

Students can only see their own enrollments.

---

# 10. Reporting Definitions

All reports must use these definitions.

## Revenue

```txt
Revenue = sum of APPROVED payment amounts.
```

Revenue date:

```txt
Payment.approvedAt
```

Available date filters:

```txt
Last 7 Days
Last 30 Days
Last 90 Days
This Month
Previous Month
This Year
All Time
```

## New Students

```txt
New Students = STUDENT accounts created during selected period.
```

Use:

```txt
User.createdAt
```

## Active Learners

```txt
Active Learner = student who opened or completed at least one lesson during selected period.
```

Track:

```txt
LessonProgress.startedAt
LessonProgress.lastAccessedAt
LessonProgress.completedAt
```

## Course Enrollments

```txt
Course Enrollments = Enrollment records created during selected period.
```

## Course Completion Rate

```txt
Completion Rate =
Students with 100% lesson completion
/
Total active enrolled students
× 100
```

## Average Course Progress

```txt
Average Course Progress =
Total progress percentages of active enrolled students
/
Total active enrolled students
```

## Pending Payments

```txt
All payment records with PENDING status.
```

## Active Subscriptions

```txt
Subscriptions with ACTIVE status and endDate greater than or equal to current date.
```

## Expired Subscriptions

```txt
Subscriptions with EXPIRED status or endDate earlier than current date.
```

---

# 11. Public Classes Page

Route:

```txt
/classes
```

The Classes page is informational only in MVP.

Include:

```txt
Class categories
How online learning works
Flexible schedule explanation
Instructor highlights
Student benefits
CTA to register or browse courses
```

Do not include:

```txt
Live class booking
Calendar scheduling
Meeting links
Attendance
Real-time classroom functionality
```

Live class functionality is a future module.

---

# 12. Final MVP Scope

Build in MVP:

```txt
Landing page
Courses page
Informational Classes page
Login
Student registration
Functional password reset
Super Admin dashboard
Teacher dashboard
Student dashboard
Teacher management
Student management
Course management
Lesson management
Enrollment management
Membership plans
Manual payment proof upload
Payment approval/rejection
Subscription activation
Student course access controls
Lesson completion
Student progress tracking
Teacher progress view
Super Admin reports
Profile management
Platform settings
```

Do not build in MVP:

```txt
Per-course checkout
Individual course purchases
Live class scheduling
Zoom or Google Meet integration
Attendance tracking
Assignments
Quizzes
Certificates
Automatic payment gateway integration
Multi-school system
Parent role
Admin role
Mobile app
AI tutor
```

---

# 13. Final Implementation Rule

The Toodle LMS MVP is a subscription-based learning platform.

The core access rule is:

```txt
Active Subscription
+ Active Enrollment
+ Published Course
= Student Can Access Course
```

Super Admin controls course enrollment and subscription approval.

Teacher controls lessons only for assigned courses.

Student learns only through courses assigned to their account.
