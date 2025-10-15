import { useState } from 'react';

interface ConfirmationOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    onConfirm: () => {}
  });

  const confirm = (
    callback: () => void,
    options?: ConfirmationOptions
  ) => {
    setState({
      isOpen: true,
      title: options?.title || '¿Estás seguro?',
      description: options?.description || 'Esta acción no se puede deshacer.',
      confirmText: options?.confirmText || 'Confirmar',
      cancelText: options?.cancelText || 'Cancelar',
      onConfirm: callback
    });
  };

  const handleConfirm = () => {
    state.onConfirm();
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    confirm,
    confirmationProps: {
      isOpen: state.isOpen,
      title: state.title,
      description: state.description,
      confirmText: state.confirmText,
      cancelText: state.cancelText,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }
  };
}