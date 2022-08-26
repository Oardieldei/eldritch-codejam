import ancientsData from './data/ancients'
import { brownCards, blueCards, greenCards } from './data/mythicCards/index'

function shuffle(array) {
	let cloneArray = JSON.parse(JSON.stringify(array))
	let t
	let j

	for (let i = cloneArray.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1))

		t = cloneArray[i]
		cloneArray[i] = cloneArray[j]
		cloneArray[j] = t
	}

	return cloneArray
}

function getDifficultiesCars(color, difficult) {
	let newArr = []

	for (let i = 0; i < color.length; i++) {
		if (color[i].difficulty == difficult) { newArr.push(color[i]) }
	}

	return newArr
}

function getFullCards(ancientIndex) {
	function getCardsByColor(color) {
		const value = ancientsData[ancientIndex]
		return value.firstStage[color] + value.secondStage[color] + value.thirdStage[color]
	}

	return [getCardsByColor('greenCards'), getCardsByColor('blueCards'), getCardsByColor('brownCards')]
}

function noobMod(ancientIndex) {
	const fullCards = getFullCards(ancientIndex)
	let allNeedsCards = []

	function getNeedsCardsByColor(color, needs) {
		let allColorCards = []
		let easyCards = getDifficultiesCars(color, 'easy')

		if (easyCards.length < needs) {
			const normalCards = getDifficultiesCars(color, 'normal')
			allColorCards = allColorCards.concat(easyCards)
			const fewNormalCards = normalCards.slice(allColorCards.length - needs)
			allColorCards = allColorCards.concat(fewNormalCards)
			allColorCards = shuffle(allColorCards)
		} else {
			easyCards = shuffle(easyCards)
			allColorCards = easyCards.slice(-needs)
		}

		return allColorCards
	}

	allNeedsCards = allNeedsCards.concat(getNeedsCardsByColor(greenCards, fullCards[0]))
		.concat(getNeedsCardsByColor(blueCards, fullCards[1]))
		.concat(getNeedsCardsByColor(brownCards, fullCards[2]))
	allNeedsCards = shuffle(allNeedsCards)

	return allNeedsCards
}

function easyMod(ancientIndex) {
	const fullCards = getFullCards(ancientIndex)
	let allNeedsCards = []

	function getNeedsCardsByColor(color, needs) {
		let allColorCards = []
		const easyCards = getDifficultiesCars(color, 'easy')
		const normalCards = getDifficultiesCars(color, 'normal')
		let t = easyCards.concat(normalCards)
		t = shuffle(t)
		allColorCards = t.slice(-needs)

		return allColorCards
	}

	allNeedsCards = allNeedsCards.concat(getNeedsCardsByColor(greenCards, fullCards[0]))
		.concat(getNeedsCardsByColor(blueCards, fullCards[1]))
		.concat(getNeedsCardsByColor(brownCards, fullCards[2]))
	allNeedsCards = shuffle(allNeedsCards)

	return allNeedsCards
}

function normalMod(ancientIndex) {
	const fullCards = getFullCards(ancientIndex)
	let allNeedsCards = []

	function getNeedsCardsByColor(color, needs) {
		let allColorCards = []
		let t = shuffle(color)
		allColorCards = t.slice(-needs)

		return allColorCards
	}

	allNeedsCards = allNeedsCards.concat(getNeedsCardsByColor(greenCards, fullCards[0]))
		.concat(getNeedsCardsByColor(blueCards, fullCards[1]))
		.concat(getNeedsCardsByColor(brownCards, fullCards[2]))
	allNeedsCards = shuffle(allNeedsCards)

	return allNeedsCards
}

function hardMod(ancientIndex) {
	const fullCards = getFullCards(ancientIndex)
	let allNeedsCards = []

	function getNeedsCardsByColor(color, needs) {
		let allColorCards = []
		const hardCards = getDifficultiesCars(color, 'hard')
		const normalCards = getDifficultiesCars(color, 'normal')
		let t = hardCards.concat(normalCards)
		t = shuffle(t)
		allColorCards = t.slice(-needs)

		return allColorCards
	}

	allNeedsCards = allNeedsCards.concat(getNeedsCardsByColor(greenCards, fullCards[0]))
		.concat(getNeedsCardsByColor(blueCards, fullCards[1]))
		.concat(getNeedsCardsByColor(brownCards, fullCards[2]))
	allNeedsCards = shuffle(allNeedsCards)

	return allNeedsCards
}

