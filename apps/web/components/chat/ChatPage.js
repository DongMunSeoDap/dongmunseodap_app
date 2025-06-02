import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Input, Button, Typography } from 'antd';
import ChatMessage from './ChatMessage';
import DocumentCard from './DocumentCard';

const { Text } = Typography;

export default function ChatPage() {
    const router = useRouter();
    const { query } = router.query;
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (query) {
            setMessages([
                { id: 1, type: 'bot', text: `"${query}"에 대한 내용을 찾고 있어요.` },
                { id: 2, type: 'bot', text: `E13 에러코드는 수리점 방문이 필요합니다.` },
                { id: 3, type: 'document', title: 'SG007FA3VBN 제품 사용 설명', summary: '세탁기의 초기 설정과 세탁 방법에 대한 설명입니다.' }
            ]);
        }
    }, [query]);

    const onSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { id: Date.now(), type: 'user', text: input }]);
        setInput('');
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>LG 세탁기 <Text type="secondary"> | 고객센터 1588-0000</Text></div>

            <div style={styles.chatBox}>
                {messages.map((msg) =>
                    msg.type === 'document'
                        ? <DocumentCard key={msg.id} title={msg.title} summary={msg.summary} />
                        : <ChatMessage key={msg.id} type={msg.type} text={msg.text} />
                )}
            </div>

            <div style={styles.inputBox}>
                <Input
                    placeholder="메시지를 입력하세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onPressEnter={onSend}
                />
                <Button type="primary" onClick={onSend}>전송</Button>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: '420px',
        margin: '0 auto',
        background: '#fff',
        padding: '1rem',
    },
    header: {
        paddingBottom: '1rem',
        borderBottom: '1px solid #ddd',
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    chatBox: {
        flex: 1,
        overflowY: 'auto',
        marginTop: '1rem',
    },
    inputBox: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem',
    },
};
