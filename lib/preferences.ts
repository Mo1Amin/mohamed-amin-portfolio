/**
 * Preference primitives shared by the server-rendered inline script and the
 * client provider.
 *
 * This module has no 'use client' directive on purpose: importing these keys
 * from a client module would turn them into client references, and the inline
 * script would be generated with stubs instead of the real strings.
 */
export type Theme = 'dark' | 'light'
export type VisualMode = 'bold' | 'calm'

export const THEME_STORAGE_KEY = 'ma.theme'
export const MODE_STORAGE_KEY = 'ma.mode'

export const themes: readonly Theme[] = ['dark', 'light']
export const visualModes: readonly VisualMode[] = ['bold', 'calm']

export const defaultTheme: Theme = 'dark'
export const defaultMode: VisualMode = 'bold'
