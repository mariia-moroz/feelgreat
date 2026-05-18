import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { AppointmentType } from "@/constants";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const patient = await getPatient(userId);
  
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar page-container'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            alt='logo'
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            loading='eager'
            className='mb-12 h-10 w-fit'
          />

          <AppointmentForm type={AppointmentType.CREATE} userId={userId} patientId={patient.$id} />

          <p className='justify-items-end text-dark-600 xl:text-left copyright py-12'>© 2026 FeelGreat</p>
        </div>
      </section>

      <Image
        src='/assets/images/appointment-img.png'
        alt='appointment'
        height={1000}
        width={1000}
        loading='eager'
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
};

export default NewAppointment;
