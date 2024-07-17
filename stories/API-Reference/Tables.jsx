import React from "react";

import {
  EDITOR_METHODS_TABLE_COLUMNS,
  EDITOR_METHODS_TABLE_ROWS,
  EDITOR_COMMANDS_TABLE_COLUMNS,
  EDITOR_COMMANDS_TABLE_ROWS,
  UTILITIES,
  UTILITIES_TABLE_COLUMNS,
  ALL_PROPS_TABLE_COLUMNS,
  EDITOR_PROPS,
} from "./constants";

import Table from "../components/Table";

export const MethodsTable = () => (
  <Table
    columns={EDITOR_METHODS_TABLE_COLUMNS}
    rows={EDITOR_METHODS_TABLE_ROWS}
  />
);
export const CommandsTable = () => (
  <Table
    columns={EDITOR_COMMANDS_TABLE_COLUMNS}
    rows={EDITOR_COMMANDS_TABLE_ROWS}
  />
);

export const UtilitesTable = () => (
  <Table columns={UTILITIES_TABLE_COLUMNS} rows={UTILITIES} />
);

export const AllPropsTable = () => (
  <Table columns={ALL_PROPS_TABLE_COLUMNS} rows={EDITOR_PROPS} />
);