function impossibleMod(ancientIndex) {
	const fullCards = getFullCards(ancientIndex)
	let allNeedsCards = []

	function getNeedsCardsByColor(color, needs) {
		let allColorCards = []
		let hardCards = getDifficultiesCars(color, 'hard')

		if (hardCards.length < needs) {
			const normalCards = getDifficultiesCars(color, 'normal')
			allColorCards = allColorCards.concat(hardCards)
			const fewNormalCards = normalCards.slice(allColorCards.length - needs)
			allColorCards = allColorCards.concat(fewNormalCards)
			allColorCards = shuffle(allColorCards)
		} else {
			hardCards = shuffle(hardCards)
			allColorCards = hardCards.slice(-needs)
		}

		return allColorCards
	}

	allNeedsCards = allNeedsCards.concat(getNeedsCardsByColor(greenCards, fullCards[0]))
		.concat(getNeedsCardsByColor(blueCards, fullCards[1]))
		.concat(getNeedsCardsByColor(brownCards, fullCards[2]))
	allNeedsCards = shuffle(allNeedsCards)

	return allNeedsCards
}

function getCardsByStage(cardsArray, ancientIndex) {
	let stOne = []
	let stTwo = []
	let stThree = []
	const ancient = ancientsData[ancientIndex]

	function getCardsByStageAndColor(color, colorA) {
		let newArr = []

		for (let i = 0; i < cardsArray.length; i++) {
			if (cardsArray[i].color == color) { newArr.push(cardsArray[i]) }
		}

		let stOneColor = newArr.splice(0, ancient.firstStage[colorA])
		let stTwoColor = newArr.splice(0, ancient.secondStage[colorA])
		let stThreeColor = newArr.splice(0, ancient.thirdStage[colorA])

		stOne = stOne.concat(stOneColor)
		stTwo = stTwo.concat(stTwoColor)
		stThree = stThree.concat(stThreeColor)
	}

	getCardsByStageAndColor('green', 'greenCards')
	getCardsByStageAndColor('blue', 'blueCards')
	getCardsByStageAndColor('brown', 'brownCards')

	stOne = shuffle(stOne)
	stTwo = shuffle(stTwo)
	stThree = shuffle(stThree)

	console.log([stOne, stTwo, stThree])
	return [stOne, stTwo, stThree]
}

let ancientIndexValue

const ancientsDiv = document.querySelector('.ancients')
const yourAncientDiv = document.querySelector('.your-ancient')
const difficultDiv = document.querySelector('.difficulties')
const diffTextDiv = document.querySelector('.diff-text')
const diffValueDiv = document.querySelector('.diff-value')

for (let child of ancientsDiv.children) {
	child.addEventListener('click', () => {
		ancientsDiv.classList.remove('item-on')
		ancientsDiv.classList.add('item-off')
		setTimeout(() => {
			ancientsDiv.style.visibility = 'hidden'
			ancientsDiv.style.opacity = '0'
		}, 1900)
		setTimeout(() => {
			yourAncientDiv.style.visibility = 'visible'
			yourAncientDiv.classList.add('item-on')
		}, 1200)
		setTimeout(() => {
			difficultDiv.style.visibility = 'visible'
			difficultDiv.children[0].style.visibility = 'visible'
			difficultDiv.children[0].classList.add('item-on')
		}, 2400)
		setTimeout(() => {
			difficultDiv.children[1].style.visibility = 'visible'
			difficultDiv.children[1].classList.add('item-on')
		}, 2900)
		setTimeout(() => {
			difficultDiv.children[2].style.visibility = 'visible'
			difficultDiv.children[2].classList.add('item-on')
		}, 3400)
		setTimeout(() => {
			difficultDiv.children[3].style.visibility = 'visible'
			difficultDiv.children[3].classList.add('item-on')
		}, 3900)
		setTimeout(() => {
			difficultDiv.children[4].style.visibility = 'visible'
			difficultDiv.children[4].classList.add('item-on')
		}, 4400)
		setTimeout(() => {
			diffTextDiv.style.visibility = 'visible'
			diffTextDiv.classList.add('item-on')
		}, 4900)
	})
}

ancientsDiv.children[0].addEventListener('click', () => {
	setTimeout(() => {
		ancientIndexValue = 0
		yourAncientDiv.style.width = '443px'
		diffValueDiv.style.width = '443px'
		yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/Azathoth.png')"
	}, 1200)
})

