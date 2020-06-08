import "pixi.js";
import "gsap";
import gsap from "gsap";
import TicTacToe from "./Game/TicTacToe";

window["initGame"] = () => {
    const renderer = new PIXI.Renderer({
        width: 800,
        height: 600,
        backgroundColor: 0x4287f5,
    });
    document.body.appendChild(renderer.view);
    const stage = new PIXI.Container();
    renderer.render(stage);
    gsap.ticker.add(() => {
        renderer.render(stage);
    });

    stage.addChild(new TicTacToe());
};
