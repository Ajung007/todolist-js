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
        console.log(todos);
    });



});