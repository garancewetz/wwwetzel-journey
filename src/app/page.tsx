'use client'

import Board from "@/components/organisms/Board";
import { LeftPanel, InterestsBar } from "@/components";
import { useBoard } from '@/store/BoardContext';
import TextBox from "@/components/organisms/TextBox";

export default function Home() {
  const { getFoundItems } = useBoard();

  const foundInterests = getFoundItems().filter((item) => item.type === "interest");
  const foundXps = getFoundItems().filter((item) => item.type === "xp");

  return (
    <div className="max-h-screen h-screen overflow-hidden">
      <header className="relative z-10 bg-black pb-3">
        <h1 className="text-center text-xl pb-1">
          www.etzel garance
        </h1>
        <div className="text-center text-gray-400">
          Utilisez les flèches et la barre d&apos;espace pour interagir
        </div>
        <TextBox />
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