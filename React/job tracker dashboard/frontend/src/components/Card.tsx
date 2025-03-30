import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type CardProps = {
    id: string;
    title: string;
};

export const Card = ({ id, title }: CardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: '#f1f5f9',
        padding: '0.75rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        cursor: 'grab',
        transitionDuration: '0.2s',
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {title}
        </div>
    );
};
