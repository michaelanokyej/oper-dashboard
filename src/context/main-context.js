import React from "react";

export default React.createContext({
  pollers: [],
  errors: [],
  operators: [],
  operations: [],
  tasks: [],
  taskErrors: 0,
  pollerErrors: 0,
  handleCsvDownloadButton: () => {}
});
