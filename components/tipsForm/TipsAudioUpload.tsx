import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import type { RcFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import TipsApi from '../../api/books/request';
import styles from './TipsForm.module.scss';

interface TipsAudioUploadProps {
  onAudioUpload: (url: string) => void;
}

const TipsAudioUpload: React.FC<TipsAudioUploadProps> = ({ onAudioUpload }) => {
  const [audio_url, setAudioUrl] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const props = {
    name: 'audio_file',
    action: async (file: RcFile): Promise<string> => {
      const formData = new FormData();
      formData.append('audio_file', file);

      try {
        setUploading(true);
        const response = await TipsApi.audioUpload(formData);
        const url = response.data;
        setAudioUrl(url);
        onAudioUpload(url);
        return url;
      } catch (error) {
        setUploading(false);
        console.error('File upload failed:', error);
        throw new Error('File upload failed');
      } finally {
        setUploading(false);
      }
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: number) =>
        percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <div>
      <div>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} loading={uploading}>
            Click to Upload Audio
          </Button>{' '}
        </Upload>
      </div>
      <div className={styles.AudioUpload}>Uploaded file: {audio_url}</div>
    </div>
  );
};

export default TipsAudioUpload;
