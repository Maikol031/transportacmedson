import { reactive } from "vue";

const state = reactive({
  isLoading: false,
  count: 0
});

export function useLoadingStore() {
  function startLoading() {
    state.count++;
    state.isLoading = true;
  }

  function stopLoading() {
    state.count--;

    if (state.count <= 0) {
      state.count = 0;  
      state.isLoading = false;
    }
  }

  return { state, startLoading, stopLoading };
}
