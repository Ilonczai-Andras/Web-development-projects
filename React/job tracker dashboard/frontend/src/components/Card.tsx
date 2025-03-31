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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="bg-white rounded-xl p-3 shadow-md cursor-grab"
        >
            {title}
        </div>
    );
};
