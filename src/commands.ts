import { loadTodos, saveTodos } from './storage.ts';
import { type Todo } from './types.ts';

const getNextId = (todos: Todo[]): number => {
	return todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
};

const addTodo = (title: string): void => {
	const todos = loadTodos();
	const todo: Todo = {
		id: getNextId(todos),
		title,
		createdAt: new Date().toISOString(),
		completed: false,
	};

	saveTodos([...todos, todo]);
	console.log(`Added #${todo.id}: ${todo.title}`);
};

const listTodos = (): void => {
	const todos = loadTodos();

	if (todos.length === 0) {
		console.log('No todos yet.');

		return;
	}

	for (const todo of todos) {
		const checkbox = todo.completed ? '[x]' : '[ ]';

		console.log(`${checkbox} #${todo.id} ${todo.title}`);
	}
};

const doneTodo = (id: number): void => {
	const todos = loadTodos();
	const exists = todos.some((t) => t.id === id);

	if (!exists) {
		console.error(`Todo #${id} not found`);
		process.exit(1);
	}

	const data = todos.map((t) => (t.id === id ? { ...t, completed: true } : t));

	saveTodos(data);
	console.log(`Completed #${id}`);
};

export { addTodo, doneTodo, listTodos };
