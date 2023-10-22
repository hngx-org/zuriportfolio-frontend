import StatusPill from '@modules/super-admin/components/StatusPill';

const StatusPillPage = () => {
  const statusValue = ['Sanctioned', 'Deleted', 'Active', null];
  return (
    <div>
      <p>hi</p>
      {statusValue.map((item) => (
        <StatusPill status={item} key={item} />
      ))}
    </div>
  );
};

export default StatusPillPage;
