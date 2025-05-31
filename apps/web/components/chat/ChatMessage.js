export default function ChatMessage({ type, text }) {
    const isUser = type === 'user';

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                marginBottom: '0.5rem',
            }}
        >
            <div
                style={{
                    backgroundColor: isUser ? '#1677ff' : '#f1f1f1',
                    color: isUser ? '#fff' : '#000',
                    padding: '0.6rem 1rem',
                    borderRadius: '1rem',
                    maxWidth: '75%',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {text}
            </div>
        </div>
    );
}
