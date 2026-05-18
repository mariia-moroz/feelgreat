import DataTable from "@/components/table/DataTable";
import Logo from "@/components/Logo";
import StatCard from "@/components/StatCard";
import { AppointmentStatus } from "@/constants";
import { getRecentAppointmentsList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/table/columns";

const Admin = async () => {
  const appointments = await getRecentAppointmentsList();

  const { scheduledCount, pendingCount, cancelledCount, totalCount, rows } = appointments;

  return (
    <div className='admin-page'>
      <header className='admin-header'>
        <Logo className='mb-0 h-8' />
        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Start day with managing new appointments!</p>
        </section>

        <section className='admin-stat'>
          <StatCard
            type={AppointmentStatus.SCHEDULLED}
            count={scheduledCount}
            label='Scheduled appointments'
          />

          <StatCard type={AppointmentStatus.PENDING} count={pendingCount} label='Pending appointments' />

          <StatCard
            type={AppointmentStatus.CANCELLED}
            count={cancelledCount}
            label='Cancelled appointments'
          />
        </section>

        <DataTable data={rows} columns={columns} />
      </main>
    </div>
  );
};

export default Admin;
