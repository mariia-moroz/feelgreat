"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import * as z from "zod";

import { UserFormValidation } from "@/lib/validation";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "../CustomFormField";
import { useRouter } from "next/navigation";

const PaientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form id='patient-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-9 flex-1'>
      <section className='mb-12 space-y-4'>
        <h1 className='header'>Hi there 👋</h1>
        <p className='text-dark-700'>Get started with appointments!</p>
      </section>

      <div className='space-y-6 flex-1'>
        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.INPUT}
          id='patient-form-name'
          name='name'
          type='text'
          label='Full name'
          placeholder='Gregory House'
          FieldIcon={UserIcon}
        />

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.INPUT}
          id='patient-form-email'
          name='email'
          type='email'
          label='Email'
          placeholder='email@gmail.com'
          FieldIcon={MailIcon}
        />

        <CustomFormField
          control={form.control}
          formFieldType={FormFieldType.PHONE_INPUT}
          id='patient-form-phone'
          name='phone'
          type='phone'
          label='Phone number'
          placeholder='+00 0342 0453 34'
        />
      </div>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  );
};

export default PaientForm;
