"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey = typeof window === "undefined" ? null : window.localStorage.getItem("accessKey");
  const hasAccess = encryptedKey && decryptKey(encryptedKey) === process.env.NEXT_PUBLIC_ADMIN_PASSKEY;

  useEffect(() => {
    if (hasAccess) {
      router.replace("/admin");
    }
  }, [hasAccess, router]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);

      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  if (hasAccess) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader className='shad-alert-dialog-header'>
          <div className='shad-alert-header-row'>
            <AlertDialogTitle className='shad-alert-header'>Admin Access Verification</AlertDialogTitle>
            <X onClick={() => closeModal()} className='shad-alert-close' />
          </div>
          <AlertDialogDescription className='shad-alert-subheader'>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP maxLength={6} value={passkey} onChange={value => setPasskey(value)}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
        </div>

        <AlertDialogAction className='shad-primary-btn w-full' onClick={e => validatePasskey(e)}>
          Verify
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
