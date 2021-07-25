import {csv} from 'd3-fetch';
import App from './App.svelte';


const app = new App({
	target: document.querySelector('.svelte-main'),
	props: {
		data: []
	}
});

function toAmount(str){
	return Number(str.replace(/\s|€/g, '').replace(',', '.'))
}

csv('./data/transactions.csv')
.then(lignesTexte => {
	const lignes = lignesTexte.map(({Date, Description, Montant, HT, Qui}) => ({
		date: Date,
		Description,
		Montant: toAmount(Montant),
		HT: toAmount(HT),
		Qui
	}))

	app.$set({
		data: lignes
	})
})

