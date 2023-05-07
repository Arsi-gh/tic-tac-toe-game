let buttons = document.querySelectorAll('.buttons')
let endingPage = document.querySelector('section')
let retryBtn = document.querySelector('.retry-btn')
let gameResult = document.querySelector('h4')
let playerOneDatas = []
let playerTwoDatas = []
let buttonsClickStatus = []
let togglePlayer = true
let isFinish = false
let winnigCombination = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
]

let playerStatus = []

const construction = () => {
    if (togglePlayer){
        let btnIndex = setPlayerDatas(event , '#63d388' , playerOneDatas)
        buttonClicked(btnIndex) 
        togglePlayer = !togglePlayer
        winnigCombination.forEach(winComb => {
            if (playerOneDatas[winComb[0]] === true && playerOneDatas[winComb[1]] === true && playerOneDatas[winComb[2]] === true) {
                gameOver('Player One Wins')
            }
        })
               
    } else {
        let btnIndex = setPlayerDatas(event , '#db5555' , playerTwoDatas)
        buttonClicked(btnIndex)
        togglePlayer = !togglePlayer
        winnigCombination.forEach( winComb => {
            if (playerTwoDatas[winComb[0]] === false && playerTwoDatas[winComb[1]] === false && playerTwoDatas[winComb[2]] === false) {
                gameOver('Player Two Wins')
            }
        })
    }
}

const setPlayerDatas = (event , color , dataCon ) => {
    let buttonIndex = +event.target.dataset.num - 1
    event.target.style.backgroundColor = color
    dataCon[buttonIndex] = togglePlayer
    return buttonIndex
}

const gameOver = (winner) => {
        setTimeout( () => {
            endingPage.style.display = 'flex'
            gameResult.innerHTML = winner 
        } , 500)
        removeEvents()
}

const drawCheck = () => {
    if (buttonsClickStatus[0] === true && buttonsClickStatus[1] === true && buttonsClickStatus[2] === true && buttonsClickStatus[3] === true && buttonsClickStatus[4] === true && buttonsClickStatus[5] === true && buttonsClickStatus[6] === true && buttonsClickStatus[7] === true && buttonsClickStatus[8] === true ){
        gameOver('draw')
    }
}

const buttonClicked = (index) => {
    buttonsClickStatus[index] = true
}

const removeEvents = () => {
    buttons.forEach((button) => {
        button.removeEventListener('click' , construction)
        button.removeEventListener('click' , drawCheck)
    })
}

buttons.forEach(button => {
    button.addEventListener('click' , construction , {once : true})
    button.addEventListener('click' , drawCheck)
})

retryBtn.addEventListener('click' , () => {
    location.reload()
})  