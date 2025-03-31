import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { todo, inprogress, interview, done} from '../data/demoBoard';
import { Column } from './Column';

export const KanbanBoard = () => {

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;
    
        const activeId = active.id as string;
        const overId = over.id as string;
    
    }
    

    return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                padding: '1rem',
                height: 'calc(100vh - 70px)',
                background: '#f3f4f6'
            }}>
                <Column key={todo[0].id} id={todo[0].id} title={todo[0].title} cards={todo[0].cards} />
                <Column key={inprogress[0].id} id={inprogress[0].id} title={inprogress[0].title} cards={inprogress[0].cards} />
                <Column key={interview[0].id} id={interview[0].id} title={interview[0].title} cards={interview[0].cards} />
                <Column key={done[0].id} id={done[0].id} title={done[0].title} cards={done[0].cards} />
            </div>
    );
};
