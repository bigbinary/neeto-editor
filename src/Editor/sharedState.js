import { store } from "@risingstack/react-easy-state";

const sharedState = store({
  showImageUpload: false,
  showURLInput: false,
});

export default sharedState;
