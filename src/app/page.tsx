'use client'

import Board from "@/components/organisms/Board";
import { LeftPanel, TypewriterText, InterestsBar } from "@/components";
import { useBoard } from '@/store/BoardContext';
import { BoardItem } from '@/types/boardCell';


export default function Home() {
  const { foundItems, currentCell } = useBoard();

  const foundInterests = foundItems.filter((item) => item.type === "interest");
  const foundXps = foundItems.filter((item) => item.type === "xp");

  return (
    <div className="max-h-screen h-screen overflow-hidden">
      <header className="relative z-10 bg-black py-3">
        <h1 className="text-center pb-1">
        www.etzel Garance - Journey 
        </h1>
        <div className="text-center text-gray-400">
          Utilisez les flèches et la barre d'espace pour interagir
        </div>
        {currentCell && currentCell.items && currentCell.items.some((item) => item.text) && (
          <>
          {currentCell.items.map((item : BoardItem) => item.text?.length && !item.found && (
             <div key={item.name} className="text-white text-center bg-gray-800 border border-gray-600 top-1/7 rounded-md my-2 p-2 fixed left-1/2 -translate-x-1/2 w-150">
              <TypewriterText  text={item.text} speed={0.02} />
            </div>
           ))}
          </>
        )}
      </header>
      <main >
        <div className="z-0 select-none">
          <Board />
        </div>

        <LeftPanel foundXps={foundXps} />

        <InterestsBar foundInterests={foundInterests} />
      </main>

    </div>
  );
}