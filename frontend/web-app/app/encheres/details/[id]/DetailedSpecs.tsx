"use client";

import { Enchere } from "@/types";
import { Table } from "flowbite-react";
import { format } from "date-fns";

type Props = {
  enchere: Enchere;
};

export default function DetailedSpecs({ enchere }: Props) {
  const stateTranslations: { [key: string]: string } = {
    New: "Neuf",
    LikeNew: "Comme neuf",
    GoodCondition: "Bon état",
    Worn: "Usé",
  };

  const translateState = (stateKey: string) => {
    return stateTranslations[stateKey] || stateKey; // Retourne la traduction ou la clé originale si non trouvée
  };

  return (
    <Table striped={true}>
      <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Vendeur
          </Table.Cell>
          <Table.Cell>{enchere.seller}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Ajoutée le
          </Table.Cell>
          <Table.Cell>
            {format(new Date(enchere.createdAt), "dd/MM/yyyy")}
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Marque
          </Table.Cell>
          <Table.Cell>{enchere.make}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Nom
          </Table.Cell>
          <Table.Cell>{enchere.name}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Année de fabrication
          </Table.Cell>
          <Table.Cell>{enchere.year}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            État
          </Table.Cell>
          <Table.Cell>{translateState(enchere.state)}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Catégorie
          </Table.Cell>
          <Table.Cell>{enchere.category}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Description
          </Table.Cell>
          <Table.Cell>{enchere.description}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Possède un prix de réserve ?
          </Table.Cell>
          <Table.Cell>{enchere.reservePrice > 0 ? "Oui" : "Non"}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Se termine le
          </Table.Cell>
          <Table.Cell>
            {format(new Date(enchere.auctionEnd), "dd/MM/yyyy")}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
