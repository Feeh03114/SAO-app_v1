import { Fragment } from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
} 
export function Modal ({ isOpen, onClose, children }:ModalProps){
  if (!isOpen) return null;

  return( 
    <>
        <Fragment>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-900 opacity-75 z-50" onClick={onClose} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-lg w-full">
                    {children}
                </div>
            </div>
        </Fragment>
    </>
  );
};
