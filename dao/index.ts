/**
 * CastQuest DAO re-export
 *
 * This file is a thin façade that forwards all imports to the
 * canonical SDK package located in `packages/sdk/`.
 *
 * New DAO functionality should be implemented in `packages/sdk/src/client/CastQuestDAO.ts`
 * and exported from there, not from this file.
 */

export { CastQuestDAO } from '@castquest/sdk';
export type { DAOAction } from '@castquest/sdk';
