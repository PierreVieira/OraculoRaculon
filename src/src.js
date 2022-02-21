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
    const sixth = sumDigits(text.length + fourth)
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
    setInfo(text, searchValue, numberByLetter)
})

function sumDigits(sum) {
    if (sum <= 9 && sum >= 0) {
        return sum
    }
    const sumString = `${sum}`
    return sumDigits(sumDigitsString(sumString))
}

function sumDigitsString(string) {
    let sum = 0
    string.split('').forEach(value => sum += Number(value))
    return sum
}

function getGematria(text, gematriaText) {
    let sumGematria = 0;
    text.split('').forEach(letter => {
        sumGematria += (gematriaText.indexOf(letter.toLowerCase()) + 1)
    })
    return sumGematria
}

function numberToLetter(number) {
    if (number % 2 === 0) {
        return 'P'
    }
    return 'I'
}

function setInfo(searchKey, searchValue, numberByLetter) {
    if (searchKey && searchValue && numberByLetter) {
        resultSearchLengthEl.innerHTML = `${searchKey.length} letras`
        resultSearchEl.innerHTML = `${searchKey} = ${searchValue}`
        setTableContent(numberByLetter)
    } else {
        resultSearchEl.innerHTML = ''
        resultSearchLengthEl.innerHTML = ''
        emptyTable()
    }
}

function setTableContent(numberByLetter) {
    numberByLetter.forEach((element, index) => {
        tableHeds[index].innerHTML = `${numberByLetter[index]['number']}`
        tableDatas[index].innerHTML = `${numberByLetter[index]['letter']}`
    })
}

function emptyTable() {
    for (let i = 0; i < 6; ++i) {
        tableHeds[i].innerHTML = '0'
        tableDatas[i].innerHTML = '_'
    }
}
