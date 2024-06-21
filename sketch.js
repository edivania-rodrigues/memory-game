let cards = [];
let elements = ['H', 'O', 'C', 'N', 'Au', 'Ag', 'Cu', 'Fe'];
let flippedCards = [];
let canFlip = true;
const pairs = 8; // Total de pares de cartas

function setup() {
    createCanvas(800, 600);
    let positions = [];
    for (let i = 0; i < pairs * 2; i++) {
        positions.push(i);
    }
    positions = shuffle(positions);

    for (let i = 0; i < pairs * 2; i++) {
        let element = elements[Math.floor(i / 2)];
        cards.push(new Card(element, positions[i] % 4 * 200, Math.floor(positions[i] / 4) * 200));
    }
}

function draw() {
    background(255);
    for (let card of cards) {
        card.show();
    }
}

function mousePressed() {
    if (!canFlip) return;
    for (let card of cards) {
        if (card.isUnderMouse(mouseX, mouseY)) {
            if (flippedCards.length < 2 && !card.isFlipped) {
                card.flip();
                flippedCards.push(card);
                if (flippedCards.length === 2) {
                    canFlip = false;
                    setTimeout(checkMatch, 1000);
                }
            }
            break;
        }
    }
}

function checkMatch() {
    if (flippedCards[0].element !== flippedCards[1].element) {
        flippedCards[0].flip();
        flippedCards[1].flip();
    }
    flippedCards = [];
    canFlip = true;
}

class Card {
    constructor(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.isFlipped = false;
    }

    show() {
        if (this.isFlipped) {
            fill(255);
            rect(this.x, this.y, 180, 180);
            fill(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            text(this.element, this.x + 90, this.y + 90);
        } else {
            fill(200);
            rect(this.x, this.y, 180, 180);
        }
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }

    isUnderMouse(px, py) {
        return px > this.x && px < this.x + 180 && py > this.y && py < this.y + 180;
    }
}
