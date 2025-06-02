import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Input, Divider, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LandingPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const onSearch = () => {
        if (query.trim()) {
            router.push(`/chat?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <Title level={3} style={styles.title}>세상 모든 설명이 이곳에.</Title>

                <Input
                    size="large"
                    placeholder="궁금한 내용을 입력해주세요 (ex. 아이폰 초기화)"
                    prefix={<SearchOutlined />}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onPressEnter={onSearch}
                    style={styles.search}
                    suffix={
                        <Button type="text" icon={<SearchOutlined />} onClick={onSearch} />
                    }
                />

                <Divider style={{ margin: '2rem 0' }} />

                <div style={styles.infoBox}>
                    <Text strong style={styles.subTitle}>찾고 있는 설명서가 없나요?</Text>
                    <Text type="secondary" style={styles.description}>
                        내가 가진 사용 설명서를 업로드하면 AI가 내용을 분석하고 필요한 정보를 빠르게 찾을 수 있도록 도와줍니다.
                    </Text>
                </div>

                <div style={styles.buttonGroup}>
                    <Button type="primary" size="large" block style={{ marginBottom: '0.75rem' }}>
                        등록하기
                    </Button>
                    <Button type="default" size="large" block>
                        요청하기
                    </Button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        backgroundColor: '#f6f9fc',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 1rem',
    },
    container: {
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    search: {
        marginBottom: '2rem',
    },
    infoBox: {
        textAlign: 'left',
        marginBottom: '2rem',
    },
    subTitle: {
        fontSize: '16px',
        display: 'block',
        marginBottom: '0.5rem',
    },
    description: {
        fontSize: '14px',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
};
