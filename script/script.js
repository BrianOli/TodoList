const todoName = document.getElementById('inputItem');

class Todo{

    constructor() {
        this.id = 1;
        this.done = false;
        this.todoDone = []
        this.todoArray = [];
    }

    readInput() {
        let todo = {};

        todo.done = this.done;
        todo.id = this.id;
        todo.todoName = todoName.value;

        return todo;
    }

    addTodo() {
        const todo = this.readInput();

        if (todo.todoName !== '') {
            this.addArray(todo);
            this.addList()
            return this.cancel();
        }

        alert('Informe o nome do afazer')

    }

    addArray(todo) {
        this.todoArray.push(todo);
        this.id++;
    }

    addList() {
        const tbody = document.querySelector('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.todoArray.length; i++){
            const tr = tbody.insertRow();

            const td_id = tr.insertCell();
            const td_name = tr.insertCell();
            const td_actions = tr.insertCell();

            const todoDone = document.createElement('span');
            todoDone.setAttribute('class', 'material-icons');
            todoDone.innerText = 'done'
            todoDone.setAttribute('onclick', `todo.complete(${this.todoArray[i].id})`);

            const todoRemove = document.createElement('span');
            todoRemove.setAttribute('class', 'material-icons');
            todoRemove.innerText = 'close'
            todoRemove.setAttribute('onclick', `todo.remove(${this.todoArray[i].id})`);

            td_id.innerText = this.todoArray[i].id;
            td_name.innerText = this.todoArray[i].todoName;
            td_actions.appendChild(todoDone)
            td_actions.appendChild(todoRemove)


        }

    }

    cancel() {
        todoName.value = '';
    }

    complete(id) {
        const tbody = document.querySelector('tbody');

        for (let i = 0; i < this.todoArray.length; i++){
            if (this.todoArray[i].id == id) {
                this.todoDone.push(this.todoArray.splice(i, 1));
                this.todoDone[this.todoDone.length - 1][0]['done'] = true;
                tbody.deleteRow(i);
            }
        }
    }

    remove(id) {
        const tbody = document.querySelector('tbody');

        for (let i = 0; i < this.todoArray.length; i++){
            if (this.todoArray[i].id == id) {
                const confirmDel = confirm(`Excluir item de ID: ${id} da lista?`)

                if (confirmDel) {
                    this.todoArray.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

}

let todo = new Todo();