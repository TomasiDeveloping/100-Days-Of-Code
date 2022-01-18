const TodosApp = {
    data() {
        return {
            newTodo: 'Learn Vue.js!',
            entredTodoText: ''
        };
    },
    methods: {
        saveTodo(event) {
            event.preventDefault();
            this.newTodo = this.entredTodoText;
            this.entredTodoText = '';
        }
    }
};

Vue.createApp(TodosApp).mount('#todos-app');