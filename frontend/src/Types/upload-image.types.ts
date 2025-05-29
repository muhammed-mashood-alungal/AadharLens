export interface UploadComponentProps {
  frontPreview: string | null;
  backPreview: string | null;
  isProcessing: boolean;
  onFrontUpload: () => void;
  onBackUpload: () => void;
  onProcess: () => void;
  onReset: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, side: 'front' | 'back') => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}
