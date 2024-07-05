"use client";

import { useOffreStore } from "@/hooks/useOffreStore";
import { usePathname } from "next/navigation";
import React from "react";
import Countdown, { zeroPad, CountdownRenderProps } from "react-countdown";

type Props = {
  auctionEnd: string;
  auctionStart: string;
  updatedAt: string;
};

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  auctionStart,
  updatedAt,
  auctionEnd,
}: CountdownRenderProps & {
  auctionStart: string;
  updatedAt: string;
  auctionEnd: string;
}) => {
  const isAuctionScheduled =
    new Date(auctionStart) > new Date(updatedAt) &&
    new Date(auctionStart) < new Date(auctionEnd);

  return (
    <div
      className={`
            border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center
            ${
              completed
                ? "bg-red-600"
                : isAuctionScheduled
                ? "bg-blue-600"
                : days === 0 && hours < 10
                ? "bg-amber-600"
                : "bg-green-600"
            }`}
    >
      {completed ? (
        <span>Enchère terminée</span>
      ) : isAuctionScheduled ? (
        <span>Enchère planifiée</span>
      ) : (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    </div>
  );
};

export default function CountdownTimer({
  auctionEnd,
  auctionStart,
  updatedAt,
}: Props) {
  const setOpen = useOffreStore((state) => state.setOpen);
  const pathname = usePathname();

  function enchereFinished() {
    if (pathname.startsWith("/encheres/details")) {
      setOpen(false);
    }
  }

  return (
    <div>
      <Countdown
        date={auctionEnd}
        renderer={(props) =>
          renderer({ ...props, auctionStart, updatedAt, auctionEnd })
        }
        onComplete={enchereFinished}
      />
    </div>
  );
}
