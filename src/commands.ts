import { loadTodos, saveTodos } from './storage.ts';
import { type Todo } from './types.ts';

const getNextId = (todos: Todo[]): number => {
	return todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
};

const addTodo = (title: string, urgent: boolean): void => {
	const todos = loadTodos();
	const todo: Todo = {
		id: getNextId(todos),
		title,
		createdAt: new Date().toISOString(),
		completed: false,
		urgent,
	};

	saveTodos([...todos, todo]);
	console.log(`Added #${todo.id}: ${todo.title}`);
};

type ListOptions = {
	showAll: boolean;
	onlyCompleted: boolean;
};

const listTodos = ({ showAll, onlyCompleted }: ListOptions): void => {
	const todos = loadTodos();
	const arr = todos.filter((t) => {
		if (showAll) {
			return true;
		}

		return onlyCompleted ? t.completed : !t.completed;
	});

	if (arr.length === 0) {
		console.log('No todos to show.');

		return;
	}

	const sorted = [...arr].sort((a, b) => Number(b.urgent) - Number(a.urgent));

	for (const todo of sorted) {
		const checkbox = todo.completed ? '[x]' : '[ ]';
		const mark = todo.urgent ? '!' : ' ';

		console.log(`${mark} ${checkbox} #${todo.id} ${todo.title}`);
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

const todoRemover = (id: number, force: boolean): void => {
	const todos = loadTodos();
	const item = todos.find((t) => t.id === id);

	if (!item) {
		console.error(`Todo #${id} not found`);
		process.exit(1);
	}

	const canDelete = item.completed || force;

	if (!canDelete) {
		console.error(`Todo #${id} is not completed. Use --force to remove it anyway`);
		process.exit(1);
	}

	const res = todos.filter((t) => t.id !== id);

	saveTodos(res);
	console.log(`Removed #${id}`);
};

export { addTodo, doneTodo, listTodos, todoRemover };
