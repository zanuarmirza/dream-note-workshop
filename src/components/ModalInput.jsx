import clsx from 'clsx'
import { useEffect, useRef } from 'react'

const ModalInput = ({ isOpen, onSubmit, children, onClose }) => {
  const textArea = useRef()
  useEffect(() => {
    textArea.current.value = ''
  }, [isOpen])

  return (
    <div className={clsx('modal', { 'modal-open': isOpen })}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2 flex justify-center items-center"
          onClick={onClose}
        >
          X
        </button>
        <textarea
          ref={textArea}
          className="textarea w-full"
          placeholder="My Dream is"
        ></textarea>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => onSubmit(textArea.current.value)}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalInput
