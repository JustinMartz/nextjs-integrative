import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function NoteStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-400 text-red-50': status === 'no',
          'bg-gray-100 text-gray-500': status === 'yes',
        },
      )}
    >
      {status === 'no' ? (
        <>
          Incomplete
          <ExclamationCircleIcon className="ml-1 w-4 text-red-50" />
        </>
      ) : null}
      {status === 'yes' ? (
        <>
          Completed
          <CheckCircleIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
    </span>
  );
}
