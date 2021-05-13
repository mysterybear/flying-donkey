import create, { SetState } from "zustand"

type S = {
  axes: {
    x: [number, number]
    y: [number, number]
  }
  divisions: number
  orthographic: boolean
  set: SetState<S>
  // increase: (by: number) => void
}

const n = 5

// And it is going to work for both
const useStore = create<S>((set) => ({
  axes: {
    x: [-n, n],
    y: [-n, n],
  },
  divisions: 2 * n,
  orthographic: true,
  set,
  // increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

export default useStore
