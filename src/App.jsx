import UsersList from './components/UsersList';

const USERS = [
	{
		username: 'pablo',
		name: 'Pablo Castellanos',
		active: true,
		role: 'other'
	},
	{
		username: 'jose',
		name: 'Jose Miguel Fernández',
		active: true,
		role: 'teacher'
	},
	{
		username: 'javier',
		name: 'Javier López',
		active: false,
		role: 'student'
	}
];

const App = () => <UsersList initialUsers={USERS} />;

export default App;
