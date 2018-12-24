const initialState = {
  itemMenu:[
      {
          id:1,
          name:'SALTED CARAMEL BUDINO',
          ingredients:'crème fraiche, maldon sea salt',
          price: 10.4,
          amount: '100g'
      },
      {
          id:2,
          name:'TIRAMISU',
          ingredients:'kahlua-soaked ladyfingers, mascarpone mousse',
          price: 8,
          amount: '150g'
      },
      {
          id:3,
          name:'ALMOND & MASCARPONE TART',
          ingredients:'cranberry orange compote, basil, saba',
          price: 6.5,
          amount: '90g'
      },
      {
          id:4,
          name:'GELATO & SORBETTO',
          ingredients:'made locally, changes daily',
          price: 7.1,
          amount: '140g'
      },
  ]
};

export const rootReducer = (state=initialState, action) =>{
return state;
};