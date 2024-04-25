import Image from "next/image";
import React from "react";

type Props = {
  enchere: any;
};

export default function EnchereCard({ enchere }: Props) {
  return (
    <a href="#">
      <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
        <div>
          <Image
            src={enchere.imageUrl}
            alt="image"
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {enchere.make} {enchere.name}
        </h3>
        <p className="font-semibold text-sm"> {enchere.year} </p>
      </div>
    </a>
  );
}
