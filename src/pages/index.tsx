
import React, { FC } from 'react';
import styles from './index.less';

import { UserModelState, MenuModelState, ConnectProps, Loading, connect } from 'umi';

interface PageProps extends ConnectProps {
  user: UserModelState;
  menu: MenuModelState;
  loading: boolean;
}
const index: FC<PageProps> = ({ user,menu, dispatch }) => {
  const { name } = user;
  const { path } = menu;
  return <div style={{height: '400px'}} >Hello {name} {path}</div>;
};

export default connect(({ user,menu, loading }: { user: UserModelState;menu: MenuModelState; loading: Loading }) => ({
  user,
  menu,
  loading: loading.models.user &&  loading.models.menu,
}))(index);
