import { useState } from 'react';
import { Typography, Steps, Radio, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from 'urql';
import { UPLOAD_DOCUMENT } from '../../api/upload/uploadDocument';
import styles from '../../styles/ManualRegisterForm.module.css';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

export default function ManualRegisterForm({ userId = "test-user" }) {
    const [type, setType] = useState('개인');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [model, setModel] = useState('');
    const [fileList, setFileList] = useState([]);

    const [uploadResult, uploadDocument] = useMutation(UPLOAD_DOCUMENT);

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('파일을 업로드해주세요.');
            return;
        }

        const variables = {
            file: fileList[0],
            meta: {
                mimeType: "application/pdf",
                language: "ko"
            },
            context: {
                version: "1.0",
                eventType: "document_upload",
                traceId: "abc-123-trace",
                uploadedBy: userId
            }
        };

        const result = await uploadDocument(variables);

        if (result.data?.uploadDocument.status === "SUCCESS") {
            message.success('설명서 업로드 성공');
            console.log("업로드 결과:", result.data.uploadDocument);
        } else {
            message.error(result.data?.uploadDocument.message || '업로드 실패');
        }
    };

    return (
        <div className={styles.container}>
            <Title level={3} className={styles.header}>설명서 등록</Title>
            <Steps size="small" current={1} style={{ marginBottom: '1rem' }}>
                <Step />
                <Step />
                <Step />
            </Steps>

            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
                설명서 정보 입력
            </Text>

            <Radio.Group
                value={type}
                onChange={e => setType(e.target.value)}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
            >
                <Radio.Button value="개인">개인</Radio.Button>
                <Radio.Button value="공식">공식</Radio.Button>
            </Radio.Group>

            <Input
                placeholder="브랜드"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                style={{ marginBottom: '0.5rem' }}
            />
            <Input
                placeholder="기종"
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ marginBottom: '0.5rem' }}
            />
            <Select
                placeholder="모델명 선택"
                value={model}
                onChange={value => setModel(value)}
                style={{ width: '100%', marginBottom: '1rem' }}
            >
                <Option value="AO42B538">AO42B538</Option>
            </Select>

            <Upload.Dragger
                beforeUpload={(file) => {
                    setFileList([file]);
                    return false; // 수동 업로드
                }}
                fileList={fileList}
                onRemove={() => setFileList([])}
                accept=".pdf"
            >
                <p className={styles.uploadBox}>PDF 파일 업로드</p>
            </Upload.Dragger>

            <div className={styles.buttonWrapper}>
                <Button type="primary" onClick={handleUpload}>다음</Button>
            </div>
        </div>
    );
}
