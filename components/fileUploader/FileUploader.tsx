import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

export interface FileUploaderProps {
  label?: string;
  togglerIcon: any;
  onUpdated: any;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => props.onUpdated(fileList), [fileList]);

  const fileUploaderProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <Upload {...fileUploaderProps} maxCount={1}>
      <Button>
        <FontAwesomeIcon icon={props.togglerIcon} />
        {props.label}
      </Button>
    </Upload>
  );
};

export default FileUploader;
