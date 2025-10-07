'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Panel } from '@/components';
import { useBoard } from '../../store/BoardContext';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  company?: string;
  urlPage?: string;
  created_at: string;
  marketing?: {
    brand: string;
    imageUrl: string;
  };
}

interface FoundItem {
  name: string;
  image: string;
  type: string;
  projects?: Project[];
}

interface LeftPanelProps {
  foundXps: FoundItem[];
}

export default function LeftPanel({ foundXps }: LeftPanelProps) {
  const { grid } = useBoard();
  const flattenedGrid = grid.flat();
  const foundXpsCount = flattenedGrid.filter((item) => item.item?.type === "xp").length;


  const [isOpen, setIsOpen] = useState(false);
  const [panelActiveContent, setPanelActiveContent] = useState<FoundItem | null>(null);
  const [clickedXps, setClickedXps] = useState<Set<string>>(new Set());



  return (
    <Panel className={`z-20 fixed inset-0 w-2/3 flex  justify-between duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-60px)]'}  bg-gray-900`}>
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="text-white text-lg font-bold mb-4">{panelActiveContent?.name}</div>
        {panelActiveContent && panelActiveContent.projects && (
          <div className="space-y-4">
            {panelActiveContent.projects.map((project, index) => (
              <div key={index} className="border border-gray-600 p-4 bg-gray-800 ">
                <h3 className="text-lg font-bold text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-200 text-sm mb-3">{project.description}</p>
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
      <div className=" w-15 relative  bg-gray-900 z-10 border-r border-gray-600">
        <div className="absolute top-1/2 h-30  -translate-y-1/2 w-2.5 rounded-r -right-2.5  bg-gray-600 cursor-pointer" onClick={() => setIsOpen(prev => !prev)}></div>
        <div className="text-white aspect-square  w-full flex items-center justify-center">{foundXps?.length}/{foundXpsCount}</div>
        <ul className="flex flex-col items-center space-y-2 py-5 px-1">
          {foundXps.map((item, index) => {
            const isClicked = clickedXps.has(item.name);
            return (
              <li 
                key={index} 
                className={`group aspect-square ${isClicked ? 'bg-gray-500/20' : ''} w-full flex items-center justify-center cursor-pointer `}
                onClick={() => {
                  setPanelActiveContent(item);
                  setIsOpen(true);
                  setClickedXps(prev => new Set(prev).add(item.name));
                }}
              >
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={30} 
                  height={30}
                  className={`object-contain ${!isClicked ? 'pulse-glow-animation' : ''}`}
                  
                />
                <span className="text-white text-sm absolute left-full pl-2 w-max opacity-0 group-hover:opacity-100 pointer-events-none">{item.name}</span>
              </li>
            );
          })}

        </ul>
      </div>
    </Panel>
  );
}

