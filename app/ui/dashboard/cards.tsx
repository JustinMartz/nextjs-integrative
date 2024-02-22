import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    ExclamationTriangleIcon,
  } from '@heroicons/react/24/outline';
  import { dmSerifDisplay } from '@/app/ui/fonts';
  import { fetchCardData } from '@/app/lib/data';
  
  const iconMap = {
    collected: BanknotesIcon,
    pending: ExclamationTriangleIcon,
    hours: ClockIcon,
    clients: UserGroupIcon,
  };
  
  export default async function CardWrapper() {
    const {
      ytdEarnings,
      totalPendingInvoices,
      sessionHours,
      numberOfClients
    } = await fetchCardData();
  
    return (
      <>
  
        <Card title="YTD Earnings" value={ytdEarnings} type="collected" />
        <Card title="Pending Invoices" value={totalPendingInvoices} type="pending" />
        <Card title="Weekly Hours" value={sessionHours} type="hours" />
        <Card
          title="Total Clients"
          value={numberOfClients}
          type="clients"
        /> 
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'collected' | 'pending' | 'hours' | 'clients';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${dmSerifDisplay.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  