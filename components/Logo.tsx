import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href='/' className='cursor-pointer'>
      <Image
        alt='logo'
        src='/assets/icons/logo-full.svg'
        height={1000}
        width={1000}
        loading='eager'
        className={cn("mb-10 h-10 w-fit mr-auto", className)}
      />
    </Link>
  );
};

export default Logo;
