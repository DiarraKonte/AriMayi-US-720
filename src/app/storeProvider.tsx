"use client";
import React, { useRef } from "react";
import { store, persistor } from "../lib/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef(store); // Utilisation du store directement

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
