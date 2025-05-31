import { Card, Typography, Button } from 'antd';

const { Text } = Typography;

export default function DocumentCard({ title, summary }) {
    return (
        <Card style={{ backgroundColor: '#f0f6ff', margin: '1rem 0' }}>
            <img src="/document-placeholder.png" alt="doc" style={{ width: '100%', height: '120px', background: '#1677ff' }} />
            <Text strong>{title}</Text>
            <p>{summary}</p>
            <Button type="link">문서에서 바로 보기</Button>
        </Card>
    );
}
