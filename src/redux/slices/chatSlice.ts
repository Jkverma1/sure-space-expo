import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';
import { fetchChannels as fetchChannelsFromService } from '@/src/features/chat/services/chatService';
import { RootState } from '@/src/redux/store';

interface ChatState {
  channels: any[];
}

const initialState: ChatState = {
  channels: [],
};

export const fetchChannels = () => async (dispatch: any) => {
  try {
    const response = await fetchChannelsFromService();
    dispatch(
      setChannels({
        channels: response.channels,
      }),
    );
  } catch (error) {
    console.log('fetching channels failed:', error);
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels(state, action: PayloadAction<{ channels: any[] }>) {
      state.channels = action.payload.channels as WritableDraft<any>[];
    },
    clearChannels(state) {
      state.channels = [];
    },
  },
});

export const { setChannels, clearChannels } = chatSlice.actions;

export const selectChatChannels = (state: RootState) => state.chat.channels;

export default chatSlice.reducer;
