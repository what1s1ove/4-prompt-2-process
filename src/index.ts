import { addTodo, clearTodos, doneTodo, listTodos, todoRemover } from './commands.ts';

const urgentFlag = '--urgent';

const [command, ...args] = process.argv.slice(2);

switch (command) {
	case 'add': {
		const urgent = args.includes(urgentFlag);
		const title = args
			.filter((a) => a !== urgentFlag)
			.join(' ')
			.trim();

		if (!title) {
			console.error('Usage: add <title> [--urgent]');
			process.exit(1);
		}

		addTodo(title, urgent);
		break;
	}
	case 'list': {
		const all = args.includes('--all');
		const completedFlag = args.includes('--completed');

		listTodos({ showAll: all, onlyCompleted: completedFlag });
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
	case 'remove': {
		const num = Number(args[0]);
		const force = args.includes('--force');

		if (Number.isNaN(num)) {
			console.error('Usage: remove <id> [--force]');
			process.exit(1);
		}

		todoRemover(num, force);
		break;
	}
	case 'clear': {
		const dryRun = args.includes('--dry-run');

		clearTodos(dryRun);
		break;
	}
	default: {
		console.error('Usage: <add|list|done|remove|clear> [args]');
		process.exit(1);
	}
}
