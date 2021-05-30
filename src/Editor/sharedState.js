import { store } from "@risingstack/react-easy-state";

const sharedState = store({
  showImageUpload: false,
});

export default sharedState;
