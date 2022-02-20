import {inputSearchEl, resultSearchEl, resultSearchLengthEl, tableDatas, tableHeds} from "./utils/dom/elements-html.js"
import {EventType} from "./utils/enums/event-type.js";
import {dictionary, gematria, gematriaInverse} from "./utils/dict.js";
import {invertString} from "./utils/functions.js";

inputSearchEl.addEventListener(EventType.INPUT, event => {
    const text = event.target.value
    const first = getGematria(text, gematria)
    const second = Number(invertString(`${first}`))
    const third = sumDigits(text.length + first)
    const fourth = getGematria(text, gematriaInverse)
    const fifth = Number(invertString(`${fourth}`))
    const sixth = third
    const firstLetter = numberToLetter(first)
    const secondLetter = numberToLetter(second)
    const thirdLetter = numberToLetter(third)
    const fourthLetter = numberToLetter(fourth)
    const fifthLetter = numberToLetter(fifth)
    const sixthLetter = numberToLetter(sixth)
    const searchValue = dictionary[firstLetter + secondLetter + thirdLetter + fourthLetter + fifthLetter + sixthLetter]
    const numberByLetter = [
        { 'number': first, 'letter': firstLetter },
        { 'number': second, 'letter': secondLetter },
        { 'number': third, 'letter': thirdLetter },
        { 'number': fourth, 'letter': fourthLetter },
        { 'number': fifth, 'letter': fifthLetter },
        { 'number': sixth, 'letter': sixthLetter },
    ]
    saveLocalStorage(text, searchValue, numberByLetter)
})

function sumDigits(sum) {
    let sumDigits = 0
    const sumString = `${sum}`
    sumString.split('').forEach(v => sumDigits += Number(v))
    return sumDigits
}

function getGematria(text, gematriaText) {
    let sumGematria = 0;
    text.split('').forEach(letter => {
        sumGematria += (gematriaText.indexOf(letter) + 1)
    })
    return sumGematria
}

function numberToLetter(number) {
    if (number % 2 === 0) {
        return 'P'
    }
    return 'I'
}

function setTableHeads(numberByLetter) {
    numberByLetter.forEach((element, index) => {
        tableHeds[index].innerHTML = `${numberByLetter[index]['number']}`
        tableDatas[index].innerHTML = `${numberByLetter[index]['letter']}`
    })
}

function saveLocalStorage(searchKey, searchValue, numberByLetter) {
    if (searchKey && searchValue && numberByLetter) {
        resultSearchLengthEl.innerHTML = `${searchKey.length} letras`
        resultSearchEl.innerHTML = `${searchKey} = ${searchValue}`
        setTableHeads(numberByLetter)
    }
}