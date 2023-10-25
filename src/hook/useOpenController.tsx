import { useCallback, useState } from 'react';

export default function useOpenController(initialState: any)  {
    const [isOpen, setOpenState] = useState(initialState);

    const toggle = useCallback(() => {
        setOpenState((state: any) => !state);
    }, [setOpenState]);

    return { isOpen, toggle };
}