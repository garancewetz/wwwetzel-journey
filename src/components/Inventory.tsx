import { ReactNode } from 'react';
import { interests } from '@/datas/items';

interface InventoryProps {
  found: string[];
  onUse: (id: string) => void;
  // 'first' : on vient de ramasser un objet ; 'facing' : un ennemi barre la route
  hint: 'first' | 'facing' | null;
  // les orbes d'XP et de mana, de chaque côté
  left: ReactNode;
  right: ReactNode;
}

const HINTS = {
  first: { keys: '1 à 8 pour utiliser un objet', touch: 'Touche un objet pour l’utiliser' },
  facing: { keys: 'Quel objet du sac ? 1 à 8', touch: 'Quel objet du sac ? Touche-le' },
};

// Le sac : touches 1 à 8 au clavier, ou on touche l'objet
export default function Inventory({ found, onUse, hint, left, right }: InventoryProps) {
  const isEmpty = found.length === 0;

  return (
    <div
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 transition-opacity duration-700 ${isEmpty ? 'opacity-0' : 'opacity-100'}`}
    >
      <p aria-live="polite" className={`mb-2 text-center text-sm text-white/60 transition-opacity duration-500 ${hint ? 'opacity-100' : 'opacity-0'}`}>
        <span className="pointer-coarse:hidden">{hint ? HINTS[hint].keys : '\u00a0'}</span>
        <span className="hidden pointer-coarse:inline">{hint ? HINTS[hint].touch : '\u00a0'}</span>
      </p>
      <div className="flex items-end gap-2 sm:gap-4">
      {left}
      <ul className="mb-5 flex gap-0.5 sm:gap-2 lg:mb-7">
        {interests.map((interest, index) => (
          <li key={interest.id} className="size-7 sm:size-10 lg:size-12">
            {found.includes(interest.id!) ? (
              <button
                type="button"
                onClick={() => onUse(interest.id!)}
                title={interest.name}
                aria-label={`Utiliser : ${interest.name}`}
                className="relative flex size-full items-center justify-center rounded transition-transform active:scale-90"
              >
                <img src={interest.image} alt="" draggable={false} className="size-6 sm:size-8 lg:size-10 [image-rendering:pixelated]" />
                <span className="absolute -top-1.5 -left-1 text-xs text-white/60 pointer-coarse:hidden">{index + 1}</span>
              </button>
            ) : (
              <span className="block size-full rounded border border-white/10" />
            )}
          </li>
        ))}
      </ul>
      {right}
      </div>
    </div>
  );
}
