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
		console.log(`#${todo.id} ${todo.title}`);
	}
};

export { addTodo, listTodos };
