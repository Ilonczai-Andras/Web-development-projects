import { Card } from "./Card";

type ColumnProps = {
    id: string;
    title: string;
    cards: CardType[];
};

type CardType = {
    id: string;
    title: string;
};

export const Column = ({ id, title, cards }: ColumnProps) => {
    return (
        <div style={{
            background: '#fefefe',
            borderRadius: '16px',
            padding: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            minHeight: '80vh'
        }}>
            <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#374151'
            }}>{title}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cards.map(card => (
                    <Card key={card.id} id={card.id} title={card.title} />
                ))}
            </div>
        </div>
    );
};
