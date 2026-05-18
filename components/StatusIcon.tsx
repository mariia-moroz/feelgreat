import { AppointmentStatus } from "@/constants";
import { cn } from "@/lib/utils";
import { HourglassIcon, TriangleAlertIcon, CalendarCheck2Icon } from "lucide-react";

const StatusIcon = ({ type, className = "" }: { type: Status; className?: string }) => {
  switch (type) {
    case AppointmentStatus.SCHEDULLED:
      return <HourglassIcon className={cn("size-8 w-fit stroke-green-500", className)} />;

    case AppointmentStatus.PENDING:
      return <CalendarCheck2Icon className={cn("size-8 w-fit stroke-blue-500", className)} />;

    case AppointmentStatus.CANCELLED:
      return <TriangleAlertIcon className={cn("size-8 w-fit stroke-red-500", className)} />;

    default:
      return null;
  }
};

export default StatusIcon;
