export interface UploadComponentProps {
  isProcessing: boolean;
  onProcess: (frontImage: File, backImage: File) => void;
}
