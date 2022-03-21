import UsersList from './components/UsersList';

const USERS = [
	{
		id: 0,
		name: 'Pablo Castellanos',
		active: true,
		role: 'teacher'
	},
	{
		id: 1,
		name: 'Jose Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		id: 2,
		name: 'Javier López',
		active: false,
		role: 'student'
	}
];

const App = () => <UsersList initialUsers={USERS} />;

export default App;
