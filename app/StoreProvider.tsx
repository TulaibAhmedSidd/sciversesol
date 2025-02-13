'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, persistor, makeStore } from '../app/store/store';

import dynamic from 'next/dynamic';


const PersistGate = dynamic(
  () => import('redux-persist/integration/react').then((mod) => mod.PersistGate),
  { ssr: false }
);


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<any>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <Provider store={store}>
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate> */}
      <PersistGate
        loading={null} // Disable the blocking placeholder
        // persistor={persistor}
        persistor={storeRef.current.__persistor}
        onBeforeLift={() => {
          // Optional: Execute logic before rehydration finishes
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  )
}