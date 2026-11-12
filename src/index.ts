import { addTodo, doneTodo, listTodos } from './commands.ts';

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
	case 'done': {
		const num = Number(args[0]);

		if (Number.isNaN(num)) {
			console.error('Usage: done <id>');
			process.exit(1);
		}

		doneTodo(num);
		break;
	}
	default: {
		console.error('Usage: <add|list|done> [args]');
		process.exit(1);
	}
}
