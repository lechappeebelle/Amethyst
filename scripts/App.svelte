<script>
	import {sum} from 'd3-array'
	import { format, parseISO } from 'date-fns'


	export let data;

	const TAB_DAVID = 'David'
	const TAB_POT_COMMUN = 'Pot commun'

	const TABS = [
		TAB_DAVID,
		TAB_POT_COMMUN
	]

	let currentTab = TAB_DAVID;

	let monthlyDavid = 2600;

	$: davidLignes = data.filter(({Qui}) => Qui === 'David')
	$: console.log(davidLignes, parseISO, format) 
	$: balanceDavid = sum(davidLignes.map(({HT}) => HT))
	$: remainingTime = balanceDavid/monthlyDavid

</script>

<nav>
	{#each TABS as tab}
		<button on:click={() => currentTab = tab}>{tab}</button>
	{/each}
</nav>

{#if currentTab === TAB_DAVID}
	<h1>David</h1>
	<section>
		<h2>Balance actuelle&nbsp;: {balanceDavid}€</h2>
		<p>Coût mensuel à l'entreprise : <input type="number" bind:value={monthlyDavid}> €</p>
		<p>Nombre de mois restants : <strong>{remainingTime.toFixed(1)}</strong></p>
	</section>


	<section>
		<details open>
			<summary><h2>Les lignes</h2></summary>
			<table class="lignes-banque">
				<thead>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Montant HT</th>
					</tr>
				</thead>
				<tbody>
					{#each davidLignes as {date, Description, HT}}
					<tr>
						<td>{date ? format(parseISO(date), 'dd-MM-yyyy') : '?'}</td>
						<td>{Description}</td>
						<td>{HT} €</td>
					</tr>
					{/each}
				</tbody>
			</table>
		</details>
	</section>
{/if}



<style lang="scss">
	@import "../styles/colors";

	:global(body) {
		background-color: $amethyst-background;
		color: $amethyst-text;
	}

	:global(body > header){
		padding-top: 1rem;
		padding-bottom: 1rem;
		background-color: $amethyst-background-2;
	}

	h1{
		color: $amethyst-text;
	}

	nav{
		padding: 1rem 0;

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;

		button {
			padding: 0.5rem;
			min-width: 5rem;

			background-color: $amethyst-background-2;
			color: $amethyst-text;
			font-weight: bold;
		}
	}

	input{
		font-size: 1.1rem;

		background-color: $amethyst-background-2;
		color: $amethyst-text;
		font-weight: bold;

		width: 5em;
	}

	summary h2{
		display: inline-block;
	}
	
	table.lignes-banque{
		tr{
			td:nth-child(1){
				padding-right: 1rem;
			}
			td:nth-child(2){
				padding-right: 1rem;
			}
			td:nth-child(3){
				text-align: right;
			}
		}
	}


</style>
