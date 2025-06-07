import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SEVERITY = 'success' | 'error' | 'warning' | 'info';

interface SnackState {
  open: boolean;
  message: string;
  severity: SEVERITY;
}

const initialState: SnackState = {
  open: false,
  message: '',
  severity: 'info',
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    showSnack: (
      state,
      action: PayloadAction<{ message: string; severity?: SnackState['severity'] }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity ?? 'info';
    },
    hideSnack: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showSnack, hideSnack } = snackSlice.actions;
export default snackSlice.reducer;
