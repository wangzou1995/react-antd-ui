import React from 'react';
import styles from '../pages/index.less';
import {
  DefaultFooter,
  PageHeaderWrapper,
  GridContent,
} from '@ant-design/pro-layout';
import { useModel } from 'umi';

/**
 * 动态组件用于 连接编辑器 通过JSON生成组件
 */
class DynamicComponent extends React.Component {
  render() {
    return (
      <div>
        <PageHeaderWrapper />
        <div
          style={{
            margin: '24px 10px 10px 10px',
            padding: '10px',
            backgroundColor: 'white',
          }}
        >
          ssssssss
          <br />
          s<br />
          {name}
          <br />
          s<br />
          s<br />
        </div>
      </div>
    );
  }
}
export default DynamicComponent;
