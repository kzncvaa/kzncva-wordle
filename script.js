const gameboard = document.getElementById('gameboard');

class Cell {
    constructor(x,y,letter) {
        this.x = x;
        this.y = y;
        this.letter = letter || "";
        this.state = "";
    }
}


let cell_arr = [];
let guess = 0;
let solutions = array;
let word_list = array;
let word = solutions[Math.floor(Math.random(1)*solutions.length)-1];
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

checkLastPlay();

function build_cells() {
    for(let y=0;y<6;y++) {
        cell_arr.push([]);
        for(let x=0;x<5;x++) {
            let cell = new Cell(x,y);
            cell_arr[y].push(cell);
            let i = document.createElement('input');
            i.setAttribute('maxlength', '1');
            i.setAttribute('type', 'text');
            i.setAttribute('id', `cell${x}${y}`);
            gameboard.appendChild(i);
        }
    }
}

function none_cells(){
    let i = document.createElement('h2');
    i.innerHTML = "Ви зможете спробувати знову завтра!"
    gameboard.appendChild(i);
}

function checkLastPlay(){
    let date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).valueOf().toString()
    if(localStorage.getItem("lastPlay")==date){
        alert('Ви вже грали сьогодні!')
        none_cells();
    }else{
        build_cells();
    }
}
let copyText = "";
function verify_guess() {
    if (guess > 5) {
        window.reload();
    }
    let letter_spaces = [];
    for(let i=0;i<cell_arr[guess].length;i++) {
        if(!letters.includes(document.getElementById(`cell${i}${guess}`).value.toLowerCase())) {
            alert('Неправильна літера.');
            return;
        }
        cell_arr[guess][i].letter = document.getElementById(`cell${i}${guess}`).value;
    }
    for(let i=0;i<cell_arr[guess].length;i++) {
        letter_spaces.push(cell_arr[guess][i].letter);
    }
    if(!word_list.includes(letter_spaces.join('')) && !solutions.includes(letter_spaces.join(''))) {
        alert('Це слово не існує в словнику.')
        return;
    }
    for(let i=0;i<cell_arr[guess].length;i++) {
        if (word.charAt(i) == cell_arr[guess][i].letter) {
            cell_arr[guess][i].state = "correct";
            document.getElementById(`cell${i}${guess}`).style.backgroundColor = "#76ba73";
            copyText.concat('U+1F7E9');
        } else if (word.includes(cell_arr[guess][i].letter)) {
            cell_arr[guess][i].state = "present";
            document.getElementById(`cell${i}${guess}`).style.backgroundColor = "#d1bb58";
            copyText.concat('U+1F7E8');
        } else {
            cell_arr[guess][i].state = "incorrect";
            document.getElementById(`cell${i}${guess}`).style.backgroundColor = "#4a4a4a";
            copyText.concat('U+2B1C');
        }
        copyText.concat('0x0A');
    }
    setTimeout(function() {
        let date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).valueOf().toString()
        if(letter_spaces.join('') == word && guess <= 5) {
            alert('Ви виграли!');
            localStorage.setItem("lastPlay", date);
            navigator.clipboard.writeText(copyText).then(()=> alert("result was copied"));
            location.reload();
        } else if (guess == 5) {
            alert('Ви програли!');
            localStorage.setItem("lastPlay", date);
            navigator.clipboard.writeText(copyText).then(()=> alert("result was copied"));
            location.reload();
        }
        guess++;
    }, 1000);
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') {
        verify_guess();
    }
});

