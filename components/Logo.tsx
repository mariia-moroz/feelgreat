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
        height={38}
        width={164}
        loading='eager'
        className={cn("mb-10 mr-auto h-10 w-auto", className)}
      />
    </Link>
  );
};

export default Logo;
