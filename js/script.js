document.addEventListener('DOMContentLoaded', function()
{
    const submitFrom = document.getElementById('form');
    const todos = [];
    const RENDER_EVENT = 'render-todo';

    submitFrom.addEventListener('submit', function(event){
        event.preventDefault();
        addTodo();
    });

    function addTodo()
    {
        const text = document.getElementById('title').value;
        const tgl = document.getElementById('date').value;
        const generate = generateId();  
        const todo = generateTodoObject(generate, text, tgl, false);

        todos.push(todo);

        document.dispatchEvent(new Event(RENDER_EVENT));        
    }

    function generateId()
    {
        return +new Date();
    }

    function generateTodoObject(id, task, timestamp, isCompleted)
    {
        return {
            id,
            task,
            timestamp,
            isCompleted,
        }
    }

    document.addEventListener(RENDER_EVENT, function()
    {
        // console.log(todos);

        const uncomplated = document.getElementById('todos');
        uncomplated.innerHTML = '';

        for(const todoItem of todos)
        {
            const todoElemnt = makeTodo(todoItem);
            uncomplated.append(todoElemnt);
        }

    });

    function makeTodo(todoObject)
    {
        const textTitle = document.createElement('h2');
        textTitle.innerText = todoObject.task;

        const timeDate = document.createElement('p');
        timeDate.innerText = todoObject.timestamp;

        const textContainer = document.createElement('div');
        textContainer.classList.add('inner');
        textContainer.append(textTitle, timeDate);

        const container = document.createElement('div');
        container.classList.add('item','shadow');
        container.append(textContainer);
        container.setAttribute('id', `todo-${todoObject.id}`);

        if(todoObject.isCompleted)
        {
            const unbutton = document.createElement('button');
            unbutton.classList.add('undo-button');

            unbutton.addEventListener('click', function ()
            {
                undoTaksFromComplete(todoObject.id);
            });

            const trashButoon = document.createElement('button');
            trashButoon.classList.add('trash-button');

            trashButoon.addEventListener('click', function()
            {
                removeTaskFromCompleted(todoObject.id);
            });

            container.append(unbutton, trashButoon);

        }else{
            const checkButton = document.createElement('button');
            checkButton.classList.add('check-button');

            checkButton.addEventListener('click', function()
            {
                addTaskToComplete(todoObject.id);
            });

            container.append(checkButton);
        }

        return container;
    }

    function addTaskToComplete(todoId)
    {
        const todoTarget = findtodo(todoId);

        if(todoTarget === null) return;

        todoTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function findtodo(todoId)
    {
        for(const todoItem of todos)
        {
            if(todoItem.id === todoId)
            {
                return todoItem;
            }
        }
        return null;
    }

    document.addEventListener(RENDER_EVENT, function()
    {
        const uncomplatedTodo = document.getElementById('todos');
        uncomplatedTodo.innerHTML = '';

        const completeTodo = document.getElementById('completed-todos');
        completeTodo.innerHTML = '';

        for(const todoItem of todos )
        {
            const todoElement = makeTodo(todoItem);

            if(!todoItem.isCompleted)
            {
                uncomplatedTodo.append(todoElement);
            }else{
                completeTodo.append(todoElement);
            }
        }
    });

    function removeTaskFromCompleted(todoId)
    {
        const todoTarget = findtodo(todoId);

        if(todoTarget === -1) return;

        todos.splice(todoTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function undoTaksFromComplete(todoId)
    {
        const todoTarget = findtodo(todoId);

        if(todoTarget == null) return;

        todoTarget.isCompleted = false;
        document.dispatchEvent(new Event(RENDER_EVENT));
    }


});