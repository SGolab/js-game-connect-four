let grid = document.querySelector("#grid");

const gridWidth = 5
const requiredLength = 4
let turn = 'red'

let fields = []

prepareGame()

function prepareGame() {
    for (let i = 0; i < gridWidth; i++) {
        let column = document.createElement('div')
        column.classList.add('column')
        column.setAttribute('columnId', i)
        grid.appendChild(column)
        column.addEventListener('click', onClick)
    }

    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            let element = document.createElement('div');
            element.classList.add('field')
            grid.appendChild(element)
            fields.push(element)
        }
    }
}

function onClick() {
    let lastElementInColumnIndex = fields.length - (gridWidth - this.getAttribute('columnId'))

    while (true) {
        const element = fields[lastElementInColumnIndex]

        if (!element.classList.contains('circle')) {
            element.classList.add('circle')

            if (turn === 'red') {
                element.classList.add('red')
                turn = 'blue'
                grid.style.borderColor = 'blue'
                break
            } else if (turn === 'blue') {
                element.classList.add('blue')
                turn = 'red'
                grid.style.borderColor = 'red'
                break
            }
        }

        if (lastElementInColumnIndex - gridWidth >= 0) {
            lastElementInColumnIndex -= gridWidth
        } else {
            break
        }
    }
    checkResult(lastElementInColumnIndex)
}

function checkResult(index) {
    if (fields.every(field => field.classList.contains('circle'))) {
        alert("DRAW")
    }

    const element = fields[index]
    let color

    if (element.classList.contains('red')) {
        color = 'red'
    } else if (element.classList.contains('blue')) {
        color = 'blue'
    }

    if (isIndexToRightCorrect(index, color)
        || isIndexToLeftCorrect(index, color)
        || isIndexToDownCorrect(index, color)) {
        alert(color + " wins!")
    }
}

function isIndexToRightCorrect(index, color) {
    if (index % gridWidth + (requiredLength - 1) < gridWidth) {
        for (let j = 1; j < requiredLength; j++) {
            if (!fields[index + j].classList.contains(color)) {
                return false
            }
        }
        return true
    }
}

function isIndexToLeftCorrect(index, color) {
    if (index % gridWidth - (requiredLength - 1) >= 0) {
        for (let j = 1; j < requiredLength; j++) {
            if (!fields[index - j].classList.contains(color)) {
                return false
            }
        }
        return true
    }
}

function isIndexToDownCorrect(index, color) {
    if (index + (requiredLength - 1) * gridWidth < gridWidth * gridWidth) {
        for (let j = 1; j < requiredLength; j++) {
            if (!fields[index + j * gridWidth].classList.contains(color)) {
                return false
            }
        }
        return true
    }
}
