import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import i18n from 'i18next';

import { flatMap, map } from 'lodash';
import PrivateLayout from '../../layout/PrivateLayout';
import Dashboard from '../../pages/Dashboard';

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    title: i18n.t('dashboard.title'),
  },
];

const PrivateRoutes = () => (
  <Switch>
    {map(
      flatMap(routes, route => {
        if (route.routes) {
          return map(route.routes, subRoute => ({
            ...subRoute,
            path: route.path + subRoute.path,
            exact: subRoute.path === '/',
          }));
        }
        return route;
      }),
      route => (
        <Route
          {...route}
          component={e => (
            <PrivateLayout>
              <route.component {...e} />
            </PrivateLayout>
          )}
          key={route.path}
        />
      ),
    )}
  </Switch>
);

PrivateRoutes.propTypes = {};

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
}))(PrivateRoutes);
