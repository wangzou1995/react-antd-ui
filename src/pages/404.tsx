import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home1
      </Button>
    }
  />
);

export default NoFoundPage;
