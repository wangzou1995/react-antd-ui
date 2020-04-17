
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
  name: string;
  auth: [];
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    name: 'admin',
    auth: [],
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

export default UserModel;
