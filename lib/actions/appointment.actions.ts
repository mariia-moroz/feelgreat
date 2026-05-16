"use server";

import { tablesDB, DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "../appwrite.config";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { AppointmentStatus } from "@/constants";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

const appointmentWithPatientSelection = Query.select(["*", "patient.*"]);

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        ...appointment,
      },
    });

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointments = await tablesDB.listRows<Appointment>({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      queries: [Query.equal("$id", [appointmentId]), appointmentWithPatientSelection],
    });

    return parseStringify(appointments.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentsList = async () => {
  try {
    const appointments = await tablesDB.listRows<Appointment>({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      queries: [Query.orderDesc("$createdAt"), appointmentWithPatientSelection],
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.rows.reduce((acc, appointment) => {
      if (appointment.status === AppointmentStatus.SCHEDULLED) {
        acc.scheduledCount += 1;
      } else if (appointment.status === AppointmentStatus.PENDING) {
        acc.pendingCount += 1;
      } else if (appointment.status === AppointmentStatus.CANCELLED) {
        acc.cancelledCount += 1;
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      rows: appointments.rows,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await tablesDB.updateRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      rowId: appointmentId,
      data: {
        ...appointment,
      },
    });

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    // SMS notification

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};
