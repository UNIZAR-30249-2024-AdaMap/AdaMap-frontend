'use client'

import React, { useContext } from 'react'

const UserContext = React.createContext()

// Hook para obtener la información del usuario actual
export function useUser () {
  return useContext(UserContext)
}

// Proveedor de usuario para la aplicación
export function UserProvider ({ children, user }) {
  return (
    <UserContext.Provider value={{
      user: user
    }}>
      {children}
    </UserContext.Provider>
  )
}