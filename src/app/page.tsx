'use client'

import Board from "@/components/organisms/Board";
import { useBoard } from '../store/BoardContext';
import Image from 'next/image';
import { useState } from "react";


export default function Home() {
  const { foundItems } = useBoard();
  const [isOpen, setIsOpen] = useState(false);
  const [panelActiveContent, setPanelActiveContent] = useState<FoundItem | null>(null);

  const foundInterests = foundItems.filter((item) => item.type === "interest");
  const foundXps = foundItems.filter((item) => item.type === "xp");

  return (
    <div className="max-h-screen h-screen overflow-hidden">
      <header className="relative z-10">
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

        <div className={`z-20 fixed inset-0 w-1/2 flex  justify-between duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-60px)]'}  bg-gray-900`} >
          <div className="flex-1 p-5 overflow-y-auto">
            <div className="text-white text-lg font-bold mb-4">{panelActiveContent?.name}</div>
            {panelActiveContent &&panelActiveContent.projects && (
              <div className="space-y-4">
                {panelActiveContent.projects.map((project, index) => (
                  <div key={index} className="bg-gray-100 p-4 ">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{project.created_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className=" w-15 relative  bg-gray-900 z-10">
            <div className="absolute top-1/2 h-25  -translate-y-1/2 w-3 rounded -right-1.5  bg-gray-500 cursor-pointer" onClick={() => setIsOpen(prev => !prev)}></div>
            <ul className="flex flex-col items-center space-y-2 py-5 px-1">
              {foundXps.map((item, index) => (
                <li key={index} className="aspect-square bg-gray-500/20 w-full flex items-center justify-center" onClick={() => setPanelActiveContent(item)}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={30} 
                    height={30}
                    className="object-contain"
                  />
                  <span className="text-white text-sm absolute left-full pl-2 w-max">{item.name}</span>
                </li>
              ))}
  
            </ul>
          </div>
        </div>


        <div className="h-20 border border-gray-900 fixed right-1/2 translate-x-1/2 w-8/10 bottom-0 bg-gray-900 z-10">
          <ul className="flex items-center h-full px-5">
            <li>
              SAC
            </li>
            {foundInterests.map((item, index) => (
              <li key={index} className="aspect-square bg-gray-500/20 flex items-center justify-center">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={30} 
                  height={30}
                  className="object-contain"
                />
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