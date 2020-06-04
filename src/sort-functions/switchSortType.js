import { INIT_SORT_STATE } from "./sortConstants";
import { bubbleStartingState } from "./bubbleSort";

/**
 * Returns a new sortState to use for the given sort type
 * @param {string} sortType the sort type to use.
 * @returns {}
 */
export default sortType => {
  let newState = {};
  switch (sortType) {
    case "bubble":
      newState = { ...bubbleStartingState };
      break;
    case "merge":
      break;
    default:
      break;
  }
  return {
    ...INIT_SORT_STATE,
    ...newState,
  };
};
