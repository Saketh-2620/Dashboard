import { createSlice } from '@reduxjs/toolkit';
import dashboardData from '../data';

const initialState = {
    data:dashboardData,
    searchData:dashboardData,
    showForm: false,
    currentCategory: null,
    tab:0,
    searchString:"",
};
function handleSearch(data, searchString) {
    
    const lowerCaseSearchString = searchString.toLowerCase();
    const filteredData = {};

    for (const category in data) {
      filteredData[category] = data[category].filter((card) =>
        card.cardName.toLowerCase().includes(lowerCaseSearchString)
      );
    }

    return filteredData;
  }

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { category, newCard } = action.payload;
      state.data[category].push(newCard);
      state.showForm = false;
      state.searchData = handleSearch(state.data,state.searchString)

    },
    deleteCard: (state, action) => {
      const { category, index } = action.payload;
      state.data[category].splice(index, 1);
     state.searchData = handleSearch(state.data,state.searchString)
    },
    toggleForm: (state,action) =>{
        state.showForm = !state.showForm;
        state.currentCategory = action.payload;
    },
    setSelectedTab: (state,action) =>{
        state.tab = action.payload;
    },
    setSearchString: (state,action) =>{
        state.searchString = action.payload;
        state.searchData = handleSearch(state.data,state.searchString)
    } 
},  
});

export const { addCard, deleteCard, toggleForm, setSelectedTab, setSearchData, setSearchString } = dashboardSlice.actions;
export default dashboardSlice.reducer;
