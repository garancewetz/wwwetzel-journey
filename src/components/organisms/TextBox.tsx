import { useBoard } from "@/store/BoardContext";
import TypewriterText from "@/components/atoms/TypewriterText";
import BoardCell, { BoardItem } from "@/types/boardCell";
import { useState, useEffect } from "react";

export default function TextBox() {
    const { action, currentCell, setAction } = useBoard();
    const [content, setContent] = useState<{ text: string, action: string | null, image: string | null }>({ text: "", action: null, image: null });
    const [currentItem, setCurrentItem] = useState<BoardCell | null>(null);

    useEffect(() => {
        // Si la currentCell est différente de la dernière, remettre l'action à null
        if (currentItem !== currentCell) {
            setContent({ text: "", action: null, image: null });
            setAction({ text: "", action: null, enemy: null, weapon: null, image: null });
            if (action?.action === "attack") {
                return
            }
        }

        setCurrentItem(currentCell);


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
    }, [currentCell, action]);




    useEffect(() => {
        if (content.action !== "attack") return;


        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Escape') {
                e.preventDefault();
                console.log("e.key", e.key);

                // setAction({ text: "", action: null, enemy: null, weapon: null });
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [content.action, setAction]);


    return (
        <>
            {content.text && (
                <div className="text-white text-center bg-gray-800 border border-gray-600 top-1/7 rounded my-2 p-2 fixed left-1/2 -translate-x-1/2 w-150">
                    <TypewriterText text={content.text as string} speed={0.02}>
                        {content.image && <img src={content.image} alt="action" className="w-10 h-10 mx-auto" />}
                    </TypewriterText>
                </div>
            )}
        </>
    )
}

