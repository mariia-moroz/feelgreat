"use server";

import { tablesDB, DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "../appwrite.config";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

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
    const patients = await tablesDB.listRows({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      queries: [Query.equal("$id", [appointmentId])],
    });

    return parseStringify(patients.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
