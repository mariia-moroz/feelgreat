import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar page-container'>
        <div className='sub-container max-w-[890px] flex-1 flex-col py-10'>
          <Image
            alt='logo'
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            loading='eager'
            className='mb-12 h-10 w-fit'
          />

          <RegisterForm user={user} />

          <p className='justify-items-end text-dark-600 xl:text-left copyright py-12'>© 2026 FeelGreat</p>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        alt='register'
        height={3294}
        width={1170}
        loading='eager'
        className='side-img h-auto max-w-[390px]'
      />
    </div>
  );
};

export default Register;
