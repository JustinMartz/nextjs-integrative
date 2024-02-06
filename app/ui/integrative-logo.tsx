import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { dmSerifDisplay } from '@/app/ui/fonts';

export default function IntegrativeLogo() {
  return (
    <div
      className={`${dmSerifDisplay.className} flex flex-row items-center leading-none text-white`}
    >
      <PuzzlePieceIcon className="h-10 w-10 rotate-[15deg]" />
      <p className="text-[36px] pl-2">Integrative<br />Counseling</p>
    </div>
  );
}
