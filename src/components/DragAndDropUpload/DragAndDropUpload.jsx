import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import styles from './DragAndDropUpload.module.scss';

export default function DragAndDropUpload({ onFileSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        setFileName(file.name);
        onFileSelected?.(file);
      }
    },
    [onFileSelected]
  );

  const handleFilePick = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        onFileSelected?.(file);
      }
    },
    [onFileSelected]
  );

  return (
    <div>
      <label
        className={clsx(styles.dropzone, { [styles.dragging]: isDragging })}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" style={{ display: 'none' }} onChange={handleFilePick} />
        {fileName || 'Drag & Drop your file here or click to select'}
      </label>
    </div>
  );
}
