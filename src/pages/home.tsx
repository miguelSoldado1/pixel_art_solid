import { Index } from "solid-js";
import content from "@/content";

export function Home() {
  return (
    <div class="m-4 w-full">
      <h1 class="mb-4 text-center text-xl">Coloring Game</h1>
      <div class="grid h-full grid-cols-3 grid-rows-2 gap-6">
        <Index each={content}>
          {(art) => {
            const columns = art().pixels[0].length;
            const rows = art().pixels.length;

            return (
              <div class="flex flex-col gap-2 border border-accent-color p-2">
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
                <div class="flex flex-col items-center">
                  <span>
                    {columns} x {rows} | {art().colors.length} colors
                  </span>
                  <a
                    class="w-1/2 cursor-pointer rounded border border-accent-color p-2 text-center"
                    href={`/${art().path}`}
                  >
                    Color now
                  </a>
                </div>
              </div>
            );
          }}
        </Index>
      </div>
    </div>
  );
}
