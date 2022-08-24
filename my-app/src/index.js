import difficulties from './data/difficulties'
import ancientsData from './data/ancients'
console.log(ancientsData)
console.log(difficulties)

const btn = document.querySelector('.btnbtn')
const bodyItem = document.querySelector('body')

btn.addEventListener('click', () => {
	bodyItem.style.backgroundImage = `url(${ancientsData[0].cardFace})`
	console.log(bodyItem)
})