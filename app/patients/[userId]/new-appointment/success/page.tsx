import Link from "next/link";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { CalendarIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const SuccessPage = async ({ params, searchParams }: SearchParamProps) => {
  const { userId } = await params;

  const appointmentId = (await searchParams).appointmentId as string;
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(doctor => doctor.name === appointment.primaryPhysician);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Logo />

        <section className='flex flex-col items-center'>
          <Image
            alt='success'
            src='/assets/icons/check-circle.svg'
            height={100}
            width={100}
            loading='eager'
            className='drop-shadow-[0_10px_35px_rgba(145,94,255,0.45)] mb-6'
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>
            Your <span className='text-primary'>appointment request</span> has been successfully submitted!
          </h2>
          <p className='text-18-medium'>We will be in touch shortly to confirm.</p>
        </section>

        <section className='request-details'>
          <p className='text-18-medium ml-8'>Requested appointment details:</p>
          <div className='doctor-label'>
            <Image
              alt='success'
              src={doctor?.image ?? ""}
              height={100}
              width={100}
              loading='eager'
              className='size-6'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>

          <div className='flex gap-2 items-center mr-8'>
            <CalendarIcon className='shad-input-icon' />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button type='button' className='shad-primary-btn' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>New appointment</Link>
        </Button>

        <p className='justify-items-end text-dark-600 xl:text-left copyright py-12'>© 2026 FeelGreat</p>
      </div>
    </div>
  );
};

export default SuccessPage;
