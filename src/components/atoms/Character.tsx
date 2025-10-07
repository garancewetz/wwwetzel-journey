import Image from "next/image";

interface CharacterProps {
  x: number;
  y: number;
}

export default function Character({ x, y }: CharacterProps) {
  return (
    <div 
      className="fixed z-30"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',
      }}
    >
      <Image src="/garance.svg" alt="garance" width={50} height={70} />
    </div>
  );
}
