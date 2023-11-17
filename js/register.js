const form = document.querySelector(`.form-register`)


form.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    const userName = document.querySelector(`#username`)
    const title = userName.value

    if(title){
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({title, completed:false})
        });

        const todo = await res.json();
        todoHTML(todo);

    }


    const password = document.querySelector(`#password`)
    const password2 = document.querySelector(`#password2`)

    if(password.value ==! password2.value){
        password.style.plaseholder= `error`
    }
})

async function getAllTodo ()
{
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
    const todos = await res.json()
    console.log(todos);

todos.forEach( todo => todoHTML(todo) );
}

window.addEventListener(`DOMContentLoaded`, getAllTodo)




function todoHTML ({id, completed, title}){
    const users = document.querySelector(`.users`)

    users.insertAdjacentHTML(`beforeend`, `
                    <div class="user" id="todo${id}">
                    <input type="checkbox" ${completed && `checked`}>
                        <h1>${title}</h1>
                        <button onclick="deleteTodo(${id})" class="close">X</button>
                    </div>

    `)
}


async function deleteTodo(id)
{

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        merhod: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
        
    })

    const data = await res.json()

    console.log(data);
    if(data){
        document.querySelector(`#todo${id}`).remove()
    }
}