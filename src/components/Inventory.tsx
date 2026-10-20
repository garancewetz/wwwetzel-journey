import { interests } from '@/datas/items';

interface InventoryProps {
  found: string[];
  onUse: (id: string) => void;
}

// Le sac : touches 1 à 8 au clavier, ou on touche l'objet
export default function Inventory({ found, onUse }: InventoryProps) {
  const isEmpty = !interests.some((interest) => found.includes(interest.id!));

  return (
    <ul
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 gap-1.5 sm:gap-2 transition-opacity duration-700 ${isEmpty ? 'opacity-0' : 'opacity-100'}`}
    >
      {interests.map((interest, index) => (
        <li key={interest.id} className="size-9 sm:size-10">
          {found.includes(interest.id!) ? (
            <button
              type="button"
              onClick={() => onUse(interest.id!)}
              title={interest.name}
              aria-label={`Utiliser : ${interest.name}`}
              className="relative flex size-full items-center justify-center rounded transition-transform active:scale-90"
            >
              <img src={interest.image} alt="" draggable={false} className="size-7 sm:size-8" />
              <span className="absolute -top-1 -left-1 text-[10px] text-white/40 pointer-coarse:hidden">{index + 1}</span>
            </button>
          ) : (
            <span className="block size-full rounded border border-white/10" />
          )}
        </li>
      ))}
    </ul>
  );
}
