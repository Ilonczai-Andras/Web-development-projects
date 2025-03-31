import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card } from './Card';

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
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="bg-[#fefefe] rounded-2xl p-4 shadow-md flex flex-col gap-3 min-h-[80vh]"
        >
            <h3 className="text-[1.2rem] font-semibold mb-2 text-gray-700">{title}</h3>

            <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {cards.map(card => (
                        <Card key={card.id} id={card.id} title={card.title} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};
