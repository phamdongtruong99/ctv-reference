import React, { Component } from 'react'
import { Upload, Icon,Button, Modal, message, Row, Col } from 'antd';
import { connect } from "react-redux";
import PropertyImageWrapper from './styles'
import { uploadFileSuccessAction, addPropertyMediaAction, removePropertyMediaAction } from "../../../../redux/property/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PropertyImage extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
      
    }
    if (info.file.status === "done") {
      let newFileName = this.props.file;
      newFileName = newFileName.substring(newFileName.lastIndexOf("/") + 1);
      info.file.name = newFileName;
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "PROPERTY_IMAGE",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadImageSuccess(response.url);
      const payload = {
        mimeType: file.type,
        link: response.url,
        type: 2,
      }
      this.props.addPropertyImage(payload);
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  handleRemove = (e) => {
    this.props.removeImage(e.id)
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const {medias} = this.props;
    let fileList = [...medias] || [];
    if (fileList.length > 0) {
      fileList = fileList.filter((e) => e.type === 2);
      fileList = fileList.map(e => ({
        url: e.link,
        status: 'done',
        uid: e.id,
        id: e.id,
      }))
    }
   
    const uploadButton = (
      <Button>
        <Icon type="upload" />
        Upload
      </Button>
    );
    return (
      <PropertyImageWrapper>
        <Row>
          <div className="title">
            <p>
            Hình ảnh dự án
            </p>
          </div>
        </Row>
        <Row>
          <Col>
            <Upload
              listType="picture"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleOnChange}
              customRequest={this.handleUpload}
              onRemove={this.handleRemove}
              className="upload-list-inline"
        >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Col>
        </Row>
        
      </PropertyImageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  file: state.property.fileUrl,
  medias: state.property.medias,
});

const mapDispatchToProps = dispatch => ({
 
  
  

  uploadImageSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl, "edit"));
  },

  addPropertyImage :(payload) => {
    dispatch(addPropertyMediaAction(payload));
  },


  removeImage: id => {
    dispatch(removePropertyMediaAction(id));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(PropertyImage);
