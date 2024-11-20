import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/global.css";
import "@fontsource/edu-qld-beginner";
import "@fontsource/megrim";

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
