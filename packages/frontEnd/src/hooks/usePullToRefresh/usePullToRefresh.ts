import { useEffect } from 'react'


export function usePullToRefresh(
    ref: React.RefObject<HTMLDivElement>
) {
    useEffect(() => {
        const el = ref.current
        if (!el) return

        el.addEventListener('touchstart', handleTouchStart)


        function handleTouchStart(startEvent: TouchEvent) {
            const el = ref.current
            if (!el){
                return
            }
            const initialY = startEvent.touches[0].clientY
            el.addEventListener('touchmove', handleTouchMove)
            el.addEventListener('touchend', handleTouchEnd)

            function handleTouchMove(moveEvent: TouchEvent) {
                const el = ref.current
                if (!el) return

                // get the current Y position
                const currentY = moveEvent.touches[0].clientY

                // get the difference
                const dy = currentY - initialY

                // update the element's transform
                el.style.transform = `translateY(${dy}px)`
            }

            function handleTouchEnd() {
                const el = ref.current
                if (!el) return

                el.removeEventListener('touchmove', handleTouchMove)
                el.removeEventListener('touchend', handleTouchEnd)
            }
        }

        return () => {
            el.removeEventListener('touchstart', handleTouchStart)
        }
    }, [ref.current])
}
