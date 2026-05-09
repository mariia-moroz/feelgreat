"use server";

import {
  BUCKET_ID,
  users,
  storage,
  tablesDB,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { AppwriteException, ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  const { email, phone, name } = user;
  try {
    const newUser = await users.create({ userId: ID.unique(), email, phone, name });
    return parseStringify(newUser);
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 409) {
      const documents = await users.list({
        queries: [Query.equal("email", [user.email])],
      });

      return parseStringify(documents?.users[0]);
    }

    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string,
      );

      file = await storage.createFile({
        bucketId: BUCKET_ID!,
        fileId: ID.unique(),
        file: inputFile,
      });
    }

    const newPatient = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      },
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
