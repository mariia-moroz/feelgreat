# FeelGreat

FeelGreat is a patient registration and appointment scheduling platform built for healthcare workflows.
Patients can create an account, complete their profile, upload identification for verification, and request
appointments with a selected doctor. An admin dashboard provides visibility into all appointments and supports
scheduling or cancelling requests after access verification, with SMS confirmations planned as part of the
booking flow.

Live app: https://ufeelgreat.vercel.app/

## Project Overview

FeelGreat is designed to streamline the appointment request process from both sides:

- Patients can register and provide the information needed before an appointment.
- Patients can request an appointment with a selected doctor, preferred time, and reason for visit.
- Admins can review incoming requests and manage appointment statuses from one place.

## Features

### Patient flow

- Create a patient account with personal details
- Complete registration with:
  - Phone number
  - Email
  - Date of birth
  - Address
  - Occupation
  - Emergency contact details
- Submit medical information, including:
  - Primary physician
  - Insurance provider and policy number
  - Allergies
  - Current medication
  - Family medical history
  - Past medical history
- Upload an identification document for verification
- Accept treatment, disclosure, and privacy consent
- Request a new appointment with:
  - Selected doctor
  - Preferred date and time
  - Reason for appointment
  - Additional notes
- Twilio SMS confirmation after successful appointment creation
- View a success screen after submitting an appointment request

### Admin flow

- Access the admin area through a 6-digit OTP-style passkey verification screen
- View appointment statistics for:
  - Scheduled appointments
  - Pending appointments
  - Cancelled appointments
- Browse all appointment records in a data table
- Update appointments by scheduling or cancelling them

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Appwrite
- Node Appwrite SDK
- Twilio (SMS confirmations)
- React Hook Form
- Zod
- TanStack Table
- React Day Picker
- React Dropzone
- Input OTP
- Sonner
- Lucide React

## Architecture Notes

- Uses the App Router structure in Next.js
- Uses server actions for patient and appointment operations
- Stores patient, doctor, and appointment data in Appwrite Tables DB
- Uploads identification documents to Appwrite Storage
- Uses Appwrite Users for patient account creation
- Includes Appwrite-backed backend services and Twilio SMS confirmation flow

## Environment Variables

Create a `.env.local` file in the project root and configure:

```env
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
DOCTOR_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=
NEXT_PUBLIC_ENDPOINT=
NEXT_PUBLIC_ADMIN_PASSKEY=
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Add the required Appwrite values to `.env.local`.

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

The project is deployed on Vercel:

https://ufeelgreat.vercel.app/

## Folder Highlights

- `app/` - routes and pages
- `components/` - reusable UI and form components
- `components/forms/` - patient registration and appointment forms
- `components/table/` - admin dashboard table
- `lib/actions/` - server actions for patient and appointment operations
- `lib/appwrite.config.ts` - Appwrite client configuration
- `constants/` - shared app constants such as doctors and default form values
- `types/` - shared TypeScript types

## Current Behavior Notes

- Appointment creation and admin status updates are implemented through Appwrite-backed server actions.
- Admin protection currently uses a client-side 6-digit passkey check exposed through
  `NEXT_PUBLIC_ADMIN_PASSKEY`.

## Why FeelGreat

FeelGreat focuses on giving patients a smoother intake experience while giving administrators a clear view of
appointment demand and scheduling activity. It combines a polished frontend with Appwrite-powered backend
services to support a practical healthcare booking workflow.
