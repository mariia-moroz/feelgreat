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

## Demo

<img width="1535" height="994" alt="Screenshot 2026-05-18 at 21 37 17" src="https://github.com/user-attachments/assets/7f7aaf25-2b58-4c1c-a602-bc9c274be54e" />
<img width="1535" height="994" alt="Screenshot 2026-05-18 at 21 39 09" src="https://github.com/user-attachments/assets/051a50c5-1db0-4e4b-89c2-aacf989e0afb" />
<img width="1536" height="966" alt="Screenshot 2026-05-18 at 21 44 30" src="https://github.com/user-attachments/assets/ac728c57-73b9-47a4-ba9f-d9009c47f169" />
<img width="1536" height="999" alt="Screenshot 2026-05-18 at 21 43 17" src="https://github.com/user-attachments/assets/6996245f-1f49-4f5f-a6f1-f9676b97976b" />
<img width="1536" height="994" alt="Screenshot 2026-05-18 at 21 45 44" src="https://github.com/user-attachments/assets/cd1a1966-1e35-486f-9264-8318faa3aba8" />
<img width="1536" height="994" alt="Screenshot 2026-05-18 at 21 45 59" src="https://github.com/user-attachments/assets/c629874c-71e2-4452-a8d1-346b419fc93b" />
<img width="1536" height="994" alt="Screenshot 2026-05-18 at 21 47 09" src="https://github.com/user-attachments/assets/2b347b38-f84a-4515-9770-0160e007c70e" />
<img width="1536" height="994" alt="Screenshot 2026-05-18 at 21 54 15" src="https://github.com/user-attachments/assets/4d4a2e2d-6211-4713-a10e-b85692b9fcde" />
<img width="1536" height="994" alt="Screenshot 2026-05-18 at 21 53 06" src="https://github.com/user-attachments/assets/01558d94-ee38-443e-aa08-f82137975001" />
<img width="1536" height="994" alt="Screenshot 2026-05-18 at 21 54 04" src="https://github.com/user-attachments/assets/eb4a260a-ced0-4bc6-8c0c-6097b665b60a" />











