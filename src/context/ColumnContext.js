import { createContext, useContext } from "react";

const ColumnContext = createContext();

export const useColumnContext = () => useContext(ColumnContext);
export const ColumnContextProvider = ColumnContext.Provider;
export const ColumnContextConsumer = ColumnContext.Consumer;
export default ColumnContext;
