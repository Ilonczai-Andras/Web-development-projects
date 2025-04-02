import { useAuth0 } from "@auth0/auth0-react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { Column } from "./Column";
import { Card } from "./Card/Card";
import { useGetApplications, Application } from "../hooks/useGetApplications";

type ColumnId = "todo" | "inprogress" | "interview" | "done";

type BoardState = {
  [key in ColumnId]: Application[];
};

const emptyBoard: BoardState = {
  todo: [],
  inprogress: [],
  interview: [],
  done: [],
};

export const KanbanBoard = () => {
  const { isAuthenticated } = useAuth0();
  const { applications, loading, error } = useGetApplications();

  const [board, setBoard] = useState<BoardState>(emptyBoard);
  const [activeCard, setActiveCard] = useState<Application | null>(null);

  useEffect(() => {
    const grouped: BoardState = {
      todo: [],
      inprogress: [],
      interview: [],
      done: [],
    };

    applications.forEach((app) => {
      if (grouped[app.status]) {
        grouped[app.status as ColumnId].push(app);
      }
    });

    setBoard(grouped);
  }, [applications]);

  if (!isAuthenticated) return <p>Please log in to see your board.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDragStart = (event: any) => {
    const activeId = event.active.id;
    const found = Object.values(board)
      .flat()
      .find((c) => c.id.toString() === activeId);
    if (found) setActiveCard(found);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = (Object.keys(board) as ColumnId[]).find((columnId) =>
      board[columnId].some((card) => card.id.toString() === activeId)
    );

    if (!sourceColumn) return;

    let destinationColumn: ColumnId | undefined;

    if ((Object.keys(board) as ColumnId[]).includes(overId as ColumnId)) {
      destinationColumn = overId as ColumnId;
    } else {
      destinationColumn = (Object.keys(board) as ColumnId[]).find((columnId) =>
        board[columnId].some((card) => card.id.toString() === overId)
      );
    }

    if (!destinationColumn) return;

    const dest = destinationColumn as ColumnId;

    if (sourceColumn === destinationColumn) {
      const oldIndex = board[sourceColumn].findIndex(
        (c) => c.id.toString() === activeId
      );
      const newIndex = board[destinationColumn].findIndex(
        (c) => c.id.toString() === overId
      );
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setBoard((prev) => ({
          ...prev,
          [sourceColumn]: arrayMove(prev[sourceColumn], oldIndex, newIndex),
        }));
      }
      return;
    }

    const cardToMove = board[sourceColumn].find(
      (card) => card.id.toString() === activeId
    );
    if (!cardToMove) return;

    setBoard((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        (card) => card.id.toString() !== activeId
      ),
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

      <DragOverlay>{activeCard && <Card {...activeCard} />}</DragOverlay>
    </DndContext>
  );
};
