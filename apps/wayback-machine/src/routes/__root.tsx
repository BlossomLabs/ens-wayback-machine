import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import * as React from "react";
import "@/styles/global.css";
import "@fontsource/edu-qld-beginner";
import "@fontsource/megrim";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ChakraProvider value={system}>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </ChakraProvider>
  );
}
