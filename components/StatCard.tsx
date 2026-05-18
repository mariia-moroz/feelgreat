import StatusIcon from "./StatusIcon";

interface StatCardProps {
  type: Status;
  count: number;
  label: string;
}

const StatCard = ({ type, count = 0, label }: StatCardProps) => {
  return (
    <div className='stat-card'>
      <div className='flex items-center gap-4'>
        <StatusIcon type={type} />
        <h2 className='text-32-bold text-white'>{count}</h2>
      </div>

      <p className='text-16-semibold'>{label}</p>
    </div>
  );
};

export default StatCard;
