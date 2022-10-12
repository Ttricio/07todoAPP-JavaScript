let todoInput
let errorInfo
let addBtn
let ulList // lista zadań tagi ul
let newTodo // nowo dodany Li, nowe zadanie

let popup //popup
let popupInfo // tekst wpopupie jak się doda pusty tekst
let popupToEdit // edytowany todo
let popupIput // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupcloseBtn // przycisk"anuluj" w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input")
	errorInfo = document.querySelector(".error-info")
	addBtn = document.querySelector(".btn-add")
	ulList = document.querySelector(".todolist ul")
	popup = document.querySelector(".popup")
	popupInfo = document.querySelector(".popup-info")
	popupInput = document.querySelector(".popup-input")
	popupAddBtn = document.querySelector(".accept")
	popupcloseBtn = document.querySelector(".cancel")
}
//nasluchuje na klik jak kliknę na któryś z przycisków to wtedy uruchamia funkcę która jest zadana w nawiasie
const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo)
	ulList.addEventListener("click", checkClick)
	popupcloseBtn.addEventListener("click", closePopup)
	popupAddBtn.addEventListener("click", changeTodoText)
	todoInput.addEventListener('keyup', enterCheck )
}
const addNewTodo = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li")
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)

		createToolsArea()
		todoInput.value = ""
		errorInfo.textContent = ""
	} else {
		errorInfo.textContent = "Wpisz treść zadania"
	}
}
const createToolsArea = () => {
	const toolsPanel = document.createElement("div")
	toolsPanel.classList.add("tools")
	newTodo.append(toolsPanel)

	const completeBtn = document.createElement("button")
	completeBtn.classList.add("complete")
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement("button")
	editBtn.classList.add("edit")
	editBtn.textContent = "EDIT"

	const deleteBtn = document.createElement("button")
	deleteBtn.classList.add("delete")
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = (e) => {
	console.log(e.target.matches)
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed")
		e.target.classList.toggle("completed")
	} else if (e.target.matches(".edit")) {
		editTodo(e)
	} else if (e.target.matches(".delete")) {
		deleteToDo(e)
	}
	deleteToDo(e)
}
const editTodo = (e) => {
	todoToEdit = e.target.closest("li")

	popupInput.value = todoToEdit.firstChild.textContent
	console.log(todoToEdit.firstChild)
	popup.style.display = "flex"
}
const closePopup = () => {
	popup.style.display = "none"
	popupInfo.textContent = ""
}
const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = "none"
	} else {
		popupInfo.textContent = "Musisz podać treść!"
	}
}
const deleteToDo = (e) => {
	e.target.closest("li").remove()
	const allTodos = document.querySelectorAll('li')

	if (allTodos.lenght === 0) {
		errorInfo.textContent = "Brak zadań na liście"
	}
}
const enterCheck = (e) => {
	if(e.key === 'Enter')
	addNewTodo()
	
}

document.addEventListener("DOMContentLoaded", main)
