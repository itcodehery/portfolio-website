import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
	const host = url.hostname.toLowerCase();
	if (
		host.startsWith('forwardmeridian.') ||
		host.startsWith('forward-meridian.') ||
		host.startsWith('meridian.')
	) {
		if (url.pathname === '/') {
			return '/forward-meridian';
		}
	}
};
