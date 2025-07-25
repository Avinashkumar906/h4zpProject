import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { componentOptions } from '../util';

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default function DraggableList(props: any) {
  const [items, setItems] = useState(props.list);
  const [submitted, setSubmitted] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    setSubmitted(true);
    props.onSave(items);
    setTimeout(() => setSubmitted(false), 500);
  };

  return (
    <div className="container-fluid">
      <div
        className="p-3 mb-2 bg-light border-bottom text-center"
        style={{ cursor: 'not-allowed', opacity: 0.6 }}
      >
        🔒 Non-editable header section
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <div className="list-group-item p-2 mb-2 bg-light border rounded shadow-sm">
                {componentOptions.find((f) => f.value === item?.data?.component)?.label ||
                  item.data.component}
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div className="text-center mt-3">
        <Row className="mb-2">
          <Col className="text-center">
            {submitted ? (
              <Spinner animation="border" />
            ) : (
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save Order
              </Button>
            )}
          </Col>
        </Row>
        <div className="p-3 mt-2 bg-light border-top" style={{ opacity: 0.9 }}>
          <span className="text-muted">🔒 Non-editable footer section</span>
        </div>
      </div>
    </div>
  );
}
