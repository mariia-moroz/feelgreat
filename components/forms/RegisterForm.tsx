"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserIcon, MailIcon, MapPinIcon, CircleUserRoundIcon } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

import { PatientFormValidation } from "@/lib/validation";

import { registerPatient } from "@/lib/actions/patient.actions";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "../CustomFormField";
import { useRouter } from "next/navigation";
import { GenderOptions, PatientFormDefaultValues, Doctors, IdentificationTypes } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

type PatientFormValues = z.input<typeof PatientFormValidation>;
type PatientFormData = z.output<typeof PatientFormValidation>;

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PatientFormValues, unknown, PatientFormData>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    },
  });

  const onSubmit = async (values: PatientFormData) => {
    setIsLoading(true);

    const { birthDate, identificationDocument } = values;

    let formData;

    if (identificationDocument && identificationDocument.length > 0) {
      const blobFile = new Blob([identificationDocument[0]], {
        type: identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(birthDate),
        identificationDocument: formData,
      };

      const patient = await registerPatient(patientData);

      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <form id='register-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-9 flex-1'>
      <section className='mb-12 space-y-4'>
        <h1 className='header'>Welcome 👋</h1>
        <p className='text-dark-700 text-18-medium'>Let us know more about yourself!</p>
      </section>

      {/* Personal Information */}

      <section className='mb-12 space-y-4'>
        <div className='mb-9 space-y-1'>
          <h2 className='sub-header'>Personal Information</h2>
        </div>

        {/* name */}

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.INPUT}
          id='register-form-name'
          name='name'
          type='text'
          label='Full name'
          placeholder='Gregory House'
          FieldIcon={UserIcon}
        />

        {/* phone and email */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.INPUT}
            id='register-form-email'
            name='email'
            type='email'
            label='Email address'
            placeholder='email@gmail.com'
            FieldIcon={MailIcon}
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.PHONE_INPUT}
            id='register-form-phone'
            name='phone'
            type='phone'
            label='Phone number'
            phoneDefaultCountry='GB'
            placeholder='+00 0342 0453 34'
          />
        </div>

        {/* birth date and gender */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.DATE_PICKER}
            id='register-form-birth-date'
            name='birthDate'
            type='text'
            label='Date of birth'
            placeholder='Select your birth date'
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.RADIO_GROUP_INPUT}
            id='register-form-gender'
            name='gender'
            type='text'
            label='Gender'
            radioGroupOptions={GenderOptions}
          />
        </div>

        {/* address and ocupation */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.INPUT}
            id='register-form-address'
            name='address'
            type='text'
            label='Address'
            placeholder='221B Baker Street, London'
            FieldIcon={MapPinIcon}
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.INPUT}
            id='register-form-occupation'
            name='occupation'
            type='text'
            label='Occupation'
            placeholder='Software Engineer'
          />
        </div>

        {/* emergency details */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.INPUT}
            id='register-form-emergency-name'
            name='emergencyContactName'
            type='text'
            label='Emergency contact name'
            placeholder="Guardian's name"
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.PHONE_INPUT}
            id='register-form-emergency-phone'
            name='emergencyContactNumber'
            type='phone'
            label='Emergency phone number'
            placeholder='+00 0342 0453 34'
          />
        </div>
      </section>

      {/* Medical Information */}

      <section className='mb-12 space-y-4'>
        <div className='mb-9 space-y-1'>
          <h2 className='sub-header'>Medical Information</h2>
        </div>

        {/* primary physician */}

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.SELECT}
          id='register-form-primary-physician'
          name='primaryPhysician'
          label='Primary care physician'
          placeholder='Select a physician'
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
          <SelectItem key='Other' value='Other'>
            <div className='flex cursor-pointer items-center gap-2'>
              <CircleUserRoundIcon className='size-8' />
              <p>Other</p>
            </div>
          </SelectItem>
        </CustomFormField>

        {/* insurance details */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.INPUT}
            id='register-form-insurance-provider'
            name='insuranceProvider'
            type='text'
            label='Insurance provider'
            placeholder='ex: Bupa'
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.INPUT}
            id='register-form-insurance-number'
            name='insurancePolicyNumber'
            type='text'
            label='Insurance policy number'
            placeholder='ex: 0862912995'
          />
        </div>

        {/* insurance details */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
            id='register-form-allergies'
            name='allergies'
            label='Allergies (if any)'
            placeholder='ex: Peanuts, Penicillin, Pollen'
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
            id='register-form-current-medication'
            name='currentMedication'
            label='Current medication (if any)'
            placeholder='ex: Ibuprofen 200mg, Levothyroxine 50mcg'
          />
        </div>

        {/* family history */}

        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
            id='register-form-family-medical-history'
            name='familyMedicalHistory'
            label='Family medical history (if relevant)'
            placeholder='ex: Mother had breast cancer'
          />

          <CustomFormField
            control={form.control}
            formFieldType={FormFieldType.TEXTAREA}
            id='register-form-past-medical-history'
            name='pastMedicalHistory'
            label='Past medical history'
            placeholder='ex: Asthma diagnosis in childhood'
          />
        </div>
      </section>

      {/* Identification and Verification */}

      <section className='mb-12 space-y-4'>
        <div className='mb-9 space-y-1'>
          <h2 className='sub-header'>Identification and Verification</h2>
        </div>

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.SELECT}
          id='register-form-primary-identification-type'
          name='identificationType'
          label='Identification type'
          placeholder='Select an identification type'
        >
          {IdentificationTypes.map(type => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.INPUT}
          id='register-form-insurance-identification-number'
          name='identificationNumber'
          type='text'
          label='Identification number'
          placeholder='ex: 123456789'
        />

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.SKELETON}
          id='register-form-past-identification-document'
          name='identificationDocument'
          label='Scanned copy of identification document'
          renderSkeleton={field => <FileUploader field={field} files={field.value as File[] | undefined} />}
        />
      </section>

      {/* Consent and Privacy */}

      <section className='mb-12 space-y-4'>
        <div className='mb-9 space-y-1'>
          <h2 className='sub-header'>Consent and Privacy</h2>
        </div>

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.CHECKBOX}
          id='register-form-insurance-treatment-consent'
          name='treatmentConsent'
          label='I consent to receive treatment for my health condition'
        />

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.CHECKBOX}
          id='register-form-insurance-disclosure-consent'
          name='disclosureConsent'
          label='I consent to the use and disclosure of my health information for treatment purposes'
        />

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.CHECKBOX}
          id='register-form-insurance-privacy-consent'
          name='privacyConsent'
          label='I acknowledge that I have reviewed and agree to the privacy policy'
        />
      </section>

      <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
    </form>
  );
};

export default RegisterForm;
