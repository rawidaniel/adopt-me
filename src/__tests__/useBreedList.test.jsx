import { test, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useBreedList from "../useBreedList";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

test("returns an empty list when no animal is passed", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {""}
        {children}
      </QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

test("gives back breeds when animal is passed", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => expect(result.current[1]).toBe("success"));
  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});

// function getBreedList(animal) {
//   let list;

//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }

//   render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>
//   );

//   return list;
// }

// test("returns an empty list when no animal is passed", async () => {
//   const [breedList, status] = getBreedList();
//   expect(breedList).toHaveLength(0);
//   expect(status).toBe("loading");
// });
