'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Panel } from '@/components';
import { useBoard } from '../../store/BoardContext';
import xpsData from '../../datas/xps.json';
import { experiences as experiencesObj } from '@/datas/items';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  urlPage?: string;
  content?: string;
  created_at: string;

}

interface FoundItem {
  name: string;
  image: string;
  type: string;
  content?: string;
  text?: string;
}

interface LeftPanelProps {
  foundXps: FoundItem[];
}

export default function LeftPanel({ foundXps }: LeftPanelProps) {
  const { grid } = useBoard();
  const experiences = experiencesObj;
  const flattenedGrid = grid.flat();
  const foundXpsCount = flattenedGrid.reduce((count, cell) => {
    const xpsInCell = cell.items?.filter(item => item.type === "xp").length || 0;
    return count + xpsInCell;
  }, 0);


  const [isOpen, setIsOpen] = useState(false);
  const [panelActive, setPanelActive] = useState<FoundItem | null>(null);
  const [panelActiveContent, setPanelActiveContent] = useState<Project[] | null>(null);
  const [clickedXps, setClickedXps] = useState<Set<string>>(new Set());

  // Mapping des touches AZERTY aux indices des expériences visibles
  const commands = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key === 'escape') {
      setIsOpen(false);
      return;
    }
    const index = commands.indexOf(key);
    if (index === -1) return;

    const xp = experiences[index];
    if (!xp) return;

    const foundItem = foundXps.find((fi) => fi.name === xp.name);
    if (!foundItem) return;

    // Toggle: si déjà ouvert sur la même lettre, on ferme
    if (isOpen && panelActive?.name === foundItem.name) {
      setIsOpen(false);
      return;
    }

    setPanelActive(foundItem);
    setIsOpen(true);
    setClickedXps(prev => new Set(prev).add(foundItem.name));
  }, [experiences, foundXps, isOpen, panelActive]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  useEffect(() => {
    const content = panelActive?.content;
    if (content) {
      const projects = (xpsData as Record<string, Project[]>)[content?.toLowerCase()];
      if (projects) {
        setPanelActiveContent(projects);
      }
    }
  }, [panelActive]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Panel className={`${foundXps.length === 0 ? '-translate-x-full' : (isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-60px)]')} fixed inset-0 w-1/2 flex z-10 justify-between duration-300 bg-gray-900`}>
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="text-white text-lg font-bold mb-4">{panelActive?.name}</div>
          {panelActiveContent && panelActiveContent.length > 0 ? (
            <div className="space-y-4">
              {panelActiveContent.map((project, index) => (
                <div key={index} className="p-4 bg-gray-800 ">
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
          ) : panelActive ? (
            <div className="text-gray-400 text-sm">Aucun contenu disponible pour cette expérience.</div>
          ) : null}
        </div>
        <div className=" w-15 relative  bg-gray-900 z-10 border-r border-gray-600">
          {foundXps.length > 0 && (
            <div className="absolute top-1/2 h-30  -translate-y-1/2 w-2.5 rounded-r -right-2.5  bg-gray-600 cursor-pointer" onClick={() => setIsOpen(prev => !prev)}></div>
          )}
          <div className="text-white aspect-square  w-full flex items-center justify-center">{foundXps?.length}/{foundXpsCount}</div>
          <ul className="flex flex-col items-center space-y-2 py-5 px-1">
            {experiences.map((xp, index) => {
              const foundItem = foundXps.find((fi) => fi.name === xp.name);
              const isClicked = foundItem ? clickedXps.has(foundItem.name) : false;
              const commands = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
              return (
                <li
                  key={`${index}-${xp.name}`}
                  className={`relative group aspect-square ${isClicked ? 'bg-gray-500/20' : ''} w-full flex items-center justify-center ${foundItem ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (!foundItem) return;
                    setPanelActive(foundItem);
                    setIsOpen(true);
                    setClickedXps(prev => new Set(prev).add(foundItem.name));
                  }}
                >
                  {foundItem ? (
                    <>
                      <span className=" z-1 font-bold text-xs -top-1 right-0 absolute bg-black rounded p-0.25 aspect-square w-4 flex items-center justify-center uppercase">{commands[index]}</span>
                      <Image
                        src={foundItem.image}
                        alt={foundItem.name}
                        width={30}
                        height={30}
                        className={`object-contain ${!isClicked ? 'pulse-glow-animation' : ''}`}
                      />
                      <span className="text-white text-sm absolute left-full pl-2 w-max opacity-0 group-hover:opacity-100 pointer-events-none">{foundItem.name}</span>
                    </>
                  ) : (
                    <div className="w-10 h-10 bg-gray-600 rounded"></div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Panel>
    </>
  );
}

