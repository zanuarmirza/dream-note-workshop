import clsx from 'clsx'
import { motion } from 'framer-motion'

const actionVariant = {
  hover: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeOut',
    },
  },
  leave: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

const Card = ({ children, isComplete, onDelete, onComplete }) => {
  return (
    <motion.div
      initial="leave"
      whileHover={'hover'}
      animate="leave"
      className={clsx('card w-full bg-base-100 shadow-xl overflow-hidden', {
        'bg-green-500': isComplete,
      })}
    >
      <div className="card-body relative">
        <p className={clsx({ 'text-white': isComplete })}>{children}</p>
        {!isComplete ? (
          <motion.div
            variants={actionVariant}
            exit={{ opacity: 1 }}
            className="absolute flex flex-row right-0 top-0 h-full w-full"
          >
            <motion.div
              className=" w-1/2 bg-red-600 hover:bg-red-500 text-white text-center font-bold px-4 flex flex-col justify-center"
              onClick={onDelete}
            >
              delete
            </motion.div>
            <motion.div
              className="w-1/2 bg-green-600 hover:bg-green-500 text-white text-center font-bold px-4 flex flex-col justify-center"
              onClick={onComplete}
            >
              complete
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  )
}
export default Card
