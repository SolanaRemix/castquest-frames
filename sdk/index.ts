/**
 * CastQuest SDK re-export
 *
 * This file is a thin façade that forwards all imports to the
 * canonical SDK package located in `packages/sdk/`.
 *
 * New SDK functionality should be implemented in `packages/sdk/src/`
 * and exported from there, not from this file.
 */

export * from '@castquest/sdk';
export { default } from '@castquest/sdk';

