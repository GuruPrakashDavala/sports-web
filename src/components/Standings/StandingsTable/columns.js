// util -> switch() - returns column prop array

import { FormIcon } from "./FormIcon";

// Large
export const COLUMNS_LG = [
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Team",
    accessor: "team",
    Cell: ({ value, row }) => {
      return value ? value.name : `NA`;
    },
  },
  {
    Header: "Played",
    accessor: "played",
  },
  {
    Header: "Won",
    accessor: "won",
  },
  {
    Header: "Drawn",
    accessor: "draw",
  },
  {
    Header: "Lost",
    accessor: "lost",
  },
  {
    Header: "N/R",
    accessor: "noresult",
  },
  {
    Header: "Net RR",
    accessor: "netto_run_rate",
  },
  {
    Header: "Points",
    accessor: "points",
  },
  {
    Header: "Form",
    accessor: "recent_form",
    Cell: ({ value, row }) => {
      return value.toString();
    },
  },
];

// Medium
export const COLUMNS_MD = [
  {
    Header: "Pos",
    accessor: "position",
  },
  {
    Header: "Team",
    accessor: "team",
    Cell: ({ value, row }) => {
      return value ? value.name : `NA`;
    },
  },
  {
    Header: "PL",
    accessor: "played",
  },
  {
    Header: "Won",
    accessor: "won",
  },
  {
    Header: "D",
    accessor: "draw",
  },
  {
    Header: "L",
    accessor: "lost",
  },
  {
    Header: "Net RR",
    accessor: "netto_run_rate",
  },
  {
    Header: "PTS",
    accessor: "points",
  },
];

// Small
export const COLUMNS_SM = [
  {
    Header: "Team",
    accessor: "team",
    Cell: ({ value, row }) => {
      return value ? value.code : `NA`;
    },
  },
  {
    Header: "PL",
    accessor: "played",
  },
  {
    Header: "Won",
    accessor: "won",
  },
  {
    Header: "D",
    accessor: "draw",
  },
  {
    Header: "L",
    accessor: "lost",
  },
  {
    Header: "Net RR",
    accessor: "netto_run_rate",
  },
  {
    Header: "PTS",
    accessor: "points",
  },
];
