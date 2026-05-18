"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppointmentType } from "@/constants";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

interface AppointmentModalProps {
  type: AppointmentType.SCHEDULE | AppointmentType.CANCEL;
  patientId: string;
  userId: string;
  appointment?: Appointment;
}

const AppointmentModal = ({ type, patientId, userId, appointment }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            className={`capitalize ${type === AppointmentType.SCHEDULE && "text-accent"}`}
          >
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className='shad-dialog'>
          <DialogHeader className='mb-4 space-y-3'>
            <DialogTitle className='capitalize !text-24-bold'>{type} Appointment</DialogTitle>
            <DialogDescription className='!text-16-regular'>
              Please fill in the following details to {type} appointment
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            type={type}
            userId={userId}
            patientId={patientId}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AppointmentModal;
