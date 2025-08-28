import React from 'react';
import { Card, List, Typography, Row, Col, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const productInfo = {
    name: 'AVANTE Hybrid',
    imageUrl: '/images/product.jpg',
    description:
        'The new basics 세상, 달라졌다.',
};

const recommendedParts = [
    { id: 1, name: '[타이어]225/45R17 91W', info: '고내구성 소재 사용' },
    { id: 2, name: '[에어컨 공조]', info: '저소음 모터 탑재' },
    { id: 3, name: '[배터리]', info: '에너지 효율 20% 향상' },
];

const latestNews = [
    { id: 1, title: '[리콜]배기가스 재순환 장치(EGR 밸브) 불량으로 인해 주행 중 시동 꺼짐 가능성이 발견', date: '2024-05-10' },
    { id: 2, title: '[이슈]안전성 인증 획득 소식', date: '2025-06-25' },
    { id: 3, title: '[이벤트]글로벌 런칭 엘란트라 이벤트', date: '2025-06-01' },
];

export default function RelatedPage() {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
                <Card
                    cover={<img alt={productInfo.name} src={productInfo.imageUrl} />}
                    hoverable
                >
                    <Title level={4}>{productInfo.name}</Title>
                    <Paragraph>{productInfo.description}</Paragraph>
                </Card>

                <Divider />

                <Card title="추천 부품" size="small">
                    <List
                        itemLayout="horizontal"
                        dataSource={recommendedParts}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.info}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>

            <Col xs={24} lg={12}>
                <Card title="최신 뉴스" size="small">
                    <List
                        itemLayout="vertical"
                        dataSource={latestNews}
                        renderItem={(news) => (
                            <List.Item key={news.id}>
                                <List.Item.Meta
                                    title={news.title}
                                    description={news.date}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
        </Row>
    );
}