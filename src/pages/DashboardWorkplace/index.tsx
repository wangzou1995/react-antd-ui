import { Avatar, Card, Col, Skeleton, Row, Statistic } from 'antd';
import React, { useEffect } from 'react';

import { Link, connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { CurrentUser, UserModelState } from '@/models/user';

import { useModel } from 'umi';
import { NoticeType } from './data';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];
function getProjectName(projectNotice: NoticeType[], id: string): string {
  let temp = projectNotice.find((item: NoticeType) => {
    return item.id === id;
  });
  if (temp) {
    return temp.title;
  } else {
    return '';
  }
}
const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({
  currentUser,
}) => {
  const loading = currentUser && Object.keys(currentUser).length;
  const { initialState } = useModel('@@initialState');

  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{
  projectNum: number | undefined;
  projectName: string;
}> = ({ projectNum, projectName }) => {
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={projectNum} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="当前访问项目" value={projectName} />
      </div>
    </div>
  );
};
const DashboardWorkplace = (props: any) => {
  const { currentUser, projectNotice, projectLoading, dispatch } = props;
  const initialInfo = (useModel && useModel('@@initialState')) || {
    initialState: undefined,
    loading: false,
  };
  const { initialState, setInitialState } = initialInfo;
  useEffect(() => {
    // 动态增加新语言
    dispatch({
      type: 'user/init',
    });
  }, []);

  if (!currentUser || !currentUser.userid) {
    return null;
  }

  return (
    initialState &&
    projectNotice && (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        // @ts-ignore
        extraContent={
          <ExtraContent
            projectNum={projectNotice.length}
            projectName={getProjectName(
              projectNotice,
              initialState.currentProjectId,
            )}
          />
        }
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="全部项目"
              bordered={false}
              // extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {projectNotice.map((item: NoticeType, index: number) => (
                <Card.Grid className={styles.projectGrid} key={index}>
                  <Card
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    onClick={() => {
                      dispatch({
                        type: 'user/fetchCurrentProject',
                        payload: projectNotice[index],
                      });
                      // f(projectNotice[index].id)
                      setInitialState({
                        ...initialState,
                        currentProjectId: projectNotice[index].id,
                      });
                    }}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span
                          className={styles.datetime}
                          title={item.updatedAt}
                        >
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
                linkElement={Link}
              />
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map((item: NoticeType) => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    )
  );
};

export default connect(
  ({
    user: { currentUser, projectNotice, currentProject },
    loading,
  }: {
    user: UserModelState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    currentUser,
    projectNotice,
    currentProject,
    currentUserLoading: loading.effects['user/fetchUserCurrent'],
    projectLoading: loading.effects['user/fetchProjectNotice'],
  }),
)(DashboardWorkplace);
