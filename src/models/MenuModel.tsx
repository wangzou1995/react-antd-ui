
import { Effect, Reducer, Subscription } from 'umi';

export interface MenuModelState {
  name: string;
  path: string;
  component: string;
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<MenuModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    name: 'admin',
    path: 's',
    component: 'ss'
  },

  effects: {
    *query({ payload }, { call, put }) {
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};

export default MenuModel;
