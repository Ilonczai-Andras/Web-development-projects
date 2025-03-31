import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type CardProps = {
    id: string;
    title: string;
};

export const Card = ({ id, title }: CardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transform: CSS.Transform.toString(transform),
                transition,
                cursor: 'grab',
            }}
        >
            {title}
        </div>
    );
};
