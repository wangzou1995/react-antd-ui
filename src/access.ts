/**
 * 权限控制
 * @param initialState
 */

export default function(initialState: any) {
  const { authority, currentProjectId } = initialState;
  return {
    /**
     * 此菜单是否有权限
     * @param route 路由
     * @return boolean false : 隐藏菜单
     */
    isAuthenticatedMenu: (route: { [key: string]: any }) => {
      return (
        isAuthenticated(route.authority, authority) &&
        isCurrentProject(route, currentProjectId)
      );
    },
  };
}

/**
 * 判断是否有权限
 * @param authority
 * @param userAuthority
 */
function isAuthenticated(
  authority: [string],
  userAuthority: [string],
): boolean {
  if (!authority || !userAuthority) {
    return true;
  }
  const tempArray1: [] = []; //临时数组1
  const tempArray2 = []; //临时数组2

  for (let i = 0; i < userAuthority.length; i++) {
    // @ts-ignore
    tempArray1[userAuthority[i]] = true; //将数array2 中的元素值作为tempArray1 中的键，值为true；
  }

  for (let i = 0; i < authority.length; i++) {
    // @ts-ignore
    if (tempArray1[authority[i]]) {
      tempArray2.push(authority[i]); //过滤array1 中与array2 相同的元素；
    }
  }
  return tempArray2.length > 0;
}

/**
 * 是否当前项目
 * @param route
 * @param currentProjectId
 */
function isCurrentProject(
  route: { [p: string]: any },
  currentProjectId: string,
) {
  if (!route.appId) {
    return true;
  } else {
    return route.appId === currentProjectId;
  }
}
