"use client";

import Image from "next/image";

import { Path, FieldValues, ControllerRenderProps } from "react-hook-form";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

interface FileUploaderProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  files?: File[];
}

const FileUploader = <T extends FieldValues>({ field, files }: FileUploaderProps<T>) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    field.onChange(acceptedFiles);
  }, [field]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt='uploaded image'
          className='max-h-[400px] overflow-hidden object-cover border border-dark-500 rounded-lg'
        />
      ) : (
        <>
          <Image src='/assets/icons/upload.svg' width={40} height={40} alt='upload' />
          <div className='file-upload_label'>
            <p className='text-14-medium'>
              <span className='text-accent'>Click to upload</span>
               {" or drag and drop"}
            </p>
            <p>SVG, PNG, JPG or Gif (max 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
export default FileUploader;
