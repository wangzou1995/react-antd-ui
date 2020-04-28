import { Effect, Reducer } from 'umi';
import { queryCurrent, queryProjectNotice } from '@/service/UserService';

export interface CurrentUser {
  name: string;
  avatar: string;
  userid: string;
  notice?: NoticeType[];
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  address?: string;
  phone?: string;
  auth: [];
}
export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  currentProject?: NoticeType;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    init: Effect;
    fetchUserCurrent: Effect;
    fetchProjectNotice: Effect;
    fetchCurrentProject: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

const User: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: undefined,
    projectNotice: [],
    currentProject: undefined,
  },

  effects: {
    *init(_, { put }) {
      yield put({ type: 'fetchUserCurrent' });
      yield put({ type: 'fetchProjectNotice' });
      yield put({ type: 'fetchCurrentProject' });
    },
    *fetchUserCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: {
          currentUser: response,
        },
      });
    },
    *fetchProjectNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'save',
        payload: {
          projectNotice: Array.isArray(response) ? response : [],
        },
      });
    },
    *fetchCurrentProject({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          currentProject: payload,
        },
      });
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
};

export default User;
