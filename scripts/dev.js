import servbot from "servbot";
import { watch } from "watchlist";
import { render } from "../src/render.js";

const dev = true;
const write = process.argv.includes("-w");

const DIST_PATH = "dist";
const SRC_PATH = "src";

const server = servbot({
    root: DIST_PATH,
    reload: true,
    fallback: "index.html",
    verbose: true,
});

server.listen(8080);

try {
    (async () => {
        await watch([SRC_PATH], async () => {
            await render(dev, write).finally(server.reload);
        });
    })();
} catch (e) {
    console.error(e);
}
