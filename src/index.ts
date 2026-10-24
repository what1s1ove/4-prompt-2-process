import { addTodo, listTodos } from './commands.ts';

const [command, ...args] = process.argv.slice(2);

switch (command) {
	case 'add': {
		const title = args.join(' ').trim();

		if (!title) {
			console.error('Usage: add <title>');
			process.exit(1);
		}

		addTodo(title);
		break;
	}
	case 'list': {
		listTodos();
		break;
	}
	default: {
		console.error('Usage: <add|list> [args]');
		process.exit(1);
	}
}
