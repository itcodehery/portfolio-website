<script>
	import Icon from '@iconify/svelte';

	//create links for all the buttons in the code below
	const links = [
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/hari-prasad-43285a24a/',
			category: 'Career and Code',
			icon: 'mdi:linkedin'
		},
		{
			name: 'GitHub',
			url: 'https://github.com/itcodehery',
			category: 'Career and Code',
			icon: 'mdi:github'
		},
		{
			name: 'Codecademy',
			url: 'https://www.codecademy.com/profiles/itwritshery',
			category: 'Career and Code',
			icon: 'mdi:code-braces'
		},
		{
			name: 'Codewars',
			url: 'https://www.codewars.com/users/itcodehery',
			category: 'Career and Code',
			icon: 'cib:codewars'
		},
		{
			name: 'Linktree',
			url: 'https://linktr.ee/itwritshery',
			category: 'Miscellaneous',
			icon: 'simple-icons:linktree'
		},
		{
			name: 'Spotify Artist Profile',
			url: 'https://open.spotify.com/artist/5uzY3x7q567a2Fmg7fKbWh?si=tNyS3kdmSmqSOnwsi34jxg&utm_source=copy-link',
			category: 'Creative',
			icon: 'mdi:spotify'
		},
		{
			name: 'My YouTube Channel',
			url: 'https://youtube.com/channel/UCKsrfag-JNkGQ2YJmElAkQQ',
			category: 'Creative',
			icon: 'mdi:youtube'
		},
		{
			name: 'Blog Posts on Hobservations',
			url: 'https://hobservationsda.blogspot.com/?m=1',
			category: 'Creative',
			icon: 'mdi:blogger'
		},
		{
			name: 'My Taste in Music',
			url: 'https://open.spotify.com/playlist/6Rq8atjLtB5oRtzE7eC8Gs?si=1iesUHXxT4yz81wR5Xytjg&utm_source=copy-link',
			category: 'Miscellaneous',
			icon: 'mdi:music'
		},
		{
			name: 'The Vox Technologia Collective',
			url: 'https://vox-tech-collective.vercel.app/',
			category: 'Miscellaneous',
			icon: 'mdi:web'
		}
	];
</script>

<main>
	<div class="global-wrapper">
		<img src="/me.jpg" alt="me" width="100" height="100" />
		<h1>My Links</h1>
		<p>I do a lotta stuff. Here are some links to my online presence.</p>

		<div class="categories-wrapper">
			<div class="category">
				<h3>Career and Code</h3>
				<div class="links-container">
					{#each links.filter((link) => link.category === 'Career and Code') as link}
						<button class="link-button" on:click={() => window.open(link.url)}>
							<Icon icon={link.icon} width="24" />
							<span>{link.name}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="category">
				<h3>Creative</h3>
				<div class="links-container">
					{#each links.filter((link) => link.category === 'Creative') as link}
						<button class="link-button" on:click={() => window.open(link.url)}>
							<Icon icon={link.icon} width="24" />
							<span>{link.name}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="category">
				<h3>Miscellaneous</h3>
				<div class="links-container">
					{#each links.filter((link) => link.category === 'Miscellaneous') as link}
						<button class="link-button" on:click={() => window.open(link.url)}>
							<Icon icon={link.icon} width="24" />
							<span>{link.name}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'DM Sans', sans-serif;
		color: #daf4d2;
		padding: 5rem 2rem;
		background-color: rgba(4, 33, 37, 1);
		background-image: url('/home-bg.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		min-height: 100vh;
	}

	.global-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
        padding-top: 40px;
		max-width: 1200px;
	}

	img {
		border-radius: 50%;
		margin-bottom: 1rem;
		width: 100px;
		height: 100px;
		border: 3px solid #daf4d2;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 500;
		letter-spacing: -1px;
		margin: 0;
	}

	p {
		font-size: 1.2em;
		margin: 0.5rem 0 2rem 0;
		text-align: center;
		max-width: 600px;
	}

	.categories-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		width: 100%;
	}

	.category {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		border: 1px solid #daf4d21a;
		border-radius: 16px;
		background-color: #052b30;
	}

	h3 {
		font-size: 1.8em;
		margin-bottom: 1.5rem;
		font-weight: 500;
		color: #daf4d2;
	}

	.links-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;
	}

	.link-button {
		background-color: #daf4d2;
		color: #042125;
		border: none;
		padding: 1rem 1.5rem;
		font-family: 'DM Sans', sans-serif;
		font-size: 1.1em;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		width: 100%;
	}

	.link-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.link-button:active {
		transform: translateY(0);
		background-color: #cde5c6;
	}

	@media (min-width: 768px) {
		.categories-wrapper {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		.links-container {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.categories-wrapper {
			grid-template-columns: 1fr 1fr;
		}
		.category:last-child {
			grid-column: 1 / -1;
		}
	}
</style>
