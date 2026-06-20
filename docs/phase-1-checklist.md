# Toodle Phase 1 Checklist

Last reviewed: 2026-06-20

This checklist reflects the current codebase against the saved product requirements in [requirements.md](/Users/apple/Documents/toodle/docs/requirements.md).

## Foundation

- [x] Requirements saved in-repo for future review
- [x] Public marketing layout and styling scaffolded
- [x] Public routes created for `/`, `/courses`, `/classes`, `/about-us`, `/blog`, `/contact-us`
- [x] Public auth routes created for `/login`, `/register`, `/forgot-password`, `/reset-password`
- [x] Auth.js v5 credentials authentication wired
- [x] Prisma schema created for users, courses, lessons, enrollments, plans, payments, subscriptions, and lesson progress
- [x] Prisma seed script added for Super Admin bootstrap and starter membership plans
- [x] Password reset flow implemented with hashed tokens and 30-minute expiry
- [x] Role-based route protection added for `/super-admin/*`, `/teacher/*`, and `/student/*`

## Protected Route Scaffold

- [x] `/super-admin/dashboard`
- [x] `/teacher/dashboard`
- [x] `/student/dashboard`
- [x] Placeholder coverage added for remaining nested protected Phase 1 routes to prevent dead-end 404 navigation during implementation

## Feature Slices Still To Build

- [ ] Super Admin teacher management
- [ ] Super Admin student management
- [ ] Super Admin course management
- [ ] Super Admin lesson management
- [ ] Super Admin enrollment management
- [ ] Super Admin membership management
- [ ] Super Admin payment review and approval
- [ ] Super Admin subscription management
- [ ] Super Admin reports
- [ ] Super Admin settings
- [ ] Super Admin profile
- [ ] Teacher course detail workflows
- [ ] Teacher lesson creation and editing
- [ ] Teacher student visibility for assigned courses
- [ ] Teacher progress views
- [ ] Teacher profile
- [ ] Student enrolled course listing
- [ ] Student lesson access checks
- [ ] Student lesson completion
- [ ] Student progress views
- [ ] Student payment history
- [ ] Student subscription plan selection and proof upload
- [ ] Student profile

## Rules To Preserve

- [x] Public registration remains student-only
- [x] Super Admin stays seed-created
- [x] Course access rule remains `ACTIVE subscription + ACTIVE enrollment + PUBLISHED course`
- [x] No individual course purchase flow is introduced
- [x] No forbidden top-level protected routes such as `/teachers`, `/students`, `/payments`, `/reports`, or `/settings`

## Immediate Next Build Order

- [ ] Replace placeholder student subscription route with real membership plan read and payment proof submission flow
- [ ] Replace placeholder Super Admin payments route with review, approve, and reject operations
- [ ] Replace placeholder Super Admin courses route with CRUD and teacher assignment
- [ ] Replace placeholder teacher courses route with assigned-course reads and lesson management
- [ ] Add student lesson access enforcement based on subscription, enrollment, and course publication state
