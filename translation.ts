// enums
enum Direction {
    //% block="forward"
    Forward,
    //% block="back"
    Back,
    //% block="left"
    Left,
    //% block="right"
    Right
}

enum BeamsGlass {
    //% blockIdentity="blocks.block" enumval=262385 block="Yellow Stained Glass"
    //% jres alias=YELLOW_STAINED_GLASS
    YellowStainedGlass = 262385,
    //% blockIdentity="blocks.block" enumval=327921 block="Lime Stained Glass"
    //% jres alias=LIME_STAINED_GLASS
    LimeStainedGlass = 327921,
    //% blockIdentity="blocks.block" enumval=721137 block="Blue Stained Glass"
    //% jres alias=BLUE_STAINED_GLASS
    BlueStainedGlass = 721137,
    //% blockIdentity="blocks.block" enumval=917745 block="Red Stained Glass"
    //% jres alias=RED_STAINED_GLASS
    RedStainedGlass = 917745
}

// global variables
const stopBlock = BEDROCK
const stopPosition = world(35,1,0)
const locatePaintingTarget = 14
const locateGoonTarget = 113

const directions = [
    FORWARD,
    BACK,
    LEFT,
    RIGHT
];

const turns = [
    LEFT_TURN,
    RIGHT_TURN
]

//%  block="Wonder Woman" weight=200 color=#BF9B30 icon="\u2605"
namespace ww {

    /**
     * Move Wonder Woman n spaces in the d direction
     */
    //% block="往 %d 移動 %n 格數"
    export function moveWW(d: Direction, n: number): void {
        for (let i = 0; i < n; i++){
            if(shouldStop()) return;

            const direction = directions[d];

            agent.move(direction, 1);
        }
    }

    /**
     * Turn Wonder Woman in the t direction
     */
    //% block="往 %t 轉動"
    export function turnWW(t: TurnDirection): void {
        if(shouldStop()) return;

        const turn = turns[t];

        agent.turn(turn);
    }  

    /**
     * Place block in the d direction
     * @param block the block
     */    
    //% block="往 %d 放置 %block"
    export function placeBlock(block: BeamsGlass, d: Direction): void {
        if(shouldStop()) return;

        agent.setItem(block, 1, 1)
        agent.setSlot(1)

        const direction = directions[d];

        agent.place(direction);
    }  

    /**
     * Inspect in the d direction for the painting
     */
    //% block="畫作隱藏於 %d 箱子"
    export function locatePainting(d: Direction): boolean {
        if(shouldStop()) return false;

        const direction = directions[d];

        const inspected = agent.inspect(AgentInspection.Block, direction);

        return inspected === locatePaintingTarget;
    }

    /**
     * Break the block in the d direction
     */
    //% block="打破 %d 箱子"
    export function retrievePainting(d: Direction): void {
        if(shouldStop()) return;

        const direction = directions[d];

        agent.destroy(direction);
    }    

    /**
     * Inspect in the d direction for Goon
     */
    //% block="%d 參加者是不是小偷"
    export function locateGoon(d: Direction): boolean {
        if(shouldStop()) return false;

        const direction = directions[d];

        const inspected = agent.inspect(AgentInspection.Block, direction);

        return inspected === locateGoonTarget;
    }

    /**
     * Inspect in the d direction for GOLD_BLOCK
     */
    //% block="真言套索 %d 小偷"
    export function apprehendGoon(d: Direction): void {
        if(shouldStop()) return;

        const direction = directions[d];

        agent.destroy(direction);
    }

    /**
     * Inspect in the d direction for GOLD_BLOCK
     */
    //% block="打倒 %d 小偷"
    export function takedownGoon(d: Direction): void {
        if(shouldStop()) return;

        const direction = directions[d];

        agent.destroy(direction);
    }    

    // helper functions
    function shouldStop(): boolean {
        return blocks.testForBlock(stopBlock, stopPosition);
    }
}
