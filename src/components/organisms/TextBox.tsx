import { useBoard } from "@/store/BoardContext";
import TypewriterText from "@/components/atoms/TypewriterText";
import { BoardItem } from "@/types/boardCell";
import { useState, useEffect } from "react";

export default function TextBox() {
    const { action, currentCell, setAction } = useBoard();
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        console.log("action", action);
        console.log("currentCell", currentCell);
        if (action) {
            setContent(action);
            // setAction('');
            return

        }
        if (currentCell && currentCell.items && currentCell.items.some((item) => item.text)) {
            const itemWithText = currentCell.items.find((item: BoardItem) => item.text);
            if (itemWithText && !itemWithText.found) {
                setContent(itemWithText.text || "");
            }
        }

    }, [action, currentCell]);


    return (
        <>
            {content && (
                <div className="text-white text-center bg-gray-800 border border-gray-600 top-1/7 rounded my-2 p-2 fixed left-1/2 -translate-x-1/2 w-150">
                    <TypewriterText text={content} speed={0.02} />

                </div>
            )}
        </>
    )
}

