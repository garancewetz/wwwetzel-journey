'use client'

import Board from "@/components/organisms/Board";
import { LeftPanel } from "@/components";
import { useBoard } from '../store/BoardContext';
import Image from 'next/image';


export default function Home() {
  const { foundItems } = useBoard();

  const foundInterests = foundItems.filter((item) => item.type === "interest");
  const foundXps = foundItems.filter((item) => item.type === "xp");

  return (
    <div className="max-h-screen h-screen overflow-hidden">
      <header className="relative z-10 bg-black pb-2">
        <div className="text-center">
        www.etzel Journey 
        </div>
        <div className="text-center">
          Use arrows and press space to interact
        </div>
      </header>
      <main >
        <div className="z-0">

        <Board />
        </div>

        <LeftPanel foundXps={foundXps} />


        <div className="h-15  border-t border-x rounded-t border-gray-600 flex items-center  fixed right-1/2 translate-x-1/2 w-1/2 bottom-0 bg-gray-900 z-10">
            <div className="my-auto">
              <Image src="/bagpack.svg" alt="bagpack" width={60} height={60} />
            </div>
          <ul className="flex items-center h-full space-x-4 ml-5">
            {foundInterests.map((item, index) => (
              <li key={index} className="relative group aspect-square flex items-center justify-center">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
                <span className="text-white text-sm absolute -top-full pl-2 w-max opacity-0 group-hover:opacity-100">{item.name}</span>
              </li>

            ))}
          </ul>
        </div>
      </main>
      {/* <footer className="">
        footer 
      </footer> */}
    </div>
  );
}