import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { Column } from "./Column";
import { Card } from "./Card";
import { todo, inprogress, interview, done } from "../data/demoBoard";
import { useAuth0 } from "@auth0/auth0-react";

type ColumnId = "todo" | "inprogress" | "interview" | "done";

type CardType = {
  id: string;
  title: string;
};

type BoardState = {
  [key in ColumnId]: CardType[];
};

const initialBoard: BoardState = {
  todo: todo[0].cards,
  inprogress: inprogress[0].cards,
  interview: interview[0].cards,
  done: done[0].cards,
};

export const KanbanBoard = () => {
  const { isAuthenticated } = useAuth0();
  const [board, setBoard] = useState<BoardState>(initialBoard);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-70px)] bg-gray-100">
        <p className="text-gray-800 text-2xl font-semibold">
          Please sign in to view your job applications board.
        </p>
      </div>
    );
  }

  const handleDragStart = (event: any) => {
    const activeId = event.active.id as string;
    const found = Object.values(board)
      .flat()
      .find((c) => c.id === activeId);
    if (found) setActiveCard(found);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = (Object.keys(board) as ColumnId[]).find((columnId) =>
      board[columnId].some((card) => card.id === activeId)
    );

    if (!sourceColumn) return;

    let destinationColumn: ColumnId | undefined;

    if ((Object.keys(board) as ColumnId[]).includes(overId as ColumnId)) {
      destinationColumn = overId as ColumnId;
    } else {
      destinationColumn = (Object.keys(board) as ColumnId[]).find((columnId) =>
        board[columnId].some((card) => card.id === overId)
      );
    }

    if (destinationColumn === undefined) return;

    const dest = destinationColumn as ColumnId;

    // In-column reorder
    if (sourceColumn === dest) {
      const oldIndex = board[sourceColumn].findIndex((c) => c.id === activeId);
      const newIndex = board[dest].findIndex((c) => c.id === overId);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setBoard((prev) => ({
          ...prev,
          [sourceColumn]: arrayMove(prev[sourceColumn], oldIndex, newIndex),
        }));
      }
      return;
    }

    // Cross-column move
    const cardToMove = board[sourceColumn].find((card) => card.id === activeId);
    if (!cardToMove) return;

    setBoard((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter((card) => card.id !== activeId),
      [dest]: [...prev[dest], cardToMove],
    }));
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveCard(null)}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4 h-[calc(100vh-70px)] bg-blue-100">
        <Column id="todo" title="To Do" cards={board.todo} />
        <Column id="inprogress" title="In Progress" cards={board.inprogress} />
        <Column id="interview" title="Interview" cards={board.interview} />
        <Column id="done" title="Done" cards={board.done} />
      </div>

      <DragOverlay>
        {activeCard ? (
          <Card id={activeCard.id} title={activeCard.title} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
