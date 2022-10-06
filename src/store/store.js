import { configureStore } from "@reduxjs/toolkit";

import { viproomSlices } from "./slices";

export default configureStore({
  reducer: {
    viproominfo: viproomSlices,
  },
});
