const REGEX = {
	USERNAME: /^[a-z0-9]+$/,
	START_WITH_NUMBER: /^[0-9]/,
	NAME: /^[a-záéíóú\s-]+$/i
};

export const validateUsername = username => {
	if (!REGEX.USERNAME.test(username)) return 'Sólo minúsculas y números';

	if (REGEX.START_WITH_NUMBER.test(username))
		return 'No puede empezar por número';

	if (username.length < 6 || username.length > 15)
		return 'Longitud entre 6 y 15';
};

export const validateName = name => {
	if (!REGEX.NAME.test(name)) return 'Sólo letras, espacios y guiones';

	if (name.includes('  ')) return 'No puede tener doble espacio';

	if (name.includes('--')) return 'No puede tener doble guión';

	const nameSplitted = name.split(' ');
	for (const word of nameSplitted) {
		if (word.startsWith('-') || word.endsWith('-'))
			return 'Uso de guiones incorrecto';
	}

	if (name.length < 2 || name.length > 30) return 'Longitud entre 2 y 30';
};
