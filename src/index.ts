import "pixi.js";
import "gsap";
import gsap from "gsap";
import TicTacToe from "./Game/TicTacToe";

console.log("what's up guys, Rowan here coming at you live with another");
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
    // const test = new PIXI.Graphics();
    // test.beginFill(0xff0000);
    // test.drawCircle(0, 200, 20);
    // stage.addChild(test);

    // gsap.to(test, { x: 500, duration: 50 });
};
