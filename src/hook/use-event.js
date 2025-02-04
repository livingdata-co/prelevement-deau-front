import {useRef, useEffect, useCallback} from 'react'

function useEvent(callback) {
  const callbackRef = useRef(callback)

  // À chaque changement, on met à jour la ref
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Retourne une fonction stable qui appelle toujours la version la plus récente
  return useCallback((...args) => callbackRef.current(...args), [])
}

export default useEvent
