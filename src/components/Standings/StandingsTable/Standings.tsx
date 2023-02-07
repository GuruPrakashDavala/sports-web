import React, { useMemo, Fragment } from "react";
import { useTable, useExpanded } from "react-table";
import { COLUMNS_SM, COLUMNS_MD, COLUMNS_LG } from "./columns";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useStandingsTable } from "../../../utils/queries";
import PageLoader from "../../Loaders/PageLoader/PageLoader";

export const Standings = (props: { stageId: string }) => {
  /* TODO:
1. Responsive table design
2. Colored FORM icons
3. Difference in rank arrows
4. react-query for fetchAPI
5. Framer motion for the expandable row
6. Manipulation of the API response to include sub rows to contain the collapsable row custom components
7. useHook to hide and show columns based on different width breakpoints
8. Perfect circle with text in the middle - should be responsive on all screens (SVG)
  */

  const bp = useBreakpointIndex();

  const { data: standingsData, isLoading: isStandingsLoading } =
    useStandingsTable({ stageId: props.stageId });

  const standingsTable = !isStandingsLoading
    ? standingsData?.data.data.data
    : undefined;

  const columns = useMemo(() => {
    const bpColumns =
      bp > 2
        ? COLUMNS_LG // large and above
        : bp > 1
        ? COLUMNS_MD // medium
        : COLUMNS_SM; // small
    return bpColumns;
  }, [bp]);

  const data = useMemo(() => {
    const rankings = standingsTable ?? [];
    return rankings;
  }, [standingsTable]);

  const tableInstance = useTable<any>({ columns, data }, useExpanded);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Fragment>
      {/* React Table */}
      {standingsTable ? (
        <div
          {...getTableProps()}
          className="Rtable-container"
          id="standingsTable"
        >
          {/* Table Header */}
          <div id="thead">
            {headerGroups.map((headerGroup, index) => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                className="Rtable"
                key={index}
              >
                {headerGroup.headers.map((column, index) => {
                  return (
                    <div
                      {...column.getHeaderProps()}
                      className={`Rtable-cell header-cell ${
                        column.Header === "Team"
                          ? "width-large"
                          : column.Header === "Form"
                          ? "width-medium"
                          : "width-default"
                      }`}
                      key={index}
                    >
                      <strong>{column.render("Header")}</strong>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div {...getTableBodyProps()} id="tbody">
            {rows.map((row, index) => {
              console.log(row);
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className={`Rtable`} key={index}>
                  {row.cells.map((cell, index) => {
                    console.log(row);
                    return (
                      <div
                        {...cell.getCellProps()}
                        className={`Rtable-cell ${
                          cell.column.Header === "Team"
                            ? "width-large"
                            : cell.column.Header === "Form"
                            ? "width-medium"
                            : "width-default"
                        }`}
                        key={index}
                      >
                        {cell.column.Header === "Team" && cell.value && (
                          <img
                            src={cell.value.image_path}
                            alt="team-logo"
                            className="team-table-logo"
                          />
                        )}
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </Fragment>
  );
};
