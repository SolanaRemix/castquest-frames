/**
 * CastQuest DAO re-export
 *
 * This file is a thin façade that forwards DAO imports to the
 * canonical SDK package located in `packages/sdk/`.
 *
 * New DAO functionality should be implemented in `packages/sdk/src/client/`
 * and exported from there, not from this file.
 */

export { CastQuestDAO } from '@castquest/sdk';

