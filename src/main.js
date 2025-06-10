
const Constants = {
    TOTAL_GIFS: 20,
    GIF_KEYBORD_SWITCH: 'g',
};

/**
 * randomly selects and sets as background cover image for the 
 * main container div in the home UI
 * @returns 
 */
async function randomizeGifWall() {
    const containerDiv = window.document.querySelector("#mainContainer");

    if (containerDiv === undefined) {
        console.log(`no mainContainer ID found`);
        return;
    }
    const randomNumber = Math.floor(Math.random() * Constants.TOTAL_GIFS) + 1;
    containerDiv.style.backgroundImage = `url('./assets/gifs_${randomNumber}.gif')`;
}

/**
 * Event handler for keyboard press
 * @param {KeyboardEvent} event 
 */
async function handleKeyPress(event) {
    // Configure the randomize GIF walls
    if (event.key.toLowerCase() === Constants.GIF_KEYBORD_SWITCH) {
        await randomizeGifWall();
    }
}

async function main() {
    console.log(`i am running from main.js script`);
    await randomizeGifWall();

    // Register keyboard event listener
    window.document.addEventListener('keydown', handleKeyPress);
}

// Execute the script ...
main().catch(console.error);