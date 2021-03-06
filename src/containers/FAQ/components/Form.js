import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
import RestEditor from "../../../components/RestInput/RestEditor";
// import RestFormDatePicker from "../../../components/RestInput/RestDatePicker";
import RestSwitch from "../../../components/RestInput/RestSwitch";
import { getListPropertyAction } from "../../../redux/property/actions";

class FAQForm extends Component {
  componentDidMount(){
    this.props.getListProperty()
  }

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          source="title"
          title="Tiêu đề"
          placeholder="Tiêu đề"
          requiredMessage="Vui lòng nhập tiêu đề"
        />
        <RestEditor
          required
          source="content"
          label="Nội dung"
          requiredMessage="Vui lòng nhập nội dung"
        />
        <RestSwitch
          source="isVisible"
          title="Trạng thái"
        />
      </RestRow>
    );
  }
}

const mapStateToProps = (state) => {
  const {properties} = state.property
  return {
    properties,
  };
};

const mapDispatchToProps = dispatch => ({
  getListProperty: () => {
    dispatch(getListPropertyAction(-1))
  },
})

FAQForm.propTypes = {
  form: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQForm);
