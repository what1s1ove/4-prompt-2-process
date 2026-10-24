import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { type Todo } from './types.ts';

const STORAGE_FILE_PATH = './todos.json';

const loadTodos = (): Todo[] => {
	if (!existsSync(STORAGE_FILE_PATH)) {
		return [];
	}

	return JSON.parse(readFileSync(STORAGE_FILE_PATH, 'utf8')) as Todo[];
};

const saveTodos = (todos: Todo[]): void => {
	writeFileSync(STORAGE_FILE_PATH, JSON.stringify(todos, null, 2));
};

export { loadTodos, saveTodos };
