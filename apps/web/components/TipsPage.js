import React, { useState, useMemo } from 'react';
import { Card, List, Input, Tag, Space } from 'antd';

const { Search } = Input;
const { CheckableTag } = Tag;

const initialTips = [
    {
        id: 1,
        title: '배터리 수명 최적화 방법',
        content: 'Galaxy S25의 배터리 사용 시간을 연장하려면 최대 충전 용량을 80% 이하로 유지하세요.',
        tags: ['배터리', '성능'],
    },
    {
        id: 2,
        title: '제품 청소 시 주의사항',
        content: '젖은 천으로 닦을 때는 전원을 반드시 끄고, 통풍이 잘 되는 곳에서 건조하세요.',
        tags: ['유지보수', '안전'],
    },
    {
        id: 3,
        title: '업데이트 자동 설정 방법',
        content: '설정 > 업데이트 > 자동 업데이트 켜기를 활성화하면 최신 펌웨어가 자동으로 설치됩니다.',
        tags: ['업데이트', '편의'],
    },
    {
        id: 4,
        title: '과열 방지 팁',
        content: '장시간 사용 시에는 30분마다 5분 정도 휴식을 주어 과열을 방지하세요.',
        tags: ['안전', '성능'],
    },
    {
        id: 5,
        title: '최적 온도 환경',
        content: '제품 사용 최적 온도는 10~35°C이며, 너무 낮거나 높은 환경에서는 성능이 저하될 수 있습니다.',
        tags: ['환경', '성능'],
    },
];

export default function TipsPage() {
    const [searchText, setSearchText] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    const allTags = useMemo(
        () => [...new Set(initialTips.flatMap(tip => tip.tags))],
        []
    );

    const filteredTips = useMemo(
        () =>
            initialTips.filter(
                tip =>
                    (!searchText || tip.title.includes(searchText) || tip.content.includes(searchText)) &&
                    (!selectedTag || tip.tags.includes(selectedTag))
            ),
        [searchText, selectedTag]
    );

    return (
        <Card title="제품 TIP 추천">
            <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
                <Search
                    placeholder="TIP 검색"
                    onSearch={value => setSearchText(value)}
                    enterButton
                    allowClear
                />
                <Space wrap>
                    {allTags.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTag === tag}
                            onChange={checked => setSelectedTag(checked ? tag : '')}
                        >
                            {tag}
                        </CheckableTag>
                    ))}
                </Space>
            </Space>

            <List
                itemLayout="vertical"
                dataSource={filteredTips}
                pagination={{ pageSize: 5 }}
                renderItem={tip => (
                    <List.Item key={tip.id}>
                        <List.Item.Meta
                            title={tip.title}
                            description={
                                <Space size="small">
                                    {tip.tags.map(tag => (
                                        <Tag key={tag}>{tag}</Tag>
                                    ))}
                                </Space>
                            }
                        />
                        <p>{tip.content}</p>
                    </List.Item>
                )}
            />
        </Card>
    );
}
