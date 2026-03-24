import Image from "next/image";
import { useBoard } from "@/store/BoardContext";
import TypewriterText from "@/components/atoms/TypewriterText";
import BoardCell, { BoardItem } from "@/types/boardCell";
import { useState, useEffect, useRef } from "react";

export default function TextBox() {
    const { action, currentCell, setAction } = useBoard();
    const [content, setContent] = useState<{ text: string, action: string | null, image: string | null }>({ text: "", action: null, image: null });
    const previousCellRef = useRef<BoardCell | null>(null);

    useEffect(() => {
        // Si la currentCell est différente de la dernière, remettre l'action à null
        if (previousCellRef.current !== currentCell) {
            setContent({ text: "", action: null, image: null });
            setAction({ text: "", action: null, enemy: null, weapon: null, image: null });
            if (action?.action === "attack") {
                return
            }
        }

        previousCellRef.current = currentCell;


        if (action?.text && action?.action) {
            setContent({ text: action.text, action: action.action as string, image: action.image });

        } else {
            if (currentCell?.items?.some((item) => item.text)) {
                const itemWithText = currentCell.items.find((item: BoardItem) => item.text);
                if (itemWithText && !itemWithText.found) {
                    setContent({ text: itemWithText.text || "", action: null, image: null });
                }
            }
        }
    }, [currentCell, action, setAction]);



    return (
        <>
            {content.text && (
                <div className="text-white text-center bg-gray-800 border border-gray-600 top-1/7 rounded my-2 p-2 fixed left-1/2 -translate-x-1/2 w-150">
                    <TypewriterText text={content.text as string} speed={0.02}>
                        {content.image && <Image src={content.image} alt="action" width={40} height={40} className="w-10 h-10 mx-auto" />}
                    </TypewriterText>
                </div>
            )}
        </>
    )
}

