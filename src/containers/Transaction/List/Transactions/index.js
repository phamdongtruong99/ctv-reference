import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import Label from "../../../../components/RestField/Label";
import RestList from "../../../rest/List";
import Filter from "../../Components/Filter";
import PropertyWrapper from "./styles";
import { formatDate } from "../../../../utils/textProcessor";


class ListTransaction extends Component {
  componentDidMount() {}

  render() {
    return (
      <PropertyWrapper>
        <RestList
          title="Danh sách giao dịch"
          filter={<Filter />}
          resource="transactions"
          initialFilter={{ limit: 10, skip: 0, filter: {} }}
          hasCreate={false}
          {...this.props}
          redirects={{
            create: 'newPage',
          }}
        >
          <Label
            source="createdAt"
            title="Thời gian"
            render={(value) => formatDate(value)}
          />
          <Label
            source="code"
            title="Mã giao dịch"
            render={( value,record) => {
              return <Link to={`/transactions/${record.id}/show`}>{value}</Link>
            }}
          />
          <Label source="property.name" title="Dự án" />
          <Label source="realtor.fullName" title="Tên CTV" />
          <Label source="customer.fullName" title="Tên KH" />
          <Label
            source="type"
            title="Loại giao dịch"
            render={(type) => {
              if (type === 1){
                type = "Đặt cọc";
              }
              else {
                type = "Đặt chỗ";
              }
              return (
                <span>
                  {type}
                </span>
              )
            }}
          />
          <Label
            source="status"
            title="Tình trạng"
            render={(status) => {
              let color = "geekblue";
              if (status === 0){
                status = "Đang xử lý";
                color = "geekblue";
              }
              else if (status === 1){
                status = "Chờ xác nhận";
                color = "purple";
              }
              else if (status === 2){
                status = "Đã xác nhận";
                color = "lime";
              }
              else if (status === 3){
                status = "Đang thanh toán";
                color = "gold";
              }
              else if (status === 4){
                status = "Đã thanh toán";
                color = "green";
              }
              else if (status === 5){
                status = "Đã hủy";
                color = "volcano";
              }
              return (
                <span>
                  <Tag color={color} key={status}>
                    {status}
                  </Tag>
                </span>
              )
            }}
          />
        </RestList>
      </PropertyWrapper>
    );
  }
}

ListTransaction.propTypes = {
  onChange: PropTypes.func,
};

export default ListTransaction;
