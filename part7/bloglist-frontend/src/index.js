import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

import { NotificationContextProvider } from "./NotificationContext"
import { UserContextProvider } from "./UserContext"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  </BrowserRouter>
)
