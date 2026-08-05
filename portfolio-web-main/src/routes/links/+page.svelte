<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

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

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<main in:fade={{ duration: 600 }}>
		<div class="global-wrapper">
			<img in:fly={{ y: -40, duration: 800, delay: 100 }} src="/me.jpg" alt="me" width="100" height="100" />
			<h1 in:fly={{ y: -20, duration: 800, delay: 300 }}>My Links</h1>
			<p in:fly={{ y: -10, duration: 800, delay: 500 }}>I do a lotta stuff. Here are some links to my online presence.</p>

			<div class="categories-wrapper">
				{#each ['Career and Code', 'Creative', 'Miscellaneous'] as categoryName, i}
					<div 
						class="category" 
						in:fly={{ y: 50, duration: 800, delay: 700 + (i * 200) }}
					>
						<h3>{categoryName}</h3>
						<div class="links-container">
							{#each links.filter((link) => link.category === categoryName) as link, j}
								<button 
									class="link-button" 
									onclick={() => window.open(link.url, '_blank')}
									in:fly={{ x: -20, duration: 600, delay: 900 + (i * 200) + (j * 100) }}
									aria-label={`Visit ${link.name}`}
								>
									<div class="link-icon">
										<Icon icon={link.icon} width="24" />
									</div>
									<span class="link-text">{link.name}</span>
									<div class="link-arrow">
										<Icon icon="material-symbols:arrow-outward-rounded" width="20" />
									</div>
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</main>
{/if}

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
		background-position: top center;
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
		width: 120px;
		height: 120px;
		border: 4px solid rgba(218, 244, 210, 0.4);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
		object-fit: cover;
	}

	h1 {
		font-size: 3em;
		font-weight: 600;
		letter-spacing: -1.5px;
		margin: 0;
		text-shadow: 0 4px 12px rgba(0,0,0,0.5);
	}

	p {
		font-size: 1.2em;
		margin: 0.5rem 0 3rem 0;
		text-align: center;
		max-width: 600px;
		opacity: 0.9;
	}

	.categories-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		width: 100%;
	}

	.category {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2.5rem 2rem;
		border: 1px solid rgba(218, 244, 210, 0.1);
		border-radius: 24px;
		background: rgba(5, 43, 48, 0.6);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	h3 {
		font-size: 1.6em;
		margin-bottom: 2rem;
		font-weight: 500;
		color: #daf4d2;
		letter-spacing: -0.5px;
		position: relative;
	}
	
	h3::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 40px;
		height: 2px;
		background: rgba(218, 244, 210, 0.4);
		border-radius: 2px;
	}

	.links-container {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		width: 100%;
	}

	.link-button {
		background: rgba(218, 244, 210, 0.05);
		color: #daf4d2;
		border: 1px solid rgba(218, 244, 210, 0.15);
		padding: 1rem 1.2rem;
		font-family: 'DM Sans', sans-serif;
		font-size: 1.15em;
		font-weight: 500;
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.link-button::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0; bottom: 0;
		background: linear-gradient(120deg, transparent, rgba(218, 244, 210, 0.1), transparent);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.link-button:hover::before {
		transform: translateX(100%);
	}

	.link-button:hover {
		transform: translateY(-4px) scale(1.02);
		background: rgba(218, 244, 210, 0.1);
		border-color: rgba(218, 244, 210, 0.4);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(218, 244, 210, 0.1);
	}

	.link-button:active {
		transform: translateY(0) scale(0.98);
		background: rgba(218, 244, 210, 0.2);
	}

	.link-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(218, 244, 210, 0.1);
		padding: 8px;
		border-radius: 10px;
		transition: all 0.3s ease;
	}

	.link-button:hover .link-icon {
		background: rgba(218, 244, 210, 0.2);
		transform: scale(1.1) rotate(-5deg);
	}

	.link-text {
		flex: 1;
		text-align: left;
		padding-left: 1.2rem;
	}

	.link-arrow {
		opacity: 0.5;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
	}

	.link-button:hover .link-arrow {
		opacity: 1;
		transform: translate(2px, -2px);
	}

	@media (min-width: 768px) {
		.categories-wrapper {
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.categories-wrapper {
			grid-template-columns: 1fr 1fr;
		}
		.category:last-child {
			grid-column: 1 / -1;
			max-width: 600px;
			margin: 0 auto;
			width: 100%;
		}
	}
</style>
