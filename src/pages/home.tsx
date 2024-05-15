import mario from "@/mario.json";
import yoda from "@/yoda.json";
import { Index } from "solid-js";

const art = [
  { ...mario, id: "mario" },
  { ...yoda, id: "yoda" },
];

export function Home() {
  return (
    <div class="m-4 w-full">
      <h1 class="mb-4 text-center text-xl">Coloring Game</h1>
      <div class="grid h-full grid-cols-3 grid-rows-2 gap-6">
        <Index each={art}>
          {(art) => {
            const columns = art().pixels[0].length;
            const rows = art().pixels.length;

            return (
              <a
                class="flex flex-col gap-2 border border-accent-color p-2"
                href={`/${art().id}`}
              >
                <div class="flex h-5/6 justify-center">
                  <div
                    class="grid"
                    style={{
                      "grid-template-rows": `repeat(${rows}, 1fr)`,
                      "grid-template-columns": `repeat(${columns}, 1fr)`,
                    }}
                  >
                    <Index each={art().pixels}>
                      {(row) => (
                        <Index each={row()}>
                          {(pixel) => (
                            <div
                              class="aspect-square"
                              style={{
                                "background-color": `${art().colors[pixel().colorIndex]}`,
                              }}
                            />
                          )}
                        </Index>
                      )}
                    </Index>
                  </div>
                </div>
                <div class=" flex flex-col items-center">
                  <span>
                    {columns} x {rows} | {art().colors.length} colors
                  </span>
                  <button class="w-1/2 rounded border border-accent-color p-2">
                    Color now
                  </button>
                </div>
              </a>
            );
          }}
        </Index>
      </div>
    </div>
  );
}
