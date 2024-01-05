import { MDRender } from "./render/render";

document.getElementById("render-btn")?.addEventListener("click", () => {
    const render = new MDRender();

    render.render();
});
