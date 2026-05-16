"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { Doctors, AppointmentType, AppointmentStatus } from "@/constants";
import { useState } from "react";
import * as z from "zod";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "../CustomFormField";
import { getAppointmentSchema } from "@/lib/validation";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";

type AppointmentFormProps = {
  type: AppointmentType;
  userId: string;
  patientId: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
};

const AppointmentForm = ({ type, userId, patientId, appointment, setOpen }: AppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);
  type AppointmentFormValues = z.input<typeof AppointmentFormValidation>;
  type AppointmentFormData = z.infer<typeof AppointmentFormValidation>;

  const form = useForm<AppointmentFormValues, unknown, AppointmentFormData>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      schedule: appointment ? new Date(appointment.schedule) : undefined,
      cancellationReason: appointment?.cancellationReason ?? "",
    },
  });

  const onSubmit = async (values: AppointmentFormData) => {
    setIsLoading(true);

    const { primaryPhysician, reason, note, schedule } = values;

    let status;
    switch (type) {
      case AppointmentType.CREATE:
        status = AppointmentStatus.SCHEDULLED;
        break;
      case AppointmentType.CANCEL:
        status = AppointmentStatus.CANCELLED;
        break;
      default:
        status = AppointmentStatus.PENDING;
    }

    try {
      if (type === AppointmentType.CREATE && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician,
          schedule,
          reason: reason!,
          note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        }

        setIsLoading(false);
      } else {
        const appointmentId = appointment?.$id;

        if (!appointmentId) {
          throw new Error("Appointment ID is required to update an appointment");
        }

        const appointmentToUpdate = {
          userId,
          appointmentId,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  let buttonLabel;

  switch (type) {
    case AppointmentType.CANCEL:
      buttonLabel = "Cancel appointment";
      break;
    case AppointmentType.SCHEDULE:
      buttonLabel = "Schedule appointment";
      break;
    default:
      buttonLabel = "Submit apppointment";
  }

  return (
    <form
      id='patient-form'
      onSubmit={form.handleSubmit(onSubmit)}
      className={`space-y-9 flex-1`}
    >
      {type === AppointmentType.CREATE && (
        <section className='mb-12 space-y-4'>
          <h1 className='header'>New appointment 🗓️</h1>
          <p className='text-dark-700 text-18-medium'>Request a new appointment in 10 seconds!</p>
        </section>
      )}

      {type !== AppointmentType.CANCEL && (
        <div className={`${type === AppointmentType.CREATE ? "space-y-9" : "space-y-4"}  flex-1`}>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.SELECT}
            id='appointment-form-primary-physician'
            name='primaryPhysician'
            label='Doctor'
            placeholder='Select a doctor'
          >
            {Doctors.map(doctor => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={32}
                    height={32}
                    className='rounded-full border border-muted-foreground'
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className={`flex flex-col gap-4 ${type === AppointmentType.CREATE && "xl:flex-row"}`}>
            <CustomFormField
              control={form.control}
              formFieldType={FormFieldType.TEXTAREA}
              id='appointment-form-reason'
              name='reason'
              label='Reason for appointment'
              placeholder='ex: Annual montly check-up'
            />

            <CustomFormField
              control={form.control}
              formFieldType={FormFieldType.TEXTAREA}
              id='appointment-form-notes'
              name='note'
              label='Additional comments/notes'
              placeholder='ex: Prefer afternoon appointments, if possible'
            />
          </div>

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.DATE_PICKER}
            id='appointment-form-schedule'
            name='schedule'
            label='Expected appointment date'
            placeholder='Select appointment date and time'
            showTimeSelect
          />
        </div>
      )}

      {type === AppointmentType.CANCEL && (
        <div className={`space-y-4 flex-1`}>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.DATE_PICKER}
            id='appointment-form-schedule'
            name='schedule'
            label='Expected appointment date'
            placeholder='Select appointment date and time'
            showTimeSelect
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.SELECT}
            id='appointment-form-primary-physician'
            name='primaryPhysician'
            label='Doctor'
            placeholder='Select a doctor'
          >
            {Doctors.map(doctor => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className='flex cursor-pointer items-center gap-2'>
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={32}
                    height={32}
                    className='rounded-full border border-muted-foreground'
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
            id='appointment-form-cancellation-reason'
            name='cancellationReason'
            label='Reason for cancellation'
            placeholder='Enter reason for cancellation'
          />
        </div>
      )}

      <SubmitButton
        isLoading={isLoading}
        className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
      >
        {buttonLabel}
      </SubmitButton>
    </form>
  );
};

export default AppointmentForm;
