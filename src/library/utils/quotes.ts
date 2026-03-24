export interface Quote {
	text: string;
	author: string;
}

export const QUOTES: Quote[] = [
	// Frank Herbert, Dune
	{ text: 'Fear is the mind-killer.', author: 'Frank Herbert, Dune' },
	{ text: 'The sleeper must awaken.', author: 'Frank Herbert, Dune' },
	{ text: 'Beginnings are such delicate times.', author: 'Frank Herbert, Dune' },
	{ text: 'Polish comes from the cities; wisdom from the desert.', author: 'Frank Herbert, Dune' },
	{ text: 'Survival is the ability to swim in strange water.', author: 'Frank Herbert, Dune' },
	{ text: 'It is by will alone that I set my mind in motion.', author: 'Frank Herbert, Dune' },
	// H.P. Lovecraft
	{ text: 'That is not dead which can eternal lie.', author: 'H.P. Lovecraft' },
	{ text: 'Ocean is more ancient than the mountains.', author: 'H.P. Lovecraft' },
	{ text: 'Pleasure to me is wonder, the unexplored, the unexpected.', author: 'H.P. Lovecraft' },
	// Edgar Allan Poe
	{ text: 'Darkness there, and nothing more.', author: 'Edgar Allan Poe, The Raven' },
	{ text: 'There is no exquisite beauty without some strangeness.', author: 'Edgar Allan Poe' },
	{ text: 'There is a two-fold Silence: sea and shore, body and soul.', author: 'Edgar Allan Poe' },
	// Pierre Bottero, Ellana
	{ text: 'Es-tu ombre ou lumière ? Les deux.', author: 'Pierre Bottero, Ellana' },
	{ text: "Celui qui croit savoir n'apprend plus.", author: 'Pierre Bottero, Ellana' },
	{ text: 'Le doute est une force. Une vraie belle force.', author: 'Pierre Bottero, Ellana' },
	{ text: 'Tu es libre, Ellana, et cela crée comme une lumière autour de toi.', author: 'Pierre Bottero, Ellana' },
	// Alain Damasio, La Horde du Contrevent
	{ text: "La douleur n'est qu'une information.", author: 'Alain Damasio, La Horde du Contrevent' },
	{ text: 'Ne soyez rien : devenez sans cesse.', author: 'Alain Damasio, La Horde du Contrevent' },
	{ text: "Ils sont l'orage marcheur ! Ils sont la foudre lente !", author: 'Alain Damasio, La Horde du Contrevent' },
	// Antoine de Saint-Exupéry
	{ text: 'Les étoiles sont éclairées pour que chacun puisse retrouver la sienne.', author: 'Saint-Exupéry, Le Petit Prince' },
	{ text: "L'espace de l'esprit, là où il peut ouvrir ses ailes, c'est le silence.", author: 'Saint-Exupéry, Citadelle' },
	// Ursula K. Le Guin
	{ text: 'To light a candle is to cast a shadow.', author: 'Ursula K. Le Guin, A Wizard of Earthsea' },
	{ text: 'For a word to be spoken, there must be silence.', author: 'Ursula K. Le Guin, A Wizard of Earthsea' },
	{ text: 'Those who build walls are their own prisoners.', author: 'Ursula K. Le Guin, The Dispossessed' },
	// Jorge Luis Borges
	{ text: 'Time is the substance I am made of.', author: 'Jorge Luis Borges' },
	{ text: 'There is no need to build a labyrinth when the entire universe is one.', author: 'Jorge Luis Borges' },
];

export function randomQuote(): Quote {
	return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
