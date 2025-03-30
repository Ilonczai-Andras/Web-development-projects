import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from './Card';

type ColumnProps = {
    id: string;
    title: string;
    cards: { id: string; title: string }[];
};

export const Column = ({ id, title, cards }: ColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                background: isOver ? '#e0f2fe' : 'white',
                padding: '1rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '400px',
                transition: '0.2s'
            }}
        >
            <h3>{title}</h3>
            <SortableContext
                items={cards.map(c => c.id)}
                strategy={verticalListSortingStrategy}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cards.map(card => (
                        <Card key={card.id} id={card.id} title={card.title} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};
