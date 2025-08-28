import React, { useState, useMemo } from 'react'
import {
    Card,
    Table,
    Button,
    Badge,
    Input,
    Select,
    Space,
    Modal,
    message,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

const initialRequests = [
    { id: 1, title: '[자동차][현대] AVANTE CN7 공개 요청', status: '대기' },
    { id: 2, title: '[자동차][기아] 레이 일렉트릭 검수 완료', status: '승인' },
    { id: 3, title: '[모바일][삼성] Galaxy S25 Edge 공개 요청', status: '반려' },
    { id: 4, title: '[공기청정기][엘지] 시그니처 공개 요청', status: '대기' },
]

export default function RequestReviewPage() {
    const [data, setData] = useState(initialRequests)
    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const filteredData = useMemo(
        () =>
            data.filter(
                item =>
                    (!searchText || item.title.includes(searchText)) &&
                    (!statusFilter || item.status === statusFilter)
            ),
        [data, searchText, statusFilter]
    )

    const handleAction = (record, action) => {
        confirm({
            title: `“${record.title}”을(를) ${action}하시겠습니까?`,
            icon: <ExclamationCircleOutlined />,
            okText: action,
            okType: action === '승인' ? 'primary' : 'danger',
            cancelText: '취소',
            onOk() {
                setData(prev =>
                    prev.map(item =>
                        item.id === record.id
                            ? { ...item, status: action === '승인' ? '승인' : '반려' }
                            : item
                    )
                )
                message.success(`${action} 처리되었습니다.`)
            },
        })
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
        { title: '제목', dataIndex: 'title', key: 'title', ellipsis: true },
        {
            title: '상태',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: status => {
                const map = { 대기: 'processing', 승인: 'success', 반려: 'error' }
                return <Badge status={map[status]} text={status} />
            },
        },
        {
            title: '액션',
            key: 'actions',
            width: 180,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        disabled={record.status !== '대기'}
                        onClick={() => handleAction(record, '승인')}
                    >
                        승인
                    </Button>
                    <Button
                        danger
                        disabled={record.status !== '대기'}
                        onClick={() => handleAction(record, '반려')}
                    >
                        반려
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <Card title="설명서 공개 요청 및 검수">
            <Space style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="제목 검색"
                    onSearch={setSearchText}
                    enterButton
                    allowClear
                />
                <Select
                    placeholder="상태 필터"
                    style={{ width: 150 }}
                    allowClear
                    onChange={setStatusFilter}
                    value={statusFilter || undefined}
                >
                    <Select.Option value="대기">대기</Select.Option>
                    <Select.Option value="승인">승인</Select.Option>
                    <Select.Option value="반려">반려</Select.Option>
                </Select>
            </Space>
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </Card>
    )
}
