import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import React from "react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
  {
    label: "Alphabétique",
    icon: AiOutlineSortAscending,
    value: "make",
  },
  {
    label: "Date de fin",
    icon: AiOutlineClockCircle,
    value: "endingSoon",
  },
  {
    label: "Récemment ajoutées",
    icon: BsFillStopCircleFill,
    value: "new",
  },
];
const filterButtons = [
  {
    label: "Enchères en cours",
    icon: GiFlame,
    value: "live",
  },
  {
    label: "Fin < 6 heures",
    icon: GiFinishLine,
    value: "endingSoon",
  },
  {
    label: "Terminées",
    icon: BsStopwatchFill,
    value: "finished",
  },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Filtre</span>
        <Button.Group>
          {filterButtons.map(({ label, icon: IconBase, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? "purple" : "yellow"}`}
            >
              <IconBase className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Tri</span>
        <Button.Group>
          {orderButtons.map(({ label, icon: IconBase, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? "purple" : "yellow"}`}
            >
              <IconBase className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Résultats</span>
        <Button.Group>
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? "purple" : "yellow"}`}
              className="focus:ring-10"
            >
              {value}
            </Button>
          ))}
        </Button.Group>
      </div>
    </div>
  );
}
