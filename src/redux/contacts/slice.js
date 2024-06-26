import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../constants.js";
import {fetchContacts, addContact, deleteContact, updateContact} from "./operations.js";
import {logOut} from "../auth/operations.js";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState: initialState.contacts,
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, handleRejected)

            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, handleRejected)

            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(
                    (task) => task.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(deleteContact.rejected, handleRejected)

            .addCase(updateContact.pending, handlePending)
            .addCase(updateContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const updatedContact = action.payload;
                const index = state.items.findIndex(
                    (contact) => contact.id === updatedContact.id
                );
                if (index !== -1) {
                    state.items[index] = updatedContact;
                }
            })
            .addCase(updateContact.rejected, handleRejected)

            .addCase(logOut.pending, handlePending)
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = [];
            })
            .addCase(logOut.rejected, handleRejected)

    }
});

export default contactsSlice.reducer;