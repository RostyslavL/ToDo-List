const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUl = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
  todos.forEach(todo =>{
    addToDo(todo)
  })
}

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  addToDo()
  
})

function addToDo(todo){
  let todoText = input.value

  if(todo){
    todoText = todo.text
  }
  if(todoText){
    let todoElement = document.createElement('li')
    if(todo && todo.completed){
      todoElement.classList.add('completed')

    }
    todoElement.innerText =  todoText
    todoElement.addEventListener('click', ()=>{
      todoElement.classList.toggle('completed')
      updateLocalStorage()
    })
    todoElement.addEventListener('contextmenu', (e)=>{
     e.preventDefault()
     todoElement.remove()
     updateLocalStorage()
    })

    todosUl.appendChild(todoElement)
    input.value = ''

    updateLocalStorage()
  }
  
  
}

function updateLocalStorage() {
  todoElement = document.querySelectorAll('li')
  const todos = []
  todoElement.forEach(todoEl => todos.push({
    text: todoEl.innerText,
    completed: todoEl.classList.contains('completed')
  }))
  localStorage.setItem('todos',JSON.stringify(todos))
}