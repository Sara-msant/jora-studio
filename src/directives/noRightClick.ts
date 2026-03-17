const handleContextMenu = (event: Event) => {
  event.preventDefault()
}

export default {
  mounted(el: HTMLElement) {
    el.addEventListener('contextmenu', handleContextMenu)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('contextmenu', handleContextMenu)
  },
} as const
