import { writable } from "svelte/store";
import type { LoggedInUser } from "./services/placemark-types";
import type { MarkerSpec } from "./services/markers";

export const user = writable<LoggedInUser>();

export const markerSelected = writable<MarkerSpec>();

export const loading = writable(false);