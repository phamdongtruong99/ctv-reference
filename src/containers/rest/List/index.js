import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  retrieveList,
  editRecord,
  deleteRecord,
  cancelRecord,
  confirmRecord,
  customQuery,
  setCurrentDataShow,
  exportExcelAction,
} from '../../../redux/rest/actions';
import RestListComponent from '../../../components/RestLayout/List';
import { getFilterFromUrl, getSearch } from '../../../utils/tools';
import { getLoading, getFilters, getResources } from '../../../redux/rest/selectors';
import { showModal as showModalAction } from '../../../redux/modal/actions';

class RestList extends Component {
  constructor(props) {
    super(props);
    const paramFromUrl = getFilterFromUrl(this.props.location.search);
    const filter = (this.props.location && paramFromUrl) || this.props.initialFilter;    
    this.props.retrieveList(filter || { limit: 20, skip: 0, filter: {} }, true);
    // console.log("HERE " ,filter);

  }

  retrieveList = filter => {
    // this.props.pushQuery(filter);
    this.props.retrieveList(filter, true);
  };

  gotoEditPage = id => {
    const { redirects, pushRoute, showModal, resource, rootPath, setCurrentData } = this.props;
    setCurrentData(id);
    const route = `${rootPath}/${resource}/${id}/edit`;
    console.log("route >>>", route);
    
    if (redirects.edit === 'modal') {
      showModal(route);
    } else {
      pushRoute(route);
    }
  };

  gotoShowPage = id => {
    const { redirects, pushRoute, showModal, resource, rootPath, setCurrentData } = this.props;
    setCurrentData(id);
    const route = `${rootPath}/${resource}/${id}/show`;
    if (redirects.show === 'modal') {
      showModal(route);
    } else {
      pushRoute(route);
    }
  };

  exportExcel = () => {
    const { resource, resourceData, exportExcel } = this.props;
    exportExcel(resource, resourceData);
  };

  gotoCreatePage = () => {
    const { redirects, pushRoute, showModal, resource, rootPath } = this.props;
    const route = `${rootPath}/${resource}/create`;
    if (redirects.create === 'modal') {
      showModal(route);
    } else {
      pushRoute(route);
    }
  };

  render() {
    return (
      <RestListComponent 
        {...this.props}
        onRow={this.props.onDoubleClick === 'show' ? this.gotoShowPage : null}
        gotoEditPage={this.gotoEditPage}
        gotoCreatePage={this.gotoCreatePage}
        gotoShowPage={this.gotoShowPage}
        exportExcel={this.exportExcel}
        retrieveList={this.retrieveList}
        loadingExport={this.props.loadingExport}
      
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  /* eslint no-param-reassign: 0 */
  state.rest.resultSearch = {};
  return {
    loading: getLoading(state, props.resource),
    resourceData: getResources(state, props.resource),
    resourceFilter: getFilters(state, props.resource),
    loadingExport: state.rest.loadingExport,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveList: (filter, isRefresh) => {
      return dispatch(
        retrieveList(
          props.resource,
          {
            ...props.initialFilter,
            ...filter,
          },
          isRefresh,
        ),
      );
    },
    customQuery: (id, queryUrl, data, isChangeToEdit) =>
      dispatch(customQuery(props.resource, id, queryUrl, data, isChangeToEdit)),
    updateRecord: (id, data, isChangeToEdit) =>
      dispatch(editRecord(props.resource, id, data, isChangeToEdit)),
    deleteItem: id => dispatch(deleteRecord(props.resource, id)),
    cancelItem: id => dispatch(cancelRecord(props.resource, id)),
    confirmItem: (id,data) => dispatch(confirmRecord(props.resource, id, data)),
    pushQuery: filter => {
      dispatch(push(`${props.rootPath}/${props.resource}?${getSearch(filter)}`))
    },
    showModal: data => dispatch(showModalAction(data)),
    pushRoute: data => dispatch(push(data)),
    setCurrentData: id => dispatch(setCurrentDataShow(props.resource, id)),
    exportExcel: (resource, data) => dispatch(exportExcelAction(resource, data)),
  };
};

const ConnectRestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestList);

RestList.propTypes = {
  location: PropTypes.object,
  pushQuery: PropTypes.func,
  retrieveList: PropTypes.func,
  initialFilter: PropTypes.object,
  resource: PropTypes.string,
  redirects: PropTypes.object,
  pushRoute: PropTypes.func,
  showModal: PropTypes.func,
  rootPath: PropTypes.string,
  onDoubleClick: PropTypes.string,
  setCurrentData: PropTypes.func,
  resourceData: PropTypes.object,
  exportExcel: PropTypes.func,
  loadingExport: PropTypes.bool,
};

ConnectRestList.defaultProps = {
  rootPath: '',
  redirects: {
    edit: 'modal',
    create: 'modal',
    show: 'page',
  },
};

export default ConnectRestList;
