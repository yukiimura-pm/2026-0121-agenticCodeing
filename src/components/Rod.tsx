import type { Rod, Disk } from "../types";
import "../HanoiGame.css";

interface RodProps {
  rod: Rod;
  onDragStart: (disk: Disk, fromRodId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (toRodId: string, e: React.DragEvent<HTMLElement>) => void;
}

export function RodComponent({
  rod,
  onDragStart,
  onDragOver,
  onDrop,
}: RodProps) {
  const topDisk = rod.disks[rod.disks.length - 1];

  return (
    <section
      className="rod-container"
      aria-label={`杭 ${rod.id}`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(rod.id, e)}
    >
      <div className="rod-pole" />
      <div className="rod-disks">
        {rod.disks.map((disk) => (
          <button
            key={`disk-${disk.id}`}
            type="button"
            className="disk"
            draggable
            onDragStart={() => onDragStart(disk, rod.id)}
            aria-label={`円盤 サイズ${disk.size}`}
            style={{
              width: `${60 + disk.size * 40}px`,
              backgroundColor: disk.color,
              opacity: disk.id === topDisk?.id ? 1 : 0.8,
            }}
          >
            <span className="disk-label">サイズ{disk.size}</span>
          </button>
        ))}
      </div>
      <div className="rod-label">{rod.id}</div>
    </section>
  );
}
