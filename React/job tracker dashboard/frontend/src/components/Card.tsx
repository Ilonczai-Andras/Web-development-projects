type CardProps = {
    id: string;
    title: string;
};

export const Card = ({ id, title }: CardProps) => {
    return (
        <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '0.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
            cursor: 'grab',
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        }}
        >
            {title}
        </div>
    );
};
