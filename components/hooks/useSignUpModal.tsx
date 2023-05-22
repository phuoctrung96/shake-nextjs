import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type SignUpModalProvideType = {
  children: ReactNode;
};

type SignUpContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const SignUpModalContext = createContext<SignUpContextType>({} as SignUpContextType);

export const SignUpModalProvider = ({ children }: SignUpModalProvideType) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const memoedValue = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );
  return (
    <SignUpModalContext.Provider value={memoedValue as SignUpContextType}>
      {children}
    </SignUpModalContext.Provider>
  );
};

const useSignUpModal = (): SignUpContextType => {
  return useContext(SignUpModalContext);
};

export default useSignUpModal;
