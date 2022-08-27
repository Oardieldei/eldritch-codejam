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

function getDifficultiesCards(color, difficult) {
	return color.filter(el => el.difficulty == difficult)
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
		let easyCards = getDifficultiesCards(color, 'easy')

		if (easyCards.length < needs) {
			const normalCards = getDifficultiesCards(color, 'normal')
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
		const easyCards = getDifficultiesCards(color, 'easy')
		const normalCards = getDifficultiesCards(color, 'normal')
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
		const hardCards = getDifficultiesCards(color, 'hard')
		const normalCards = getDifficultiesCards(color, 'normal')
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
		let hardCards = getDifficultiesCards(color, 'hard')

		if (hardCards.length < needs) {
			const normalCards = getDifficultiesCards(color, 'normal')
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
const cardsDiv = document.querySelector('.cards-container')
const cardUpBg = document.querySelector('.card-up_bg')

ancientsDiv.children[0].addEventListener('click', () => {
	ancientIndexValue = 0
	yourAncientDiv.style.width = '443px'
	diffValueDiv.style.width = '443px'
	yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/Azathoth.png')"
})

ancientsDiv.children[1].addEventListener('click', () => {
	ancientIndexValue = 1
	yourAncientDiv.style.width = '436px'
	diffValueDiv.style.width = '436px'
	yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/Cthulthu.png')"
})

ancientsDiv.children[2].addEventListener('click', () => {
	ancientIndexValue = 2
	yourAncientDiv.style.width = '438px'
	diffValueDiv.style.width = '438px'
	yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/IogSothoth.png')"
})

ancientsDiv.children[3].addEventListener('click', () => {
	ancientIndexValue = 3
	yourAncientDiv.style.width = '440px'
	diffValueDiv.style.width = '440px'
	yourAncientDiv.style.backgroundImage = "url('./assets/Ancients/ShubNiggurath.png')"
})

function getCardsCount(stage, stageNum) {
	cardsDiv.children[1].children[stageNum - 1].children[0].innerHTML = ancientsData[ancientIndexValue][stage].greenCards
	cardsDiv.children[1].children[stageNum - 1].children[1].innerHTML = ancientsData[ancientIndexValue][stage].brownCards
	cardsDiv.children[1].children[stageNum - 1].children[2].innerHTML = ancientsData[ancientIndexValue][stage].blueCards
}

function showCurrentAncient() {
	setTimeout(() => {
		yourAncientDiv.style.visibility = 'visible'
		yourAncientDiv.classList.add('item-on')
		setTimeout(() => {
			yourAncientDiv.style.opacity = '1'
		}, 1900);
	}, 1000)
}

function showDifficulties() {
	setTimeout(() => {
		difficultDiv.style.visibility = 'visible'
		difficultDiv.children[0].style.visibility = 'visible'
		difficultDiv.children[0].classList.add('item-on')
	}, 2000)
	setTimeout(() => {
		difficultDiv.children[1].style.visibility = 'visible'
		difficultDiv.children[1].classList.add('item-on')
	}, 2500)
	setTimeout(() => {
		difficultDiv.children[2].style.visibility = 'visible'
		difficultDiv.children[2].classList.add('item-on')
		yourAncientDiv.classList.remove('item-on')
	}, 3000)
	setTimeout(() => {
		difficultDiv.children[3].style.visibility = 'visible'
		difficultDiv.children[3].classList.add('item-on')
	}, 3500)
	setTimeout(() => {
		difficultDiv.children[4].style.visibility = 'visible'
		difficultDiv.children[4].classList.add('item-on')
	}, 4000)
	setTimeout(() => {
		diffTextDiv.style.visibility = 'visible'
		diffTextDiv.classList.add('item-on')
		yourAncientDiv.addEventListener('click', () => {
			hideCards()
			hideDiffValueDiv()
			hideDifficulties()
			hideYourAncient()
			setTimeout(() => {
				showAncients()
			}, 1900)
		})
	}, 4500)
}

function showAncients() {
	ancientsDiv.style.opacity = '1'
	ancientsDiv.classList.add('item-on')
	ancientsDiv.style.visibility = 'visible'
	setTimeout(() => {

		ancientsDiv.classList.remove('item-on')
	}, 1900)
}

function hideAncients() {
	ancientsDiv.classList.remove('item-on')
	ancientsDiv.classList.add('item-off')
	setTimeout(() => {
		ancientsDiv.style.opacity = '0'
		ancientsDiv.style.visibility = 'hidden'
		ancientsDiv.classList.remove('item-off')
	}, 1900)
}

for (let child of ancientsDiv.children) {
	child.addEventListener('click', () => {
		hideAncients()
		setTimeout(() => {
			showCurrentAncient()
			showDifficulties()
		}, 1000)
	})
}

function hideDiffValueDiv() {
	diffValueDiv.classList.add('item-off')
	setTimeout(() => {
		diffValueDiv.style.visibility = 'hidden'
		diffValueDiv.style.opacity = '0'
		diffValueDiv.classList.remove('item-off')
	}, 1900)
}

function hideCards() {
	cardsDiv.classList.remove('item-on')
	cardsDiv.classList.add('item-off')
	setTimeout(() => {
		cardsDiv.style.visibility = 'hidden'
		cardsDiv.style.opacity = '0'
		cardsDiv.classList.remove('item-off')
		cardsCounterValue = 0
		stageCounterValue = 0
		isDead = false

		for (let i of cardsDiv.children[2].children) {
			for (let j of i.children) {
				j.style.background = 'rgba(87, 87, 87, 0.267)'
			}
		}

		cardsDiv.children[0].style.alignItems = 'flex-start'

	}, 1900)
}

diffValueDiv.addEventListener('click', () => {
	hideCards()
	hideDiffValueDiv()
	showDifficulties()
})

function hideYourAncient() {
	yourAncientDiv.classList.add('item-off')
	setTimeout(() => {
		yourAncientDiv.style.visibility = 'hidden'
		yourAncientDiv.style.opacity = '0'
		yourAncientDiv.classList.remove('item-off')
	}, 1900);
}

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

function showDeck() {
	getCardsCount('firstStage', 1)
	getCardsCount('secondStage', 2)
	getCardsCount('thirdStage', 3)

	diffValueDiv.style.visibility = 'visible'
	diffValueDiv.classList.add('item-on')
	setTimeout(() => {
		diffValueDiv.classList.remove('item-on')
		diffValueDiv.style.opacity = '1'
		cardsDiv.style.visibility = 'visible'
		cardsDiv.classList.add('item-on')
		cardsDiv.style.opacity = '1'
	}, 1900)
}

function hideDifficulties() {
	difficultDiv.classList.add('item-off')
	difficultDiv.classList.remove('item-on')
	diffTextDiv.classList.add('item-off')
	diffTextDiv.classList.remove('item-on')
	setTimeout(() => {
		difficultDiv.style.visibility = 'hidden'
		diffTextDiv.style.visibility = 'hidden'

		for (let child of difficultDiv.children) {
			child.style.visibility = 'hidden'
			child.classList.remove('item-on')
		}

		diffTextDiv.classList.remove('item-off')
		difficultDiv.classList.remove('item-off')
	}, 1900)
}

for (let i = 0; i < difficultDiv.children.length; i++) {
	difficultDiv.children[i].addEventListener('click', () => {
		diffValueDiv.innerHTML = difficultDiv.children[i].innerHTML
		hideDifficulties()
		showDeck()
	})
}

let whatIsMyCards = []

difficultDiv.children[0].addEventListener('click', () => {
	whatIsMyCards = getCardsByStage(noobMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[1].addEventListener('click', () => {
	whatIsMyCards = getCardsByStage(easyMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[2].addEventListener('click', () => {
	whatIsMyCards = getCardsByStage(normalMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[3].addEventListener('click', () => {
	whatIsMyCards = getCardsByStage(hardMod(ancientIndexValue), ancientIndexValue)
})

difficultDiv.children[4].addEventListener('click', () => {
	whatIsMyCards = getCardsByStage(impossibleMod(ancientIndexValue), ancientIndexValue)
})

cardUpBg.addEventListener('click', () => {
	cardUpBg.classList.remove('popup-on')
	cardUpBg.classList.add('popup-off')
	setTimeout(() => {
		cardUpBg.style.visibility = 'hidden'
	}, 900)
})

let cardsCounterValue = 0
let stageCounterValue = 0
let isDead = false

function giveACard() {
	let thisCard = whatIsMyCards[stageCounterValue].pop()
	cardsDiv.children[2].children[stageCounterValue].children[cardsCounterValue].style.background = `center / cover url(${thisCard.cardFace})`

	cardsDiv.children[2].children[stageCounterValue].children[cardsCounterValue].addEventListener('click', () => {
		cardUpBg.classList.remove('popup-off')
		cardUpBg.classList.add('popup-on')
		cardUpBg.style.visibility = 'visible'
		if (cardUpBg.children[0].children[0]) cardUpBg.children[0].children[0].remove()
		const img = new Image()
		img.src = thisCard.cardFace
		cardUpBg.children[0].append(img)
	})

	switch (thisCard.color) {
		case 'green':
			cardsDiv.children[1].children[stageCounterValue].children[0].innerHTML = cardsDiv.children[1].children[stageCounterValue].children[0].innerText - 1
			break;
		case 'brown':
			cardsDiv.children[1].children[stageCounterValue].children[1].innerHTML = cardsDiv.children[1].children[stageCounterValue].children[1].innerText - 1
			break;
		case 'blue':
			cardsDiv.children[1].children[stageCounterValue].children[2].innerHTML = cardsDiv.children[1].children[stageCounterValue].children[2].innerText - 1
			break;
	}

	cardsCounterValue++

	if (whatIsMyCards[stageCounterValue].length === 0) {
		stageCounterValue++
		cardsCounterValue = 0

		cardsDiv.children[0].classList.add('popup-off')
		setTimeout(() => {
			if (stageCounterValue === 1) {
				cardsDiv.children[0].style.alignItems = 'center'
			} else if (stageCounterValue === 2) {
				cardsDiv.children[0].style.alignItems = 'flex-end'
			} else {
				cardsDiv.children[0].style.alignItems = 'flex-start'
			}
			cardsDiv.children[0].classList.remove('popup-off')
			cardsDiv.children[0].classList.add('popup-on')
			setTimeout(() => {
				cardsDiv.children[0].classList.remove('popup-on')
			}, 1000)
		}, 1000)
	}

	if (stageCounterValue === 3) {
		stageCounterValue = 0
		isDead = !isDead
	}
}

const endDeck = document.querySelector('.end-deck_bg')

function endingDeckOff() {
	endDeck.style.opacity = '1'
	endDeck.children[1].style.opacity = '1'
	endDeck.classList.add('popup-off')
	endDeck.children[1].classList.add('popup-off')
	setTimeout(() => {
		endDeck.style.opacity = '0'
		endDeck.children[1].opacity = '0'
		endDeck.style.visibility = 'hidden'
		endDeck.children[1].style.visibility = 'hidden'
		endDeck.classList.remove('popup-off')
		endDeck.children[1].classList.remove('popup-off')
	}, 1000)
}

function endingDeck() {
	endDeck.style.opacity = '0'
	endDeck.style.visibility = 'visible'
	endDeck.classList.add('item-on')
	setTimeout(() => {
		endDeck.style.opacity = '1'
		endDeck.classList.remove('item-on')
		endDeck.children[1].opacity = '0'
		endDeck.children[1].style.visibility = 'visible'
		endDeck.children[1].classList.add('popup-on')
		setTimeout(() => {
			endDeck.children[1].style.opacity = '1'
			endDeck.children[1].classList.remove('popup-on')
		}, 900)
	}, 1900)
	
	endDeck.children[1].addEventListener('click', () => {
		endingDeckOff()
		hideCards()
		hideDiffValueDiv()
		hideDifficulties()
		hideYourAncient()
		setTimeout(() => {
			showAncients()
		}, 1900)
	})
}

cardsDiv.children[0].children[0].addEventListener('click', () => {
	if (!isDead) {
		giveACard()
	} else {
		endingDeck()
	}
})