import { AppointmentStatus } from "@/constants";
import StatusIcon from "./StatusIcon";
import clsx from "clsx";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === AppointmentStatus.SCHEDULLED,
        "bg-blue-600": status === AppointmentStatus.PENDING,
        "bg-red-600": status === AppointmentStatus.CANCELLED,
      })}
    >
      <StatusIcon type={status} className='size-3' />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === AppointmentStatus.SCHEDULLED,
          "text-blue-500": status === AppointmentStatus.PENDING,
          "text-red-500": status === AppointmentStatus.CANCELLED,
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
