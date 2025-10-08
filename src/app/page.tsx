'use client'

import Board from "@/components/organisms/Board";
import { LeftPanel, TypewriterText, InterestsBar } from "@/components";
import { useBoard } from '../store/BoardContext';


export default function Home() {
  const { foundItems } = useBoard();

  const foundInterests = foundItems.filter((item) => item.type === "interest");
  const foundXps = foundItems.filter((item) => item.type === "xp");

  return (
    <div className="max-h-screen h-screen overflow-hidden">
      <header className="relative z-10 bg-black py-2">
        <div className="text-center">
        www.etzel Journey 
        </div>
        <div className="text-center">
          Utilisez les flèches et la barre d'espace pour interagir
        </div>
        {foundItems[foundItems.length - 1]?.text && (
          <div className="text-white text-center bg-gray-800 border border-gray-600 top-1/7 rounded-md my-2 p-2 fixed left-1/2 -translate-x-1/2 w-150">
            <TypewriterText text={foundItems[foundItems.length - 1]?.text || ''} speed={0.02} />
          </div>
        )}
      </header>
      <main >
        <div className="z-0">
          <Board />
        </div>

        <LeftPanel foundXps={foundXps} />

        <InterestsBar foundInterests={foundInterests} />
      </main>

    </div>
  );
}