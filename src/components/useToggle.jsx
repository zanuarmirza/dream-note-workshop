import * as React from 'react'

const useToggle = () => {
  const [active, setActive] = React.useState(false)
  return {
    active,
    setActive,
  }
}

export default useToggle
