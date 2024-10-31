// import { build } from './build'

// build()

import { run as update } from "../packages/metadata/scripts/update";

async function build() {
    await update();
    const { run: buildUpdate } = await import("./update.js");
    await buildUpdate();
    const { build: buildRun } = await import("./build.js");
    await buildRun();
}
build();
