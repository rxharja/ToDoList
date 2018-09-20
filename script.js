var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //get number of completed todos
    this.todos.forEach(function(todo) {
      if(todo.completed === true) {
        completedTodos++
      }
    });
    // Case 1: If everything’s true, make everything false.
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }
    // Case 2: Else, make everything true.
      else {
        todo.completed = true;
      }
    });
  },
  clearCompleted: function() {
    var i = this.todos.length;
    while (i--) {
      if (this.todos[i].completed){
        this.deleteTodo(i);
      }
    }
  },
  sortCompleted: function() {
    this.todos.sort(todo => todo.completed);
  }
};

var handlers = {

  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    if (addTodoTextInput !== ''){
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
    }
    view.displayTodos();
  },
  changeTodo: function(position,text) {
    todoList.changeTodo(position,text);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  clearCompleted: function() {
    todoList.clearCompleted();
    view.displayTodos();
  },
  sortCompleted: function() {
    todoList.sortCompleted();
    view.displayTodos();
  }
};

var utilizeEnter = function(id) {
  if (event.keyCode === 13){
    document.getElementById(id).click()
  }
};

var view = {
  displayTodos: function() {
    var todoMenu = document.getElementById('menu');
    var todosUl = document.getElementById('todoUl');
    todosUl.innerHTML = '';
    todoMenu.innerHTML = '';

    var p = document.createElement('p');
    p.innerHTML = todoList.todos.filter(todo => !todo.completed).length + ' left';
    todoMenu.appendChild(p);

    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('Li');

      var checkbox = document.createElement('input');
      checkbox.type="checkbox";

      var label = document.createElement('label')
      label.htmlFor = position;
      label.className = 'label';
      label.appendChild(document.createTextNode(todo.todoText));

      if(todo.completed === true) {
        checkbox.checked = true;
        label.classList.add("completed");
      }
      else {
        label.classList.remove("completed");
      }

      todoLi.id = position;
      todoLi.className = "listItem";
      checkbox.className = "checkbox";
      todoLi.appendChild(checkbox);
      todoLi.appendChild(label);
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);


    }, this);

    if (todoList.todos.filter(todo => todo.completed).length > 0) {
      todoMenu.innerHTML = '';
      todoMenu.appendChild(this.createClearCompletedButton());
      todoMenu.appendChild(p);
    }
    else
      todoMenu.removeChild(document.getElementById('clearButton'));
      todoMenu.appendChild(p);
  },
  createClearCompletedButton: function() {
    var clearCompletedButton = document.createElement('button');
    clearCompletedButton.textContent = 'Clear Completed';
    clearCompletedButton.id = 'clearButton';
    clearCompletedButton.class = 'clearButton'
    clearCompletedButton.onclick = function() {handlers.clearCompleted();};
    return clearCompletedButton;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "<i class='fa fa-window-close' aria-hidden='true'></i>";
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createChangeTodoInput: function(value) {
    var todoInput = document.createElement('input');
    todoInput.className = 'changeTodo';
    todoInput.value = value;
    return todoInput;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click',function(event){
      var elementClicked = event.target;

      if (elementClicked.className == 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }

      if (elementClicked.className == 'checkbox') {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });

    todosUl.addEventListener('dblclick', function(event){
      var elementClicked = event.target;
      if(elementClicked.className == 'label') {
        var text = elementClicked.textContent;
        elementClicked.replaceWith(view.createChangeTodoInput(text));
        }
    })

    todosUl.addEventListener('keypress', function(event){
      var elementSelected = event.target;
      if ((elementSelected.className == 'changeTodo') && (event.keyCode === 13)){
        handlers.changeTodo(parseInt(elementSelected.parentNode.id),elementSelected.value);
      }
    })
  }
};

view.setUpEventListeners();




