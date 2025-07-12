import { useState } from 'react';
import { Typography, Steps, Radio, Input, Select, Upload, Button } from 'antd';
import styles from '../../styles/ManualRegisterForm.module.css';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

export default function ManualRegisterForm() {
    const [type, setType] = useState('개인');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [model, setModel] = useState('');

    return (
        <div className={styles.container}>
            <Title level={3} className={styles.header}>설명서 등록</Title>
            <Steps size="small" current={0} style={{ marginBottom: '1rem' }}>
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
                <Option value="AO42B539">AO42B539</Option>
            </Select>

            <Upload.Dragger name="files" multiple={false} style={{ background: '#f5f7fa' }}>
                <p className={styles.uploadBox}>파일 업로드</p>
            </Upload.Dragger>

            <div className={styles.buttonWrapper}>
                <Button type="primary">다음</Button>
            </div>
        </div>
    );
}
