import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Logo from "@/components/Logo";

const Home = async ({ searchParams }: SearchParamProps) => {
  const admin = (await searchParams).admin as string;
  const isAdmin = admin === "true";

  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PasskeyModal />}

      <section className='remove-scrollbar page-container'>
        <div className='sub-container max-w-[496px]'>
          <Logo />

          <PatientForm />

          <div className='text-14-regular mt-20 flex justify-between py-12'>
            <p className='justify-items-end text-dark-600 xl:text-left'>© 2026 FeelGreat</p>
            <Link href='/?admin=true' className='text-accent text-14-medium'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/home-img.png'
        alt='patient'
        height={1000}
        width={1000}
        loading='lazy'
        className='side-img max-w-[50%]'
      />
    </div>
  );
};

export default Home;
