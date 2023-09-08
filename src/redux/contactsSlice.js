const { createSlice } = require('@reduxjs/toolkit');

const initialContacts = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact(state, action) {
      state.unshift(action.payload);
    },
    removeContact(state, action) {
      return state.filter(contact => contact.name !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
