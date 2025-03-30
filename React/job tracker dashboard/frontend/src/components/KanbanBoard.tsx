import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { columns as demoColumns } from '../data/demoBoard';
import { Column } from './Column';

export const KanbanBoard = () => {
    const [columns, setColumns] = useState(demoColumns);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;
    
        const activeId = active.id as string;
        const overId = over.id as string;
    
        // Find the source column
        const sourceCol = columns.find(col => col.cards.some(c => c.id === activeId));
        if (!sourceCol) return;
    
        const cardToMove = sourceCol.cards.find(c => c.id === activeId);
        if (!cardToMove) return;
    
        // CASE 1: Rearranging inside the same column
        if (sourceCol.cards.some(c => c.id === overId)) {
            const oldIndex = sourceCol.cards.findIndex(c => c.id === activeId);
            const newIndex = sourceCol.cards.findIndex(c => c.id === overId);
            if (oldIndex === -1 || newIndex === -1) return;
    
            const newCards = arrayMove(sourceCol.cards, oldIndex, newIndex);
    
            setColumns(columns.map(col =>
                col.id === sourceCol.id ? { ...col, cards: newCards } : col
            ));
            return;
        }
    
        // CASE 2: Dropped on another column
        const targetCol = columns.find(col => col.id === overId);
        if (!targetCol) return;
    
        // Remove from source
        const updatedSource = {
            ...sourceCol,
            cards: sourceCol.cards.filter(c => c.id !== activeId)
        };
    
        // Add to target
        const updatedTarget = {
            ...targetCol,
            cards: [...targetCol.cards, cardToMove]
        };
    
        // Update state
        setColumns(columns.map(col => {
            if (col.id === updatedSource.id) return updatedSource;
            if (col.id === updatedTarget.id) return updatedTarget;
            return col;
        }));
    }
    

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                height: 'calc(100vh - 70px)',
                background: '#f9fafb'
            }}>
                {columns.map(col => (
                    <Column key={col.id} id={col.id} title={col.title} cards={col.cards} />
                ))}
            </div>
        </DndContext>
    );
};
