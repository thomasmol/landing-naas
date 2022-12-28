import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const nudges : Nudge[] = JSON.parse((browser && (localStorage.nudgesStore || '[]')));

export const nudgesStore = writable<Nudge[]>(nudges);

nudgesStore.subscribe((value) =>
	browser && (localStorage.nudgesStore = JSON.stringify(value))
);