ancientsDiv.children[1].addEventListener('click', () => {
	setTimeout(() => {
		ancientIndexValue = 1
		yourAncientDiv.style.width = '436px'
		diffValueDiv.style.width = '436px'
		yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/Cthulthu.png')"
	}, 1200)
})

ancientsDiv.children[2].addEventListener('click', () => {
	setTimeout(() => {
		ancientIndexValue = 2
		yourAncientDiv.style.width = '438px'
		diffValueDiv.style.width = '438px'
		yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/IogSothoth.png')"
	}, 1200)
})

ancientsDiv.children[3].addEventListener('click', () => {
	setTimeout(() => {
		ancientIndexValue = 3
		yourAncientDiv.style.width = '440px'
		diffValueDiv.style.width = '440px'
		yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/ShubNiggurath.png')"
	}, 1200)
})

difficultDiv.children[0].addEventListener('mouseenter', () => {
	diffTextDiv.innerHTML = 'Где это я? Что я здесь делаю?<br /><br />Я не хочу быть здесь.<br /><br />Пожалуйста, помогите.<br /><br />Мне очень плохо.<br /><br />Я хочу побыстрее уйти отсюда.'
})

difficultDiv.children[0].addEventListener('mouseleave', () => {
	diffTextDiv.innerHTML = ''
})

difficultDiv.children[1].addEventListener('mouseenter', () => {
	diffTextDiv.innerHTML = 'Ух ты! Интересное место.<br /><br />Здесь, конечно, красиво, но жутковато.<br /><br />Пожалуй, мне лучше вести себя осторожно.<br /><br />Хотя что может случиться?<br /><br />Я гляну одним глазком.'
})

difficultDiv.children[1].addEventListener('mouseleave', () => {
	diffTextDiv.innerHTML = ''
})

difficultDiv.children[2].addEventListener('mouseenter', () => {
	diffTextDiv.innerHTML = 'Оу, меня всегда завораживала мистика.<br /><br />Так здорово, что можно не бояться.<br /><br />Ведь это все не настоящее.<br /><br />Здесь мне ничто не угрожает.<br /><br />Ведь так?..'
})

difficultDiv.children[2].addEventListener('mouseleave', () => {
	diffTextDiv.innerHTML = ''
})

difficultDiv.children[3].addEventListener('mouseenter', () => {
	diffTextDiv.innerHTML = 'Наконец-то острые ощущения!<br /><br />Терпеть не могу скучные фентези.<br /><br />Мне, конечно, страшно, но очень любопытно.<br /><br />Главное не показывать свой страх.<br /><br />Поехали!'
})

difficultDiv.children[3].addEventListener('mouseleave', () => {
	diffTextDiv.innerHTML = ''
})

difficultDiv.children[4].addEventListener('mouseenter', () => {
	diffTextDiv.innerHTML = 'Что? Лавкрафт?<br /><br />Пфф, этим меня не удивишь.<br /><br />Думаете, тут что-то сможет испугать меня?<br /><br />Да я накеров на завтрак ем.<br /><br />Сейчас я покажу, кто здесь главный.'
})

difficultDiv.children[4].addEventListener('mouseleave', () => {
	diffTextDiv.innerHTML = ''
})

for (let i = 0; i < difficultDiv.children.length; i++) {
	difficultDiv.children[i].addEventListener('click', () => {
		difficultDiv.classList.add('item-off')
		difficultDiv.classList.remove('item-on')
		diffTextDiv.classList.add('item-off')
		diffTextDiv.classList.remove('item-on')
		setTimeout(() => {
			difficultDiv.style.visibility = 'hidden'
			diffTextDiv.style.visibility = 'hidden'
			difficultDiv.style.opacity = '0'
			diffTextDiv.style.opacity = '0'

			diffValueDiv.innerHTML = difficultDiv.children[i].innerHTML
			diffValueDiv.style.visibility = 'visible'
			diffValueDiv.classList.add('item-on')

		}, 1900)
	})
}

difficultDiv.children[0].addEventListener('click', () => {
	getCardsByStage(noobMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[1].addEventListener('click', () => {
	getCardsByStage(easyMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[2].addEventListener('click', () => {
	getCardsByStage(normalMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[3].addEventListener('click', () => {
	getCardsByStage(hardMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[4].addEventListener('click', () => {
	getCardsByStage(impossibleMod(ancientIndexValue), ancientIndexValue)
})